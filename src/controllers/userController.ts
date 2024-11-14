import { Request, Response } from 'express';
import User from '../models/User'; // Assuming you have a User model
import bcrypt from 'bcryptjs'; // For password hashing comparison
import jwt from 'jsonwebtoken'
import { sendMail } from '../services/emailService';
import { generateVerificationCode } from '../utils/generateVerificationCode';
import { sendProfileUpdateEmail } from '../services/welcomeEmail';

export const getUserById = async (req: Request, res: Response): Promise<any> => {

  try {
    const { userId } = req.query
    console.log({ appSent: userId })
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not founding' })
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
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }

}
export const updateUserProfile = async (req: Request, res: Response): Promise<any> => {
  const profilePic = (req.file as any)?.location
  try {
    const { userId } = req.query; // Assume userId is passed as a route param
    console.log({ sent: userId })
    console.log({ updating: req.body,profilePicUrl:profilePic })
    const {
      fullName,
      phoneNumber,
      homeAddress,
      state,
      stateId,
      lgaId,
      lga
    } = req.body;
   

    // Validate input
    if (!fullName && !phoneNumber) {
      return res.status(400).json({ error: 'At least one field (fullName, phoneNumber, or email) is required for update' });
    }

    // if (!profilePic) {
    //   return res.status(400).json({success:false, error: 'Profile picture is required' });
    // }

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({success:false, error: 'User not founding' });
    }

    // Check if the new email, phone number, or full name already exists for another user
    if (phoneNumber || fullName) {
      const existingUser = await User.findOne({
        _id: { $ne: userId }, // Exclude the current user
        $or: [{ phoneNumber }, { fullName }],
      });

      if (existingUser) {
        return res.status(409).json({success:false, error: 'Another user with this email, phone number, or full name already exists' });
      }
    }

    // Update the user's information
    if (fullName) user.profile.fullName = fullName;
    if (phoneNumber) user.contact.phoneNumber = phoneNumber;
    if (homeAddress) user.userLocation.homeAddress = homeAddress;
    if (lga) user.userLocation.lga = lga;
    if (state) user.userLocation.state = state;
    if (lgaId) user.userLocation.lgaId = lgaId;
    if (stateId) user.userLocation.stateId = stateId;
    if(profilePic) user.profile.profilePicUrl = profilePic;
    // if (email) user.email = email;
    await user.save();
    return res.status(200).json({success:true, message: 'Profile updated successfully',payload:{
      fullName,
      phoneNumber,
      homeAddress,
      state,
      stateId,
      lgaId,
      profilePicUrl:profilePic
    } });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const doUserKyc = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.query; // Assume userId is passed as a route param
    const idDocumentFile = (req.file as any)?.location
    // console.log({
    //   userSend: JSON.stringify(req.body),
    //   userId: userId
    // })
    const {
      idType,
      idNumber,
    } = req.body;

    // Validate input
    // if (!homeAddress && !phoneNumber && !email) {
    //   return res.status(400).json({ error: 'At least one field (fullName, phoneNumber, or email) is required for update' });
    // }

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({success:false, error: 'User not found'});
    }

    if (user.kyc.isVerified) {
      return res.status(400).json({success:false, message: 'User is already verified!' })
    }
    // Update the user's information
    if (idType) user.kyc.idType = idType;
    if (idNumber) user.kyc.idNumber = idNumber;
    if (idDocumentFile) user.kyc.idDocumentFile = idDocumentFile;
    user.kyc.isVerified = true;
    await user.save();

    return res.status(200).json({success:true, message: 'KYC completed!'});
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ error: `Internal Server Error : ${err}` });
  }
};

