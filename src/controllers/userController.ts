import { Request, Response } from 'express';
import User from '../models/User'; // Assuming you have a User model
import bcrypt from 'bcryptjs'; // For password hashing comparison
import jwt from 'jsonwebtoken'
import { sendMail } from '../services/emailService';
import { generateVerificationCode } from '../utils/generateVerificationCode';
import { sendProfileUpdateEmail } from '../services/welcomeEmail';

export const updateUserProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params; // Assume userId is passed as a route param
    const { fullName, phoneNumber, email } = req.body;

    // Validate input
    if (!fullName && !phoneNumber && !email) {
      return res.status(400).json({ error: 'At least one field (fullName, phoneNumber, or email) is required for update' });
    }

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the new email, phone number, or full name already exists for another user
    if (email || phoneNumber || fullName) {
      const existingUser = await User.findOne({
        _id: { $ne: userId }, // Exclude the current user
        $or: [{ email }, { phoneNumber }, { fullName }],
      });

      if (existingUser) {
        return res.status(409).json({ error: 'Another user with this email, phone number, or full name already exists' });
      }
    }

    // Update the user's information
    if (fullName) user.fullName = fullName;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (email) user.email = email;

    await user.save();

    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const doUserKyc = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params; // Assume userId is passed as a route param
    const { 
      homeAddress,
      officeAddress,
      nextOfKinAddress,
      nextOfKinPhoneNumber,
      nextOfKinEmail,
      profilePicUrl,
      } = req.body;

    // Validate input
    // if (!homeAddress && !phoneNumber && !email) {
    //   return res.status(400).json({ error: 'At least one field (fullName, phoneNumber, or email) is required for update' });
    // }

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's information
    if (homeAddress) user.homeAddress = homeAddress;
    if (officeAddress) user.officeAddress = officeAddress;
    if (nextOfKinAddress) user.nextOfKinAddress = nextOfKinAddress;
    if (officeAddress) user.officeAddress = officeAddress;
    if (nextOfKinEmail) user.nextOfKinEmail = nextOfKinEmail;
    if (nextOfKinPhoneNumber) user.nextOfKinPhoneNumber = nextOfKinPhoneNumber;
    if (profilePicUrl) user.profilePicUrl = profilePicUrl;
    user.isKyc=true

    await user.save();

    return res.status(200).json({ message: 'KYC completed!' });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

