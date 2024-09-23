'use client';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import InputComponent from '../atoms/InputComponent';
import { ApplicationDataDto } from '@/dto/ApplicationData.dto';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { Colors } from '@/constants/constants';
import { getApplication, getVisaDuration, submitApplication } from '@/server/Application';
import Loader from '../atoms/Loader';
import { formatCurrency } from '@/constants/functions';

interface ApplicationFormProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  formValue: ApplicationDataDto;
  setFormValues: Dispatch<SetStateAction<ApplicationDataDto>>;
  errors: ApplicationDataDto;
  setErrors: Dispatch<SetStateAction<ApplicationDataDto>>;
  visaTypes: any;
  nationalities: any;
  visaSubTypes: any;
  resetKey: number;
  trackingId: string;
  setTrackingId: Dispatch<SetStateAction<string>>
}
export default function ApplicationFormComponent({
  setCurrentStep,
  formValue,
  setFormValues,
  errors,
  setErrors,
  visaTypes,
  nationalities,
  visaSubTypes,
  resetKey,
  trackingId,
  setTrackingId
}: ApplicationFormProps) {
  const [selectedVisaType, setSelectedVisaType] = useState<any>(null as any);
  const [selectedVisaSubType, setSelectedVisaSubType] = useState<any>(null);
  const [selectedNationality, setSelectedNationality] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedVisaEntryType, setSelectedVisaEntryType] = useState<any>(null);
  const [selectedVisaDuration, setSelectedVisaDuration] = useState<any>(null);
  const [visaEntryTypeOptions, setVisaEntryTypeOptions] = useState<any>([
    {
      value: 'single',
      label: 'Single Entry'
    }, {
      value: 'multiple',
      label: 'Multiple Entry'
    }
  ]);

  const [visaDurationOptions, setVisaDurationOptions] = useState<any>([]);
  async function handleFormSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await submitApplication({
      nationality: formValue.nationality,
      visaType: formValue.visaType,
      visaSubType: formValue.visaSubType,
      visaCurrency: formValue.visaCurrency.currencyName,
      visaFee: formValue.visaFee,
      trackingId: trackingId ? trackingId : '',
      durationId: selectedVisaDuration.value,
      entryType: selectedVisaEntryType.value
    });
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      setTrackingId(response.data.data.trackingId);
      toast.success('Form submitted successfully');
      setCurrentStep(1);
    }

  }

  const handleVisaEntryTypeSelect = (selectedOption: any) => {
    setSelectedVisaEntryType(selectedOption);

  }

  const handleVisaDurationSelect = (selectedOption: any) => {
    setSelectedVisaDuration(selectedOption);
  }

  const handleVisaTypeSelect = (selectedOption: any) => {
    setFormValues({
      ...formValue,
      visaType: selectedOption.value,
    });
    setSelectedVisaType(selectedOption);
    if (selectedOption) {
      setErrors({
        ...errors,
        visaType: '',
      });
    }
  };

  const handleVisaSubTypeSelect = (selectedOption: any) => {
    if (visaSubTypes.length > 0) {
      setFormValues({
        ...formValue,
        visaSubType: selectedOption.value,
      });
      setSelectedVisaSubType(selectedOption);
    }
    if (selectedOption) {
      setErrors({
        ...errors,
        visaSubType: '',
      });
    }
  };

  const handleNationalitySelect = (selectedOption: any) => {
    setFormValues({
      ...formValue,
      nationality: selectedOption.value,
    });
    setSelectedNationality(selectedOption);
    if (selectedOption) {
      setErrors({
        ...errors,
      });
    }
  };

  const visaTypeStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderWidth: 1,
      fontSize: '14px',
      paddingTop: '5px',
      paddingBottom: '5px',
      borderColor: state.isFocused
        ? errors.visaType
          ? Colors.PRIMARYRED
          : Colors.PRIMARYGREEN
        : errors.visaType
          ? Colors.PRIMARYRED
          : Colors.PRIMARYBLUE,
      boxShadow: 'none',
      '&:hover': {
        borderColor: state.isFocused
          ? errors.visaType
            ? Colors.PRIMARYRED
            : Colors.PRIMARYGREEN
          : errors.visaType
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

  async function getApplicationData() {
    const response = await getApplication(trackingId);
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
        ...formValue,
        visaType: response.data?.data.visaType as string,
        visaSubType: response.data?.data.visaSubType as string,
        nationality: response.data?.data.nationality as string,
      });
      setSelectedVisaType({
        value: response.data?.data.visaType,
        label: response.data.data.visaTypeDescription
      });
      setSelectedVisaSubType({
        value: response.data?.data.visaSubType,
        label: response.data.data.visaSubTypeDescription,
      });
      setSelectedNationality({
        value: response.data?.data.nationality,
        label: response.data.data.nationalityName,
      });
      setSelectedVisaDuration({
        value: response.data?.data.durationId,
        label: response.data?.data.duration,
      });

      setSelectedVisaEntryType({
        value: response.data?.data.entryType,
        label: visaEntryTypeOptions.find(
          (entry: any) => entry.value === response.data?.data?.entryType,
        ).label,
      });

    }

    setLoading(false);
  }

  async function getvisaDurationData() {
    const response = await getVisaDuration();
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      setVisaDurationOptions(response.data.map((visa: any) => ({
        value: visa.durationId,
        label: visa.duration + ' days',
      })));
    }
  }
  useEffect(() => {
    getvisaDurationData();
    if (trackingId) {
      getApplicationData();
    } else {
      setLoading(false);
    }
  }, [, trackingId]);

  // useEffect(() => {
  //   if (visaSubTypes.length > 0 && formValue.visaSubType !== '') {
  //     setSelectedVisaSubType({
  //       value: formValue.visaSubType,
  //       label: visaSubTypes.find(
  //         (visa: any) => visa.value === formValue.visaSubType,
  //       ).label,
  //     });
  //   }
  // }, [visaSubTypes]);

  return (
    <>
      {
        loading ? (
          <div className="flex justify-center items-center h-full" >

            <Loader />
          </div>
        ) : (

          <div className='py-10 md:h-full'>
            <form
              className="flex md:h-full  items-center justify-center"
              onSubmit={handleFormSubmit}
            >
              <div className="w-full">
                <div className=" flex justify-center py-20">
                  <p className="font-serif text-2xl font-bold text-logoColorBlue md:text-5xl">
                    Application Details
                  </p>
                </div>
                <div className="mt-10 flex justify-center gap-x-44">
                  <div className="mr-2 mt-1 w-full">
                    <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                      <div className="w-3/4 md:w-1/4">
                        <label className="text-sm font-semibold text-logoColorBlue">
                          Visa Type
                        </label>
                        <Select
                          options={visaTypes}
                          styles={visaTypeStyles}
                          onChange={handleVisaTypeSelect}
                          value={selectedVisaType}
                          required
                        />
                      </div>
                      <div className="w-3/4 md:w-1/4 mt-3 md:mt-0">
                        <label className="text-sm font-semibold text-logoColorBlue">
                          Visa Sub Type
                        </label>
                        <Select
                          key={resetKey}
                          options={visaSubTypes}
                          styles={visaTypeStyles}
                          onChange={handleVisaSubTypeSelect}
                          isDisabled={formValue.visaType === ''}
                          value={selectedVisaSubType}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="  mt-4 flex justify-center gap-x-44">
                  <div className="mr-2  w-full">
                    <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                      <div className="w-3/4 md:w-1/4 ">
                        <label className="text-sm font-semibold text-logoColorBlue">
                          Visa Duration
                        </label>
                        <Select
                          options={visaDurationOptions}
                          styles={visaTypeStyles}
                          onChange={handleVisaDurationSelect}
                          value={selectedVisaDuration}
                          required
                        />
                      </div>
                      <div className="w-3/4 md:w-1/4 mt-3 md:mt-0">
                        <label className="text-sm font-semibold text-logoColorBlue">
                          Visa Enrty Type
                        </label>
                        <Select
                          key={resetKey}
                          options={visaEntryTypeOptions}
                          styles={visaTypeStyles}
                          onChange={handleVisaEntryTypeSelect}

                          value={selectedVisaEntryType}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center gap-x-44">
                  <div className="mr-2 mt-1 w-full">
                    <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                      <div className="w-3/4 md:w-1/4">
                        <label className="text-sm font-semibold text-logoColorBlue">
                          Nationality
                        </label>
                        <Select
                          options={nationalities}
                          styles={visaTypeStyles}
                          onChange={handleNationalitySelect}
                          value={selectedNationality}
                          required
                        />
                      </div>
                      <InputComponent
                        label={'Visa Currency'}
                        maxLength={32}
                        minLength={3}
                        type={'text'}
                        placeholder={''}
                        name={'visaCurrency'}
                        value={formValue?.visaCurrency?.currencyName}
                        className="w-3/4 md:w-1/4 mt-3 md:mt-0"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          console.log(e.target.value)
                        }
                        required
                        disabled
                        error={''}
                      />

                    </div>
                  </div>
                </div>
                {
                  formValue.visaFee && (

                    <div className="flex justify-center gap-x-44">
                      <div className="mr-2 mt-1 w-full">
                        <div className="flex w-full items-center justify-center gap-x-44">

                          <div className=" mt-20 flex">
                            <label className="mr-2 md:text-xl font-bold  font-serif text-logoColorBlue">
                              Visa Fee:
                            </label>
                            <p className="font-bold text-logoColorGreen md:text-xl">
                              {formatCurrency(parseInt(formValue.visaFee), formValue.visaCurrency.currencyName)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                  )
                }
                <div className="my-20 flex justify-center gap-x-10">
                  <button
                    type="submit"
                    className="w-3/4 md:w-1/6 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-sm md:text-base text-white"
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
