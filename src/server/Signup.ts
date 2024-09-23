'use server';

import { ApiRoutes, Pages } from '@/constants/constants';
import {
  CoatOfArmsResponse,
  CountriesDataDto,
  OccupationDto,
  OriginDto,
  PhoneCodeDto,
  SignupDto,
} from '@/dto/Signup.dto';

import { get, post } from '@/utils/api';
import { revalidatePath } from 'next/cache';

export async function getCountryData(): Promise<CountriesDataDto> {
  try {
    const response = await get(ApiRoutes.COUNTRY);
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: [] };
    } else {
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    return {
      data: [],
      error: [{ description: 'An unexpected error occurred', code: '500' }],
    };
  }
}

export async function getPhoneCodeData(): Promise<PhoneCodeDto> {
  try {
    const response = await get(ApiRoutes.PHONECODE);
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: [] };
    } else {
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    return {
      data: [],
      error: [{ description: 'An unexpected error occurred', code: '500' }],
    };
  }
}
export async function getCountryOrigin(): Promise<OriginDto> {
  try {
    const response = await get(ApiRoutes.COUNTRYORIGIN);
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: [] };
    } else {
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    return {
      data: null,
      error: [{ description: 'An unexpected error occurred', code: '500' }],
    };
  }
}

export async function getOccupationsData(): Promise<OccupationDto> {
  try {
    const response = await get(ApiRoutes.OCCUPATION);
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: [] };
    } else {
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    return {
      data: [],
      error: [{ description: 'An unexpected error occurred', code: '500' }],
    };
  }
}
export async function register(data: SignupDto) {
  try {
    const response = await post(ApiRoutes.REGISTER, data);
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData, error: null };
    } else {
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    return {
      data: null,
      error: [{ description: 'An unexpected error occurred', code: '500' }],
    };
  }
}

export async function resendVerificationEmail(email: string) {
  try {
    const response = await post(ApiRoutes.RESENDVERIFICATIONEMAIL, { email });
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData, error: null };
    } else {
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    return {
      data: null,
      error: [{ description: 'An unexpected error occurred', code: '500' }],
    };
  }
}

interface VerificationCodeDto {
  password: string;
  verificationToken: string;
  pinCode: string;
}
export async function codeVerification(data: VerificationCodeDto) {
  try {
    const response = await post(ApiRoutes.CODEVERIFICATION, data);
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData, error: null };
    } else {
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    return {
      data: null,
      error: [{ description: 'An unexpected error occurred', code: '500' }],
    };
  }
}

export async function checkVerificationLink(verificationToken: string) {
  try {
    const response = await post(ApiRoutes.CHECKCODEVERIFICATION, {
      verificationToken,
    });
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData, error: null };
    } else {
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    return {
      data: null,
      error: [{ description: 'An unexpected error occurred', code: '500' }],
    };
  }
}

export async function getCoatOfArms(): Promise<CoatOfArmsResponse> {
  try {
    const response = await get(ApiRoutes.COATOFARMS);
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: [] };
    } else {
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    return {
      data: [],
      error: [{ description: 'An unexpected error occurred', code: '500' }],
    };
  }
}

export async function saveCoatOfArms(alpha3: string, countryFullName: string) {
  try {
    const response = await post(ApiRoutes.COATOFARMS, {
      alpha3: alpha3,
      countryFullName: countryFullName,
    });
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData, error: null };
    } else {
      return { data: null, error: responseData.error };
    }
  } catch (error: any) {
    return {
      data: null,
      error: [{ description: 'An unexpected error occurred', code: '500' }],
    };
  }
}

export async function getFlagDetails(FlagName: string, CoatName: string) {
  try {
    const response = await get(
      `${ApiRoutes.FLAGDETAILS}/?FlagName=${FlagName}&CoatName=${CoatName}`,
    );
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: [] };
    } else {
      return { data: [], error: responseData.error };
    }
  } catch (error: any) {
    return {
      data: [],
      error: [{ description: 'An unexpected error occurred', code: '500' }],
    };
  }
}
