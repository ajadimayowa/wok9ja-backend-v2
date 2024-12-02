"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const upload_1 = __importDefault(require("../middlewares/upload"));
const router = express_1.default.Router();
router.get('/get-user', userController_1.getUserById);
router.patch('/update-profile', upload_1.default.single('profilePic'), userController_1.updateUserProfile);
router.post('/kyc', upload_1.default.single('idDocumentFile'), userController_1.doUserKyc);
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
exports.default = router;
