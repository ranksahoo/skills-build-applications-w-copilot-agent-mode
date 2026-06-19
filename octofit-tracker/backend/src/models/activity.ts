import mongoose, { Model, Schema, Types } from 'mongoose';

export interface IActivity {
  userId: Types.ObjectId;
  type: 'run' | 'cycle' | 'swim' | 'strength' | 'yoga';
  distanceKm?: number;
  durationMinutes: number;
  caloriesBurned: number;
  performedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'cycle', 'swim', 'strength', 'yoga'],
      required: true
    },
    distanceKm: { type: Number },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    performedAt: { type: Date, required: true }
  },
  { timestamps: true }
);

export const Activity: Model<IActivity> =
  (mongoose.models.Activity as Model<IActivity>) ||
  mongoose.model<IActivity>('Activity', activitySchema);
