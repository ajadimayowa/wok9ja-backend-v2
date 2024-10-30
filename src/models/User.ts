import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  profile: {
    fullName: string,
    firstName: string,
    lastName?: string,
    password: string;
    verificationCode?: string | null;
    isBanned?: boolean,
    isDisabled?: boolean,
    numOfWarning?: number,
    profilePicUrl?: string
    isVerified:boolean
  };
  contact : {
    email: string,
    phoneNumber: string,
  },
  kyc: {
    isVerified: boolean;
    idType: string;
    idNumber: string;
    idDocumentFile: string
  };
  userLocation: {
    state: string;
    lga: string;
    homeAddress?: string,
    officeAddress?: string,
    currentLocation? :string
  };
  nok: {
    nextOfKinAddress?: string,
    nextOfKinPhoneNumber?: string,
    nextOfKinEmail?: string,
  };
  selling : {
    isSeller : boolean,
    gigs?: string[],
    orders?: string[]
  };
  buying : {
    orders?: string[]
  };
  billing:{
    currentBalance:string,
    totalSpent:string,
    totalEarning:string,
    spendingHistory:string[],
    earningHistory:string[]
  }

  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  profile: {
    fullName: {type:String, required:true, unique:true},
    firstName: {type:String, required:true},
    lastName : {type:String},
    password: {type:String, required:true},
    verificationCode: { type: String, default: null, },
    isBanned :{ type: Boolean},
    isDisabled: { type: Boolean},
    numOfWarning: { type: Number },
    profilePicUrl: { type: String},
    isVerified :{ type: Boolean},
  },
  contact : {
    email: { type: String, required:true, unique:true },
    phoneNumber: { type: Number, required:true, unique:true },
  },
  kyc: {
    isVerified: { type: Boolean },
    idType: { type: String },
    idNumber: { type: String },
    idDocumentFile: { type: String },
  },
  userLocation: {
    state: { type: String },
    lga: { type: String },
    homeAddress: { type: String },
    officeAddress: { type: String },
    currentLocation :{ type: String },
  },
  nok: {
    nextOfKinAddress: { type: String },
    nextOfKinPhoneNumber: { type: String },
    nextOfKinEmail: { type: String },
  },
  selling : {
    isSeller : { type: Boolean },
    gigs: { type: [String] },
    orders: { type: [String] },
  },
  buying : {
    orders: { type: [String] },
  },
  billing:{
    currentBalance:{type: String},
    totalSpent:{type: String},
    totalEarning:{type: String, default:''},
    spendingHistory:{type: [String]},
    earningHistory:{type: [String]}
  }

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
