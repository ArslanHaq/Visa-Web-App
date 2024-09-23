import { SignupDto, VerificationResponseDto } from '@/dto/Signup.dto';
import { Dispatch, SetStateAction } from 'react';

import {
  ForgotPasswordDto,
  ForgotPasswordErrors,
  SignInDto,
} from '@/dto/SignIn.dto';
import {
  ApplicationDataDto,
  ContactDetailsDto,
  FinancialDetailsDto,
  TravelPlanDto,
  personalDetailsDto,
} from '@/dto/ApplicationData.dto';
import { toast } from 'react-toastify';
import { set } from 'animejs';

export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  formValues: SignupDto,
  setFormValues: Dispatch<SetStateAction<SignupDto>>,
  errors: SignupDto,
  setErrors: Dispatch<SetStateAction<SignupDto>>,
) => {
  const { name, value } = e.target;

  if (name === 'mobileNo') {
    const numericValue = value.replace(/[^0-9]/g, '');
    setFormValues({
      ...formValues,
      [name]: numericValue,
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
  errors: SignInDto,
  setErrors: Dispatch<SetStateAction<SignInDto>>,
) => {
  const { name, value } = e.target;

  if (name === 'userName') {
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

  if (name === 'password') {
    const passwordRegex = /^(?=.*[\W_]).{8,}$/;
    const isValidPassword = passwordRegex.test(value);
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (!isValidPassword) {
      setErrors({
        ...errors,
        [name]:
          'Password must contain at least one special character and be at least 8 characters long',
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

export const handleChangeVerification = (
  e: React.ChangeEvent<HTMLInputElement>,
  formValues: VerificationResponseDto,
  setFormValues: Dispatch<SetStateAction<VerificationResponseDto>>,
  errors: VerificationResponseDto,
  setErrors: Dispatch<SetStateAction<VerificationResponseDto>>,
) => {
  const { name, value } = e.target;

  if (name === 'pinCode') {
    const numericValue = value.replace(/[^0-9]/g, '');
    setFormValues({
      ...formValues,
      [name]: numericValue,
    });

    if (numericValue.trim() !== '') {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  } else if (name === 'password') {
    const passwordRegex = /^(?=.*[\W_]).{8,}$/;
    const isValidPassword = passwordRegex.test(value);
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (!isValidPassword) {
      setErrors({
        ...errors,
        [name]:
          'Password must contain at least one special character and be at least 8 characters long',
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

export const handleApplicationData = (
  e: React.ChangeEvent<HTMLInputElement>,
  formValues: ApplicationDataDto,
  setFormValues: Dispatch<SetStateAction<ApplicationDataDto>>,
  errors: ApplicationDataDto,
  setErrors: Dispatch<SetStateAction<ApplicationDataDto>>,
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

export const handlePersonalDetails = (
  e: React.ChangeEvent<HTMLInputElement>,
  formValues: personalDetailsDto,
  setFormValues: Dispatch<SetStateAction<personalDetailsDto>>,
  errors: personalDetailsDto,
  setErrors: Dispatch<SetStateAction<personalDetailsDto>>,
) => {
  const { name, value } = e.target;

  if (name === 'firstName' || name === 'lastName' || name === 'birthCity') {
    const nameRegex = /^(?! )(?!.* {2})[A-Za-z]+( [A-Za-z]+)*(?! )$/;
    const isValidName = nameRegex.test(value);
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (!isValidName) {
      setErrors({
        ...errors,
        [name]:
          'Invalid name format. Name should not contain special characters or numbers',
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

export const handleContactDetails = (
  e: React.ChangeEvent<HTMLInputElement>,
  formValues: ContactDetailsDto,
  setFormValues: Dispatch<SetStateAction<ContactDetailsDto>>,
  errors: ContactDetailsDto,
  setErrors: Dispatch<SetStateAction<ContactDetailsDto>>,
) => {
  const { name, value } = e.target;
  if (name === 'email1' || name === 'email2') {
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
  } else if (name === 'landline1' || name === 'landline2') {
    const numericValue = value.replace(/[^0-9]/g, '');
    setFormValues({
      ...formValues,
      [name]: numericValue,
    });

    if (numericValue.trim() !== '') {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  } else if (name === 'mobile1' || name === 'mobile2') {
    const numericValue = value.replace(/[^0-9]/g, '');
    setFormValues({
      ...formValues,
      [name]: numericValue,
    });

    if (numericValue.trim() !== '') {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  } else if (name === 'postalCode') {
    const numericValue = value.replace(/[^0-9]/g, '');
    setFormValues({
      ...formValues,
      [name]: numericValue,
    });

    if (numericValue.trim() !== '') {
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

export const handleFinancialDetails = (
  e: React.ChangeEvent<HTMLInputElement>,
  formValues: FinancialDetailsDto,
  setFormValues: Dispatch<SetStateAction<FinancialDetailsDto>>,
  errors: FinancialDetailsDto,
  setErrors: Dispatch<SetStateAction<FinancialDetailsDto>>,
) => {
  const { name, value } = e.target;
  if (name === 'cashHoldingAmount') {
    const numericValue = value.replace(/[^0-9]/g, '');
    setFormValues({
      ...formValues,
      [name]: numericValue,
    });

    if (numericValue.trim() !== '') {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  } else if (name === 'currency') {
    setFormValues({
      ...formValues,
      [name]: value.toUpperCase(),
    });
  } else if (name === 'postalCode') {
    const numericValue = value.replace(/[^0-9]/g, '');
    setFormValues({
      ...formValues,
      [name]: numericValue,
    });

    if (numericValue.trim() !== '') {
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

export const handleTravelPlan = (
  e: React.ChangeEvent<HTMLInputElement>,
  formValues: TravelPlanDto,
  setFormValues: Dispatch<SetStateAction<TravelPlanDto>>,
  errors: TravelPlanDto,
  setErrors: Dispatch<SetStateAction<TravelPlanDto>>,
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
  if (value.trim() === '') {
    return 'FirstName cannot be empty';
  } else {
    const nameRegex = /^(?! )(?!.* {2})[A-Za-z]+( [A-Za-z]+)*(?! )$/;
    return !nameRegex.test(value)
      ? 'Invalid name format. Name should not contain special characters or numbers'
      : '';
  }
};

export const validateSurName = (value: string) => {
  if (value.trim() === '') {
    return 'SurName cannot be empty';
  } else {
    const nameRegex = /^(?! )(?!.* {2})[A-Za-z]+( [A-Za-z]+)*(?! )$/;
    return !nameRegex.test(value)
      ? 'Invalid name format. Name should not contain special characters or numbers'
      : '';
  }
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

export const validateCountryCode = (value: number) => {
  return String(value).trim() === '' ? 'CountryCode cannot be empty' : '';
};
export const validateForm = (formValues: SignupDto) => {
  return {
    firstName: validateFirstName(formValues.firstName),
    surName: validateSurName(formValues.surName),
    alpha3: '',
    mobileNo: validatePhoneNumber(String(formValues.mobileNo)),
    email: validateEmail(formValues.email),
    phoneCode: validateCountryCode(parseInt(formValues.phoneCode)),
  };
};

export const validateSignInForm = (formValues: SignInDto) => {
  return {
    userName: validateEmail(formValues.userName),
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

export const validateVerificationForm = (
  formValues: VerificationResponseDto,
) => {
  return {
    pinCode:
      formValues.pinCode.toString().trim() === '' ? 'Code cannot be empty' : '',
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

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export async function handleFetch<T>(
  fetchFunction: (
    trackingId: string,
  ) => Promise<{ data: { data: T } | null; error: any[] | null }>,
  trackingId: string,
  detailName: string,
): Promise<T | null> {
  const result = await fetchFunction(trackingId);
  if (result.error && result.error.length > 0) {
    result.error.forEach((err: any) => {
      toast.error(`${detailName} Error ${err.code}: ${err.description}`);
    });
    return null;
  } else {
    if (!result.data?.data) return null;
    return result.data.data;
  }
}
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export function capitalizeWords(str: string | null | undefined): string {
  // Check if the input is null or undefined and return an empty string or a default value
  if (str == null) {
    return '';
  }

  // Capitalize the first letter of each word in the string
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
