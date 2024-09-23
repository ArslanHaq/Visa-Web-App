import {
  personalDetailsDto,
} from '@/dto/ApplicationData.dto';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import InputComponent from '../atoms/InputComponent';
import { capitalizeFirstLetter, handlePersonalDetails } from '@/constants/functions';
import Select from 'react-select';
import { Colors } from '@/constants/constants';
import {
  getPersonalDetails,
  submitPersonlaDetails,
  uploadedPicture,
} from '@/server/Application';
import { toast } from 'react-toastify';
import ImageUpload from '../atoms/ImageUploader';
import Loader from '../atoms/Loader';

export interface PersonalDetailFormProps {
  countries: any;
  maritalStatus: any;
  sex: any;
  occupations: any;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  trackingId: string;
}

export default function PersonalDetailFormComponent({
  countries,
  maritalStatus,
  sex,
  occupations,
  setCurrentStep,
  trackingId,
}: PersonalDetailFormProps) {
  const [image, setImage] = useState<any>(null);
  const [selectedBirthCountry, setSelectedBirthCountry] = useState<any>(null);
  const [selectedNationality, setSelectedNationality] = useState<any>(null);
  const [selectedIssuingCountry, setSelectedIssuingCountry] =
    useState<any>(null);
  const [selectedSex, setSelectedSex] = useState<any>(null);
  const [selectedOccupation, setSelectedOccupation] = useState<any>(null);
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formValues, setFormValues] = useState<personalDetailsDto>({
    trackingId,
    firstName: '',
    lastName: '',
    birthDate: '',
    birthCity: '',
    birthCountry: '',
    nationality: '',
    passportNumber: '',
    issuingCountry: '',
    occupation: '',
    photographBase64: '',
    maritalStatus: '',
    sex: '',
  });

  const [errors, setErrors] = useState<personalDetailsDto>({
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

  async function handleFormSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await submitPersonlaDetails(formValues);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      toast.success('Form submitted successfully');
      setCurrentStep(4);
    }
  }

  function handleBirthCountrySelect(selectedOption: any) {
    setFormValues({
      ...formValues,
      birthCountry: selectedOption.value,
    });
    setSelectedBirthCountry(selectedOption);
  }
  function handleNationalitySelect(selectedOption: any) {
    setFormValues({
      ...formValues,
      nationality: selectedOption.value,
    });
    setSelectedNationality(selectedOption);
  }
  function handleIssuingCountrySelect(selectedOption: any) {
    setFormValues({
      ...formValues,
      issuingCountry: selectedOption.value,
    });
    setSelectedIssuingCountry(selectedOption);
  }
  function handleMaritalStatusSelect(selectedOption: any) {
    setFormValues({
      ...formValues,
      maritalStatus: selectedOption.value,
    });
    setSelectedMaritalStatus(selectedOption);
  }
  function handleOccupationSelect(selectedOption: any) {
    setFormValues({
      ...formValues,
      occupation: selectedOption.value,
    });
    setSelectedOccupation(selectedOption);
  }
  function handleSexSelect(selectedOption: any) {
    setFormValues({
      ...formValues,
      sex: selectedOption.value,
    });
    setSelectedSex(selectedOption);
  }
  const visaTypeStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderWidth: 1,
      fontSize: '14px',
      paddingTop: '5px',
      paddingBottom: '5px',
      borderColor: state.isFocused
        ? errors.birthCountry
          ? Colors.PRIMARYRED
          : Colors.PRIMARYGREEN
        : errors.birthCountry
          ? Colors.PRIMARYRED
          : Colors.PRIMARYBLUE,
      boxShadow: 'none',
      '&:hover': {
        borderColor: state.isFocused
          ? errors.birthCountry
            ? Colors.PRIMARYRED
            : Colors.PRIMARYGREEN
          : errors.birthCountry
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

  async function getPersonalDetailsData() {
    const response = await getPersonalDetails(trackingId);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data?.data) {
        setLoading(false);
        return;
      };
      setFormValues({
        firstName: response.data?.data.firstName as string,
        lastName: response.data?.data.lastName as string,
        birthDate: response.data?.data.birthDate as string,
        birthCity: response.data?.data.birthCity as string,
        birthCountry: response.data?.data.birthCountry as string,
        nationality: response.data?.data.nationality as string,
        issuingCountry: response.data?.data.issuingCountry as string,
        passportNumber: response.data?.data.passportNumber as string,
        sex: response.data?.data.sex as string,
        maritalStatus: response.data?.data.maritalStatus as string,
        occupation: response.data?.data.occupation as string,
        photographBase64: response.data?.data.photographBase64 as string,
        trackingId,
      });
      setSelectedBirthCountry({
        value: response.data?.data.birthCountry,
        label: response.data?.data.birthCountryName,
      });
      setSelectedNationality({
        value: response.data?.data.nationality,
        label: response.data?.data.nationalityName,
      });
      setSelectedIssuingCountry({
        value: response.data?.data.issuingCountry,
        label: response.data?.data.issuingCountryName,
      });
      setSelectedSex({
        value: response.data?.data.sex,
        label: sex.find(
          (sexData: any) => sexData.value === response.data?.data.sex,
        ).label,
      });
      setSelectedMaritalStatus({
        value: response.data?.data.maritalStatus,
        label: maritalStatus.find(
          (maritalStatusData: any) =>
            maritalStatusData.value === response.data?.data.maritalStatus,
        ).label,
      });
      setSelectedOccupation({
        value: response.data?.data.occupation,
        label: capitalizeFirstLetter(response.data?.data.occupationName) + ' Job',
      });
    }
    setLoading(false);
  }
  async function getImageUploaded() {

    const response = await uploadedPicture(trackingId);

    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data.data) {
        setLoading(false);
        return;
      }

      // setFormValues(
      //   {
      //     ...formValues,
      //     photographBase64: response.data.data.photographBase64,
      //   },
      // );
      setImage(response.data.data.photographBase64);
      setLoading(false);
    };
  }

  useEffect(() => {
    if (trackingId) {
      getImageUploaded()
      getPersonalDetailsData();
      setFormValues({
        ...formValues,
        trackingId,
      });
    }
  }, [, trackingId]);
  return (
    <>
      {
        loading ? (
          <div className='flex items-center justify-center h-full'>
            <Loader />
          </div>
        ) : (
          <div className='py-10 h-full'>
            <form
              className=" flex items-center justify-center  h-full"
              onSubmit={handleFormSubmit}
            >

              <div className="w-full">
                <div className=" flex justify-center">
                  <p className="font-serif text-2xl font-bold text-logoColorBlue md:text-5xl">
                    Personal Details
                  </p>
                </div>
                {/* <div className="mt-3 flex justify-center">
                  <p className="text-xs text-logoColorGreen md:text-base">
                    Fill up the form below to apply for a visa
                  </p>
                </div> */}
                <div className="mt-4 flex justify-center gap-x-44">
                  <div className="relative mr-2 mt-1 w-full">
                    <div className="my-5 flex w-full justify-center">
                      <ImageUpload
                        setFormValues={setFormValues}
                        formValues={formValues}
                        photographBase64={image ? image : formValues.photographBase64}
                        disabled={true}
                      />
                    </div>
                    <div className="mt-5 flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                      <InputComponent
                        label={'First Names'}
                        maxLength={32}
                        minLength={3}
                        type={'text'}
                        placeholder={'Enter your First Names'}
                        name={'firstName'}
                        value={formValues.firstName}
                        className="w-3/4 md:w-1/4"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          handlePersonalDetails(
                            e,
                            formValues,
                            setFormValues,
                            errors,
                            setErrors,
                          )

                        }}
                        error={''}
                        required
                      />

                      <InputComponent
                        label={'Last Name'}
                        maxLength={32}
                        minLength={3}
                        type={'text'}
                        placeholder={'Enter your Last Name'}
                        name={'lastName'}
                        value={formValues.lastName}
                        className="w-3/4 md:w-1/4 mt-3 md:mt-0"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          handlePersonalDetails(
                            e,
                            formValues,
                            setFormValues,
                            errors,
                            setErrors,
                          )
                        }}
                        error={''}
                        required
                      />
                    </div>

                    <div className="mt-4 flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                      <InputComponent
                        label={'Birth Date'}
                        maxLength={32}
                        minLength={3}
                        type={'date'}
                        placeholder={'mm/dd/yyyy'}
                        name={'birthDate'}
                        value={formValues.birthDate.split('T')[0]}
                        className="w-3/4 md:w-1/4"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handlePersonalDetails(
                            e,
                            formValues,
                            setFormValues,
                            errors,
                            setErrors,
                          )
                        }
                        required
                        max={new Date().toISOString().split('T')[0]}
                        error={errors.birthDate}
                      />

                      <InputComponent
                        label={'Birth City'}
                        maxLength={32}
                        minLength={3}
                        type={'text'}
                        placeholder={'Enter your Birth City'}
                        name={'birthCity'}
                        value={formValues.birthCity}
                        className="w-3/4 md:w-1/4 mt-3 md:mt-0"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handlePersonalDetails(
                            e,
                            formValues,
                            setFormValues,
                            errors,
                            setErrors,
                          )
                        }
                        required
                        error={errors.birthCity}
                      />
                    </div>
                    <div className="mr-2 mt-4 w-full">
                      <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                        <div className="w-3/4 md:w-1/4">
                          <label className="text-sm font-semibold text-logoColorBlue">
                            Birth Country
                          </label>
                          <Select
                            options={countries}
                            styles={visaTypeStyles}
                            onChange={handleBirthCountrySelect}
                            value={selectedBirthCountry}
                            required
                          />
                        </div>
                        <div className="w-3/4 md:w-1/4 mt-3 md:mt-0">
                          <label className="text-sm font-semibold text-logoColorBlue">
                            Nationality
                          </label>
                          <Select
                            options={countries}
                            styles={visaTypeStyles}
                            onChange={handleNationalitySelect}
                            value={selectedNationality}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center gap-x-44">
                      <div className="mt-1 w-full">
                        <div className="flex w-full items-center justify-center gap-x-44   md:flex-row flex-col">

                          <InputComponent
                            label={'Passport Number'}
                            maxLength={32}
                            minLength={3}
                            type={'text'}
                            placeholder={'Enter your Passport Number'}
                            name={'passportNumber'}
                            value={formValues.passportNumber}
                            className="w-3/4 md:w-1/4"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              setFormValues({
                                ...formValues,
                                passportNumber: e.target.value.toUpperCase(),
                              });
                            }}
                            required
                            error={errors.passportNumber}
                          />
                          <div className="w-3/4 md:w-1/4 mt-3 md:mt-0">
                            <label className="text-sm font-semibold text-logoColorBlue">
                              Passport Issuing Country
                            </label>
                            <Select
                              options={countries}
                              styles={visaTypeStyles}
                              onChange={handleIssuingCountrySelect}
                              value={selectedIssuingCountry}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mr-2 mt-4 w-full">
                      <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                        <div className="w-3/4 md:w-1/4">
                          <label className="text-sm font-semibold text-logoColorBlue">
                            Sex
                          </label>
                          <Select
                            options={sex}
                            styles={visaTypeStyles}
                            onChange={handleSexSelect}
                            value={selectedSex}
                            required
                          />
                        </div>
                        <div className="w-3/4 md:w-1/4 mt-3 md:mt-0">
                          <label className="text-sm font-semibold text-logoColorBlue">
                            Marital Status
                          </label>
                          <Select
                            options={maritalStatus}
                            styles={visaTypeStyles}
                            onChange={handleMaritalStatusSelect}
                            value={selectedMaritalStatus}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center gap-x-44">
                      <div className="mr-2 mt-1 w-full">
                        <div className="flex w-full items-center justify-center gap-x-44  md:flex-row flex-col">
                          <div className="md:w-1/4 w-3/4">
                            <label className="text-sm font-semibold text-logoColorBlue">
                              Occupation
                            </label>
                            <Select
                              options={occupations}
                              styles={visaTypeStyles}
                              onChange={handleOccupationSelect}
                              value={selectedOccupation}
                              required
                            />
                          </div>
                          <div className="w-1/4">
                            <div className="hidden"></div>
                          </div>
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
                </div>

              </div>
            </form>
          </div>
        )
      }
    </>
  );
}
