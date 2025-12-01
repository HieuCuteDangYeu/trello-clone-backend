import { z } from 'zod';

export const supportedLanguages = [
  'US English Male',
  'UK English Female',
  'Vietnamese Male',
  'French Female',
  'Spanish Female',
  'Deutsch Female',
  'Japanese Female',
  'Korean Female',
] as const;

export const createBoardSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().optional(),
  language: z.enum(supportedLanguages).optional().default('US English Male'),
  isPrivate: z.boolean().optional().default(true),
});

export type CreateBoardDTO = z.infer<typeof createBoardSchema>;
