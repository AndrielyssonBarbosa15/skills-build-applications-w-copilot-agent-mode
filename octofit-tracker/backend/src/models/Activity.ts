import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  activityType: string;
  duration: number;
  distance: number;
  caloriesBurned: number;
  date: Date;
}

const ActivitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  activityType: { type: String, required: true },
  duration: { type: Number, required: true },
  distance: { type: Number, default: 0 },
  caloriesBurned: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);
