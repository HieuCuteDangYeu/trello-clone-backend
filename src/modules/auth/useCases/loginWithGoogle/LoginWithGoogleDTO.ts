import { z } from 'zod';

export const loginWithGoogleSchema = z.object({
  idToken: z.string().min(1, 'Google ID Token is required'),
});

export type LoginWithGoogleDTO = z.infer<typeof loginWithGoogleSchema>;
