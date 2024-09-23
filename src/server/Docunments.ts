'use server';

import { ApiRoutes } from '@/constants/constants';

import { get } from '@/utils/api';

export async function getDocuments(trackingId: string): Promise<any> {
  try {
    const response = await get(
      `${ApiRoutes.DOCUMENTS}?TrackingId=${trackingId}`,
    );
    const responseData = await response.json();

    if (response.ok) {
      return { data: responseData, error: null };
    } else {
      return {
        data: {
          data: [],
          error: responseData.error,
        },
        error: responseData.error,
      };
    }
  } catch (error: any) {
    return {
      data: {
        data: [],
        error: [{ description: error.message, code: error.code }],
      },
      error: [{ description: 'An unexpected error occurred', code: '500' }],
    };
  }
}
