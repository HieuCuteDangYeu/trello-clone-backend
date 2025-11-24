import { ZodType } from 'zod';

export const validateZod = (schema: ZodType, data: unknown): string | null => {
  const result = schema.safeParse(data);

  if (result.success === false) {
    return result.error.issues
      .map((issue) => {
        const path = issue.path.join('.');
        return path ? `${path}: ${issue.message}` : issue.message;
      })
      .join(', ');
  }

  return null;
};
