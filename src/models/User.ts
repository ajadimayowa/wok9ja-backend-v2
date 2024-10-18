import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullName:string,
  email: string;
  phoneNumber:string,
  password: string;
  isVerified: boolean;
  verificationCode?: string; 


  homeAddress?: string,
  officeAddress?: string,
  nextOfKinAddress?: string,
  nextOfKinPhoneNumber?:string,
  nextOfKinEmail?: string,
  isSeller?: boolean,
  isBanned?: boolean,
  isDisabled?: boolean,
  numOfWarning?: number,
  isKyc?:boolean,
  profilePicUrl?:string
  gigs?:string[]
  orders?:string[]

  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema: Schema  = new Schema({
  fullName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean,required: true},
  verificationCode:{type:String},
  homeAddress: { type: String,},
  officeAddress: { type: String,},
  nextOfKinAddress: { type: String,},
  nextOfKinPhoneNumber: { type: String,},
  nextOfKinEmail: { type: String},
  isSeller: { type: Boolean},
  isBanned: { type: Boolean},
  isDisabled: { type: Boolean},
  numOfWarning: { type: Number},
  isKyc: { type: Boolean},
  profilePicUrl:{type:String},
  gigs:{type :[String]},
  orders:{type :[String]}
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

export default mongoose.model<IUser>('signedUpUsers', UserSchema);
