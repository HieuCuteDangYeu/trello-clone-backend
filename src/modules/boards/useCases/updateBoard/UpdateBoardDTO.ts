import { z } from 'zod';

export const updateBoardSchema = z.object({
  title: z.string().min(3).max(50).optional(),
  description: z.string().optional(),
  language: z.string().optional(),
  isPrivate: z.boolean().optional(),
});

export type UpdateBoardDTO = z.infer<typeof updateBoardSchema>;
