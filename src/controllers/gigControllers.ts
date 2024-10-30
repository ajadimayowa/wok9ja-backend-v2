import { Request, Response } from 'express';
import { GigSchema } from '../models/Gig';  // Assuming Gig model is already defined
import mongoose from 'mongoose';

// Create a new gig
export const createGig = async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      gigTitle,
      gigDescription,
      gigImages,
      gigCategoryId,
      gigSubCategoryId,
      creatorFullName,
      creatorPhoneNumber,
      creatorOfficeAddress,
      creatorLocalGovermentArea,
      creatorId,
      sellerPrice,
      basePrice,
      promotionType,
    } = req.body;

    // Create a new gig object with sellerInfo
    const newGig = new GigSchema({
      gigTitle,
      gigDescription,
      gigImages,
      gigCategoryId,
      gigSubCategoryId,
      sellerInfo: {
        creatorFullName,
        creatorPhoneNumber,
        creatorOfficeAddress,
        creatorLocalGovermentArea,
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
  } catch (err) {
    console.error('Error creating gig:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

  // Get a gig by ID
export const getGigById = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Gig ID' });
      }
  
      const gig = await GigSchema.findById(id);
  
      if (!gig) {
        return res.status(404).json({ error: 'Gig not found' });
      }
  
      return res.status(200).json({ message: 'Gig retrieved successfully', gig });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Update a gig by ID
export const updateGig = async (req: Request, res: Response):Promise<any> => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Gig ID' });
      }
  
      const updatedGig = await GigSchema.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updatedGig) {
        return res.status(404).json({ error: 'Gig not found' });
      }
  
      return res.status(200).json({ message: 'Gig updated successfully', gig: updatedGig });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Delete a gig by ID
export const deleteGig = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Gig ID' });
      }
  
      const deletedGig = await GigSchema.findByIdAndDelete(id);
  
      if (!deletedGig) {
        return res.status(404).json({ error: 'Gig not found' });
      }
  
      return res.status(200).json({ message: 'Gig deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  export const getGigs = async (req: Request, res: Response): Promise<any> => {
    try {
      const { creatorId, creatorLocalGovernmentArea, gigId, gigPrice, page = 1, limit = 10 } = req.query;
  
      // Build the query object based on the provided query parameters
      const query: any = {};
  
      if (creatorId) {
        query.creatorId = creatorId;
      }
      if (creatorLocalGovernmentArea) {
        query.creatorLocalGovernmentArea = creatorLocalGovernmentArea;
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
      const gigs = await GigSchema.find(query)
        .skip(skip)
        .limit(limitNumber);
  
      // Count the total number of gigs for pagination
      const totalGigs = await GigSchema.countDocuments(query);
  
      return res.status(200).json({
        total: totalGigs,
        page: pageNumber,
        totalPages: Math.ceil(totalGigs / limitNumber),
        gigs,
      });
    } catch (err) {
      console.error(err); // Log the error for debugging
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  