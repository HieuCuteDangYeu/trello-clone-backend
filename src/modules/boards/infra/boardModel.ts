import mongoose from 'mongoose';

const BoardSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    ownerId: { type: String, required: true, ref: 'User' },
    isPrivate: { type: Boolean, default: true },
    memberIds: [{ type: String, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

// Index for faster lookups
BoardSchema.index({ ownerId: 1 });

export const BoardModel = mongoose.model('Board', BoardSchema);
