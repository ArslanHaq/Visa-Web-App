import SignUpLeftContainerComponent from '../molecules/SignUpLeftContainerComponent';

import {
  getCountryData,
  getCountryOrigin,
  getPhoneCodeData,
} from '@/server/Signup';
import { CountriesDataDto, PhoneCodeDto } from '@/dto/Signup.dto';
import SignUpRightComponent from '../molecules/SignUpRightComponent';

export default async function SignUpComponent() {
  const phoneCodes: PhoneCodeDto | any = await getPhoneCodeData();
  const origin: any = await getCountryOrigin();
  const countries: CountriesDataDto | any = await getCountryData();

  return (
    <div className="flex w-full items-center">
      <div className="hidden w-full items-center md:flex">
        <div className="w-1/2 pt-0">
          <SignUpLeftContainerComponent
            countries={countries}
            phoneCodes={phoneCodes}
            origin={origin}
          />
        </div>
        <div className="relative flex h-svh w-1/2 flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-logoColorGreen to-logoColorBlue">
          <SignUpRightComponent origin={origin} />
        </div>
      </div>
      <div className="w-full flex-col md:hidden">
        <div className="relative flex py-20 w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-logoColorGreen to-logoColorBlue">
          <SignUpRightComponent origin={origin} />
        </div>
        <div className="w-full py-20 relative">
          <SignUpLeftContainerComponent
            countries={countries}
            phoneCodes={phoneCodes}
            origin={origin}
          />
        </div>
      </div>
    </div>
  );
}
