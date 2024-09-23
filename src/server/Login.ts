'use server';
import { ApiRoutes } from '@/constants/constants';
import { ApiResponse, QRCode, SignInDto } from '@/dto/SignIn.dto';
import { post } from '@/utils/api';

export async function login(data: SignInDto) {
  try {
    const response = await post(ApiRoutes.LOGIN, data);
    const responseData: ApiResponse = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: null };
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

export async function getQrCode(userName: string) {
  try {
    const response = await post(ApiRoutes.AUTHENTICATOR, { userName });
    const responseData: QRCode = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: null };
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

export async function verifyQrCode(code: string, userName: string) {
  try {
    const response = await post(ApiRoutes.VERIFYAUTHENTICATOR, {
      code,
      userName,
    });
    const responseData: ApiResponse = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: null };
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

export async function twoFactorAuthenticate(code: string, userName: string) {
  try {
    const response = await post(ApiRoutes.TWOFACTORAUTH, {
      code,
      userName,
    });
    const responseData: ApiResponse = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: null };
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

export async function forgotPassword(email: string) {
  try {
    const response = await post(ApiRoutes.FORGOTPASSWORD, { email });
    const responseData: ApiResponse = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: null };
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
export async function checkForgotPasswordVerificationLink(
  verificationToken: string,
) {
  try {
    const response = await post(ApiRoutes.FORGOTPASSWORDVERIFY, {
      resetLinkCode: verificationToken,
    });
    const responseData: ApiResponse = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: null };
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

export async function forgotPasswordWithLink(
  password: string,
  resetLinkCode: string,
) {
  try {
    const response = await post(ApiRoutes.FORGOTPASSWORDWITHLINK, {
      password,
      resetLinkCode,
    });
    const responseData: ApiResponse = await response.json();
    if (response.ok) {
      return { data: responseData.data, error: null };
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
