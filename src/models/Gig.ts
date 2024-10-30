import mongoose,{Schema,Document} from "mongoose";

//interface for builder
export interface IGig {
    gigTitle: string,
    gigDescription: string,
    gigImages: string[],  // Array of image URLs
    gigCategoryId: string,
    gigSubCategoryId: string,
    sellerInfo: {
      fullNameOfSeller: string,
      sellerCurrentLevel:number,
      creatorPhoneNumber: string,
      creatorOfficeAddress: string,
      creatorLocalGovermentArea: string,
      creatorId: string,
      sellerTotalBuyers:string,
      sellerBasePrice:string,
    },
    isFavourite:boolean,
    sellerPrice: string,
    basePrice: string,
    promotionType?: string, // Optional field for promotions
    dateTime?: Date,        // Optional, defaults to current date
  }

const gigSchema = new Schema({
    gigTitle: {
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

export const GigSchema = mongoose.model<IGig>('gigs', gigSchema)