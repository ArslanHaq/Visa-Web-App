import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/utils/AuthOptions';
import { ApiRoutes, Pages } from '@/constants/constants';
import Router from 'next/router';
import { NextApiRequest, NextApiResponse } from 'next';
import LoggedInUser from '@/dto/SignIn.dto';

import { cookies } from 'next/headers';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
//let oldSession: Session | null;

// Function to get headers, including the option to add the refresh token
async function getHeaders(includeRefreshToken = false) {
  const session: any = await getServerSession(authOptions);
  const headers: any = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session?.user.accessToken}`,
  };
  if (includeRefreshToken) {
    headers['Authorization'] = `Bearer ${session?.user.refreshToken}`;
  }

  return headers;
}
async function refreshAccessToken(isRefreshTokenCalled: boolean) {
  const session = await getServerSession(authOptions);
  const url = BACKEND_URL + '/' + ApiRoutes.REFRESHTOKEN;

  const headers = await getHeaders(true);
  const body = JSON.stringify({
    accessToken: session?.user.accessToken,
  });
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body,
  });

  return response;
}
// Function to handle HTTP requests with an interceptor for 403 responses
async function fetchWithInterceptor(url: string, options: any) {
  let response = await fetch(url, options);
  if (response.status === 401) {
    try {
      console.log('-----------refreshTokenCalled--------');
      let isRefreshTokenCalled = true;
      const refreshResponse = await refreshAccessToken(isRefreshTokenCalled);
      isRefreshTokenCalled = false;
      if (refreshResponse.ok) {
        const newAccessToken = await refreshResponse.json();
        options.headers['Authorization'] =
          `Bearer ${newAccessToken.data.accessToken}`;
        cookies().set('accessToken', ` ${newAccessToken.data.accessToken}`, {
          secure: true,
        });
        return await fetch(url, options);
      }
    } catch (e) {
      console.log('error', e);
    }
  }
  if (response.status === 401) {
    cookies().set('status', ` ${response.status}`, {
      secure: true,
    });
  }
  return response;
}

// POST Request
export const post = async (path: any, data: any) => {
  const url = `${BACKEND_URL}/${path}`;
  const headers = await getHeaders();
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  };
  return fetchWithInterceptor(url, options);
};

// GET Request
export const get = async (path: any) => {
  const url = `${BACKEND_URL}/${path}`;
  const headers = await getHeaders();
  const options = {
    method: 'GET',
    headers,
  };
  return fetchWithInterceptor(url, options);
};

// PUT Request
export const put = async (path: any, data: any) => {
  const url = `${BACKEND_URL}/${path}`;
  const headers = await getHeaders();
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  };
  return fetchWithInterceptor(url, options);
};

// DELETE Request
export const remove = async (path: any, body?: any) => {
  const url = `${BACKEND_URL}/${path}`;
  const headers = await getHeaders();
  const options = {
    method: 'DELETE',
    headers,
    body: JSON.stringify(body),
  };
  return fetchWithInterceptor(url, options);
};

// PATCH Request
export const patch = async (path: any, data: any) => {
  const url = `${BACKEND_URL}/${path}`;
  const headers = await getHeaders();
  const options = {
    method: 'PATCH',
    headers,
    body: JSON.stringify(data),
  };
  return fetchWithInterceptor(url, options);
};

// async function updateToken(newAccessToken: any) {
//   const session = await getServerSession(authOptions);

//   if (session) {
//     await signIn('credentials', {
//       redirect: false,
//       refreshToken: session.user.refreshToken,
//       accessToken: newAccessToken.data.accessToken,
//       update: true, // This triggers the 'update' in the jwt callback
//     });
//   }
// }
