import { z } from 'zod';

export const createCardSchema = z.object({
  title: z.string().min(1),
  listId: z.uuid(),
  boardId: z.uuid(),
});

export type CreateCardDTO = z.infer<typeof createCardSchema>;
