import { IAccount } from '@/database/account.model';
import { fetchHandler } from './handlers/fetch';
import { IUser } from '@/database/user.model';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

//creating api controller for users and accounts
//this will be used in the app directory to fetch data from the api
export const api = {
  auth: {
    oAuthSignIn: ({
      user,
      provider,
      providerAccountId,
    }: SignInWithOAuthParams) =>
      fetchHandler(`${API_BASE_URL}/auth/signin-with-oauth`, {
        method: 'POST',
        body: JSON.stringify({
          user,
          provider,
          providerAccountId,
        }),
      }),
  },

  users: {
    getAll: () => fetchHandler(`${API_BASE_URL}/users`),
    getById: (id: string) => fetchHandler(`${API_BASE_URL}/users/${id}`),
    getByEmail: (email: string) =>
      fetchHandler(`${API_BASE_URL}/users/email`, {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
    create: (userData: Partial<IUser>) =>
      fetchHandler(`${API_BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    update: (id: string, userData: Partial<IUser>) =>
      fetchHandler(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      }),
    delete: (id: string) =>
      fetchHandler(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE',
      }),
  },
  //accounts

  accounts: {
    getAll: () => fetchHandler(`${API_BASE_URL}/accounts`),
    getById: (id: string) => fetchHandler(`${API_BASE_URL}/accounts/${id}`),
    getByProvider: (providerAccountID: string) =>
      fetchHandler(`${API_BASE_URL}/accounts/provider`, {
        method: 'POST',
        body: JSON.stringify({ providerAccountID }),
      }),
    create: (accountData: Partial<IAccount>) =>
      fetchHandler(`${API_BASE_URL}/accounts`, {
        method: 'POST',
        body: JSON.stringify(accountData),
      }),
    update: (id: string, accountData: Partial<IAccount>) =>
      fetchHandler(`${API_BASE_URL}/accounts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(accountData),
      }),
    delete: (id: string) =>
      fetchHandler(`${API_BASE_URL}/accounts/${id}`, {
        method: 'DELETE',
      }),
  },
};
