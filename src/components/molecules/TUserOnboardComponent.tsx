import { ChangeEvent } from 'react';
import InputComponent from '../atoms/InputComponent';

interface TUserOnboardComponentProps {
  code: string;
  setCode: (e: string) => void;
  error: string;
  submitTwoFactor: () => void;
}
export default function TUserOnboardComponent({
  code,
  setCode,
  error,
  submitTwoFactor,
}: TUserOnboardComponentProps) {
  return (
    <div className="rounded-lg bg-slate-200 px-4 md:px-20 py-16 text-center shadow-lg">
      <div>
        <p className="text-base font-bold text-logoColorBlue">
          Two Factor Authentication
        </p>
        <div className="mt-3 h-[1px] bg-slate-300" />
      </div>
      <div>
        <div className="mb-3 mt-6 rounded-lg bg-white p-12 text-center shadow-lg">
          <div>
            <p className="max-w-md text-xs md:text-sm font-normal text-logoColorGreen">
              Your account is protected with two-factor authentication. Open
              Google Authenticator app on your mobile phone and provide
              verification code below
            </p>
          </div>
          <div className="mt-10 text-start">
            <p className="text-sm font-bold text-logoColorBlue">
              Enter your 6-digit code
            </p>
            <div className="mt-1">
              <InputComponent
                label={''}
                type={'text'}
                maxLength={6}
                placeholder={'Enter your 6-digit code here'}
                name={'code'}
                value={code}
                className="md:w-10/12"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const { value } = e.target;
                  const code = value.replace(/[^0-9]/g, '');
                  setCode(code);
                }}
                error={error}
              />
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <button
              onClick={submitTwoFactor}
              className="w-3/4 md:w-1/2 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-3 text-sm md:text-base text-white"
            >
              Verify Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
