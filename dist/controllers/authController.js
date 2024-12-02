"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.verifyUser = exports.resetPassword = exports.requestPasswordReset = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User")); // Assuming you have a User model
const bcryptjs_1 = __importDefault(require("bcryptjs")); // For password hashing comparison
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateVerificationCode_1 = require("../utils/generateVerificationCode");
const welcomeEmail_1 = require("../services/welcomeEmail");
const registerUser = async (req, res) => {
    const { fullName, email, phoneNumber, password } = req.body;
    let fullNameSplit = fullName.split(" ");
    let firstName = fullNameSplit[0];
    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        // Check if the email, phone number, or full name already exists
        const existingUser = await User_1.default.findOne({
            $or: [{ 'contact.email': email }, { 'contact.phoneNumber': phoneNumber }],
        });
        if (existingUser) {
            return res.status(409).json({ error: 'User with this email, phone number already exists' });
        }
        const verificationCode = (0, generateVerificationCode_1.generateVerificationCode)();
        // Hash the password before saving
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        console.log('Hashed Password:', hashedPassword); // Check this value
        const user = new User_1.default({
            profile: {
                fullName,
                firstName,
                isVerified: false,
                verificationCode,
                password: hashedPassword,
            },
            contact: {
                phoneNumber,
                email,
            }
        });
        // Save the user to the database
        await user.save();
        // Send registration email
        await (0, welcomeEmail_1.sendWelcomeEmail)(firstName, email, verificationCode);
        return res.status(201).json({ message: 'User registered successfully' });
    }
    catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.registerUser = registerUser;
const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        // Validate input
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        // Find the user by email
        const user = await User_1.default.findOne({ 'contact.email': email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Generate an OTP (verification code)
        const verificationCode = (0, generateVerificationCode_1.generateVerificationCode)();
        // Save the verification code to the user record
        user.profile.verificationCode = verificationCode;
        await user.save();
        // Send the verification code via email
        await (0, welcomeEmail_1.sendPasswordResetEmail)(user.profile.firstName, email, verificationCode);
        return res.status(200).json({ message: 'OTP sent successfully to reset password' });
    }
    catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.requestPasswordReset = requestPasswordReset;
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, verificationCode } = req.body;
        // Validate input
        if (!email || !newPassword || !verificationCode) {
            return res.status(400).json({ error: 'Email, new password, and verification code are required' });
        }
        // Find the user by email
        const user = await User_1.default.findOne({ "contact.email": email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Check if the verification code matches
        if (user.profile.verificationCode !== verificationCode) {
            return res.status(400).json({ error: 'Invalid verification code' });
        }
        // Hash the new password
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        // Update user's password and clear the verification code
        user.profile.password = hashedPassword;
        user.profile.verificationCode = ''; // Optionally clear the verification code
        await user.save();
        await (0, welcomeEmail_1.sendPasswordChangedEmail)(user.profile.firstName, email, verificationCode);
        return res.status(200).json({ message: 'Password reset successfully' });
    }
    catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.resetPassword = resetPassword;
const verifyUser = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;
        // Validate input
        if (!email || !verificationCode) {
            return res.status(400).json({ error: 'Email and verification code are required' });
        }
        // Find the user by email
        const user = await User_1.default.findOne({ "contact.email": email });
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
        await (0, welcomeEmail_1.sendUserVerifiedEmail)(user?.profile.firstName, email, verificationCode);
        return res.status(200).json({ message: 'Email verification successful!' });
    }
    catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.verifyUser = verifyUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        // Find the user by email
        const existingUser = await User_1.default.findOne({ "contact.email": email });
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
        const isMatch = await bcryptjs_1.default.compare(password, existingUser.profile.password);
        console.log('Password Match:', isMatch); // Log the result of the comparison
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: existingUser._id, email: existingUser.contact.email }, process.env.JWT_SECRET, // JWT secret
        { expiresIn: '1h' });
        await (0, welcomeEmail_1.sendLoginNotificationEmail)(existingUser.profile.firstName, email, '847474');
        // Return the token and user info
        return res.status(200).json({
            message: 'Login success',
            token,
            payload: {
                id: existingUser._id,
                fullName: existingUser.profile.fullName,
                firstName: existingUser.profile.firstName || '',
                lastName: existingUser.profile.lastName || '',
                email: existingUser.contact.email || '',
                phoneNumber: existingUser.contact.phoneNumber,
                isVerified: existingUser.profile.isVerified,
                userId: existingUser._id,
                state: existingUser.userLocation.state || '',
                lga: existingUser.userLocation.lga || '',
                homeAddress: existingUser.userLocation.homeAddress || '',
            },
        });
    }
    catch (err) {
        console.error('Login error:', err); // Log the error for debugging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.loginUser = loginUser;
