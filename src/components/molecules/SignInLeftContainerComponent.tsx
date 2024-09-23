'use client';
import Link from 'next/link';
import InputComponent from '../atoms/InputComponent';
import { ChangeEvent, useState } from 'react';
import { Pages, SignInErrors } from '@/constants/constants';
import { handleChangeSignIn, validateSignInForm } from '@/constants/functions';
import { SignInDto } from '@/dto/SignIn.dto';

export default function SignInLeftContainerComponent() {
  const [formValues, setFormValues] = useState<SignInDto>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<SignInErrors>({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateSignInForm(formValues);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (!hasErrors) {
      console.log('Form submitted successfully', {
        ...formValues,
      });
      resetForm();
    }
  };
  const resetForm = () => {
    setFormValues({
      email: '',
      password: '',
    });
    setErrors({
      email: '',
      password: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-[-20px] flex items-center justify-center"
    >
      <div className="w-full">
        <div className="mt-5 flex justify-center">
          <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
            Sign In
          </p>
        </div>
        <div className="mt-5 flex justify-center">
          <p className="text-xs text-logoColorGreen lg:text-base">
            Donec sollicitudin molestie malesda sollitudin
          </p>
        </div>
        <div className="mt-10 flex justify-center">
          <InputComponent
            label={'Email'}
            maxLength={36}
            type={'text'}
            placeholder={'Enter your email address'}
            name={'email'}
            value={formValues.email}
            className="w-1/2"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeSignIn(
                e,
                formValues,
                setFormValues,
                errors,
                setErrors,
              )
            }
            error={errors.email}
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
            className="w-1/2"
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
            className="w-1/2 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-base text-white"
          >
            Sign Up
          </button>
        </div>
        <div className="flex justify-center">
          <div className="flex w-1/2 justify-end">
            <p className="mt-3 text-xs lg:text-base">
              <Link href={Pages.FORGOTPASSWORD}>
                <span className="font-bold text-logoColorBlue">
                  Forgot Password
                </span>
              </Link>{' '}
            </p>
          </div>
        </div>
        <div className="mt-3 flex justify-center">
          <p className="mt-4 text-xs lg:text-base">
            Can't log in?{' '}
            <Link href={Pages.SIGNUP}>
              <span className="font-bold text-logoColorBlue">Sign Up</span>
            </Link>{' '}
            for create account.
          </p>
        </div>
      </div>
    </form>
  );
}
