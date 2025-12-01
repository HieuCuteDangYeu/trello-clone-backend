import { z } from 'zod';
import { supportedLanguages } from '../createBoard/CreateBoardDTO';

export const updateBoardSchema = z.object({
  title: z.string().min(3).max(50).optional(),
  description: z.string().optional(),
  language: z.enum(supportedLanguages).optional(),
  isPrivate: z.boolean().optional(),
});

export type UpdateBoardDTO = z.infer<typeof updateBoardSchema>;
