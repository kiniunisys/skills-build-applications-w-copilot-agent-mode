import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ActivityDocument extends Document {
  user: Types.ObjectId;
  type: 'running' | 'walking' | 'strength training' | 'cycling';
  durationMinutes: number;
  distanceMiles?: number;
  caloriesBurned: number;
  points: number;
  completedAt: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'walking', 'strength training', 'cycling'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceMiles: { type: Number, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<ActivityDocument>('Activity', activitySchema);
