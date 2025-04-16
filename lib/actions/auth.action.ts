'use server';

import { SignUpSchema } from '../validations';
import action from '../handlers/action';
import handleError from '../handlers/error';
import User from '@/database/user.model';

import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import Account from '@/database/account.model';
import { signIn } from '@/auth';
import { ActionResponse, ErrorResponse } from '@/types/global';

/// Define the type for the parameters ,
export async function signUpWithCredentials(
  params: AuthCredentials,
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: SignUpSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  // Perform sign-up logic here
  const { name, username, email, password } = validationResult.params!;

  // Perform your sign-up logic here (e.g., create a new user in the database)
  const session = await mongoose.startSession();
  // Start a transaction
  session.startTransaction();
  // Check if the user already exists in the database
  try {
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const existingUsername = await User.findOne({ username }).session(session);
    if (existingUsername) {
      throw new Error('Username already exists');
    }
    if (!password) {
      throw new Error('Password is required');
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await User.create([{ username, name, email }], {
      session,
    });

    // Create the account for the new user
    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: 'credentials',
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      { session },
    );
    await session.commitTransaction();
    await signIn('credentials', { email, password, redirect: false });
    return {
      success: true,
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

// steps to follow
// 1. Validate the input parameters using Zod schema.
// 2. Start a database transaction using mongoose session.
// 3. Check if the user already exists in the database using the provided email and username.
// 4. If the user already exists, throw an error.
// 5. If the username already exists, throw an error.
// 6. If the password is not provided, throw an error.
// 7. Hash the password using bcrypt.
// 8. Create a new user in the database using the provided username, name, and email.
// 9. Create an account for the new user using the hashed password and provider information.
// 10. Commit the transaction if everything is successful.
// 11. Sign in the user using the credentials provider and return a success response.
// 12. If any error occurs, abort the transaction and return an error response.
// 13. Finally, end the session.
// 14. Return the success response if everything is successful.
