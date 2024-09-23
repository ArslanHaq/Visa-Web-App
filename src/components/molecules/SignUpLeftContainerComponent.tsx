/* eslint-disable prettier/prettier */
'use client';
import Select from 'react-select';
import InputComponent from '../atoms/InputComponent';
import { ChangeEvent, useEffect, useState } from 'react';
import { CountriesDataDto, OriginDto, PhoneCodeDto } from '@/dto/Signup.dto';
import { Colors, Pages } from '@/constants/constants';
import { handleChange } from '@/constants/functions';
import Link from 'next/link';
import { useSignUp } from '@/hooks/useSignUp';
import InValidLinkComponent from './InValidLinkComponent';
import OpenEmailIcon from '../atoms/Svg/OpenEmailIcon';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import classNames from 'classnames';
import ArrowRightSvg from '../atoms/Svg/ArrowRight';

interface SignUpLeftContainerComponentProps {
  countries: CountriesDataDto;
  phoneCodes: PhoneCodeDto;

  origin: OriginDto;

}
export default function SignUpLeftContainerComponent(
  props: SignUpLeftContainerComponentProps,
) {
  const router = useRouter();

  const coatSrc = props.origin.data?.coat ? String(props.origin.data?.coat).replace('+html', '+xml') : '';

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Prevent default redirect
    router.push(Pages.SIGNUP); // Redirect to the desired URL
  };
  useEffect(() => {
    handleSignOut();
  }, []);
  const {
    resetCountryCodeKey,
    formValues,
    errors,
    countryCodes,
    resendEmail,
    setFormValues,
    setErrors,
    handleCodeSelectChange,
    handleSubmit,
    setResendEmail,
  } = useSignUp({
    countriesData: props.countries,
    countryCodesData: props.phoneCodes,
  });


  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: '110px', // Set the desired width here
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      borderWidth: 1,
      fontSize: '14px',
      paddingTop: '5px',
      paddingBottom: '5px',
      height: '45px',
      borderColor: state.isFocused
        ? errors.phoneCode
          ? Colors.PRIMARYRED
          : Colors.PRIMARYGREEN
        : errors.phoneCode
          ? Colors.PRIMARYRED
          : Colors.PRIMARYBLUE,
      boxShadow: 'none',
      '&:hover': {
        borderColor: state.isFocused
          ? errors.phoneCode
            ? Colors.PRIMARYRED
            : Colors.PRIMARYGREEN
          : errors.phoneCode
            ? Colors.PRIMARYRED
            : Colors.PRIMARYBLUE,
      },
    }),
    input: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYBLUE,
      backgroundColor: 'transparent',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYBLUE,
      backgroundColor: 'transparent',
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
      '&:hover': {
        color: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYSLATE,
    }),
  };


  return (
    <>

      {resendEmail ? (
        <InValidLinkComponent
          isArrow={resendEmail}
          setIsArrow={setResendEmail}
          description="
            Unfortunately email was not sent.
            You can resend the link by filling email
            and press continue button.
            Verification link will be resend to your email"
          heading="Resend Email"
          icon={<OpenEmailIcon />}
          setModal={setResendEmail}
        />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-[-20px] flex items-center justify-center"
        >
          <div className="w-full">
            <div className="mb-10 mt-20 -ml-10 flex justify-center">
              <div
                className="absolute z-10 left-10 top-10 rotate-180 transform cursor-pointer"
                onClick={() => { if (!resendEmail) router.push(Pages.LANDING) }}
              >
                <ArrowRightSvg />
              </div>
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
                    {props.origin.data?.countryFullName}
                  </p>

                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
                Sign Up
              </p>
            </div>
            <div className="mt-3 flex justify-center">
              <p className="text-xs text-logoColorGreen lg:text-base">
                Create a new {props.origin.data?.countryName} visa system
                account
              </p>
            </div>
            <div className="mt-10 flex justify-center">
              <InputComponent
                label={'First Names'}
                maxLength={32}
                minLength={3}
                type={'text'}
                placeholder={'Enter your first names'}
                name={'firstName'}
                value={formValues.firstName}
                className="w-10/12 md:w-1/2"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, formValues, setFormValues, errors, setErrors)
                }
                error={errors.firstName}
              />
            </div>
            <div className="mt-6 flex justify-center">
              <InputComponent
                label={'Last Name'}
                maxLength={34}
                minLength={3}
                type={'text'}
                placeholder={'Enter your last name'}
                name={'surName'}
                value={formValues.surName}
                className="w-10/12 md:w-1/2"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, formValues, setFormValues, errors, setErrors)
                }
                error={errors.surName}
              />
            </div>
            <div className="mt-6 flex justify-center">
              <InputComponent
                label={'Email'}
                maxLength={36}
                type={'text'}
                placeholder={'Enter your email address'}
                name={'email'}
                value={formValues.email}
                className="w-10/12 md:w-1/2"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, formValues, setFormValues, errors, setErrors)
                }
                error={errors.email}
              />
            </div>
            {/* <div className="mt-6 flex w-full justify-center">
              <div className="w-10/12 md:w-1/2">
                <label className="text-sm font-semibold text-logoColorBlue">
                  Country of Origin
                </label>
                <Select
                  key={resetKey}
                  options={countries}
                  onChange={handleSelectChange}
                  placeholder="Select your country"
                  styles={countryCustomStyles}
                />
                {errors.alpha3 && (
                  <span className="text-sm text-red-500">{errors.alpha3}</span>
                )}
              </div>
            </div> */}
            <div className="mt-6 flex items-center justify-center">
              <div className="w-10/12 md:w-1/2">
                <label className="text-sm font-semibold text-logoColorBlue">
                  Phone Number
                </label>
                <div className="flex">
                  <div className="mr-2 mt-1">
                    <Select
                      key={resetCountryCodeKey}
                      options={countryCodes}
                      onChange={handleCodeSelectChange}
                      styles={customStyles}
                    />
                    {errors.alpha3 && (
                      <span className="text-sm text-red-500">
                        {errors.phoneCode}
                      </span>
                    )}
                  </div>
                  <InputComponent
                    label={''}
                    maxLength={18}
                    type={'text'}
                    placeholder={'Enter your phone number'}
                    name={'mobileNo'}
                    value={formValues.mobileNo.toString()}
                    className="w-10/12 md:w-96"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(
                        e,
                        formValues,
                        setFormValues,
                        errors,
                        setErrors,
                      )
                    }
                    error={errors.mobileNo}
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <button
                type="submit"
                className="w-10/12 md:w-1/2 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-base text-white"
              >
                Sign Up
              </button>
            </div>
            <div className="mt-3 flex justify-center">
              <p className="mt-4 text-xs lg:text-base">
                Already have an account?
                <Link href={Pages.SIGNIN}>
                  <span className="font-bold text-logoColorBlue">Sign In</span>
                </Link>
              </p>
            </div>
            <div className="mt-3 flex justify-center">
              <p className="text-xs lg:text-base">
                Didn't receive the email?
                <span
                  onClick={() => setResendEmail(true)}
                  className="cursor-pointer font-bold text-logoColorBlue"
                >
                  Resend Email
                </span>
              </p>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
