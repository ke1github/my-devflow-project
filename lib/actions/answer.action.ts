'use server';

import mongoose from 'mongoose';
import Answer, { IAnswerDocument } from '@/database/answer.model';
import { AnswerParams } from '@/types/action';
import { ActionResponse, ErrorResponse } from '@/types/global';
import { AnswerServerSchema } from '../validations';
import action from '../handlers/action';
import handleError from '../handlers/error';
import { Question } from '@/database';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import ROUTES from '@/constants/routes';

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
