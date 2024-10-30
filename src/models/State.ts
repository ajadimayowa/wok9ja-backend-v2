// models/State.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IState extends Document {
    name: string;
    localGovernments: string[]; // Array of local government names or IDs
}

const StateSchema: Schema = new Schema({
    name: { type: String, required: true },
    localGovernments: [{ type: String }], // Array of local government names or IDs
});

export const State = mongoose.model<IState>('State', StateSchema);
