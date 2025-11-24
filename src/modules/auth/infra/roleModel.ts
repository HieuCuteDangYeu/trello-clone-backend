import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const RoleModel = mongoose.model('Role', RoleSchema);
