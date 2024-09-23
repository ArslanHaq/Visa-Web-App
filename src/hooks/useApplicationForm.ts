import { StepsHeadings } from '@/constants/constants';
import {
  ApplicationDataDto,
  ApplicationSubmitResponseDto,
  VisaDurationResponse,
  visaTypeResponse,
} from '@/dto/ApplicationData.dto';
import {
  CountriesDataDto,
  OccupationDto,
  PhoneCodeDto,
} from '@/dto/Signup.dto';
import {
  getLastSection,
  getVisaFee,
  getVisaSubTypeResponse,
} from '@/server/Application';
import { set } from 'animejs';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface ApplicationFormProps {
  visaTypes: visaTypeResponse;
  nationalities: CountriesDataDto;
  phoneCodes: PhoneCodeDto;
  occupations: OccupationDto;
  applicationTrackingID: string;
  lastSection: string;
}
export default function useApplicationForm({
  visaTypes,
  nationalities,
  phoneCodes,
  occupations,
  applicationTrackingID,
  lastSection,
}: ApplicationFormProps) {
  const steps = [
    StepsHeadings.APPLICATIONDATA,
    StepsHeadings.UPLOADDOCUMENTS,
    StepsHeadings.UPLOADPHOTO,
    StepsHeadings.PERSONALINFORMATION,
    StepsHeadings.ContactDetails,
    StepsHeadings.SPONSORDETAILS,
    StepsHeadings.TRAVELHISTORY,
    StepsHeadings.REVIEW,
    StepsHeadings.PAYMENT,
  ];
  const [lastSectionState, setLastSectionState] = useState<string>(
    lastSection ? lastSection : '',
  );
  const [loading, setLoading] = useState<boolean>(true);

  const [trackingId, setTrackingId] = useState(applicationTrackingID);
  const [applicationSubmitResponse, setApplicationSubmitResponse] =
    useState<ApplicationSubmitResponseDto>({
      data: {
        insertionTimestamp: '',
        lastSection: '',
        nationality: '',
        status: '',
        trackingId: '',
        userId: '',
        visaCurrency: '',
        visaFee: '',
        visaSubType: '',
        visaType: '',
      },
      error: '',
    });
  const [currentStep, setCurrentStep] = useState(-1);
  const visaType = visaTypes.data.map((visa) => ({
    value: visa.visaType,
    label: visa.description,
  }));

  const sponsorType = [
    { value: 'self', label: 'Self' },
    { value: 'relative', label: 'Relatives' },
    { value: 'employer', label: 'Employer' },
    { value: 'other', label: 'Other' },
  ];
  const accomodationType = [
    { value: 'hotel', label: 'Hotel' },
    { value: 'other', label: 'Other' },
  ];
  const phoneCodesData = phoneCodes.data.map((phone) => ({
    value: phone.phoneCode,
    label: '+' + phone.phoneCode,
  }));
  const occupationsData = occupations.data.map((occupation) => ({
    value: occupation.occupationId,
    label:
      occupation.description === 'Government' ||
      occupation.description === 'Private'
        ? occupation.description + ' Job'
        : occupation.description,
  }));

  const [visaSubType, setVisaSubType] = useState<any[]>([]);
  const [resetKey, setResetKey] = useState(0);

  const [visaCurrency, setVisaCurrency] = useState<any[]>([
    { value: '$', label: 'USD' },
  ]);

  const sex = [
    { value: 'm', label: 'Male' },
    { value: 'f', label: 'Female' },
    { value: 'x', label: 'Other' },
  ];
  const maritalStatus = [
    { value: 's', label: 'Unmarried' },
    { value: 'm', label: 'Married' },
    { value: 'd', label: 'Divorced' },
    { value: 'w', label: 'Widowed' },
  ];
  const nationality = nationalities.data.map((national) => ({
    value: national.alpha3,
    label: national.countryName,
  }));
  const [formValues, setFormValues] = useState<ApplicationDataDto>({
    visaType: '',
    visaSubType: '',
    nationality: '',
    visaFee: '',
    visaCurrency: {
      alpha3: '',
      countryName: '',
      currencyName: '',
    },
  });
  const [errors, setErrors] = useState<ApplicationDataDto>({
    visaType: '',
    visaSubType: '',
    nationality: '',
    visaFee: '',
    visaCurrency: {
      alpha3: '',
      countryName: '',
      currencyName: '',
    },
  });

  async function getVisaSubType() {
    const response = await getVisaSubTypeResponse(formValues.visaType);
    setVisaSubType(
      response.data.map((visa: any) => ({
        value: visa.visaSubType,
        label: visa.description,
      })),
    );
  }
  async function getLastSectionData() {
    const response = await getLastSection(trackingId);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data) {
        setLoading(false);
        return;
      }
      setLastSectionState(response.data.data.lastSection);
    }
    setLoading(false);
  }
  async function getVisaFeeData() {
    const response = await getVisaFee(
      formValues.visaType,
      formValues.visaSubType,
    );

    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data) {
        return;
      }
      setFormValues({
        ...formValues,
        visaFee: response.data.amount,
        visaCurrency: response.data.visaCurrency,
      });
    }
  }
  useEffect(() => {
    setFormValues({
      ...formValues,
      visaSubType: '',
    });
    if (formValues.visaType) {
      setResetKey(resetKey + 1);
      getVisaSubType();
    }
  }, [formValues.visaType]);

  useEffect(() => {
    if (trackingId !== '') {
      getLastSectionData();
    } else {
      setLoading(false);
      setCurrentStep(0);
    }
  }, [, trackingId]);

  useEffect(() => {
    if (trackingId !== '') getLastSectionData();
  }, [currentStep]);

  useEffect(() => {
    if (
      formValues.visaType &&
      formValues.visaSubType &&
      formValues.nationality
    ) {
      getVisaFeeData();
    }
  }, [formValues.visaSubType, formValues.nationality]);
  return {
    steps,
    currentStep,
    visaType,
    visaSubType,
    visaCurrency,
    formValues,
    nationality,
    resetKey,
    errors,
    maritalStatus,
    sex,
    phoneCodesData,
    occupationsData,
    applicationSubmitResponse,
    sponsorType,
    accomodationType,
    trackingId,
    lastSectionState,
    loading,
    setLoading,
    setApplicationSubmitResponse,
    setFormValues,
    setErrors,
    setCurrentStep,
    setTrackingId,
  };
}
