export interface ViewApplicationDataDto {
  applicationData: ApplicationDataRequestDto | null;
  personalInformation: personalDetailsDto | null;
  contactDetail: ContactDetailsDto | null;
  financialInformation: FinancialDetailsDto | null;
  travelPlan: TravelPlanDto | null;
}
export interface ApplicationDataDto {
  visaType: string;
  visaSubType: string;
  nationality: string;
  visaFee: string;
  visaCurrency: {
    alpha3: string;
    countryName: string;
    currencyName: string;
  };
  entryType?: string;
  durationId?: number;
  visaSubTypeDescription?: string;
  visaTypeDescription?: string;
  duration?: string;
  nationalityName?: string;
}
export interface ApplicationDataRequestDto {
  visaType: string;
  visaSubType: string;
  nationality: string;
  visaFee: string;
  visaCurrency: string;
  trackingId?: string;
  status?: string;
  entryType?: string;
  durationId?: string;
  duration?: string;
  visaSubTypeDescription?: string;
  visaTypeDescription?: string;
  nationalityName?: string;
}
export interface ApplicationRequestDto {
  data: ApplicationDataDto | null;
  error: any[];
}

export interface visaTypeDto {
  visaType: string;
  description: string;
}
export interface visaTypeResponse {
  data: visaTypeDto[];
  error: any[];
}
export interface VisaDurationResponse {
  data: VisaDuration[];
  error: any[];
}
export interface VisaDuration {
  durationId: number;
  duration: string;
}
export interface personalDetailsDto {
  trackingId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  birthCity: string;
  birthCountry: string;
  birthCountryName?: string;
  sex: string;
  maritalStatus: string;
  nationality: string;
  nationalityName?: string;
  passportNumber: string;
  issuingCountry: string;
  issuingCountryName?: string;
  occupation: string;
  occupationName?: string;
  photographBase64: string;
}

export interface ContactDetailsDto {
  trackingId: string;
  email1: string;
  email2: string;
  landline1: string;
  landline2: string;
  mobile1: string;
  phoneCode1: string;
  mobile2: string;
  phoneCode2: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  postalCode: string;
  country: string;
  countryName?: string;
  socialMedia: SocialMediaLinks[];
}

export interface SocialMediaLinks {
  trackingId: string;
  link: string;
  socialMediaApp: string;
}
export interface ApplicationResponseDto {
  insertionTimestamp: string;
  lastSection: string;
  nationality: string;
  status: string;
  trackingId: string;
  userId: string;
  visaCurrency: string;
  visaFee: string;
  visaSubType: string;
  visaType: string;
}
export interface ApplicationSubmitResponseDto {
  data: ApplicationResponseDto;
  error: any;
}

export interface FinancialDetailsDto {
  trackingId: string;
  sponsorType: string;
  sponsorDetails: string;
  cashHoldingAmount: string;
  accomodationType: string;
  hotelName: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  postalCode: string;
  currency?: string;
}

export interface TravelPlanDto {
  trackingId: string;
  travelDate: string;
  arrivalPort: string;
  cities: string;
  travelHistory?: TravelHistory[];
}

export interface TravelHistory {
  travelDate: string;
  finalDestination: string;
  travelPurpose: string;
  finalDestinationName?: string;
}

export interface InboxDto {
  trackingId: string;
  appliedOn: string;
  status: string;
}

export interface ApplicationListResponseDto {
  data: {
    dataList: DataList[];
    totalCount: number;
  } | null;
  error: any[];
}
export interface DataList {
  trackingId: string;
  status: string;
  userId: string;
  visaType: string;
  visaSubType: string;
  nationality: string;
  visaFee: string;
  visaCurrency: string;
  lastSection: string;
}

export interface DocumentDataType {
  documentId: number;
  documentName: string;
}

export interface DocumentData {
  interviewRequired: string | null;
  otherRequirements: string[] | null;
  documents: DocumentDataType[] | null;
}

interface Data {
  data: DocumentData | null;
  error: any[];
}

export interface BuisnessDataResponse {
  data: Data;
  error: any | null;
}

export interface HeadPose {
  pitch: number;
  yaw: number;
  roll: number;
}

export interface PassportPhotoCheckResults {
  correctProportion: boolean;
  backgroundBlank: boolean;
  imageQuality: boolean;
  imageBrightness: boolean;
  neutralFace: boolean;
  headPose: HeadPose;
  text: string;
  face: number;
  colored: boolean;
}

export interface UploadPhotoResponse {
  data: {
    trackingId: string;
    photographBase64: string | null;
    passportPhotoCheckResults: PassportPhotoCheckResults;
  };
  error: any[]; // Assuming the error array can contain various types, you may adjust this if you have a specific error structure.
}
