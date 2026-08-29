import mongoose, { Document, Schema } from 'mongoose';

export interface WorkoutDocument extends Document {
  name: string;
  description: string;
  category: 'cardio' | 'strength' | 'flexibility';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  exercises: string[];
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['cardio', 'strength', 'flexibility'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, required: true }],
  },
  { timestamps: true },
);

export default mongoose.model<WorkoutDocument>('Workout', workoutSchema);
