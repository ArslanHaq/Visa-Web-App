import { Colors } from '@/constants/constants';
import {
  handleFinancialDetails,
} from '@/constants/functions';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Select from 'react-select';
import InputComponent from '../atoms/InputComponent';
import {
  ApplicationSubmitResponseDto,
  FinancialDetailsDto,
} from '@/dto/ApplicationData.dto';
import { set } from 'animejs';
import { toast } from 'react-toastify';
import {
  getFinancialDetails,
  submitFinancialDetails,
} from '@/server/Application';
import Loader from '../atoms/Loader';

interface FinancialDetailsFormProps {
  sponsorType: any;
  accomodationType: any;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  trackingId: string;

}
export default function FinancialDetailsFormComponent({
  trackingId,
  accomodationType,
  sponsorType,
  setCurrentStep,
}: FinancialDetailsFormProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [formValues, setFormValues] = useState<FinancialDetailsDto>({
    trackingId,
    sponsorType: '',
    sponsorDetails: '',
    cashHoldingAmount: '',
    accomodationType: '',
    hotelName: '',
    addressLineOne: '',
    addressLineTwo: '',
    city: '',
    postalCode: '',
    currency: ''
  });
  const [errors, setErrors] = useState<FinancialDetailsDto>({
    sponsorType: '',
    sponsorDetails: '',
    cashHoldingAmount: '',
    accomodationType: '',
    hotelName: '',
    addressLineOne: '',
    addressLineTwo: '',
    city: '',
    postalCode: '',
    trackingId: '',
  });
  const [selectedSponsorType, setSelectedSponsorType] = useState<any>(null);
  const [selectedAccomodationType, setSelectedAccomodationType] =
    useState<any>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await submitFinancialDetails({
      sponsorType: formValues.sponsorType,
      sponsorDetails: formValues.sponsorDetails,
      accomodationType: formValues.accomodationType,
      cashHoldingAmount: '0',
      hotelName: formValues.hotelName,
      addressLineOne: formValues.addressLineOne,
      addressLineTwo: formValues.addressLineTwo,
      city: formValues.city,
      postalCode: formValues.postalCode,
      trackingId,
    });
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      toast.success('Form submitted successfully');
      setCurrentStep(6);
    }
  };

  const handleSponsorType = (selectedOption: any) => {
    setFormValues({ ...formValues, sponsorType: selectedOption.value });
    setSelectedSponsorType(selectedOption);
  };
  const handleAccomodationType = (selectedOption: any) => {
    setFormValues({ ...formValues, accomodationType: selectedOption.value });
    setSelectedAccomodationType(selectedOption);
  };
  const visaTypeStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderWidth: 1,
      fontSize: '14px',
      paddingTop: '5px',
      paddingBottom: '5px',
      borderColor: state.isFocused
        ? errors.sponsorType
          ? Colors.PRIMARYRED
          : Colors.PRIMARYGREEN
        : errors.sponsorType
          ? Colors.PRIMARYRED
          : Colors.PRIMARYBLUE,
      boxShadow: 'none',
      '&:hover': {
        borderColor: state.isFocused
          ? errors.sponsorType
            ? Colors.PRIMARYRED
            : Colors.PRIMARYGREEN
          : errors.sponsorType
            ? Colors.PRIMARYRED
            : Colors.PRIMARYBLUE,
      },
    }),
    input: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYBLUE,
      backgroundColor: 'transparent',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYBLUE,
      backgroundColor: 'transparent',
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
      '&:hover': {
        color: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYSLATE,
    }),
  };
  async function getFinancialDetailsData() {
    const response = await getFinancialDetails(trackingId);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data?.data) {
        setLoading(false);
        return
      };
      setFormValues({
        sponsorType: response.data.data.sponsorType,
        sponsorDetails: response.data.data.sponsorDetails,
        accomodationType: response.data.data.accomodationType,
        cashHoldingAmount: response.data.data.cashHoldingAmount,
        hotelName: response.data.data.hotelName,
        addressLineOne: response.data.data.addressLineOne,
        addressLineTwo: response.data.data.addressLineTwo,
        city: response.data.data.city,
        postalCode: response.data.data.postalCode,
        trackingId,
      });

      setSelectedSponsorType({
        value: response.data?.data.country,
        label: sponsorType.find(
          (sponsor: any) => sponsor.value === response.data?.data.sponsorType,
        ).label,
      });
      setSelectedAccomodationType({
        value: response.data?.data.country,
        label: accomodationType.find(
          (accomodation: any) =>
            accomodation.value === response.data?.data.accomodationType,
        ).label,
      });
    }
    setLoading(false);
  }
  useEffect(() => {
    if (trackingId) {

      getFinancialDetailsData();

      setFormValues({
        ...formValues,
        trackingId,
      });
    };
  }, [, trackingId]);
  return (
    <>{
      loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <div className='h-full'>
          <form onSubmit={handleFormSubmit} className='flex items-center justify-center h-full '>
            <div className="mt-16 w-full">
              <div className=" flex justify-center">
                <p className="font-serif text-xl font-bold text-logoColorBlue md:text-4xl">
                  Financial and Accomodation Details
                </p>
              </div>
              {/* <div className="mt-3 flex justify-center">
                <p className="text-xs text-logoColorGreen md:text-base">
                  Fill up the form below to apply for a visa
                </p>
              </div> */}

              <div className=" mt-16 flex w-full items-center justify-center gap-x-44">
                <div className="flex -ml-5 w-3/5">
                  <p className="md:text-2xl font-bold text-logoColorBlue underline underline-offset-4">
                    {' '}
                    Financial Details
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-x-44">
                <div className="w-full">
                  <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                    <div className="w-3/4 md:w-1/4">
                      <label className="text-sm font-semibold text-logoColorBlue">
                        Sponsor Type
                      </label>
                      <Select
                        options={sponsorType}
                        styles={visaTypeStyles}
                        onChange={handleSponsorType}
                        value={selectedSponsorType}
                        required
                      />
                    </div>
                    <InputComponent
                      label={'Sponsor Details'}
                      maxLength={30}
                      minLength={3}
                      type={'text'}
                      placeholder={'Enter your sponsor details'}
                      name={'sponsorDetails'}
                      value={formValues.sponsorDetails}
                      className="w-3/4 md:w-1/4"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleFinancialDetails(
                          e,
                          formValues,
                          setFormValues,
                          errors,
                          setErrors,
                        )
                      }
                      error={errors.sponsorDetails}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="mt-4 w-full">
                <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                  <div className='flex w-3/4 md:w-1/4 gap-x-3'>
                    <InputComponent
                      label={'Currency'}
                      maxLength={4}
                      minLength={0}
                      type={'text'}
                      placeholder={'Enter your currency'}
                      name={'currency'}
                      value={formValues.currency as string}
                      className="w-1/4"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleFinancialDetails(
                          e,
                          formValues,
                          setFormValues,
                          errors,
                          setErrors,
                        )
                      }
                      error={''}
                      required
                    />
                    <InputComponent
                      label={'Cash Holding Amount'}
                      maxLength={12}
                      minLength={0}
                      type={'text'}
                      placeholder={'Enter your cash holding amount'}
                      name={'cashHoldingAmount'}
                      value={formValues.cashHoldingAmount}
                      className="w-full "
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleFinancialDetails(
                          e,
                          formValues,
                          setFormValues,
                          errors,
                          setErrors,
                        )
                      }
                      error={errors.cashHoldingAmount}
                      required
                    />
                  </div>
                  <div className="w-3/4 md:w-1/4">
                    <div className="hidden"></div>
                  </div>
                </div>
              </div> */}
              <div className=" mt-10 flex w-full items-center justify-center gap-x-44">
                <div className="flex -ml-5 w-3/5">
                  <p className="md:text-2xl font-bold text-logoColorBlue  underline underline-offset-4">
                    {' '}
                    Accomondation Details
                  </p>
                </div>
              </div>
              <div className="mt-4 w-full">
                <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                  <div className="w-3/4 my-2 md:w-1/4">
                    <label className="text-sm font-semibold text-logoColorBlue">
                      Accomodation Type
                    </label>
                    <Select
                      options={accomodationType}
                      styles={visaTypeStyles}
                      onChange={handleAccomodationType}
                      value={selectedAccomodationType}
                      required
                    />
                  </div>
                  <InputComponent
                    label={'Name'}
                    maxLength={30}
                    minLength={3}
                    type={'text'}
                    placeholder={'Enter your name'}
                    name={'hotelName'}
                    value={formValues.hotelName}
                    className="w-3/4 md:w-1/4"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleFinancialDetails(
                        e,
                        formValues,
                        setFormValues,
                        errors,
                        setErrors,
                      )
                    }
                    error={errors.hotelName}
                    required
                  />

                </div>
              </div>
              <div className="mt-4 w-full">
                <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">

                  <InputComponent
                    label={'Address Line One'}
                    maxLength={50}
                    minLength={3}
                    type={'text'}
                    placeholder={'Enter your address line one'}
                    name={'addressLineOne'}
                    value={formValues.addressLineOne}
                    className="w-3/4 md:w-1/4"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleFinancialDetails(
                        e,
                        formValues,
                        setFormValues,
                        errors,
                        setErrors,
                      )
                    }
                    error={errors.addressLineOne}
                    required
                  />
                  <InputComponent
                    label={'Address Line Two'}
                    maxLength={50}
                    minLength={3}
                    type={'text'}
                    placeholder={'Enter your address line two'}
                    name={'addressLineTwo'}
                    value={formValues.addressLineTwo}
                    className="w-3/4 md:w-1/4 mt-3 md:mt-0"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleFinancialDetails(
                        e,
                        formValues,
                        setFormValues,
                        errors,
                        setErrors,
                      )
                    }
                    error={errors.addressLineTwo}

                  />
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-x-44">
                <div className="mr-2 mt-1 w-full">
                  <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                    <InputComponent
                      label={'City'}
                      maxLength={30}
                      minLength={3}
                      type={'text'}
                      placeholder={'Enter your city'}
                      name={'city'}
                      value={formValues.city}
                      className="w-3/4 md:w-1/4"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleFinancialDetails(
                          e,
                          formValues,
                          setFormValues,
                          errors,
                          setErrors,
                        )
                      }
                      error={errors.city}
                      required
                    />
                    <InputComponent
                      label={'Postal Code'}
                      maxLength={8}
                      minLength={3}
                      type={'text'}
                      placeholder={'Enter your Postal Code'}
                      name={'postalCode'}
                      value={formValues.postalCode}
                      className="w-3/4 md:w-1/4 mt-3 md:mt-0"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleFinancialDetails(
                          e,
                          formValues,
                          setFormValues,
                          errors,
                          setErrors,
                        )
                      }
                      error={errors.postalCode}
                      required
                    />

                  </div>
                </div>
              </div>
              <div className="my-20 flex justify-center">
                <button
                  type="submit"
                  className="w-3/4 md:w-1/4 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-sm md:text-base text-white"
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      )
    }
    </>
  );
}
