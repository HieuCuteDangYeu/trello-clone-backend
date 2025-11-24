import { z } from 'zod';

export const updateListSchema = z.object({
  title: z.string().min(1).optional(),
  position: z.number().optional(),
});

export type UpdateListDTO = z.infer<typeof updateListSchema>;
