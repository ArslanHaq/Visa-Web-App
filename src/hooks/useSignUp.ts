'use client';
import { validateForm } from '@/constants/functions';
import { CountriesDataDto, PhoneCodeDto, SignupDto } from '@/dto/Signup.dto';
import { register } from '@/server/Signup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pages } from '@/constants/constants';
import { toast } from 'react-toastify';

interface SignUpHookProps {
  countriesData: CountriesDataDto;
  countryCodesData: PhoneCodeDto;
}
export const useSignUp = ({
  countriesData,
  countryCodesData,
}: SignUpHookProps) => {
  const router = useRouter();
  const [resetKey, setResetKey] = useState(0);
  const [resendEmail, setResendEmail] = useState(false);
  const [resetCountryCodeKey, setResetCountryCodeKey] = useState(0);
  const [formValues, setFormValues] = useState<SignupDto>({
    firstName: '',
    surName: '',
    alpha3: '',
    mobileNo: '',
    email: '',
    phoneCode: '',
  });

  const [errors, setErrors] = useState<SignupDto>({
    firstName: '',
    surName: '',
    alpha3: '',
    mobileNo: '',
    email: '',
    phoneCode: '',
  });
  const countries = countriesData.data.map((country) => ({
    value: country.alpha3,
    label: country.countryName,
  }));
  const countryCodes = countryCodesData.data.map((country) => ({
    value: country.phoneCode,
    label: `+${country.phoneCode}`,
  }));

  const handleSelectChange = (selectedOption: any) => {
    setFormValues({
      ...formValues,
      alpha3: selectedOption.value,
    });

    if (selectedOption) {
      setErrors({
        ...errors,
        alpha3: '',
      });
    }
  };

  const handleCodeSelectChange = (selectedOption: any) => {
    setFormValues({
      ...formValues,
      phoneCode: selectedOption.value,
    });

    if (selectedOption) {
      setErrors({
        ...errors,
        phoneCode: '',
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm(formValues);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (!hasErrors) {
      const response = await register({
        firstName: formValues.firstName,
        surName: formValues.surName,
        alpha3: 'AFG',
        mobileNo: formValues.mobileNo,
        email: formValues.email,
        phoneCode: formValues.phoneCode,
      });

      if (response.error && response.error.length > 0) {
        response.error.forEach((err: any) => {
          toast.error(`Error ${err.code}: ${err.description}`);
          if (String(err.code) === '221') {
            router.push(`${Pages.SIGNIN}`);
          }
        });
      } else {
        toast.success('Form submitted successfully');
        resetForm();
        setResetKey((prevKey) => prevKey + 1);
        setResetCountryCodeKey((prevKey) => prevKey + 1);
        const query = `?email=${formValues.email}`;
        router.push(`${Pages.SENTEMAIL}${query}`);
      }
    }
  };
  const resetForm = () => {
    setFormValues({
      firstName: '',
      surName: '',
      alpha3: '',
      mobileNo: '',
      email: '',
      phoneCode: '',
    });
    setErrors({
      firstName: '',
      surName: '',
      alpha3: '',
      mobileNo: '',
      email: '',
      phoneCode: '',
    });
  };
  return {
    resetKey,
    resetCountryCodeKey,
    formValues,
    errors,
    countries,
    countryCodes,
    resendEmail,
    setResetKey,
    setResetCountryCodeKey,
    setFormValues,
    setErrors,
    handleSelectChange,
    handleCodeSelectChange,
    handleSubmit,
    setResendEmail,
  };
};
