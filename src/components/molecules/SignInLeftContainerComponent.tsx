/* eslint-disable prettier/prettier */
'use client';
import Link from 'next/link';
import InputComponent from '../atoms/InputComponent';
import { ChangeEvent, useEffect, useState } from 'react';
import { Pages } from '@/constants/constants';
import { handleChangeSignIn } from '@/constants/functions';
import { useSignIn } from '@/hooks/useSignIn';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { OriginDto } from '@/dto/Signup.dto';
import NewPasswordEmailComponent from './NewPasswordEmailComponent';
import ArrowRightSvg from '../atoms/Svg/ArrowRight';
import classNames from 'classnames';
import Image from 'next/image';

interface Props {
  origin: OriginDto;
}
export default function SignInLeftContainerComponent({ origin }: Props) {
  const router = useRouter();
  const coatSrc = origin.data?.coat
    ? String(origin.data?.coat).replace('+html', '+xml')
    : '';
  const { formValues, errors, setFormValues, setErrors, handleSubmit } =
    useSignIn();

  const [forgotPassword, setForgotPassword] = useState(false);
  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Prevent default redirect
    router.push(Pages.SIGNIN); // Redirect to the desired URL
  };
  useEffect(() => {
    handleSignOut();
  }, []);

  return (
    <>

      {
        forgotPassword ? (
          <div className="relative flex py-20 w-full items-center justify-center">

            <NewPasswordEmailComponent onClick={() => setForgotPassword(false)} />
          </div>

        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-[-30px] flex items-center justify-center"
          >
            <div className="w-full">
              <div
                className="absolute z-10 left-10 rotate-180 transform cursor-pointer"
                onClick={() => router.push(Pages.LANDING)}
              >
                <ArrowRightSvg />
              </div>
              <div className="mb-10 mt-20 -ml-10 flex justify-center">
                <div className={classNames("flex items-center justify-start ")}>
                  <Image
                    src={coatSrc}
                    alt="Picture of the author"
                    width={90}
                    height={90}
                    quality={100}
                    style={{
                      maxWidth: '80px',
                      minWidth: '90px',
                      maxHeight: '90px',
                      minHeight: '90px',
                    }}
                  />
                  <div className='text-center'>
                    <p className="mx-2 font-serif text-xl font-bold text-logoColorBlue">
                      Online Visa System
                    </p>
                    <p className="mx-2 font-sans text-sm font-bold text-logoColorGreen italic">
                      {origin.data?.countryFullName}
                    </p>

                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-center">
                <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
                  Sign In
                </p >
              </div >
              <div className="mt-5 flex justify-center">
                <p className="text-xs text-logoColorGreen lg:text-base">
                  Login to your {origin.data?.countryName} visa system account
                </p>
              </div>
              <div className="mt-10 flex justify-center">
                <InputComponent
                  label={'Email'}
                  maxLength={36}
                  type={'text'}
                  placeholder={'Enter your email address'}
                  name={'userName'}
                  value={formValues.userName}
                  className="md:w-1/2 w-10/12"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChangeSignIn(
                      e,
                      formValues,
                      setFormValues,
                      errors,
                      setErrors,
                    )
                  }
                  error={errors.userName}
                />
              </div>
              <div className="mt-6 flex justify-center">
                <InputComponent
                  label={'Password'}
                  maxLength={20}
                  type={'password'}
                  placeholder={'Enter your password'}
                  name={'password'}
                  value={formValues.password}
                  className="md:w-1/2 w-10/12"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChangeSignIn(
                      e,
                      formValues,
                      setFormValues,
                      errors,
                      setErrors,
                    )
                  }
                  error={errors.password}
                />
              </div>
              <div className="mt-12 flex justify-center">
                <button
                  type="submit"
                  className="md:w-1/2 w-10/12
            rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-base text-white"
                >
                  Sign In
                </button>
              </div>
              <div className="flex justify-center cursor-pointer">
                <div className="flex md:w-1/2 w-10/12 justify-end" onClick={() => setForgotPassword(true)}>
                  <p className="mt-3 text-xs lg:text-base">
                    <span className="font-bold text-logoColorBlue">
                      Forgot Password
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-3 flex justify-center">
                <p className="mt-4 text-xs lg:text-base">
                  Don't have an account?{' '}
                  <Link href={Pages.SIGNUP}>
                    <span className="font-bold lg:text-lg text-logoColorBlue">Sign Up</span>
                  </Link>{' '}
                  to create a new account
                </p>
              </div>
            </div >
          </form >
        )
      }
    </>
  );
}
