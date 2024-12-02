"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    profile: {
        fullName: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String },
        password: { type: String, required: true },
        verificationCode: { type: String, default: null, },
        isBanned: { type: Boolean },
        isDisabled: { type: Boolean },
        numOfWarning: { type: Number },
        profilePicUrl: { type: String },
        isVerified: { type: Boolean },
    },
    contact: {
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: Number, required: true, unique: true },
    },
    kyc: {
        isVerified: { type: Boolean },
        idType: { type: String },
        idNumber: { type: String },
        idDocumentFile: { type: String },
    },
    userLocation: {
        state: { type: String },
        stateId: { type: String },
        lga: { type: String },
        lgaId: { type: String },
        homeAddress: { type: String },
        officeAddress: { type: String },
        currentLocation: { type: String },
    },
    nok: {
        nextOfKinAddress: { type: String },
        nextOfKinPhoneNumber: { type: String },
        nextOfKinEmail: { type: String },
    },
    selling: {
        isSeller: { type: Boolean },
        gigs: { type: [String] },
        orders: { type: [String] },
    },
    buying: {
        orders: { type: [String] },
    },
    billing: {
        currentBalance: { type: String },
        totalSpent: { type: String },
        totalEarning: { type: String, default: '' },
        spendingHistory: { type: [String] },
        earningHistory: { type: [String] }
    }
});
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password as string, salt);
//   next();
// });
// UserSchema.methods.comparePassword = async function (candidatePassword: string) {
//   return bcrypt.compare(candidatePassword, this.password);
// };
exports.default = mongoose_1.default.model('signedUpUsers', UserSchema);
