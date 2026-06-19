import mongoose, { Model, Schema, Types } from 'mongoose';

export interface ILeaderboard {
  userId: Types.ObjectId;
  points: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 }
  },
  { timestamps: true }
);

export const Leaderboard: Model<ILeaderboard> =
  (mongoose.models.Leaderboard as Model<ILeaderboard>) ||
  mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
