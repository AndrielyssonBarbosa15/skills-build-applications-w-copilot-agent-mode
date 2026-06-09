import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  difficulty: string;
  duration: number;
  exercises: string[];
  createdAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  difficulty: { type: String, default: 'medium' },
  duration: { type: Number, required: true },
  exercises: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
