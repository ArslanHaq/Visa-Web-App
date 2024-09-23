'use client';
import Link from 'next/link';
import InputComponent from '../atoms/InputComponent';
import { ChangeEvent, useEffect, useState } from 'react';
import { Pages } from '@/constants/constants';
import { validateEmailForm } from '@/constants/functions';
import { useRouter } from 'next/navigation';

export default function NewPasswordEmailComponent() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateEmailForm(formValues);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (!hasErrors) {
      console.log('Form submitted successfully', {
        ...formValues,
      });
      resetForm();
      router.push(Pages.NEWPASSWORD);
    }
  };
  const resetForm = () => {
    setFormValues({
      email: '',
    });
    setErrors({
      email: '',
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
            label={'Email Address'}
            maxLength={36}
            type={'text'}
            placeholder={'Enter your email address'}
            name={'email'}
            value={formValues.email}
            className="w-1/2"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const { name, value } = e.target;

              setFormValues({
                ...formValues,
                [name]: value,
              });
              if (value.trim() !== '') {
                setErrors({
                  ...errors,
                  [name]: '',
                });
              }
            }}
            error={errors.email}
          />
        </div>

        <div className="mt-12 flex justify-center">
          <button
            type="submit"
            className="w-1/2 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-base text-white"
          >
            <span>Continue</span>
          </button>
        </div>
      </div>
    </form>
  );
}
