'use client';
import Select from 'react-select';
import InputComponent from '../atoms/InputComponent';
import { ChangeEvent, useState } from 'react';
import { SignupDto } from '@/dto/Signup.dto';
import { Colors, Pages, SignUpErrors } from '@/constants/constants';
import { handleChange, validateForm } from '@/constants/functions';
import Link from 'next/link';

export default function SignUpLeftContainerComponent() {
  const [resetKey, setResetKey] = useState(0);
  const [resetCountryCodeKey, setResetCountryCodeKey] = useState(0);

  const [formValues, setFormValues] = useState<SignupDto>({
    firstName: '',
    surName: '',
    countryName: '',
    phoneNumber: '',
    email: '',
    countryCode: '',
  });

  const [errors, setErrors] = useState<SignUpErrors>({
    firstName: '',
    surName: '',
    countryName: '',
    phoneNumber: '',
    email: '',
    countryCode: '',
  });
  const countries = [
    { value: 'AF', label: 'Afghanistan' },
    { value: 'AL', label: 'Albania' },
    { value: 'DZ', label: 'Algeria' },
    { value: 'AS', label: 'American Samoa' },
    { value: 'AD', label: 'Andorra' },
    { value: 'AO', label: 'Angola' },

    // Add more countries here
  ];
  const countryCodes = [
    { value: '+93', label: ' +93 Afghanistan' },
    { value: '+355', label: ' +355 Albania' },
    { value: '+213', label: ' +213 Algeria' },
    { value: '+1-684', label: ' +1-684 American Samoa' },
    { value: '+376', label: ' +376 Andorra' },
    { value: '+244', label: ' +244 Angola' },
  ];

  const handleSelectChange = (selectedOption: any) => {
    setFormValues({
      ...formValues,
      countryName: selectedOption ? selectedOption.label : '',
    });

    if (selectedOption) {
      setErrors({
        ...errors,
        countryName: '',
      });
    }
  };

  const handleCodeSelectChange = (selectedOption: any) => {
    setFormValues({
      ...formValues,
      countryCode: selectedOption.value,
    });

    if (selectedOption) {
      setErrors({
        ...errors,
        countryCode: '',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm(formValues);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (!hasErrors) {
      console.log('Form submitted successfully', {
        ...formValues,
        phoneNumber: formValues.countryCode + formValues.phoneNumber,
      });
      resetForm();
      setResetKey((prevKey) => prevKey + 1);
      setResetCountryCodeKey((prevKey) => prevKey + 1);
    }
  };
  const resetForm = () => {
    setFormValues({
      firstName: '',
      surName: '',
      countryName: '',
      phoneNumber: '',
      email: '',
      countryCode: '',
    });
    setErrors({
      firstName: '',
      surName: '',
      countryName: '',
      phoneNumber: '',
      email: '',
      countryCode: '',
    });
  };
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderWidth: 1,
      fontSize: '14px',
      paddingTop: '5px',
      paddingBottom: '5px',
      borderColor: state.isFocused
        ? errors.countryName
          ? Colors.PRIMARYRED
          : Colors.PRIMARYGREEN
        : errors.countryName
          ? Colors.PRIMARYRED
          : Colors.PRIMARYBLUE,
      boxShadow: 'none',
      '&:hover': {
        borderColor: state.isFocused
          ? errors.countryName
            ? Colors.PRIMARYRED
            : Colors.PRIMARYGREEN
          : errors.countryName
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
    <form
      onSubmit={handleSubmit}
      className="mt-[-20px] flex items-center justify-center"
    >
      <div className="w-full">
        <div className="mt-5 flex justify-center">
          <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
            Sign Up
          </p>
        </div>
        <div className="mt-5 flex justify-center">
          <p className="text-xs text-logoColorGreen lg:text-base">
            Donec sollicitudin molestie malesda sollitudin
          </p>
        </div>
        <div className="mt-10 flex justify-center">
          <InputComponent
            label={'First Name'}
            maxLength={34}
            type={'text'}
            placeholder={'Enter your first name'}
            name={'firstName'}
            value={formValues.firstName}
            className="w-1/2"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e, formValues, setFormValues, errors, setErrors)
            }
            error={errors.firstName}
          />
        </div>
        <div className="mt-6 flex justify-center">
          <InputComponent
            label={'Surname'}
            maxLength={34}
            type={'text'}
            placeholder={'Enter your surname'}
            name={'surName'}
            value={formValues.surName}
            className="w-1/2"
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
            className="w-1/2"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e, formValues, setFormValues, errors, setErrors)
            }
            error={errors.email}
          />
        </div>
        <div className="mt-6 flex w-full justify-center">
          <div className="w-1/2">
            <label className="text-sm font-semibold text-logoColorBlue">
              Country Code
            </label>
            <Select
              key={resetCountryCodeKey}
              options={countryCodes}
              onChange={handleCodeSelectChange}
              placeholder="Select your country code"
              styles={customStyles}
            />
            {errors.countryName && (
              <span className="text-sm text-red-500">{errors.countryCode}</span>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <InputComponent
            label={'Phone Number'}
            maxLength={18}
            type={'text'}
            placeholder={'Enter your phone number'}
            name={'phoneNumber'}
            value={formValues.phoneNumber.toString()}
            className="w-1/2"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e, formValues, setFormValues, errors, setErrors)
            }
            error={errors.phoneNumber}
          />
        </div>
        <div className="mt-6 flex w-full justify-center">
          <div className="w-1/2">
            <label className="text-sm font-semibold text-logoColorBlue">
              Country Name
            </label>
            <Select
              key={resetKey}
              options={countries}
              onChange={handleSelectChange}
              placeholder="Select your country"
              styles={customStyles}
            />
            {errors.countryName && (
              <span className="text-sm text-red-500">{errors.countryName}</span>
            )}
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <button
            type="submit"
            className="w-1/2 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-base text-white"
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
      </div>
    </form>
  );
}
