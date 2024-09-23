'use client';
import { VisaDurationResponse, visaTypeResponse } from '@/dto/ApplicationData.dto';
import StepIndicator from '../molecules/StepIndicatorComponent';
import ApplicationFormComponent from '../molecules/ApplicationFormComponent';
import PersonalDetailsFormComponent from '../molecules/PersonalDetailFormComponent';
import useApplicationForm from '@/hooks/useApplicationForm';
import {
  CountriesDataDto,
  OccupationDto,
  PhoneCodeDto,
} from '@/dto/Signup.dto';
import ContactDetailsFormComponent from '../molecules/ContactDetailsFormComponent';
import FinancialDetailsFormComponent from '../molecules/FinancialDetailsFormComponent';
import TravelPlanFormComponent from '../molecules/TravelPlanFormComponent';
import { use, useEffect, useState } from 'react';
import ViewApplicationCompleteComponent from '../molecules/ViewApplicationCompleteComponent';
import Loader from '../atoms/Loader';
import PaymentReviewComponent from '../molecules/PaymentReviewComponent';
import { getApplication } from '@/server/Application';
import { toast } from 'react-toastify';
import { ApplicationStatus } from '@/constants/constants';
import DocumentFormComponent from '../molecules/DocumentFormComponent';
import UploadPhotoComponent from '../molecules/UploadPhotoFormComponent';
import { useAccessTokenMonitor } from '@/hooks/useAccessTokenMonitor';
import { useSession } from 'next-auth/react';

interface ApplicationFormProps {
  visaTypes: visaTypeResponse;
  nationalities: CountriesDataDto;
  phoneCodes: PhoneCodeDto;
  occupations: OccupationDto;
  applicationTrackingID: string;
  lastSection: string;
  status: string;
  accessToken: any;
  responseStatus?: any;

}
export default function ProcedureComponent({
  visaTypes,
  nationalities,
  phoneCodes,
  occupations,
  applicationTrackingID,
  lastSection,
  status,
  accessToken,
  responseStatus
}: ApplicationFormProps) {
  const {
    steps,
    currentStep,
    visaType,
    nationality,
    formValues,
    visaSubType,
    errors,
    resetKey,
    maritalStatus,
    sex,
    phoneCodesData,
    occupationsData,
    sponsorType,
    accomodationType,
    trackingId,
    lastSectionState,
    loading,
    setLoading,
    setFormValues,
    setErrors,
    setCurrentStep,
    setTrackingId,
  } = useApplicationForm({
    visaTypes,
    nationalities,
    phoneCodes,
    occupations,
    applicationTrackingID,
    lastSection,
  });

  const { data: session, update } = useSession();
  const monitoredToken = useAccessTokenMonitor({ accessTokenCookie: accessToken, accessToken: session?.user.accessToken, update, session, responseStatus });


  function findCurrentStep() {
    switch (lastSectionState) {
      case 'Application':
        setCurrentStep(1);
        break;
      case 'Documents':
        setCurrentStep(2);
        break;
      case 'Photograph':
        setCurrentStep(3);
        break;
      case 'Personal':
        setCurrentStep(4);
        break;
      case 'Contact':
        setCurrentStep(5);
        break;
      case 'Financial':
        setCurrentStep(6);
        break;
      case 'Travel':
        setCurrentStep(7);
        break;
      default:
        if (currentStep === 8) {
          setCurrentStep(8);
          return
        }
        setCurrentStep(7);
        break;

    }
  }
  useEffect(() => {
    if (lastSectionState !== '') findCurrentStep();
  }, [lastSectionState]);

  const [editCurrentStep, setEditCurrentStep] = useState(0);
  return (
    <>
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="md:h-full">
          {(status !== ApplicationStatus.MOVED &&
            status !== ApplicationStatus.APPROVED) &&
            status !== ApplicationStatus.REJECTED &&
            status !== ApplicationStatus.EDITDOCUMENTS &&
            currentStep < 8 && (
              <div className="z-10 mt-10 w-full px-10">
                <StepIndicator
                  currentStep={currentStep}
                  totalSteps={steps.length}
                  steps={steps}
                  setCurrentStep={setCurrentStep}
                  lastSection={lastSectionState}
                />
              </div>
            )}
          <div className="mt-5 flex justify-center md:justify-end md:pr-20">
            {trackingId && (
              <p className=" text-sm md:text-base text-center font-bold text-logoColorBlue">
                Your tracking ID : {trackingId}
              </p>
            )}
          </div>
          {
            status === ApplicationStatus.EDITDOCUMENTS ? (
              <div>
                {editCurrentStep === 0 && (
                  <DocumentFormComponent
                    trackingId={trackingId}
                    setCurrentStep={setCurrentStep}
                    countries={nationality}
                    status={status}
                    setEditCurrentStep={setEditCurrentStep}
                  />
                )}
                {editCurrentStep === 1 && (
                  <UploadPhotoComponent
                    trackingId={trackingId}
                    setCurrentStep={setCurrentStep}
                    countries={nationality}
                    setEditCurrentStep={setEditCurrentStep}
                    status={status}

                  />
                )}
                {editCurrentStep === 2 && (
                  <ViewApplicationCompleteComponent
                    trackingId={trackingId}
                    countires={nationality}
                    maritalStatus={maritalStatus}
                    occupation={occupationsData}
                    sex={sex}
                    visaSubType={visaSubType}
                    sponsorType={sponsorType}
                    accomodationType={accomodationType}
                    setCurrentStep={setCurrentStep}
                    status={status}
                  // setStatus={setStatus}
                  />
                )}
              </div>
            ) : (
              <div className="h-full">
                {currentStep === 0 && (
                  <ApplicationFormComponent
                    setCurrentStep={setCurrentStep}
                    visaTypes={visaType}
                    visaSubTypes={visaSubType}
                    nationalities={nationality}
                    formValue={formValues}
                    setFormValues={setFormValues}
                    errors={errors}
                    setErrors={setErrors}
                    resetKey={resetKey}
                    trackingId={trackingId}
                    setTrackingId={setTrackingId}
                  />
                )}
                {currentStep === 1 && (
                  <DocumentFormComponent
                    trackingId={trackingId}
                    setCurrentStep={setCurrentStep}
                    countries={nationality}
                    status={status}
                  />
                )}
                {currentStep === 2 && (

                  <UploadPhotoComponent
                    trackingId={trackingId}
                    setCurrentStep={setCurrentStep}
                    countries={nationality}
                  />
                )}
                {currentStep === 3 && (
                  <PersonalDetailsFormComponent
                    countries={nationality}
                    maritalStatus={maritalStatus}
                    occupations={occupationsData}
                    sex={sex}
                    setCurrentStep={setCurrentStep}
                    trackingId={trackingId}
                  />
                )}
                {currentStep === 4 && (
                  <ContactDetailsFormComponent
                    trackingId={trackingId}
                    phoneCodes={phoneCodesData}
                    countries={nationality}
                    setCurrentStep={setCurrentStep}
                  />
                )}
                {currentStep === 5 && (
                  <FinancialDetailsFormComponent
                    trackingId={trackingId}
                    accomodationType={accomodationType}
                    sponsorType={sponsorType}
                    setCurrentStep={setCurrentStep}
                  />
                )}
                {currentStep === 6 && (
                  <TravelPlanFormComponent
                    trackingId={trackingId}
                    setCurrentStep={setCurrentStep}
                    countries={nationality}
                  />
                )}


                {currentStep === 7 && (
                  <ViewApplicationCompleteComponent
                    trackingId={trackingId}
                    countires={nationality}
                    maritalStatus={maritalStatus}
                    occupation={occupationsData}
                    sex={sex}
                    visaSubType={visaSubType}
                    sponsorType={sponsorType}
                    accomodationType={accomodationType}
                    setCurrentStep={setCurrentStep}
                    status={status}
                  // setStatus={setStatus}
                  />
                )}
                {currentStep === 8 && (
                  <PaymentReviewComponent trackingId={trackingId} />
                )}
              </div>
            )
          }
        </div>
      )}
    </>
  );
}
