import { List } from '../domain/list';
import { ListModel } from '../infra/listModel';
import { ListMap } from '../mappers/listMap';
import { IListRepo } from './listRepo';

export class MongoListRepo implements IListRepo {
  async save(list: List): Promise<void> {
    const raw = ListMap.toPersistence(list);
    await ListModel.findByIdAndUpdate(list.id, raw, {
      upsert: true,
      new: true,
    });
  }

  async getListsByBoardId(boardId: string): Promise<List[]> {
    const docs = await ListModel.find({ boardId }).sort({ position: 1 });
    return docs.map((d) => ListMap.toDomain(d));
  }

  async getMaxPosition(boardId: string): Promise<number> {
    // Find the list with the highest position
    const result = await ListModel.findOne({ boardId })
      .sort({ position: -1 })
      .limit(1);
    return result ? result.position : 0;
  }

  async getListById(listId: string): Promise<List | null> {
    const doc = await ListModel.findById(listId);
    if (!doc) return null;
    return ListMap.toDomain(doc);
  }

  async delete(listId: string): Promise<void> {
    await ListModel.findByIdAndDelete(listId);
  }
}
