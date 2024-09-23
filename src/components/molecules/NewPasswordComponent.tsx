'use client';
import Link from 'next/link';
import InputComponent from '../atoms/InputComponent';
import { ChangeEvent, useState } from 'react';
import {
  ForgotPasswordErrors,
  Pages,
  SignInErrors,
} from '@/constants/constants';
import {
  handleChangeForgotPassword,
  handleChangeSignIn,
  validateForgotPasswordForm,
  validateSignInForm,
} from '@/constants/functions';
import { ForgotPasswordDto, SignInDto } from '@/dto/SignIn.dto';

export default function ForgotNewPasswordComponent() {
  const [formValues, setFormValues] = useState<ForgotPasswordDto>({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<ForgotPasswordErrors>({
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForgotPasswordForm(formValues);
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
      password: '',
      confirmPassword: '',
    });
    setErrors({
      password: '',
      confirmPassword: '',
    });
  };

  return (
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
            className="w-1/2"
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
            className="w-1/2"
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
            className="w-1/2 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-base text-white"
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}
