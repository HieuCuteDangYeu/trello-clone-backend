import { z } from 'zod';

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username cannot exceed 20 characters' }),

  email: z.string().email({ message: 'Invalid email format' }),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
