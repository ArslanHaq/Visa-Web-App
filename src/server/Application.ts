'use server';

import { ApiRoutes } from '@/constants/constants';
import {
  ApplicationDataDto,
  ApplicationDataRequestDto,
  ApplicationListResponseDto,
  ApplicationRequestDto,
  ContactDetailsDto,
  FinancialDetailsDto,
  TravelPlanDto,
  VisaDurationResponse,
  personalDetailsDto,
  visaTypeDto,
  visaTypeResponse,
} from '@/dto/ApplicationData.dto';
import { ViewDocumentResponse } from '@/dto/DocumentData.dto';
import { ApiResponse } from '@/dto/SignIn.dto';
import { get, post, remove } from '@/utils/api';

export async function getVisaTypes(): Promise<visaTypeResponse> {
  try {
    const response = await get(ApiRoutes.VISATYPES);
    if (response.status == 401) {
      return {
        data: [],
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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
export async function getVisaDuration(): Promise<VisaDurationResponse> {
  try {
    const response = await get(ApiRoutes.VISADURATION);
    if (response.status == 401) {
      return {
        data: [],
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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
export async function getVisaSubTypeResponse(visaType: string) {
  try {
    const response = await get(
      `${ApiRoutes.VISASUBTYPES}/?VisaType=${visaType}`,
    );
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
    return response.json();
  } catch (error: any) {
    return error.response.data.message;
  }
}

export async function submitApplication(data: ApplicationDataRequestDto) {
  try {
    const response = await post(ApiRoutes.APPLICATION, data);
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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

export async function getApplication(trackingId: string) {
  try {
    const response = await get(
      `${ApiRoutes.APPLICATION}/?TrackingId=${trackingId}`,
    );
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
    const responseData: ApplicationRequestDto = await response.json();
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
export async function submitPersonlaDetails(data: personalDetailsDto) {
  try {
    const response = await post(ApiRoutes.PERSONALDETAILS, data);
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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

export async function getPersonalDetails(trackingId: string) {
  try {
    const response = await get(
      `${ApiRoutes.PERSONALDETAILS}/?TrackingId=${trackingId}`,
    );
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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

export async function submitContactDetails(data: ContactDetailsDto) {
  try {
    const response = await post(ApiRoutes.CONTACTDETAILS, data);
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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
export async function getContactDetails(trackingId: string) {
  try {
    const response = await get(
      `${ApiRoutes.CONTACTDETAILS}/?TrackingId=${trackingId}`,
    );
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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

export async function submitFinancialDetails(data: FinancialDetailsDto) {
  try {
    const response = await post(ApiRoutes.FINANCIALDETAILS, data);
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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
export async function getFinancialDetails(trackingId: string) {
  try {
    const response = await get(
      `${ApiRoutes.FINANCIALDETAILS}/?TrackingId=${trackingId}`,
    );
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }

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
export async function getLastSection(trackingId: string) {
  try {
    const response = await get(
      `${ApiRoutes.LASTSECTION}/?TrackingId=${trackingId}`,
    );
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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

export async function getApplicationList(
  offset: number,
  limit: number,
  status?: string,
): Promise<ApplicationListResponseDto> {
  try {
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      ...(status !== undefined && { status: status }),
    });
    const response = await get(
      `${ApiRoutes.APPLICATIONLIST}/?${queryParams.toString()}`,
    );
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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

export async function getVisaFee(visaType: string, visaSubType: string) {
  try {
    const response = await get(
      `${ApiRoutes.FEES}/?visaType=${visaType}&visaSubType=${visaSubType}`,
    );
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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

export async function submitTravelPlan(data: TravelPlanDto) {
  try {
    const response = await post(ApiRoutes.TRAVELPLAN, data);
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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
export async function getTravelPlans(trackingId: string) {
  try {
    const response = await get(
      `${ApiRoutes.TRAVELPLAN}/?TrackingId=${trackingId}`,
    );
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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

export async function getApplicationData(trackingId: string) {
  try {
    const response = await get(
      `${ApiRoutes.APPLICATIONDATA}?TrackingId=${trackingId}`,
    );
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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

export default async function submitCompleteApplication(trackingId: string) {
  try {
    const response = await post(`${ApiRoutes.SUBMITAPPLICATION}`, {
      TrackingId: trackingId,
    });
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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

export async function uploadDocument(
  trackingId: string,
  documentId: string,
  documentData: string,
) {
  try {
    const response = await post(`${ApiRoutes.UPLOADDOCUMENT}`, {
      trackingId: trackingId,
      documentId: documentId,
      documentData: documentData,
    });
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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

export async function getUploadedDocuments(trackingId: string) {
  try {
    const response = await get(
      `${ApiRoutes.GETDOCUMENTSDATA}?TrackingId=${trackingId}`,
    );
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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

export async function getComment(trackingId: string) {
  try {
    const response = await get(
      `${ApiRoutes.COMMENTDATA}?TrackingId=${trackingId}`,
    );
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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
export async function deleteDocument(trackingId: string, documentId: string) {
  try {
    const response = await remove(`${ApiRoutes.UPLOADDOCUMENT}`, {
      TrackingId: trackingId,
      DocumentId: documentId,
    });
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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

export async function viewDocument(
  trackingId: string,
  documentId: string,
): Promise<ViewDocumentResponse> {
  try {
    const response = await get(
      `${ApiRoutes.UPLOADDOCUMENT}/${documentId}?TrackingId=${trackingId}`,
    );
    if (response.status == 401) {
      return {
        data: null as any,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData, error: null };
    } else {
      return {
        data: {
          data: null,
          error: responseData,
        },
        error: responseData.error,
      };
    }
  } catch (error: any) {
    return {
      data: {
        data: null,
        error: null,
      },
      error: [{ description: 'An unexpected error occurred', code: '500' }],
    };
  }
}

export async function uploadPicture(
  trackingId: string,
  photographBase64: string,
) {
  try {
    const response = await post(`${ApiRoutes.UPLOADPHOTO}`, {
      trackingId: trackingId,
      photographBase64: photographBase64,
    });
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
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

export async function uploadedPicture(trackingId: string) {
  try {
    const response = await get(
      `${ApiRoutes.UPLOADPHOTO}?TrackingId=${trackingId}`,
    );
    if (response.status == 401) {
      return {
        data: null,
        error: [{ description: 'Unauthorized', code: '401' }],
      };
    }
    const responseData = await response.json();
    if (response.ok) {
      return { data: responseData, error: null };
    } else {
      return {
        data: {
          data: null,
          error: responseData,
        },
        error: responseData.error,
      };
    }
  } catch (error: any) {
    return {
      data: {
        data: null,
        error: null,
      },
      error: [{ description: 'An unexpected error occurred', code: '500' }],
    };
  }
}
