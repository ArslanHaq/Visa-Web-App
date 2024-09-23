import {
  ApplicationDataRequestDto,
  ContactDetailsDto,
  FinancialDetailsDto,
  personalDetailsDto,
  SocialMediaLinks,
  TravelHistory,
  TravelPlanDto,
  ViewApplicationDataDto,
} from '@/dto/ApplicationData.dto';
import submitCompleteApplication, {
  getApplicationData,
} from '@/server/Application';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { handleFetch } from '@/constants/functions';
import ReviewApplicationDataComponent from './ReviewApplicationDataComponent';
import ReviewPersonalDetailsComponent from './ReviewPersonalDetailsComponent';
import Loader from '../atoms/Loader';
import ReviewContactDetailsComponent from './ReviewContactDetailsComponent';
import ReviewFinancialDetailsComponent from './ReviewFinancialDetailsComponent';
import ReviewTravelDetailsComponent from './ReviewTravelDetailsComponent';
import { toast } from 'react-toastify';
import { set } from 'animejs';
import { useRouter } from 'next/navigation';
import { ApplicationStatus, Pages } from '@/constants/constants';
import Modal from './Modal';
interface Props {
  trackingId: string;
  countires: any;
  sex: any;
  maritalStatus: any;
  occupation: any;
  visaSubType: any;
  sponsorType: any;
  accomodationType: any;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  status: string;
  // setStatus: Dispatch<SetStateAction<string>>;
}
export default function ViewApplicationCompleteComponent({
  trackingId,
  countires,
  maritalStatus,
  occupation,
  sex,
  sponsorType,
  accomodationType,
  setCurrentStep,
  status,
  // setStatus,
}: Props) {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(true);
  const [applicationFormValues, setApplicationFormValues] =
    useState<ApplicationDataRequestDto>({
      visaType: '',
      visaSubType: '',
      nationality: '',
      visaFee: '',
      visaCurrency: '',
    });

  const [personalFormValues, setPersonalFormValues] =
    useState<personalDetailsDto>({
      trackingId: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      birthCity: '',
      birthCountry: '',
      issuingCountry: '',
      maritalStatus: '',
      nationality: '',
      occupation: '',
      passportNumber: '',
      photographBase64: '',
      sex: '',
    });

  const [contactFormValues, setContactFormValues] = useState<ContactDetailsDto>(
    {
      email1: '',
      email2: '',
      city: '',
      country: '',
      postalCode: '',
      addressLineOne: '',
      addressLineTwo: '',
      landline1: '',
      landline2: '',
      mobile1: '',
      mobile2: '',
      phoneCode1: '',
      phoneCode2: '',
      trackingId,
      socialMedia: [] as any,
    },
  );
  const [financialFormValues, setFinancialFormValues] =
    useState<FinancialDetailsDto>({
      sponsorType: '',
      sponsorDetails: '',
      cashHoldingAmount: '',
      city: '',
      accomodationType: '',
      addressLineOne: '',
      addressLineTwo: '',
      hotelName: '',
      postalCode: '',
      trackingId,
    });

  const [travelFormValues, setTravelFormValues] = useState<TravelPlanDto>({
    arrivalPort: '',
    cities: '',
    travelDate: '',
    travelHistory: [] as TravelHistory[],
    trackingId,
  });
  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitted') {
      router.push(Pages.APPLICATIONDATA);
      return;
    }
    setLoader(true);
    const response = await submitCompleteApplication(trackingId);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
      return null;
    } else {
      toast.success('Application submitted successfully');
      setLoader(false);
      if (status === ApplicationStatus.EDITDOCUMENTS) {
        router.push(Pages.APPLICATIONDATA);
        return;
      }
      setCurrentStep(8);
    }
  }
  async function getApplicationComplete(trackingId: string) {
    const {
      applicationData,
      personalInformation,
      contactDetail,
      financialInformation,
      travelPlan,
    } = (await handleFetch<ViewApplicationDataDto>(
      getApplicationData as any,
      trackingId,
      'Application',
    )) as ViewApplicationDataDto;
    // setStatus(applicationData?.status as string);
    setApplicationFormValues({
      visaType: applicationData?.visaType ?? '',
      visaFee: applicationData?.visaFee ?? '',
      visaSubType: applicationData?.visaSubType ?? '',
      visaCurrency: applicationData?.visaCurrency ?? '',
      nationality: applicationData?.nationality ?? '',
      durationId: applicationData?.durationId ?? '',
      entryType: applicationData?.entryType ?? '',
      trackingId,
      nationalityName: applicationData?.nationalityName ?? '',
      visaSubTypeDescription: applicationData?.visaSubTypeDescription ?? '',
      duration: applicationData?.duration ?? '',
      visaTypeDescription: applicationData?.visaTypeDescription ?? '',
    });

    setPersonalFormValues({
      firstName: personalInformation?.firstName as string,
      lastName: personalInformation?.lastName as string,
      birthDate: personalInformation?.birthDate.split('T')[0] as string,
      birthCity: personalInformation?.birthCity as string,
      birthCountry: personalInformation?.birthCountry as string,
      issuingCountry: personalInformation?.issuingCountry as string,
      maritalStatus: personalInformation?.maritalStatus as string,
      nationality: personalInformation?.nationality as string,
      occupation: personalInformation?.occupation as string,
      passportNumber: personalInformation?.passportNumber as string,
      photographBase64: personalInformation?.photographBase64 as string,
      sex: personalInformation?.sex as string,
      trackingId,
      birthCountryName: personalInformation?.birthCountryName as string,
      issuingCountryName: personalInformation?.issuingCountryName as string,
      nationalityName: personalInformation?.nationalityName as string,
      occupationName: personalInformation?.occupationName as string,

    });
    setContactFormValues({
      addressLineOne: contactDetail?.addressLineOne as string,
      addressLineTwo: contactDetail?.addressLineTwo as string,
      city: contactDetail?.city as string,
      country: contactDetail?.country as string,
      email1: contactDetail?.email1 as string,
      email2: contactDetail?.email2 as string,
      landline1: contactDetail?.landline1 as string,
      landline2: contactDetail?.landline2 as string,
      mobile1: contactDetail?.mobile1 as string,
      mobile2: contactDetail?.mobile2 as string,
      phoneCode1: contactDetail?.phoneCode1 as string,
      phoneCode2: contactDetail?.phoneCode2 as string,
      postalCode: contactDetail?.postalCode as string,
      trackingId,
      socialMedia: contactDetail?.socialMedia as SocialMediaLinks[],
      countryName: contactDetail?.countryName as string,
    });
    setFinancialFormValues({
      sponsorType: financialInformation?.sponsorType as string,
      sponsorDetails: financialInformation?.sponsorDetails as string,
      cashHoldingAmount: financialInformation?.cashHoldingAmount as string,
      city: financialInformation?.city as string,
      accomodationType: financialInformation?.accomodationType as string,
      addressLineOne: financialInformation?.addressLineOne as string,
      addressLineTwo: financialInformation?.addressLineTwo as string,
      hotelName: financialInformation?.hotelName as string,
      postalCode: financialInformation?.postalCode as string,
      trackingId,
    });

    setTravelFormValues({
      arrivalPort: travelPlan?.arrivalPort as string,
      cities: travelPlan?.cities as string,
      travelDate: travelPlan?.travelDate.split('T')[0] as string,
      travelHistory: travelPlan?.travelHistory as TravelHistory[],
      trackingId,
    });
    setLoader(false);
  }

  useEffect(() => {
    if (trackingId) {
      getApplicationComplete(trackingId);
    } else {
      setLoader(false);
    }
  }, [, trackingId]);
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Modal showModal={showModal}>
        <div className="flex h-36 w-64 md:w-96 flex-col items-center justify-center">
          <p className="mt-4 w-60 text-center font-sans text-base text-slate-200">
            Your Application will not be editable after submission
          </p>
          <div className="flex gap-x-5">
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="mt-4 rounded-xl bg-red-900 px-10 py-2 text-white hover:bg-black"
            >
              Back
            </button>

            <button
              onClick={() => {
                setShowModal(false);
                handleFormSubmit(event as any);
              }}
              className="mt-4 rounded-xl bg-logoColorGreen px-6 py-2 text-white hover:bg-black"
            >
              Continue
            </button>
          </div>
        </div>
      </Modal>
      {loader ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <form className="mt-24" onSubmit={handleFormSubmit}>
          <div className="w-full">
            <div className="text-center">
              <p className="font-serif text-2xl font-bold text-logoColorBlue md:text-5xl">
                Review Application
              </p>
            </div>
            <div className="mt-3 flex justify-center">
              <p className="text-xs text-logoColorGreen md:text-base">
                Please review your application before submitting
              </p>
            </div>
            <div className="mt-10">
              <div className="flex w-full items-center justify-center gap-x-44">
                <div
                  className="flex w-3/5 cursor-pointer"
                  onClick={() => {
                    setCurrentStep(0)
                  }}
                >
                  <p className="md:text-2xl font-bold text-logoColorBlue underline">
                    {' '}
                    Application Data
                  </p>
                </div>
              </div>
              <ReviewApplicationDataComponent
                applicationFormValues={applicationFormValues}
              />
            </div>

            <div className="mt-10">
              <div className="flex w-full items-center justify-center gap-x-44">
                <div
                  className="flex w-3/5 cursor-pointer"
                  onClick={() => setCurrentStep(1)}
                >
                  <p className="md:text-2xl font-bold text-logoColorBlue underline">
                    {' '}
                    Personal Details
                  </p>
                </div>
              </div>
              <ReviewPersonalDetailsComponent
                personalFormValues={personalFormValues}
                maritalStatus={maritalStatus}
                sex={sex}
              />
            </div>
            <div className="mt-10">
              <div className="flex w-full items-center justify-center gap-x-44">
                <div
                  className="flex w-3/5 cursor-pointer"
                  onClick={() => setCurrentStep(2)}
                >
                  <p className="md:text-2xl font-bold text-logoColorBlue underline">
                    {' '}
                    Contact Details
                  </p>
                </div>
              </div>
              <ReviewContactDetailsComponent
                contactFormValues={contactFormValues}
              />
            </div>
            <div className="mt-10">
              <div className="flex w-full items-center justify-center gap-x-44">
                <div
                  className="flex w-3/5 cursor-pointer"
                  onClick={() => setCurrentStep(3)}
                >
                  <p className="md:text-2xl font-bold text-logoColorBlue underline">
                    {' '}
                    Financial & Accomodation Details
                  </p>
                </div>
              </div>
              <ReviewFinancialDetailsComponent
                financialFormValues={financialFormValues}
                sponsorType={sponsorType}
                accomodationType={accomodationType}
              />
            </div>
            <div className="mt-10">
              <div className="flex w-full items-center justify-center gap-x-44">
                <div
                  className="flex w-3/5 cursor-pointer"
                  onClick={() => setCurrentStep(4)}
                >
                  <p className="md:text-2xl font-bold text-logoColorBlue underline">
                    {' '}
                    Travel & History Details
                  </p>
                </div>
              </div>
              <ReviewTravelDetailsComponent
                travelFormValues={travelFormValues}
                countries={countires}
              />
            </div>
          </div>
          <div className="flex justify-center gap-x-10 py-20">
            <button
              type="button"
              onClick={() => {
                if (
                  status !== ApplicationStatus.MOVED &&
                  status !== ApplicationStatus.APPROVED && status !== ApplicationStatus.REJECTEDAPPLICATION && status !== ApplicationStatus.APPROVEDAPPLICATION
                )
                  setShowModal(true);
                else {
                  router.push(Pages.APPLICATIONDATA);
                }
              }}
              className="w-3/4 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-sm md:text-base text-white md:w-1/6"
            >
              {status === ApplicationStatus.MOVED ||
                status === ApplicationStatus.APPROVED || status === ApplicationStatus.REJECTEDAPPLICATION || status === ApplicationStatus.APPROVEDAPPLICATION
                ? 'Close'
                : 'Continue'}
            </button>
          </div>
        </form>
      )}
    </>
  );
}
