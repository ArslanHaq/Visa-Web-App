'use client';

import { Pages, UserOnboardCategory } from '@/constants/constants';
import FUserOnboardComponent from '../molecules/FUserOnboardComponent';
import useTwoFactor from '@/hooks/useTwoFactor';
import TUserOnboardComponent from '../molecules/TUserOnboardComponent';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '../atoms/Loader';
import { useAccessTokenMonitor } from '@/hooks/useAccessTokenMonitor';
import { useSession } from 'next-auth/react';

interface Props {
  accessToken: any;
  responseStatus: any;
}
export default function TwoFactorAuthComponent({ accessToken, responseStatus }: Props) {
  const {
    code,
    error,
    userOnboardCategory,
    userName,
    twoFactorCode,
    setTwoFactorCode,
    setCode,
    submitQrCode,
    handleSignOut,
    submitTwoFactor,
  } = useTwoFactor();
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const { data: session, update } = useSession();
  useEffect(() => {
    if (userOnboardCategory === UserOnboardCategory.X) {
      setLoader(false);
      router.push(Pages.APPLICATIONDATA);
    } else {
      setLoader(false);
    }
  }, []);
  const monitoredToken = useAccessTokenMonitor({ accessTokenCookie: accessToken, accessToken: session?.user.accessToken, update, session, responseStatus });

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="flex h-screen flex-col items-center justify-center">
          {userOnboardCategory === UserOnboardCategory.F && (
            <FUserOnboardComponent
              code={code}
              setCode={setCode}
              error={error}
              userName={userName!}
              submitQrCode={submitQrCode}
              handleSignOut={handleSignOut}
            />
          )}
          {userOnboardCategory === UserOnboardCategory.T && (
            <TUserOnboardComponent
              code={twoFactorCode}
              setCode={setTwoFactorCode}
              error={error}
              submitTwoFactor={submitTwoFactor}
            />
          )}
        </div>
      )}
    </>
  );
}
