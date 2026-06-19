import mongoose, { Model, Schema, Types } from 'mongoose';

export interface ITeam {
  name: string;
  city: string;
  memberIds: Types.ObjectId[];
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
  },
  { timestamps: true }
);

export const Team: Model<ITeam> =
  (mongoose.models.Team as Model<ITeam>) || mongoose.model<ITeam>('Team', teamSchema);
