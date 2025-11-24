import { Board } from '../domain/board';
import { BoardModel } from '../infra/boardModel';
import { BoardMap } from '../mappers/boardMap';
import { BoardSearchResult, IBoardRepo } from './boardRepo';

export class MongoBoardRepo implements IBoardRepo {
  async save(board: Board): Promise<void> {
    const raw = BoardMap.toPersistence(board);
    await BoardModel.findByIdAndUpdate(board.id, raw, {
      upsert: true,
      new: true,
    });
  }

  async getBoardsByOwnerId(ownerId: string): Promise<Board[]> {
    // Find boards where user is Owner OR a Member
    const docs = await BoardModel.find({
      $or: [{ ownerId: ownerId }, { memberIds: ownerId }],
    }).sort({ updatedAt: -1 });

    return docs.map((d) => BoardMap.toDomain(d));
  }

  async getBoardById(boardId: string): Promise<Board | null> {
    const doc = await BoardModel.findById(boardId);
    if (!doc) return null;
    return BoardMap.toDomain(doc);
  }

  async delete(boardId: string): Promise<void> {
    await BoardModel.findByIdAndDelete(boardId);
  }

  async findAll(page: number, limit: number): Promise<BoardSearchResult> {
    const skip = (page - 1) * limit;

    const [docs, total] = await Promise.all([
      BoardModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      BoardModel.countDocuments(),
    ]);

    return {
      data: docs.map((d) => BoardMap.toDomain(d)),
      total,
    };
  }
}
