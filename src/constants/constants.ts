import { Session } from 'next-auth';

export const Colors = {
  PRIMARYBLUE: '#003366',
  PRIMARYGREEN: '#016433',
  PRIMARYRED: '#FF0000',
  PRIMARYSLATE: '#718096',
};
export enum NavbarTitles {
  INBOX = 'Inbox',
  PLANNING = 'Planning',
  STATISTICS = 'Statistics',
  SETTINGS = 'Settings',
  CONTACT = 'Contact',
  SIGNUPNOW = 'Sign Up',
  SIGNIN = 'Sign In',
  VERIFICATION = 'Verification',
  SENTEMAIL = 'Email Sent',
}

export enum Pages {
  APPLICATIONDATA = '/',
  PLANNING = '/planning',
  STATISTICS = '/statistics',
  SETTINGS = '/settings',
  VERIFICATION = '/verification',
  SIGNIN = '/signin',
  SIGNUP = '/signup',
  SENTEMAIL = '/signup/sentEmail',
  FORGOTPASSWORD = '/signin/forgotpassword',
  NEWPASSWORD = '/signin/forgotpassword/newpassword',
  CONTACT = '/contact',
  TWOFACTORAUTH = '/twofactorauth',
  LANDING = '/landing',
  ADMIN = '/admin',
}

export enum ApiRoutes {
  COUNTRY = 'api/Feeders/Countries',
  PHONECODE = 'api/Feeders/PhoneCodes',
  COUNTRYORIGIN = 'api/Feeders/Origin',
  REGISTER = 'api/Registration/Request',
  RESENDVERIFICATIONEMAIL = 'api/Registration/Request/Resend',
  CODEVERIFICATION = 'api/Registration/Verification',
  CHECKCODEVERIFICATION = 'api/Registration/Verification/Check',
  LOGIN = 'api/Authentication/Login',
  AUTHENTICATOR = 'api/Authentication/Register/Authenticator',
  VERIFYAUTHENTICATOR = 'api/Authentication/Register/Authenticator/Validate',
  TWOFACTORAUTH = 'api/Authentication/Login/TwoFactorAuthenticate',
  FORGOTPASSWORD = 'api/Authentication/Password/Forget',
  FORGOTPASSWORDVERIFY = 'api/Authentication/Password/Forget/Check',
  FORGOTPASSWORDWITHLINK = 'api/Authentication/Password/ChangeWithLink',
  VISATYPES = 'api/Feeders/VisaTypes',
  VISADURATION = 'api/Feeders/Duration',
  VISASUBTYPES = 'api/Feeders/VisaSubTypes',
  APPLICATION = 'api/Application',
  PERSONALDETAILS = 'api/Application/Personal',
  OCCUPATION = 'api/Feeders/Occupation',
  CONTACTDETAILS = 'api/Application/Contact',
  FINANCIALDETAILS = 'api/Application/FinancialPlan',
  LASTSECTION = 'api/Application/LastSection',
  APPLICATIONLIST = 'api/Application/All',
  FEES = 'api/Fees',
  TRAVELPLAN = 'api/Application/TravelPlan',
  APPLICATIONDATA = 'api/Application/Data',
  SUBMITAPPLICATION = 'api/Application/Submit',
  COATOFARMS = 'CoatOfArms',
  FLAGDETAILS = 'FlagsDetail',
  COMMENTDATA = 'Data',
  DOCUMENTS = 'api/Documents/Backend',
  UPLOADDOCUMENT = 'api/Application/Document',
  GETDOCUMENTSDATA = 'api/Application/Documents',
  UPLOADPHOTO = 'api/Application/Photograph',
  REFRESHTOKEN = 'api/Authentication/Refresh',
}
export enum UserOnboardCategory {
  F = 'f',
  X = 'x',
  T = 't',
}

export interface ClientSession extends Session {
  accessToken: string;
  LoginUser: any;
}

export enum IndicatorSteps {
  APPLICATIONDATA = 0,
  ADDRESSDETAILS = 1,
  ContactDetails = 2,
  SPONSORDETAILS = 3,
  TRAVELHISTORY = 4,
  TRAVELPLANS = 5,
  ACCOMODATION = 6,
  INFORMATIONREVIEW = 7,
  PAYMENTINFORMATION = 8,
}

export enum StepsHeadings {
  APPLICATIONDATA = 'Application Details',
  UPLOADPHOTO = 'Upload Photograph',
  PERSONALINFORMATION = 'Personal Details',
  ContactDetails = 'Contact Details',
  SPONSORDETAILS = 'Financial and Accomodation Details',
  TRAVELHISTORY = 'Travel and History Details',
  REVIEW = 'Review Application',
  PAYMENT = 'Payment Details',
  UPLOADDOCUMENTS = 'Upload Documents',
}

export enum ApplicationStatus {
  INPROGRESS = 'in progress',
  REJECTED = 'rejected',
  APPROVED = 'submitted',
  MOVED = 'moved',
  REFERRED = 'reference_queue',
  DEFERRED = 'defered',
  SUPPORTED = 'supported',
  NOTSUPPORTED = 'not supported',
  READYFORDECISION = 'ready for decision',
  APPROVEDAPPLICATION = 'approved',
  REJECTEDAPPLICATION = 'rejected',
  REFFEREDAPPLICATION = 'referred',
  ADDITIONALDOCUMENTS = 'additional documents',
  EDITDOCUMENTS = 'edit',
}
export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

export enum PHTOTGUIDELINES {
  GUIDLINE1 = 'The face must be clearly visible, without any obstructions such as hair or accessories covering the face.',
  GUIDLINE2 = 'The face must cover 70-80% of the photo from the base of the chin to the top of the forehead.',
  GUIDLINE3 = 'The photo must be taken with the head looking directly at the camera. The head should not be tilted or turned.',
  GUIDLINE4 = 'The photo must have a white background with uniform light, free of shadows or objects.',
  GUIDLINE5 = 'The photo must be printed on high-quality, high-definition paper and should not be pixelated or blurry',
  GUIDLINE6 = 'The photo must have uniform light, avoiding shadows, underexposure, or overexposure.',
  GUIDLINE7 = 'The photo must be in color. Black and white photos are not acceptable as they do not capture the accurate representation of the person.',
  GUIDLINE8 = 'The photo must be recent, taken within the last six months. This ensures that the photo accurately represents the persons current appearance.',
}

export const getStatusColor = (status: ApplicationStatus): string => {
  switch (status) {
    case ApplicationStatus.DEFERRED:
      return 'bg-yellow-700';
    case ApplicationStatus.REFERRED:
    case ApplicationStatus.SUPPORTED:
    case ApplicationStatus.READYFORDECISION:
    case ApplicationStatus.APPROVEDAPPLICATION:
    case ApplicationStatus.REFFEREDAPPLICATION:
    case ApplicationStatus.MOVED:
      return 'bg-logoColorGreen';
    case ApplicationStatus.INPROGRESS:
    case ApplicationStatus.REJECTEDAPPLICATION:
    case ApplicationStatus.ADDITIONALDOCUMENTS:
      return 'bg-red-600';
    case ApplicationStatus.NOTSUPPORTED:
      return 'bg-black';
    case ApplicationStatus.EDITDOCUMENTS:
      return 'bg-orange-700';
    default:
      return '';
  }
};

export const getStatusText = (status: ApplicationStatus): string => {
  switch (status) {
    case ApplicationStatus.REFERRED:
      return 'In Process';
    case ApplicationStatus.INPROGRESS:
      return 'Awaiting Review';
    case ApplicationStatus.SUPPORTED:
      return 'Verified';
    case ApplicationStatus.NOTSUPPORTED:
      return 'Not Verified';
    case ApplicationStatus.ADDITIONALDOCUMENTS:
      return 'Referred To User';
    case ApplicationStatus.MOVED:
      return 'In Process';
    case ApplicationStatus.EDITDOCUMENTS:
      return 'Edit Documents';
    default:
      return status; // Fallback to raw status value if no match
  }
};

export enum InitiatorApplicationStatus {
  ALL = 'All Applications',
  INPROCESS = 'In Process Applications',
  AWAITINGREVIEW = 'Awaiting Review Applications',
  DEFFERED = 'Deferred Applications',
  REFFEREDTOUSERAPPLICATION = 'Referred To User Applications',
  APPROVEDAPPLICATION = 'Approved Applications',
  REJECTEDAPPLICATION = 'Rejected Applications',
  AWAIRINGYOURRESPONSE = 'Awaiting Your Response',
}
