import { z } from 'zod';

export const getAllUsersQuerySchema = z.object({
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
    .pipe(z.number().min(1).max(50)),

  q: z.string().optional(),
});

export type GetAllUsersQueryDTO = z.infer<typeof getAllUsersQuerySchema>;
