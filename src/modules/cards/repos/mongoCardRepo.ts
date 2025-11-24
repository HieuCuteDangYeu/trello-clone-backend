import { Card } from '../domain/card';
import { CardModel } from '../infra/cardModel';
import { CardMap } from '../mappers/cardMap';
import { ICardRepo } from './cardRepo';

export class MongoCardRepo implements ICardRepo {
  async save(card: Card): Promise<void> {
    const raw = CardMap.toPersistence(card);
    await CardModel.findByIdAndUpdate(card.id, raw, {
      upsert: true,
      new: true,
    });
  }

  async getCardsByListId(listId: string): Promise<Card[]> {
    const docs = await CardModel.find({ listId }).sort({ position: 1 });
    return docs.map((d) => CardMap.toDomain(d));
  }

  async getMaxPosition(listId: string): Promise<number> {
    const result = await CardModel.findOne({ listId })
      .sort({ position: -1 })
      .limit(1);
    return result ? result.position : 0;
  }

  async getCardById(cardId: string): Promise<Card | null> {
    const doc = await CardModel.findById(cardId);
    if (!doc) return null;
    return CardMap.toDomain(doc);
  }

  async delete(cardId: string): Promise<void> {
    await CardModel.findByIdAndDelete(cardId);
  }
}
