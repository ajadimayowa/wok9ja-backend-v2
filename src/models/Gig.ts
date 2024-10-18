import mongoose,{Schema,Document} from "mongoose";

interface IGig {
    gigTitle:string,
    gigDescription:string
    gigImages:string[]
    gigCategoryId: string,
    gigSubCategoryId: string,
    creatorFullName: string,
    creatorPhoneNumber: string,
    creatorOfficeAddress: string,
    sellerPrice: string,
    basePrice: string,
    creatorId: string,
    creatorLocalGovermentArea:string,
    promotionType:string
}
const gigSchema = new Schema<IGig>({
    gigTitle: { type: String, required: true },
    gigDescription: {
        type: String,
        required: true
    },
    promotionType:{type:String,required:true},
    creatorId:{type:String,required:true},
    gigImages: {
        type: [String],
    },
    creatorLocalGovermentArea:{required:true, type:String},
    gigCategoryId: { type: String, required: true },
    creatorFullName: { type: String, required: true },
    creatorPhoneNumber: { type: String, required: true },
    creatorOfficeAddress: { type: String, required: true },
    sellerPrice: { type: String, required: true },
    basePrice: { type: String, required: true },
    

});

export const GigSchema = mongoose.model<IGig>('gigs', gigSchema)