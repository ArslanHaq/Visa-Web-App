import { validateVerificationForm } from '@/constants/functions';
import { VerificationResponseDto } from '@/dto/Signup.dto';
import { checkVerificationLink, codeVerification } from '@/server/Signup';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Pages } from '@/constants/constants';

interface VerificationSignUpHookProps {
  verificationCode: string | null;
}
export const useVerificationSignUp = ({
  verificationCode,
}: VerificationSignUpHookProps) => {
  const router = useRouter();
  const [inValidLink, setInValidLink] = useState(false);
  const [loading, setLoading] = useState(true);

  const [resendLinkSuccess, setResendLinkSuccess] = useState(false);

  const [formValues, setFormValues] = useState<VerificationResponseDto>({
    pinCode: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<VerificationResponseDto>({
    pinCode: '',
    password: '',
    confirmPassword: '',
  });

  const [verificationCodeWrong, setVerificationCodeWrong] = useState({
    verificationCodeWrong: false,
    attempts: 3,
  });

  const [submitModal, setSubmitModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateVerificationForm(formValues);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (!hasErrors) {
      const response = await codeVerification({
        password: formValues.password,
        verificationToken: verificationCode as string,
        pinCode: formValues.pinCode,
      });
      if (response.error && response.error.length > 0) {
        response.error.forEach((err: any) => {
          if (String(err.code) === '216') {
            setInValidLink(true);
            toast.error(`Error ${err.code}: ${err.description}`);
          } else if (String(err.code) === '219') {
            setVerificationCodeWrong({
              verificationCodeWrong: true,
              attempts: verificationCodeWrong.attempts - 1,
            });
          } else if (String(err.code) === '221') {
            router.push(`${Pages.SIGNIN}`);
          } else {
            setVerificationCodeWrong({
              verificationCodeWrong: true,
              attempts: verificationCodeWrong.attempts - 1,
            });
          }
        });
      } else {
        setSubmitModal(true);
        resetForm();
      }
    }
  };
  const resetForm = () => {
    setFormValues({
      pinCode: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({
      pinCode: '',
      password: '',
      confirmPassword: '',
    });
  };

  const validateVerificationLink = async (verificationToken: string) => {
    const response = await checkVerificationLink(verificationToken);
    setLoading(false);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
        if (String(err.code) === '221') {
          router.push(`${Pages.SIGNIN}`);
        } else {
          setInValidLink(true);
        }
      });
    } else {
      toast.success('link is verified successfully');
      setInValidLink(false);
    }
  };

  useEffect(() => {
    if (verificationCode) {
      validateVerificationLink(verificationCode);
    }
  }, []);

  useEffect(() => {
    if (verificationCodeWrong.attempts === 0) {
      setInValidLink(true);
    }
  }, [verificationCodeWrong]);
  return {
    resendLinkSuccess,
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
    setResendLinkSuccess,
  };
};
