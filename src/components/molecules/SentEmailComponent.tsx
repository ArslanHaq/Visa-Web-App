'use client';

import OpenEmailIcon from '../atoms/Svg/OpenEmailIcon';
import { useSearchParams } from 'next/navigation';
import { resendVerificationEmail } from '@/server/Signup';
import { toast } from 'react-toastify';

export default function SentEmailComponent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  async function resendEmail() {
    const response = await resendVerificationEmail(email as string);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      toast.success('Email has been sent successfully');
    }
  }
  return (
    <>
      <div className="flex h-svh items-center justify-center">
        <div className="w-full">
          <div className="flex flex-col items-center justify-center">
            <OpenEmailIcon />
            <p className="mt-5 font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
              Email Confirmation
            </p>
          </div>
          <div className="mt-5 flex justify-center">
            <p className="max-w-md text-center text-xs text-logoColorGreen lg:text-base">
              We have sent email to your email address to confirm the validity
              of you email address. After recieving the email follow the link
              provided to complete your registrarion.
            </p>
          </div>

          <div className="mt-28 flex justify-center">
            <p className="text-center text-xs text-logoColorGreen lg:text-base">
              If you have not recieved the email{' '}
              <span
                onClick={resendEmail}
                className="cursor-pointer font-bold text-logoColorBlue"
              >
                Resend Confirmation mail
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
