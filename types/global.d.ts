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
  upvotes: number;
  downvotes: number;
  question: string;
  createdAt: Date;
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

interface Badges {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

interface GlobalSearchedItem {
  id: string;
  type: 'question' | 'answer' | 'user' | 'tag';
  title: string;
}

interface Job {
  id?: string;
  employer_name?: string;
  employer_logo?: string | undefined;
  employer_website?: string;
  job_employement_type?: string;
  job_title?: string;
  job_description?: string;
  job_apply_link?: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
}

interface Country {
  name: {
    common: string;
  };
}
