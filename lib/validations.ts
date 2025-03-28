import { z } from 'zod';

// Define a schema for your form.
export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Username must be at least 2 characters.' })
    .email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' })
    .max(100, { message: 'Password must be less than 100 characters.' }),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' })
    .max(100, { message: 'Username must be less than 100 characters.' })
    .regex(/^[a-zA-Z0-9_]*$/, {
      message: 'Username must only contain letters, numbers, and underscores.',
    }),
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(100, { message: 'Name must be less than 100 characters.' })
    .regex(/^[a-zA-Z0-9_]*$/, {
      message: 'Name must only contain letters, numbers, and underscores.',
    }),
  email: z
    .string()
    .min(1, { message: 'Username must be at least 2 characters.' })
    .email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' })
    .max(100, { message: 'Password must be less than 100 characters.' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      },
    ),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title is required.' })
    .max(100, { message: 'Title cannot exceed 100 characters.' }),

  content: z.string().min(1, { message: 'Content is required.' }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: 'Tag is required.' })
        .max(30, { message: 'Tag cannot exceed 30 characters.' }),
    )
    .min(1, { message: 'At least one tag is required.' })
    .max(3, { message: 'Cannot add more than 3 tags.' }),
});
