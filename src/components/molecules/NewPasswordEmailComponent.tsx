'use client';
import InputComponent from '../atoms/InputComponent';
import { ChangeEvent, useState } from 'react';
import { Pages } from '@/constants/constants';
import { validateEmailForm } from '@/constants/functions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Modal from './Modal';
import { forgotPassword } from '@/server/Login';
import ArrowRightSvg from '../atoms/Svg/ArrowRight';

interface Props {
  onClick: any;
}
export default function NewPasswordEmailComponent({ onClick }: Props) {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({
    email: '',
  });
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateEmailForm(formValues);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (!hasErrors) {
      const response = await forgotPassword(formValues.email);

      if (response.error && response.error.length > 0) {
        response.error.forEach((err: any) => {
          toast.error(`Error ${err.code}: ${err.description}`);
        });
      } else setShowModal(true);
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
    <>
      <Modal showModal={showModal}>
        <div className="flex h-36 w-96 flex-col items-center justify-center">
          <p className="mt-4 font-sans text-base text-slate-200">
            Link has been sent to your email address
          </p>
          <button
            onClick={() => {
              setShowModal(false);
              resetForm();
            }}
            className="mt-7 rounded-xl bg-slate-500 px-6 py-2 text-white hover:bg-black"
          >
            Continue
          </button>
        </div>
      </Modal>

      <form onSubmit={handleSubmit} className="flex w-full">
        <div className=" w-full">
          <div
            className="absolute z-10 left-10 -top-10  rotate-180 transform cursor-pointer"
            onClick={onClick}
          >
            <ArrowRightSvg />
          </div>
          <div className="relative flex justify-center">
            <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
              Forgot Password
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
              className="w-10/12 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-base text-white md:w-1/2"
            >
              <span>Continue</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
