import mongoose, { Schema, Document } from 'mongoose';

interface IService extends Document {
    id:string,
    nameOfService: string,
    briefDescription: string,
    colorCode: string,
    colorCode2: string,
    serviceIcon: string,
    iconLibraryIsIonic: boolean,
    webIcon :string,
    createdBy:string,
    providers :string[]
    category :string
    subCategories :string[]
    basic:boolean
    dateTime :Date
}
const serviceSchema = new Schema<IService>({
    nameOfService : {
        type:String,
        required:true
    },
    briefDescription : {
        type:String,
        required:true
    },
    webIcon : {
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        required:true
    },
    colorCode:{
        type:String,
        required:true,
    },
    providers : {
        type : [String],
        required:true
    },
    category :{
        type:String,
        required : true
    },
    subCategories : {
        type : [String],
        required:true
    },
    basic: {
        type: Boolean,
        required:true
    },
    dateTime : {
        type:Date,
        default:Date.now()
    }
});

export const Service = mongoose.model<IService>('services', serviceSchema);