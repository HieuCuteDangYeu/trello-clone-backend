import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    listId: { type: String, required: true, ref: 'List' },
    boardId: { type: String, required: true, ref: 'Board' },
    position: { type: Number, required: true },
    memberIds: [{ type: String, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

// Index 1: Fetch all cards in a list (Standard view)
CardSchema.index({ listId: 1, position: 1 });

// Index 2: Fetch all cards in a board (Search/Analytics)
CardSchema.index({ boardId: 1 });

export const CardModel = mongoose.model('Card', CardSchema);
