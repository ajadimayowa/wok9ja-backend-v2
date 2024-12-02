"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
// mailer.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = async (userEmail, subject, html) => {
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.BREVO_SMTP_HOST, // Brevo SMTP host
        port: parseInt(process.env.BREVO_HOST_PORT || '587'), // Use 587 for TLS
        auth: {
            user: process.env.BREVO_USERNAME, // Your Brevo SMTP username (API key)
            pass: process.env.BREVO_PASSWORD // Your Brevo API key (same as username)
        },
        secure: true, // Use TLS
    });
    const mailerOptions = {
        from: '"Wok9ja" <hello@floatsolutionhub.com>', // sender address
        to: userEmail, // Recipient's email address
        subject: subject,
        html: html,
    };
    return transporter.sendMail(mailerOptions);
};
exports.sendMail = sendMail;
