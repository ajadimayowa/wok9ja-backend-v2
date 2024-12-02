"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGigs = exports.deleteGig = exports.updateGig = exports.getGigById = exports.createGig = void 0;
const Gig_1 = require("../models/Gig"); // Assuming Gig model is already defined
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
// Create a new gig
const createGig = async (req, res) => {
    const gigImages = req.files;
    const { creatorId } = req.query;
    // console.log({ hereisId: creatorId })
    const creator = await User_1.default.findById(creatorId);
    // gigImages.forEach((file:any) => {
    //   console.log(file); // Log each file for debugging
    // });
    try {
        const { gigTitle, gigDescription, gigType, gigCategoryId, gigSubCategoryId, creatorFullName, creatorPhoneNumber, creatorOfficeAddress, creatorState, creatorLocalGovermentArea, sellerPrice, basePrice, promotionType, } = req.body;
        const creatorIdExist = await User_1.default.findById(creatorId);
        if (!creatorIdExist) {
            return res.status(404).json({ success: false, error: 'Invalid creator' });
        }
        if (!creatorIdExist.kyc.isVerified) {
            return res.status(400).json({ success: false, error: 'Not yet verified!' });
        }
        if (creator && creator?.selling?.gigs?.length == 5) {
            return res.status(400).json({ success: false, error: 'Max gig lenght reached' });
        }
        // Create a new gig object with sellerInfo
        const newGig = new Gig_1.GigSchema({
            gigTitle,
            gigDescription,
            gigType,
            gigImages: gigImages.map((gig) => gig?.location),
            gigCategoryId,
            gigSubCategoryId,
            sellerInfo: {
                creatorFullName,
                creatorPhoneNumber,
                creatorOfficeAddress,
                creatorLocalGovermentArea,
                creatorState,
                creatorId,
            },
            sellerPrice,
            basePrice,
            promotionType,
        });
        // Save the new gig to the database
        const savedGig = await newGig.save();
        // Return a success response
        return res.status(201).json({
            message: 'Gig created successfully',
            gig: savedGig,
        });
    }
    catch (err) {
        console.error('Error creating gig:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.createGig = createGig;
// Get a gig by ID
const getGigById = async (req, res) => {
    try {
        const { gigId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(gigId)) {
            return res.status(400).json({ error: 'Invalid Gig ID' });
        }
        const gig = await Gig_1.GigSchema.findById(gigId);
        if (!gig) {
            return res.status(404).json({ error: 'Gig not found' });
        }
        return res.status(200).json({ message: 'Gig retrieved successfully', gig });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getGigById = getGigById;
// Update a gig by ID
const updateGig = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Gig ID' });
        }
        const updatedGig = await Gig_1.GigSchema.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedGig) {
            return res.status(404).json({ error: 'Gig not found' });
        }
        return res.status(200).json({ message: 'Gig updated successfully', gig: updatedGig });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.updateGig = updateGig;
// Delete a gig by ID
const deleteGig = async (req, res) => {
    try {
        const { gigId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(gigId)) {
            return res.status(400).json({ error: 'Invalid Gig ID' });
        }
        const deletedGig = await Gig_1.GigSchema.findByIdAndDelete(gigId);
        if (!deletedGig) {
            return res.status(404).json({ error: 'Gig not found' });
        }
        return res.status(200).json({ message: 'Gig deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.deleteGig = deleteGig;
const getGigs = async (req, res) => {
    try {
        const { creatorId, creatorLocalGovernmentArea, creatorState, gigId, gigPrice, page = 1, limit = 10 } = req.query;
        console.log({ CreatOrId: creatorId });
        // Build the query object based on the provided query parameters
        const query = {};
        if (creatorId) {
            query['sellerInfo.creatorId'] = creatorId;
        }
        if (creatorLocalGovernmentArea) {
            query.creatorLocalGovernmentArea = creatorLocalGovernmentArea;
        }
        if (creatorState) {
            query['sellerInfo.creatorState'] = creatorState;
            // query.creatorLocalGovernmentArea = creatorLocalGovernmentArea;
        }
        if (gigId) {
            query._id = gigId; // Assuming gigId is the _id in the database
        }
        if (gigPrice) {
            query.gigPrice = gigPrice; // Assuming gigPrice is a field in the Gig model
        }
        // Convert pagination parameters to numbers
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;
        // Find gigs based on the query object and apply pagination
        const gigs = await Gig_1.GigSchema.find(query)
            .skip(skip)
            .limit(limitNumber);
        // Count the total number of gigs for pagination
        const totalGigs = await Gig_1.GigSchema.countDocuments(query);
        return res.status(200).json({
            total: totalGigs,
            page: pageNumber,
            totalPages: Math.ceil(totalGigs / limitNumber),
            gigs,
        });
    }
    catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getGigs = getGigs;
