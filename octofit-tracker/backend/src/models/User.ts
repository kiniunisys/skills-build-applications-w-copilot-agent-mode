import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'teacher';
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    role: { type: String, enum: ['student', 'teacher'], default: 'student' },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export default mongoose.model<UserDocument>('User', userSchema);
