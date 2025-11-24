import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    boardId: { type: String, required: true, ref: 'Board' },
    position: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

// Index for fetching lists by board, sorted by position
ListSchema.index({ boardId: 1, position: 1 });

export const ListModel = mongoose.model('List', ListSchema);
