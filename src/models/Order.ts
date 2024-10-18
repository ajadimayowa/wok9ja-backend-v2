import mongoose, { Schema } from "mongoose";


interface IOrder {
    orderTitle:string,
    orderDescription:string,
    sellerId:string,
    buyerId:string,
    associatedGigId:string,
    createdAt:string,
    price:string,
    status:string
}

const orderSchema = new Schema<IOrder>({
    orderTitle:{type:String,required:true},
    orderDescription:{type:String,required:true},
    sellerId:{type:String,required:true},
    buyerId:{type:String,required:true},
    associatedGigId:{type:String,required:true},
    price:{type:String,required:true},
    status:{type:String,required:true},
    createdAt: Date.now
})

export const OrderSchema = mongoose.model('orders', orderSchema)