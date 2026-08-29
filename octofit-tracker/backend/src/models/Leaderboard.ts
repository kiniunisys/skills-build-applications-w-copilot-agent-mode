import mongoose, { Document, Schema, Types } from 'mongoose';

export interface LeaderboardDocument extends Document {
  user: Types.ObjectId;
  points: number;
  rank: number;
  period: string;
}

const leaderboardSchema = new Schema<LeaderboardDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
