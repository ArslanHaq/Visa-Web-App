'use client';
import InputComponent from '../atoms/InputComponent';
import { ChangeEvent } from 'react';
import { handleChangeVerification } from '@/constants/functions';
import Modal from './Modal';
import ButtonComponent from '../atoms/ButtonComponent';
import { useVerificationSignUp } from '@/hooks/useVerificationSignUp';

import { useRouter, useSearchParams } from 'next/navigation';
import { Pages } from '@/constants/constants';
import Loader from '../atoms/Loader';
import InValidLinkComponent from './InValidLinkComponent';
import RedCrossIcon from '../atoms/Svg/RedCrossIcon';

export default function VerificationSignUpComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verificationCode = searchParams.get('code');
  const {
    formValues,
    errors,
    verificationCodeWrong,
    submitModal,
    inValidLink,
    loading,
    setFormValues,
    setErrors,
    setVerificationCodeWrong,
    setSubmitModal,
    handleSubmit,
  } = useVerificationSignUp({ verificationCode });
  return (
    <>
      <Modal showModal={submitModal}>
        <div className="flex h-28 w-96 flex-col items-center justify-center">
          <p className="mt-4 font-sans text-base text-slate-200">
            Your account has been successfully created
          </p>
          <button
            onClick={() => {
              setSubmitModal(false);
              router.push(Pages.SIGNIN);
            }}
            className="mt-7 rounded-xl bg-slate-500 px-4 py-2 text-white hover:bg-black"
          >
            Continue
          </button>
        </div>
      </Modal>
      <Modal showModal={verificationCodeWrong.verificationCodeWrong}>
        <div className="flex h-40 w-96 flex-col items-center justify-center">
          <p className="mt-4 font-sans text-base text-slate-200">
            Your code is invalid, please try again
          </p>
          <p className="mt-3 text-sm font-bold text-red-400">
            {`Remaining Attempts: ${verificationCodeWrong.attempts}`}
          </p>
          <button
            onClick={() =>
              setVerificationCodeWrong({
                verificationCodeWrong: false,
                attempts: verificationCodeWrong.attempts,
              })
            }
            className="mt-7 rounded-xl bg-slate-500 px-6 py-2 text-white hover:bg-black"
          >
            Continue
          </button>
        </div>
      </Modal>
      {loading ? (
        <div className="h-svh">
          <Loader />
        </div>
      ) : (
        <>
          {inValidLink ? (
            <div>
              <InValidLinkComponent
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
                <div className="flex justify-center">
                  <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
                    Verification
                  </p>
                </div>
                <div className="mt-10 flex justify-center">
                  <InputComponent
                    label={'Code'}
                    type={'text'}
                    maxLength={6}
                    placeholder={'Enter your pin code'}
                    name={'pinCode'}
                    value={formValues.pinCode}
                    className="w-10/12 md:w-1/2 pb-3 md:pb-0"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChangeVerification(
                        e,
                        formValues,
                        setFormValues,
                        errors,
                        setErrors,
                      )
                    }
                    error={errors.pinCode}
                  />
                </div>
                <div className="mt-6 flex justify-center">
                  <InputComponent
                    label={'New Password'}
                    maxLength={36}
                    type={'password'}
                    placeholder={'Enter your new password'}
                    name={'password'}
                    value={formValues.password}
                    className="w-10/12 md:w-1/2 pb-3 md:pb-0"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChangeVerification(
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
                    maxLength={36}
                    type={'password'}
                    placeholder={'Enter your password'}
                    name={'confirmPassword'}
                    value={formValues.confirmPassword}
                    className="w-10/12 md:w-1/2 pb-3 md:pb-0"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChangeVerification(
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
                <div className="mt-12 flex w-full justify-center">
                  <ButtonComponent
                    isDisabled={verificationCodeWrong.attempts === 0}
                    text="Continue"
                    errorText=" Attempts exhausted. Please try again later."
                  />
                </div>
              </div>
            </form>
          )}
        </>
      )}
    </>
  );
}
