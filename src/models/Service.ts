import mongoose, { Schema, Document } from 'mongoose';

interface IService extends Document {
    title:string,
    description :string,
    icon :string,
    createdBy:string,
    colorCode:string,
    providers :string[]
    category :string
    subCategories :string[]
    basic:boolean
    dateTime :Date
}
const serviceSchema = new Schema<IService>({
    title : {
        type:String,
        required:true
    },
    description : {
        type:String,
        required:true
    },
    icon : {
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

export const Service = mongoose.model<IService>('service', serviceSchema);