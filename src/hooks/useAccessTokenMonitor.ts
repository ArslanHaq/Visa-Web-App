'use client';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { UserData } from '@/dto/SignIn.dto';
import { Pages } from '@/constants/constants';
import { useRouter } from 'next/navigation';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Props {
  accessTokenCookie: any;
  accessToken: any;
  update: any;
  session: any;
  responseStatus: any;
}
export async function useAccessTokenMonitor({
  accessTokenCookie,
  accessToken,
  update,
  session,
  responseStatus,
}: Props) {
  const router = useRouter();
  async function updateSession() {
    if (accessToken !== accessTokenCookie.value) {
      const sessionData = {
        expires: new Date().toISOString(), // Assuming you want to set the current date/time as the expires field
        user: {
          ...session?.user,
          accessToken: accessTokenCookie.value,
        } as UserData,
      };
      await update(sessionData);
    }
  }

  const handleSignOut = async () => {
    console.log('handleSignOut');
    await signOut({ redirect: false }); // Prevent default redirect
    router.push(Pages.SIGNIN); // Redirect to the desired URL
  };

  useEffect(() => {
    if (accessTokenCookie) updateSession();
  }, [accessTokenCookie]);

  useEffect(() => {
    if (responseStatus) {
      if (responseStatus.value.includes('401')) {
        console.log('401 responseStatus');
        handleSignOut();
      }
    }
  }, [responseStatus]);

  return {
    monitoredToken: accessToken,
  };
}
