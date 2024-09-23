'use client';
import InputComponent from '../atoms/InputComponent';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  handleChangeForgotPassword,
  validateForgotPasswordForm,
} from '@/constants/functions';
import { ForgotPasswordDto, ForgotPasswordErrors } from '@/dto/SignIn.dto';
import {
  checkForgotPasswordVerificationLink,
  forgotPasswordWithLink,
} from '@/server/Login';
import { Pages } from '@/constants/constants';
import { toast } from 'react-toastify';
import RedCrossIcon from '../atoms/Svg/RedCrossIcon';
import InValidLinkComponent from './InValidLinkComponent';
import Loader from '../atoms/Loader';

export default function ForgotNewPasswordComponent() {
  const [formValues, setFormValues] = useState<ForgotPasswordDto>({
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const verificationCode = searchParams.get('code');

  const [errors, setErrors] = useState<ForgotPasswordErrors>({
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(true);
  const [inValidLink, setInValidLink] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForgotPasswordForm(formValues);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (!hasErrors) {
      const response = await forgotPasswordWithLink(
        formValues.password,
        verificationCode!,
      );

      if (response.error && response.error.length > 0) {
        response.error.forEach((err: any) => {
          toast.error(`Error ${err.code}: ${err.description}`);
          if (String(err.code) === '221') {
            router.push(`${Pages.SIGNIN}`);
          }
        });
      } else {
        toast.success('Password changed successfully');
        resetForm();
        router.push(`${Pages.SIGNIN}`);
      }
    }
  };
  const resetForm = () => {
    setFormValues({
      password: '',
      confirmPassword: '',
    });
    setErrors({
      password: '',
      confirmPassword: '',
    });
  };

  const validateVerificationLink = async (verificationToken: string) => {
    const response =
      await checkForgotPasswordVerificationLink(verificationToken);
    setLoading(false);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
        if (String(err.code) === '221') {
          router.push(`${Pages.SIGNIN}`);
        } else {
          setInValidLink(true);
        }
      });
    } else {
      toast.success('link is verified successfully');
      setInValidLink(false);
    }
  };
  useEffect(() => {
    if (verificationCode) {
      validateVerificationLink(verificationCode);
    }
  }, []);
  return (
    <>
      {loading ? (
        <div className="h-svh">
          <Loader />
        </div>
      ) : (
        <>
          {inValidLink ? (
            <div>
              <InValidLinkComponent
                isForgotPassword={true}
                heading="Link Verification"
                icon={<RedCrossIcon />}
                description="
                   Unfortunately the link you have clicked is invalid or expired.
                      You can resend the link by filling email
                      and press continue button. Verification link will be resend to your email"
              />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex h-svh items-center justify-center"
            >
              <div className="w-full">
                <div className="mt-5 flex justify-center">
                  <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
                    Forgot Password
                  </p>
                </div>
                <div className="mt-5 flex justify-center">
                  <p className="text-xs text-logoColorGreen lg:text-base">
                    Donec sollicitudin molestie malesda sollitudin
                  </p>
                </div>
                <div className="mt-10 flex justify-center">
                  <InputComponent
                    label={'New Password'}
                    maxLength={36}
                    type={'password'}
                    placeholder={'Enter your new password'}
                    name={'password'}
                    value={formValues.password}
                    className="w-10/12 md:w-1/2"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChangeForgotPassword(
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
                <div className="mt-6 flex justify-center">
                  <InputComponent
                    label={'Confirm Password'}
                    maxLength={20}
                    type={'password'}
                    placeholder={'Enter your password'}
                    name={'confirmPassword'}
                    value={formValues.confirmPassword}
                    className="w-10/12 md:w-1/2"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChangeForgotPassword(
                        e,
                        formValues,
                        setFormValues,
                        errors,
                        setErrors,
                      )
                    }
                    error={errors.confirmPassword}
                  />
                </div>
                <div className="mt-12 flex justify-center">
                  <button
                    type="submit"
                    className="w-10/12 md:w-1/2 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-base text-white"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </form>
          )}
        </>
      )}
    </>
  );
}
