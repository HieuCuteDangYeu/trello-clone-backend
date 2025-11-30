import { z } from 'zod';

export const createBoardSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().optional(),
  language: z.string().optional(),
  isPrivate: z.boolean().optional().default(true),
});

export type CreateBoardDTO = z.infer<typeof createBoardSchema>;
