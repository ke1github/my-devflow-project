'use client';

import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import ROUTES from '@/constants/routes';
import { signIn } from 'next-auth/react';

const SocialAuthForm = () => {
  const buttonClass =
    'background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5';

  // Authentication using OAuth with Github and Google
  const handleSignIn = async (provider: 'github' | 'google') => {
    try {
      const result = await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: true, // Allow full-page redirect
      });
      if (result?.error) {
        throw new Error(result.error);
      }
      toast.success(`You have successfully signed in with ${provider}.`);
    } catch (error) {
      console.error('Sign-in error:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'An error occurred while Signing In.',
      );
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button
        className={buttonClass}
        onClick={() => handleSignIn('github')}
      >
        <Image
          src="/icons/github.svg"
          alt="Github Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in with GitHub</span>
      </Button>

      <Button
        className={buttonClass}
        onClick={() => handleSignIn('google')}
      >
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
