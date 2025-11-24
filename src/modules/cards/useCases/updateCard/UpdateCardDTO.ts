import { z } from 'zod';

export const updateCardSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  listId: z.uuid().optional(), // The target list (if moving columns)
  position: z.number().optional(), // The new position (if reordering)
});

export type UpdateCardDTO = z.infer<typeof updateCardSchema>;
