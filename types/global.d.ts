import { Collection } from './../lib/validations';
import { use } from 'react';
import { auth } from '@/auth';
import { Answer } from '@/database/answer.model';
import { NextRequest, NextResponse } from 'next/server';

interface Tag {
  _id: string;
  name: string;
  questions?: number;
}

interface Author {
  _id: string;
  name: string;
  image: string;
}

interface Question {
  _id: string;
  title: string;
  content: string;
  tags: Tag[];
  author: Author;
  upvotes: number;
  downvotes: number;
  answers: number;
  views: number;
  createdAt: Date;
}

// Path: types/response.d.ts

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };
type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

// difference between params and searchParams is that params are the dynamic segments of the URL, while searchParams are the query parameters in the URL.
// For example, in the URL /users/123?sort=asc, 123 is a param and sort=asc is a searchParam.
// params are defined in the route file name (e.g. [id].ts), while searchParams are defined in the URL itself.

interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
}

interface Answer {
  _id: string;
  author: Author;
  content: string;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
}

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
  bio?: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
  createdAt: Date;
}

interface Collection {
  _id: string;
  author: string | Author;
  question: Question;
}
