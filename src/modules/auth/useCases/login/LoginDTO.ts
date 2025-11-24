import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type LoginDTO = z.infer<typeof loginSchema>;
