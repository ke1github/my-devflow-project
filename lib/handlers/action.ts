'use server';

import { ZodError, ZodSchema } from 'zod';
import { UnauthorizedError, ValidationError } from '../http-errors';
import { Session } from 'next-auth';
import { auth } from '@/auth';
import dbConnect from '../mongoose';

type ActionOptions<T> = {
  params?: T;
  schema?: ZodSchema<T>;
  authorize?: boolean;
};

async function action<T>({
  params,
  schema,
  authorize = false,
}: ActionOptions<T>) {
  // Validate params with Zod schema if provided
  if (schema && params) {
    try {
      // Validate the params against the schema
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle Zod validation error
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>,
        );
      }
      // Handle other errors
      else {
        return new Error('Schema validation failed');
      }
    }
  }
  // session check
  let session: Session | null = null;
  if (authorize) {
    session = await auth();
    if (!session) {
      return new UnauthorizedError();
    }
  }
  // Connect to the database
  await dbConnect();
  // Perform your action here
  // For example, you can return the params and session
  return {
    params,
    session,
  };
}

export default action;

// 1. Checking whether the schema and params are provided and validated.
//2. Checking if authorization is required and if the session is valid.
//3. Connecting to the database using dbConnect() function.
//4. Returning the params and session as a response.
// 5. Handling errors using ZodError and returning appropriate error messages.
