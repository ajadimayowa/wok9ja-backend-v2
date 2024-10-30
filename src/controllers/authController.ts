import { Request, Response } from 'express';
import User from '../models/User'; // Assuming you have a User model
import bcrypt from 'bcryptjs'; // For password hashing comparison
import jwt from 'jsonwebtoken'
import { sendMail } from '../services/emailService';
import { generateVerificationCode } from '../utils/generateVerificationCode';
import {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendPasswordChangedEmail,
  sendLoginNotificationEmail,
  sendUserVerifiedEmail
} from '../services/welcomeEmail';

export const registerUser = async (req: Request, res: Response): Promise<any> => {
  const { fullName,email, phoneNumber, password } = req.body;
  let fullNameSplit = fullName.split(" ");
  let firstName = fullNameSplit[0];
  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if the email, phone number, or full name already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }, { fullName }],
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User with this email, phone number, or full name already exists' });
    }

    const verificationCode = generateVerificationCode();

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword); // Check this value


    const user = new User({
      profile : {
        fullName,
        firstName,
        isVerified: false,
        verificationCode,
        password: hashedPassword,
      },
      contact:{
        phoneNumber,
        email,
      }
      
      
    });

    // Save the user to the database
    await user.save();

    // Send registration email
    await sendWelcomeEmail(firstName, email, verificationCode);
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const requestPasswordReset = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate an OTP (verification code)
    const verificationCode = generateVerificationCode();

    // Save the verification code to the user record
    user.profile.verificationCode = verificationCode;
    await user.save();

    // Send the verification code via email
    await sendPasswordResetEmail(user.profile.fullName, email, verificationCode);

    return res.status(200).json({ message: 'OTP sent successfully to reset password' });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const resetPassword = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, newPassword, verificationCode } = req.body;

    // Validate input
    if (!email || !newPassword || !verificationCode) {
      return res.status(400).json({ error: 'Email, new password, and verification code are required' });
    }

    // Find the user by email
    const user = await User.findOne({ "contact.email":email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the verification code matches
    if (user.profile.verificationCode !== verificationCode) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear the verification code
    user.profile.password = hashedPassword;
    user.profile.verificationCode = ''; // Optionally clear the verification code
    await user.save();
    await sendPasswordChangedEmail(user.profile.fullName, email, verificationCode);
    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const verifyUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, verificationCode } = req.body;

    // Validate input
    if (!email || !verificationCode) {
      return res.status(400).json({ error: 'Email and verification code are required' });
    }

    // Find the user by email
    const user = await User.findOne({ "contact.email": email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is already verified
    if (user.profile.isVerified) {
      return res.status(400).json({ error: 'User is already verified' });
    }

    // Check if the verification code matches
    if (user.profile.verificationCode !== verificationCode) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // Update user verification status
    user.profile.isVerified = true;
    user.profile.verificationCode = null; // Optionally clear the verification code
    await user.save();
    await sendUserVerifiedEmail(user?.profile.firstName, email, verificationCode);
    return res.status(200).json({ message: 'User verified successfully' });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find the user by email
    const existingUser = await User.findOne({ "contact.email": email });
    if (!existingUser) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is verified
    // if (!existingUser.isVerified) {
    //   console.log('User not verified');
    //   return res.status(403).json({ error: 'User is not verified' });
    // }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, existingUser.profile.password);
    console.log('Password Match:', isMatch); // Log the result of the comparison

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.contact.email },
      process.env.JWT_SECRET as string, // JWT secret
      { expiresIn: '1h' }
    );

    await sendLoginNotificationEmail(existingUser.profile.fullName, email, '847474');
    // Return the token and user info
    return res.status(200).json({
      message: 'Login success',
      token,
      payload: {
        id:existingUser._id,
        fullName: existingUser.profile.fullName,
        firstName:existingUser.profile.firstName || '',
        lastName:existingUser.profile.lastName || '',
        email: existingUser.contact.email || '',
        phoneNumber: existingUser.contact.phoneNumber,
        isVerified: existingUser.profile.isVerified,
        userId: existingUser._id,
        state: existingUser.userLocation.state || '',
        lga: existingUser.userLocation.lga || '',
        homeAddress: existingUser.userLocation.homeAddress ||'',
      },
    });


  } catch (err) {
    console.error('Login error:', err); // Log the error for debugging
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


