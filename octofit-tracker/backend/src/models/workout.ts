import mongoose, { Model, Schema, Types } from 'mongoose';

export interface IWorkout {
  userId: Types.ObjectId;
  title: string;
  category: 'cardio' | 'strength' | 'mobility';
  targetMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    category: { type: String, enum: ['cardio', 'strength', 'mobility'], required: true },
    targetMinutes: { type: Number, required: true, min: 1 },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true
    }
  },
  { timestamps: true }
);

export const Workout: Model<IWorkout> =
  (mongoose.models.Workout as Model<IWorkout>) || mongoose.model<IWorkout>('Workout', workoutSchema);
