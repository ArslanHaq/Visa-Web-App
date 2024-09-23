import { ChangeEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { twoFactorAuthenticate, verifyQrCode } from '@/server/Login';
import { Pages } from '@/constants/constants';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signOut } from 'next-auth/react';
import { UserData } from '@/dto/SignIn.dto';

export default function useTwoFactor() {
  const router = useRouter();
  const [code, setCode] = useState<string>('');
  const [twoFactorCode, setTwoFactorCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { data: session } = useSession();
  console.log('session', session);
  const userOnboardCategory = session?.user?.onboard_P;
  const userName = session?.user?.username;

  const { data: sessionData, update } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Prevent default redirect
    router.push(Pages.SIGNIN); // Redirect to the desired URL
  };
  const submitQrCode = async () => {
    if (code.length < 6) {
      setError('Code must be 6 characters long');
    } else {
      setError('');
      const response = await verifyQrCode(code, userName!);
      if (response.error && response.error.length > 0) {
        response.error.forEach((err: any) => {
          toast.error(`Error ${err.code}: ${err.description}`);
        });
      } else {
        toast.success('code verified successfully');
        handleSignOut();
      }
    }
  };

  const submitTwoFactor = async () => {
    if (twoFactorCode.length < 6) {
      setError('Code must be 6 characters long');
    } else {
      setError('');
      const response = await twoFactorAuthenticate(twoFactorCode, userName!);
      if (response.error && response.error.length > 0) {
        response.error.forEach((err: any) => {
          if (String(err.code) === '500') {
            toast.error('Your session has expired. Please login again.');
            handleSignOut();
          } else toast.error(`Error ${err.code}: ${err.description}`);
        });
      } else {
        toast.success('code verified successfully');
        const sessionData = {
          expires: new Date().toISOString(), // Assuming you want to set the current date/time as the expires field
          user: {
            id: Date.now().toString(),
            accessToken: response.data?.accessToken as string,
            refreshToken: response.data?.refreshToken as string,
            changedPassword: response.data?.changedPassword as string | null,
            onboard_P: response.data?.onboard_P as string,
            roles: response.data?.roles as string[],
            userEmail: response.data?.userEmail as string,
            username: response.data?.username as string,
          } as UserData,
        };
        await update(sessionData);
        router.push(Pages.APPLICATIONDATA);
      }
    }
  };
  return {
    code,
    userOnboardCategory,
    error,
    userName,
    twoFactorCode,
    setTwoFactorCode,
    setCode,
    submitQrCode,
    handleSignOut,
    submitTwoFactor,
  };
}
