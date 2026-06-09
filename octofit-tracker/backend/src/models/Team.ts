import mongoose, { Document, Schema } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: string[];
  createdAt: Date;
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  members: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export const Team = mongoose.model<ITeam>('Team', TeamSchema);
