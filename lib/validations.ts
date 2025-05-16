import { InteractionActionEnums } from '@/database/interaction.model';
import { z } from 'zod';

// Define a schema for your form.
export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Username must be at least 2 characters.' })
    .email({ message: 'Email is required.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .max(100, { message: 'Password cannot exceed 100 characters.' }),
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
    .min(5, { message: 'Title must be at least 5 characters.' })
    .max(130, { message: 'Title cannot exceed 130 characters.' }),

  content: z.string().min(1, { message: 'Content is required.' }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: 'Tag is required.' })
        .max(15, { message: 'Tag cannot exceed 15 characters.' }),
    )
    .min(1, { message: 'Add atleast one tag.' })
    .max(3, { message: 'Cannot add more than 3 tags.' }),
});

export const UserSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long.' }),
  email: z.string().email({ message: 'Please provide a valid email address.' }),
  bio: z.string().optional(),
  image: z.string().url({ message: 'Invalid Image URL.' }).optional(),
  location: z.string().optional(),
  portfolio: z.string().url({ message: 'Invalid Portfolio URL.' }).optional(),
  reputation: z.number().optional(),
});

export const AccountSchema = z.object({
  userId: z.string().min(1, { message: 'User ID is required.' }),
  name: z.string().min(1, { message: 'Name is required.' }),
  image: z.string().url({ message: 'Invalid Image URL.' }).optional(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .max(100, { message: 'Password cannot exceed 100 characters.' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter.',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter.',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character.',
    })
    .optional(),
  provider: z.string().min(1, { message: 'Provider is required.' }),
  providerAccountId: z
    .string()
    .min(1, { message: 'Provider Account ID is required.' }),
});

export const SignInWithOAuthSchema = z.object({
  provider: z.enum(['google', 'github']),
  providerAccountId: z
    .string()
    .min(1, { message: 'Provider Account ID is required.' }),
  user: z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    image: z.string().url('Invalid image URL').optional(),
  }),
});

export const EditQuestionSchema = AskQuestionSchema.extend({
  questionId: z.string().min(1, { message: 'Question ID is required.' }),
});

export const GetQuestionSchema = z.object({
  questionId: z.string().min(1, { message: 'Question ID is required.' }),
});

export const PaginatedSearchParamsSchema = z.object({
  page: z.number().min(1, 'Page must be atleast 1').default(1),
  pageSize: z.number().min(1, 'Page size must be atleast 1').default(10),
  query: z.string().optional(),
  filter: z.string().optional(),
  sort: z.string().optional(),
});

export const GetTagQuestionsSchema = PaginatedSearchParamsSchema.extend({
  tagId: z.string().min(1, { message: 'Tag ID is required.' }),
});
export const IncrementViewsSchema = z.object({
  questionId: z.string().min(1, 'Question ID is required.'),
});

export const AnswerSchema = z.object({
  content: z.string().min(100, { message: 'Minimum 100 characters.' }),
});

export const AnswerServerSchema = AnswerSchema.extend({
  questionId: z.string().min(1, { message: 'Question ID is required.' }),
});

export const GetAnswersSchema = PaginatedSearchParamsSchema.extend({
  questionId: z.string().min(1, { message: 'Question ID is required.' }),
});
export const AIAnswerSchema = z.object({
  question: z
    .string()
    .min(5, { message: 'Question Title must be at least 5 characters.' })
    .max(130, {
      message: 'Question Title must not be longer than 130 characters.',
    }),
  content: z.string().min(100, {
    message: 'Question description must have Minimum of 100 characters.',
  }),
  userAnswer: z.string().optional(),
});

export const CreateVoteSchema = z.object({
  targetId: z.string().min(1, 'Target ID is required.'),
  targetType: z.enum(['question', 'answer'], {
    message: 'Invalid Target Type. Must be question or answer.',
  }),
  voteType: z.enum(['upvote', 'downvote'], {
    message: 'Invalid Vote Type. Must be upvote or downvote.',
  }),
});
export const UpdateVoteCountSchema = CreateVoteSchema.extend({
  change: z
    .number()
    .int()
    .min(-1, 'Change must be -1 (decrement) or 1 (increment)')
    .max(1, 'Change must be -1 (decrement) or 1 (increment)'),
});

export const hasVotedSchema = CreateVoteSchema.pick({
  targetId: true,
  targetType: true,
});

export const CollectionBaseSchema = z.object({
  questionId: z.string().min(1, 'Question ID is required.'),
});

export const GetUserSchema = z.object({
  userId: z.string().min(1, 'User ID is required.'),
});

export const GetUserQuestionsSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, { message: 'User ID is required.' }),
});
export const GetUserAnswersSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, { message: 'User ID is required.' }),
});

export const GetUserTagsSchema = z.object({
  userId: z.string().min(1, 'User ID is required.'),
});

export const DeleteQuestionSchema = z.object({
  questionId: z.string().min(1, 'Question ID is required'),
});

export const DeleteAnswerSchema = z.object({
  answerId: z.string().min(1, 'Answer ID is required'),
});

export const CreateInteractionSchema = z.object({
  action: z.enum(InteractionActionEnums),
  actionTarget: z.enum(['question', 'answer']),
  actionId: z.string().min(1),
  authorId: z.string().min(1),
});

export const GlobalSearchSchema = z.object({
  query: z.string(),
  type: z.string().nullable().optional(),
});
