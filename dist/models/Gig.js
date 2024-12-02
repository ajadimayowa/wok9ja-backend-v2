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
exports.GigSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const gigSchema = new mongoose_1.Schema({
    gigTitle: {
        type: String,
        required: true,
    },
    gigType: {
        type: String,
        required: true,
    },
    gigDescription: {
        type: String,
        required: true,
    },
    gigImages: {
        type: [String], // Array of image URLs
        required: true,
    },
    gigCategoryId: {
        type: String,
        required: true,
    },
    gigSubCategoryId: {
        type: String,
        required: true,
    },
    sellerInfo: {
        creatorFullName: {
            type: String,
            required: true,
        },
        creatorPhoneNumber: {
            type: String,
            required: true,
        },
        creatorOfficeAddress: {
            type: String,
            required: true,
        },
        creatorLocalGovermentArea: {
            type: String,
            required: true,
        },
        creatorState: {
            type: String,
            required: true,
        },
        creatorId: {
            type: String,
            required: true, // Reference to the User (Seller)
        },
    },
    sellerPrice: {
        type: String,
        required: true,
    },
    basePrice: {
        type: String,
        required: true,
    },
    promotionType: {
        type: String,
        required: false, // Optional field for promotion types
    },
    dateTime: {
        type: Date,
        default: Date.now,
    },
});
exports.GigSchema = mongoose_1.default.model('gigs', gigSchema);
