import express from 'express';
import { loginUser, registerUser, requestPasswordReset, resetPassword, verifyUser } from '../controllers/authController';

const router = express.Router();



router.post('/register', registerUser);
router.post('/verify-user', verifyUser);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);
router.post('/login', loginUser);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registers a new user
 *     tags: [User Authentication]
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
 *               password:
 *                 type: string
 *                 example: P@ssw0rd
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
 * /api/auth/verify-user:
 *   post:
 *     summary: Verifies a user with an OTP
 *     tags: [User Authentication]
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
 * /api/auth/request-password-reset:
 *   post:
 *     summary: Sends an OTP to reset the user's password
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully to reset password
 *       400:
 *         description: Email is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/reset-password:
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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Logs in a user
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: P@ssw0rd
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Email and password are required
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Internal server error
 */


export default router;
