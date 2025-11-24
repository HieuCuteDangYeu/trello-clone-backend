import { z } from 'zod';

export const createListSchema = z.object({
  title: z.string().min(1),
  boardId: z.uuid(),
});

export type CreateListDTO = z.infer<typeof createListSchema>;
