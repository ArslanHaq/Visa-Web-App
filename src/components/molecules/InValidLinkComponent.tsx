'use client';
import { resendVerificationEmail } from '@/server/Signup';
import { toast } from 'react-toastify';
import { validateEmailForm } from '@/constants/functions';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import InputComponent from '../atoms/InputComponent';
import ArrowRightSvg from '../atoms/Svg/ArrowRight';
import { useRouter } from 'next/navigation';
import { Pages } from '@/constants/constants';
import { forgotPassword } from '@/server/Login';
import { set } from 'animejs';

interface InValidLinkComponentProps {
  icon: React.ReactNode;
  description: string;
  heading: string;
  setModal?: (value: boolean) => void;
  isArrow?: boolean;
  setIsArrow?: Dispatch<SetStateAction<boolean>>
  isForgotPassword?: boolean;
}

export default function InValidLinkComponent({
  icon,
  description,
  heading,
  setModal,
  isArrow,
  isForgotPassword,
  setIsArrow,
}: InValidLinkComponentProps) {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [errors, setErrors] = useState({
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateEmailForm(formValues);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (!hasErrors) {
      if (isForgotPassword) {
        clickForgotPasswordLink();
      } else {
        clickVerificationLink();
      }
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
  async function clickVerificationLink() {
    const response = await resendVerificationEmail(formValues.email);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
        if (String(err.code) === '221') {
          router.push(`${Pages.SIGNIN}`);
        }
      });
    } else {
      toast.success('email has been sent successfully');
      resetForm();
      setIsSubmitted(true);
    }
  }

  async function clickForgotPasswordLink() {
    const response = await forgotPassword(formValues.email);

    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      toast.success('Forgot Password Link has been sent to your successfully');
      resetForm();
      setIsSubmitted(true);
    }
  }

  return (
    <>
      {isArrow && (
        <div
          className="absolute left-10 top-10 z-10 rotate-180 transform cursor-pointer"
          onClick={() => {
            setModal && setModal(false)
            setIsArrow && setIsArrow(false)
          }}
        >
          <ArrowRightSvg />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex items-center py-20 justify-center"
      >
        <div className="w-full">
          <div className="flex flex-col items-center justify-center">
            {icon}
            <p className="mt-8 font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
              {heading}
            </p>
          </div>
          <div className="mt-3 flex justify-center px-4 md:px-0">
            <p className="max-w-md text-center text-xs text-logoColorGreen lg:text-base">
              {description}
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
              className="w-10/12 md:w-1/2"
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
              className="w-10/12 md:w-1/2 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-base text-white"
            >
              <span>{isSubmitted ? 'Resent' : 'Continue'}</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
