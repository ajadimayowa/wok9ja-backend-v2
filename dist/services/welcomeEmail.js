"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUserVerifiedEmail = exports.sendLoginNotificationEmail = exports.sendPasswordChangedEmail = exports.sendPasswordResetEmail = exports.sendProfileUpdateEmail = exports.sendWelcomeEmail = void 0;
// welcomeEmail.ts
const emailService_1 = require("./emailService");
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sendWelcomeEmail = async (fullName, userEmail, verificationCode) => {
    const templatePath = path_1.default.join(__dirname, 'emailTemps', 'registration.hbs');
    const templateSource = fs_1.default.readFileSync(templatePath, 'utf-8');
    // Compile the Handlebars templates
    const template = handlebars_1.default.compile(templateSource);
    const html = template({ fullName, verificationCode });
    const subject = 'Welcome on board!';
    try {
        await (0, emailService_1.sendMail)(userEmail, subject, html);
        console.log('Welcome email sent successfully!');
    }
    catch (error) {
        console.error('Error sending welcome email:', error);
    }
};
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendProfileUpdateEmail = async (fullName, userEmail, verificationCode) => {
    const templatePath = path_1.default.join(__dirname, 'emailTemps', 'verification.hbs');
    const templateSource = fs_1.default.readFileSync(templatePath, 'utf-8');
    // Compile the Handlebars templates
    const template = handlebars_1.default.compile(templateSource);
    const html = template({ fullName, verificationCode });
    const subject = 'Profile updated!';
    try {
        await (0, emailService_1.sendMail)(userEmail, subject, html);
        console.log('Welcome email sent successfully!');
    }
    catch (error) {
        console.error('Error sending welcome email:', error);
    }
};
exports.sendProfileUpdateEmail = sendProfileUpdateEmail;
const sendPasswordResetEmail = async (fullName, userEmail, verificationCode) => {
    const templatePath = path_1.default.join(__dirname, 'emailTemps', 'passwordResetRequest.hbs');
    const templateSource = fs_1.default.readFileSync(templatePath, 'utf-8');
    // Compile the Handlebars templates
    const template = handlebars_1.default.compile(templateSource);
    const html = template({ fullName, verificationCode });
    const subject = 'Request to change password!';
    try {
        await (0, emailService_1.sendMail)(userEmail, subject, html);
        // console.log('Welcome email sent successfully!');
    }
    catch (error) {
        console.error('Error sending welcome email:', error);
    }
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendPasswordChangedEmail = async (fullName, userEmail, verificationCode) => {
    const templatePath = path_1.default.join(__dirname, 'emailTemps', 'passwordResetSuccess.hbs');
    const templateSource = fs_1.default.readFileSync(templatePath, 'utf-8');
    // Compile the Handlebars templates
    const template = handlebars_1.default.compile(templateSource);
    const html = template({ fullName, verificationCode });
    const subject = 'Password Changed!';
    try {
        await (0, emailService_1.sendMail)(userEmail, subject, html);
        console.log('Welcome email sent successfully!');
    }
    catch (error) {
        console.error('Error sending welcome email:', error);
    }
};
exports.sendPasswordChangedEmail = sendPasswordChangedEmail;
const sendLoginNotificationEmail = async (fullName, userEmail, verificationCode) => {
    const templatePath = path_1.default.join(__dirname, 'emailTemps', 'login.hbs');
    const templateSource = fs_1.default.readFileSync(templatePath, 'utf-8');
    // Compile the Handlebars templates
    const template = handlebars_1.default.compile(templateSource);
    const html = template({ fullName, verificationCode });
    const subject = 'Login notification!';
    try {
        await (0, emailService_1.sendMail)(userEmail, subject, html);
        // console.log('Welcome email sent successfully!');
    }
    catch (error) {
        console.error('Error sending login email:', error);
    }
};
exports.sendLoginNotificationEmail = sendLoginNotificationEmail;
const sendUserVerifiedEmail = async (fullName, userEmail, verificationCode) => {
    const templatePath = path_1.default.join(__dirname, 'emailTemps', 'verification.hbs');
    const templateSource = fs_1.default.readFileSync(templatePath, 'utf-8');
    // Compile the Handlebars templates
    const template = handlebars_1.default.compile(templateSource);
    const html = template({ fullName, verificationCode });
    const subject = 'You have been verified!';
    try {
        await (0, emailService_1.sendMail)(userEmail, subject, html);
        // console.log('Welcome email sent successfully!');
    }
    catch (error) {
        console.error('Error sending login email:', error);
    }
};
exports.sendUserVerifiedEmail = sendUserVerifiedEmail;
// Example usage
