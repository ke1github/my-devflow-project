'use server';

import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

import ROUTES from '@/constants/routes';
import { Question } from '@/database';
import Answer, { IAnswerDocument } from '@/database/answer.model';

import { AnswerParams, GetAnswerParams } from '@/types/action';
import { ActionResponse, ErrorResponse } from '@/types/global';
import { AnswerServerSchema, GetAnswersSchema } from '../validations';

import action from '../handlers/action';
import handleError from '../handlers/error';

export async function createAnswer(
  params: AnswerParams,
): Promise<ActionResponse<IAnswerDocument>> {
  // Validate the params with Zod schema if provided
  const validationResult = await action({
    params,
    schema: AnswerServerSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  // Extract the validated params and session
  const { questionId, content } = validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  const session = await mongoose.startSession(); //atomic transaction
  session.startTransaction();

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error('Question not found');
    }
    // Create the answer
    const [newAnswer] = await Answer.create(
      [{ author: userId, question: questionId, content }],
      { session },
    );
    if (!newAnswer) {
      throw new Error('Failed to create answer');
    }
    // Update the question with the new answer
    question.answers += 1;
    await question.save({ session });
    // Commit the transaction
    await session.commitTransaction();
    // Revalidate the question page to reflect the new answer count
    revalidatePath(ROUTES.QUESTION(questionId));

    // return the new answer as a response
    // Note: JSON.parse(JSON.stringify(newAnswer)) is used to convert Mongoose document to a plain object
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newAnswer)),
    };
  } catch (error) {
    // Handle the error and rollback the transaction
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    // End the session
    await session.endSession();
  }
}

export async function getAnswers(params: GetAnswerParams): Promise<
  ActionResponse<{
    answers: Answer[];
    isNext: boolean;
    totalAnswers: number;
  }>
> {
  const validattionResult = await action({
    params,
    schema: GetAnswersSchema,
  });
  if (validattionResult instanceof Error) {
    return handleError(validattionResult) as ErrorResponse;
  }
  const { questionId, page = 1, pageSize = 10 } = params;

  const skip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  let sortCriteria = {};

  switch (filter) {
    case 'latest':
      sortCriteria = { createdAt: -1 };
      break;
    case 'oldest':
      sortCriteria = { createdAt: 1 };
      break;
    case 'popular':
      sortCriteria = { upvotes: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }
  try {
    const totalAnswers = await Answer.countDocuments({
      question: questionId,
    });
    const answers = await Answer.find({ question: questionId })
      .populate('author', '_id name image')
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);
    const isNext = totalAnswers > skip + answers.length;

    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        isNext,
        totalAnswers,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
