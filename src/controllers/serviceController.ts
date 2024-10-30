import { Request, Response } from 'express';
import { Service } from '../models/Service';


export const createService = async (req: Request, res: Response): Promise<any> => {
  try {
    // Destructure the service properties from the request body
    const {
      nameOfService,
      briefDescription,
      colorCode,
      colorCode2,
      serviceIcon,
      iconLibraryIsIonic,
      webIcon,
      createdBy,
      providers,
      category,
      subCategories,
      basic,
    } = req.body;

    // Create a new service object
    const newService = new Service({
      nameOfService,
      briefDescription,
      colorCode,
      colorCode2,
      serviceIcon,
      iconLibraryIsIonic,
      webIcon,
      createdBy,
      providers,
      category,
      subCategories,
      basic
    });

    // Save the new service to the database
    const savedService = await newService.save();

    // Return a success response
    return res.status(201).json({
      message: 'Service created successfully',
      service: savedService,
    });
  } catch (err) {
    console.error('Error creating service:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllServices = async (req: Request, res: Response): Promise<any> => {
    try {
      const { page = 1, limit = 10 } = req.query; // Default values if not provided
      const pageNumber = parseInt(page as string);
      const limitNumber = parseInt(limit as string);
  
      // Fetch services with pagination
      const services = await Service.find()
        .skip((pageNumber - 1) * limitNumber) // Skip items to handle pagination
        .limit(limitNumber); // Limit the number of results
  
      // Get total number of services for pagination meta data
      const totalServices = await Service.countDocuments();
  
      // Return paginated services and meta data
      return res.status(200).json({
        message: 'Services retrieved successfully',
        services,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalServices / limitNumber),
        totalServices,
      });
    } catch (err) {
      console.error('Error fetching services:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const getServiceById = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const service = await Service.findById(id);
  
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
  
      return res.status(200).json({
        message: 'Service retrieved successfully',
        service,
      });
    } catch (err) {
      console.error('Error fetching service:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const updateService = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      const updatedService = await Service.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updatedService) {
        return res.status(404).json({ error: 'Service not found' });
      }
  
      return res.status(200).json({
        message: 'Service updated successfully',
        service: updatedService,
      });
    } catch (err) {
      console.error('Error updating service:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Delete service
  export const deleteService = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
  
      const deletedService = await Service.findByIdAndDelete(id);
  
      if (!deletedService) {
        return res.status(404).json({ error: 'Service not found' });
      }
  
      return res.status(200).json({
        message: 'Service deleted successfully',
      });
    } catch (err) {
      console.error('Error deleting service:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };