"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doUserKyc = exports.updateUserProfile = exports.getUserById = void 0;
const User_1 = __importDefault(require("../models/User")); // Assuming you have a User model
const getUserById = async (req, res) => {
    try {
        const { userId } = req.query;
        console.log({ appSent: userId });
        let user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not founding' });
        }
        return res.status(200).json({
            message: 'User found',
            payload: {
                profile: {
                    id: user._id,
                    fullName: user.profile.fullName,
                    firstName: user.profile.firstName,
                    isVerified: user.profile.isVerified,
                    profilePicUrl: user.profile.profilePicUrl
                },
                contact: {
                    email: user.contact.email,
                    phoneNumber: user.contact.phoneNumber,
                },
                kyc: {
                    isVerified: user.kyc.isVerified,
                    idType: user.kyc.idType,
                    idNumber: user.kyc.idNumber,
                    idDocumentFile: user.kyc.idDocumentFile,
                },
                userLocation: {
                    state: user.userLocation.state,
                    stateId: user?.userLocation?.stateId,
                    lga: user.userLocation.lga,
                    homeAddress: user.userLocation.homeAddress,
                    officeAddress: user.userLocation.officeAddress,
                    currentLocation: user.userLocation.currentLocation
                },
                nok: {
                    nextOfKinAddress: user.nok.nextOfKinAddress,
                    nextOfKinPhoneNumber: user.nok.nextOfKinPhoneNumber,
                    nextOfKinEmail: user.nok.nextOfKinEmail,
                },
                selling: {
                    isSeller: user.selling.isSeller,
                    gigs: user.selling.gigs,
                    orders: user.selling.orders
                },
                buying: {
                    orders: user.buying.orders
                },
                billing: {
                    currentBalance: user.billing.currentBalance,
                    totalSpent: user.billing.totalSpent,
                    totalEarning: user.billing.totalEarning,
                    spendingHistory: user.billing.spendingHistory,
                    earningHistory: user.billing.earningHistory
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getUserById = getUserById;
const updateUserProfile = async (req, res) => {
    const profilePic = req.file?.location;
    try {
        const { userId } = req.query; // Assume userId is passed as a route param
        console.log({ sent: userId });
        console.log({ updating: req.body, profilePicUrl: profilePic });
        const { fullName, phoneNumber, homeAddress, state, stateId, lgaId, lga } = req.body;
        // Validate input
        if (!fullName && !phoneNumber) {
            return res.status(400).json({ error: 'At least one field (fullName, phoneNumber, or email) is required for update' });
        }
        // if (!profilePic) {
        //   return res.status(400).json({success:false, error: 'Profile picture is required' });
        // }
        // Find the user by their ID
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not founding' });
        }
        // Check if the new email, phone number, or full name already exists for another user
        if (phoneNumber || fullName) {
            const existingUser = await User_1.default.findOne({
                _id: { $ne: userId }, // Exclude the current user
                $or: [{ phoneNumber }, { fullName }],
            });
            if (existingUser) {
                return res.status(409).json({ success: false, error: 'Another user with this email, phone number, or full name already exists' });
            }
        }
        // Update the user's information
        if (fullName)
            user.profile.fullName = fullName;
        if (phoneNumber)
            user.contact.phoneNumber = phoneNumber;
        if (homeAddress)
            user.userLocation.homeAddress = homeAddress;
        if (lga)
            user.userLocation.lga = lga;
        if (state)
            user.userLocation.state = state;
        if (lgaId)
            user.userLocation.lgaId = lgaId;
        if (stateId)
            user.userLocation.stateId = stateId;
        if (profilePic)
            user.profile.profilePicUrl = profilePic;
        // if (email) user.email = email;
        await user.save();
        return res.status(200).json({ success: true, message: 'Profile updated successfully', payload: {
                fullName,
                phoneNumber,
                homeAddress,
                state,
                stateId,
                lgaId,
                profilePicUrl: profilePic
            } });
    }
    catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.updateUserProfile = updateUserProfile;
const doUserKyc = async (req, res) => {
    try {
        const { userId } = req.query; // Assume userId is passed as a route param
        const idDocumentFile = req.file?.location;
        // console.log({
        //   userSend: JSON.stringify(req.body),
        //   userId: userId
        // })
        const { idType, idNumber, } = req.body;
        // Validate input
        // if (!homeAddress && !phoneNumber && !email) {
        //   return res.status(400).json({ error: 'At least one field (fullName, phoneNumber, or email) is required for update' });
        // }
        // Find the user by their ID
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        if (user.kyc.isVerified) {
            return res.status(400).json({ success: false, message: 'User is already verified!' });
        }
        // Update the user's information
        if (idType)
            user.kyc.idType = idType;
        if (idNumber)
            user.kyc.idNumber = idNumber;
        if (idDocumentFile)
            user.kyc.idDocumentFile = idDocumentFile;
        user.kyc.isVerified = true;
        await user.save();
        return res.status(200).json({ success: true, message: 'KYC completed!' });
    }
    catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: `Internal Server Error : ${err}` });
    }
};
exports.doUserKyc = doUserKyc;
