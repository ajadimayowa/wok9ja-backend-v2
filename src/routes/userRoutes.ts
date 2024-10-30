import express from 'express';
import { loginUser, registerUser, requestPasswordReset, resetPassword, verifyUser } from '../controllers/authController';
import { doUserKyc, getUserById, updateUserProfile } from '../controllers/userController';

const router = express.Router();


router.get('/get-user', getUserById);
router.patch('/update-profile', updateUserProfile);
router.post('/kyc', doUserKyc);

/**
 * @swagger
 * /api/user/update-profile:
 *   post:
 *     summary: Update user profile
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - phoneNumber
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               phoneNumber:
 *                 type: string
 *                 example: +1234567890
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email and password are required
 *       409:
 *         description: User with this email, phone number, or full name already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/kyc:
 *   post:
 *     summary: Do user kyc
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - verificationCode
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               verificationCode:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User verified successfully
 *       400:
 *         description: Invalid verification code or user already verified
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/reset-password:
 *   post:
 *     summary: Resets the user's password
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *               - verificationCode
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               newPassword:
 *                 type: string
 *                 example: NewP@ssw0rd
 *               verificationCode:
 *                 type: string
 *                 example: 654321
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid verification code or missing fields
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */


export default router;
