import { SignupDto } from '@/dto/Signup.dto';
import { Dispatch, SetStateAction } from 'react';
import { ForgotPasswordErrors, SignInErrors, SignUpErrors } from './constants';
import { ForgotPasswordDto, SignInDto } from '@/dto/SignIn.dto';

export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  formValues: SignupDto,
  setFormValues: Dispatch<SetStateAction<SignupDto>>,
  errors: SignUpErrors,
  setErrors: Dispatch<SetStateAction<SignUpErrors>>,
) => {
  const { name, value } = e.target;

  if (name === 'phoneNumber') {
    const numericValue = value.replace(/[^0-9]/g, '');
    setFormValues({
      ...formValues,
      [name]: numericValue === '' ? '' : (Number(numericValue) as any),
    });

    if (numericValue.trim() !== '') {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  } else if (name === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(value);
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (!isValidEmail) {
      setErrors({
        ...errors,
        [name]: 'Invalid email address',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  } else {
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
  }
};

export const handleChangeSignIn = (
  e: React.ChangeEvent<HTMLInputElement>,
  formValues: SignInDto,
  setFormValues: Dispatch<SetStateAction<SignInDto>>,
  errors: SignInErrors,
  setErrors: Dispatch<SetStateAction<SignInErrors>>,
) => {
  const { name, value } = e.target;

  if (name === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(value);
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (!isValidEmail) {
      setErrors({
        ...errors,
        [name]: 'Invalid email address',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  } else {
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
  }
};

export const handleChangeForgotPassword = (
  e: React.ChangeEvent<HTMLInputElement>,
  formValues: ForgotPasswordDto,
  setFormValues: Dispatch<SetStateAction<ForgotPasswordDto>>,
  errors: ForgotPasswordErrors,
  setErrors: Dispatch<SetStateAction<ForgotPasswordErrors>>,
) => {
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
};
export const validateFirstName = (value: string) => {
  return value.trim() === '' ? 'FirstName cannot be empty' : '';
};

export const validateSurName = (value: string) => {
  return value.trim() === '' ? 'SurName cannot be empty' : '';
};

export const validateCountryName = (value: string) => {
  return value.trim() === '' ? 'CountryName cannot be empty' : '';
};

export const validatePhoneNumber = (value: string) => {
  return value.toString().trim() === '' ? 'PhoneNumber cannot be empty' : '';
};

export const validateEmail = (value: string) => {
  if (value.trim() === '') {
    return 'Email cannot be empty';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? 'Invalid email address' : '';
  }
};

export const validateCountryCode = (value: string) => {
  return value.trim() === '' ? 'CountryCode cannot be empty' : '';
};
export const validateForm = (formValues: SignupDto) => {
  return {
    firstName: validateFirstName(formValues.firstName),
    surName: validateSurName(formValues.surName),
    countryName: validateCountryName(formValues.countryName),
    phoneNumber: validatePhoneNumber(String(formValues.phoneNumber)),
    email: validateEmail(formValues.email),
    countryCode: validateCountryCode(formValues.countryCode),
  };
};

export const validateSignInForm = (formValues: SignInDto) => {
  return {
    email: validateEmail(formValues.email),
    password:
      formValues.password.trim() === '' ? 'Password cannot be empty' : '',
  };
};

export const validateForgotPasswordForm = (formValues: ForgotPasswordDto) => {
  return {
    password:
      formValues.password.trim() === '' ? 'Password cannot be empty' : '',
    confirmPassword:
      formValues.confirmPassword.trim() === ''
        ? 'Confirm Password cannot be empty'
        : formValues.password !== formValues.confirmPassword
          ? 'Passwords do not match'
          : '',
  };
};
export const validateEmailForm = (formValues: any) => {
  return {
    email: validateEmail(formValues.email),
  };
};
