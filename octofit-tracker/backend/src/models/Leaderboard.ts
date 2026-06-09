import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: string;
  username: string;
  totalPoints: number;
  rank: number;
  updatedAt: Date;
}

const LeaderboardSchema = new Schema<ILeaderboard>({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  totalPoints: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
