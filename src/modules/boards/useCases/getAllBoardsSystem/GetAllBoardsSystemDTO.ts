import { z } from 'zod';

export const getAllBoardsSystemSchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform((val) => Number(val))
    .pipe(z.number().min(1)),

  limit: z
    .string()
    .optional()
    .default('10')
    .transform((val) => Number(val))
    .pipe(z.number().min(1).max(100)),
});

export type GetAllBoardsSystemDTO = z.infer<typeof getAllBoardsSystemSchema>;
