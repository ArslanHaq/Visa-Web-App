'use client';

import { handleContactDetails } from '@/constants/functions';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import InputComponent from '../atoms/InputComponent';
import { ContactDetailsDto, SocialMediaLinks } from '@/dto/ApplicationData.dto';
import Select from 'react-select';
import { Colors } from '@/constants/constants';
import { getContactDetails, submitContactDetails } from '@/server/Application';
import { toast } from 'react-toastify';
import Loader from '../atoms/Loader';
import classNames from 'classnames';
import { set } from 'animejs';
interface ContactDetailsFormProps {
  phoneCodes: any;
  countries: any;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  trackingId: string;
}

export default function ContactDetailsFormComponent({
  trackingId,
  phoneCodes,
  countries,
  setCurrentStep,
}: ContactDetailsFormProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [formValues, setFormValues] = useState<ContactDetailsDto>({
    trackingId,
    email1: '',
    email2: '',
    landline1: '',
    landline2: '',
    mobile1: '',
    phoneCode1: '',
    mobile2: '',
    phoneCode2: '',
    addressLineOne: '',
    addressLineTwo: '',
    city: '',
    postalCode: '',
    country: '',
    socialMedia: [],
  });
  const [errors, setErrors] = useState<ContactDetailsDto>({
    trackingId: '',
    email1: '',
    email2: '',
    landline1: '',
    landline2: '',
    mobile1: '',
    phoneCode1: '',
    mobile2: '',
    phoneCode2: '',
    addressLineOne: '',
    addressLineTwo: '',
    city: '',
    postalCode: '',
    country: '',
    socialMedia: [],
  });


  const [socailMediaHandlesOptions, setSocailMediaHandlesOptions] = useState<any>([
    {
      value: 'Facebook',
      label: 'Facebook'
    },
    {
      value: 'Twitter',
      label: 'Twitter'
    },
    {
      value: 'Instagram',
      label: 'Instagram'
    },

  ]);

  const [selectedPhoneCode1, setSelectedPhoneCode1] = useState<any>(null);
  const [selectedPhoneCode2, setSelectedPhoneCode2] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedSocialMediaHandle, setSelectedSocialMediaHandle] = useState<any>(null);


  const [socialMediaHandle, setSocialMediahandle] = useState<SocialMediaLinks>(
    {
      link: '',
      socialMediaApp: '',
      trackingId: trackingId
    }
  )

  // const [showbutton, setShowbutton] = useState<boolean>(true);
  // const [isDelete, setIsDelete] = useState<boolean>(false);

  const [socialMediaHandles, setSocialMediaHandles] = useState<SocialMediaLinks[]>([]);
  const handleSocialMediaHandleSelect = (selectedOption: any) => {
    setSelectedSocialMediaHandle(selectedOption);
  }
  const handleCodeOneSelectChange = (selectedOption: any) => {
    setFormValues({
      ...formValues,
      phoneCode1: selectedOption.value,
    });
    setSelectedPhoneCode1(selectedOption);
  };

  const handleCodeTwoSelectChange = (selectedOption: any) => {
    setFormValues({
      ...formValues,
      phoneCode2: selectedOption.value,
    });
    setSelectedPhoneCode2(selectedOption);
  };
  const handleCountrySelect = (selectedOption: any) => {
    setFormValues({
      ...formValues,
      country: selectedOption.value,
    });
    setSelectedCountry(selectedOption);
  };

  const addSocialMediaHandle = () => {
    setSocialMediaHandles([...socialMediaHandles,
    {
      socialMediaApp: selectedSocialMediaHandle.value,
      link: socialMediaHandle.link,
      trackingId: trackingId
    }
    ]);
    setSocialMediahandle({
      link: '',
      socialMediaApp: '',
      trackingId: trackingId
    })
    setSelectedSocialMediaHandle(null);
    socailMediaHandlesOptions.filter((option: any) => {
      if (option.value === selectedSocialMediaHandle.value) {
        socailMediaHandlesOptions.splice(socailMediaHandlesOptions.indexOf(option), 1);
      }
    }
    )
  }

  const removeSocialMediaHandle = (index: number) => {
    const newSocialMediaHandles = socialMediaHandles.filter((handle, i) => i !== index);
    setSocialMediaHandles(
      newSocialMediaHandles
    );
    socailMediaHandlesOptions.push({
      value: socialMediaHandles[index].socialMediaApp,
      label: socialMediaHandles[index].socialMediaApp
    });

  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await submitContactDetails({
      trackingId,
      email1: formValues.email1,
      email2: formValues.email2,
      landline1: formValues.landline1,
      landline2: formValues.landline2,
      mobile1: formValues.mobile1,
      phoneCode1: formValues.phoneCode1,
      mobile2: formValues.mobile2,
      phoneCode2: formValues.phoneCode2 === '' ? '0' : formValues.phoneCode2,
      addressLineOne: formValues.addressLineOne,
      addressLineTwo: formValues.addressLineTwo,
      city: formValues.city,
      postalCode: formValues.postalCode,
      country: formValues.country,
      socialMedia: socialMediaHandles,

    });
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      toast.success('Form submitted successfully');
      setCurrentStep(5);
    }
  }
  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: '110px', // Set the desired width here
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      borderWidth: 1,
      fontSize: '14px',
      paddingTop: '5px',
      paddingBottom: '5px',
      height: '45px',
      borderColor: state.isFocused
        ? errors.phoneCode1
          ? Colors.PRIMARYRED
          : Colors.PRIMARYGREEN
        : errors.phoneCode1
          ? Colors.PRIMARYRED
          : Colors.PRIMARYBLUE,
      boxShadow: 'none',
      '&:hover': {
        borderColor: state.isFocused
          ? errors.phoneCode1
            ? Colors.PRIMARYRED
            : Colors.PRIMARYGREEN
          : errors.phoneCode1
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
  const visaTypeStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderWidth: 1,
      fontSize: '14px',
      paddingTop: '5px',
      paddingBottom: '5px',
      borderColor: state.isFocused
        ? errors.country
          ? Colors.PRIMARYRED
          : Colors.PRIMARYGREEN
        : errors.country
          ? Colors.PRIMARYRED
          : Colors.PRIMARYBLUE,
      boxShadow: 'none',
      '&:hover': {
        borderColor: state.isFocused
          ? errors.country
            ? Colors.PRIMARYRED
            : Colors.PRIMARYGREEN
          : errors.country
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
  async function getContactDetailsData() {
    const response = await getContactDetails(trackingId);
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
        email1: response.data?.data.email1 as string,
        email2: response.data.data.email2 ? response.data?.data.email2 as string : '',
        landline1: response.data.data.landline1 ? response.data?.data.landline1 as string : '',
        landline2: response.data.data.landline2 ? response.data?.data.landline2 as string : '',
        mobile1: response.data?.data.mobile1 as string,
        phoneCode1: response.data?.data.phoneCode1 as string,
        mobile2: response.data.data.mobile2 ? response.data?.data.mobile2 as string : '',
        phoneCode2: response.data.data.phoneCode2 ? response.data?.data.phoneCode2 as string : '',
        addressLineOne: response.data?.data.addressLineOne as string,
        addressLineTwo: response.data.data.addressLineTwo ? response.data?.data.addressLineTwo as string : '',
        city: response.data?.data.city as string,
        postalCode: response.data?.data.postalCode as string,
        country: response.data?.data.country as string,
        trackingId: trackingId as string,
        socialMedia: response.data?.data.socailMedia as SocialMediaLinks[],
        countryName: response.data?.data.countryName as string,
      });

      setSelectedCountry({
        value: response.data?.data.country ?? '',
        label: response.data?.data.countryName ?? '',
      });
      setSelectedPhoneCode1({
        value: response.data?.data.phoneCode1 ?? '',
        label: '+' + response.data?.data.phoneCode1 ?? '',
      })
      setSelectedPhoneCode2({
        value: response.data?.data.phoneCode2 === 0 ? null : response.data?.data.phoneCode2,
        label: '+' + response.data?.data.phoneCode2 ?? '',
      })

      setSocialMediaHandles(response.data?.data.socialMedia.map((handle: SocialMediaLinks) => {
        return {
          socialMediaApp: handle.socialMediaApp,
          link: handle.link,
          trackingId: handle.trackingId
        }
      }));

      setSocailMediaHandlesOptions(socailMediaHandlesOptions.filter((option: any) => {
        let isPresent = false;
        response.data?.data.socialMedia.forEach((handle: SocialMediaLinks) => {
          if (handle.socialMediaApp === option.value) {
            isPresent = true;
          }
        });
        return !isPresent;
      }
      ));
    }
    setLoading(false);
  }


  useEffect(() => {
    if (trackingId) {


      getContactDetailsData();
      setFormValues({
        ...formValues,
        trackingId,
      });
    };
  }, [, trackingId]);
  return (
    <>{
      loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className='h-full'>
          <form
            className="flex h-full items-center justify-center"
            onSubmit={handleFormSubmit}
          >
            <div className="w-full">
              <div className="mt-5 flex justify-center">
                <p className="font-serif text-2xl font-bold text-logoColorBlue md:text-5xl">
                  Contact Details
                </p>
              </div>
              {/* <div className="mt-3 flex justify-center">
                <p className="text-xs text-logoColorGreen md:text-base">
                  Fill up the form below to apply for a visa
                </p>
              </div> */}

              <div className="mt-10 flex justify-center gap-x-44">
                <div className="mr-2 mt-1 w-full">
                  <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                    <InputComponent
                      label={'Email1'}
                      maxLength={32}
                      minLength={3}
                      type={'text'}
                      placeholder={'Enter your Email Address'}
                      name={'email1'}
                      value={formValues.email1}
                      className="w-3/4 md:w-1/4"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleContactDetails(
                          e,
                          formValues,
                          setFormValues,
                          errors,
                          setErrors,
                        )
                      }
                      error={errors.email1}
                      required
                    />

                    <InputComponent
                      label={'Email2'}
                      maxLength={32}
                      minLength={3}
                      type={'text'}
                      placeholder={'Enter your Email Address'}
                      name={'email2'}
                      value={formValues.email2}
                      className="w-3/4 md:w-1/4 mt-3 md:mt-0"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleContactDetails(
                          e,
                          formValues,
                          setFormValues,
                          errors,
                          setErrors,
                        )
                      }
                      error={errors.email2}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-x-44">
                <div className="mr-2 mt-1 w-full">
                  <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                    <InputComponent
                      label={'Landline1'}
                      maxLength={18}
                      minLength={3}
                      type={'text'}
                      placeholder={'Enter your Landline Number'}
                      name={'landline1'}
                      value={formValues.landline1}
                      className="w-3/4 md:w-1/4"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleContactDetails(
                          e,
                          formValues,
                          setFormValues,
                          errors,
                          setErrors,
                        )
                      }
                      error={errors.landline1}

                    />

                    <InputComponent
                      label={'Landline2'}
                      maxLength={18}
                      minLength={3}
                      type={'text'}
                      placeholder={'Enter your Landline Number'}
                      name={'landline2'}
                      value={formValues.landline2}
                      className="w-3/4 md:w-1/4 mt-3 md:mt-0"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleContactDetails(
                          e,
                          formValues,
                          setFormValues,
                          errors,
                          setErrors,
                        )
                      }
                      error={errors.landline2}

                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center gap-x-44 md:flex-row flex-col">
                <div className="w-3/4 md:w-1/4">
                  <label className="text-sm font-semibold text-logoColorBlue">
                    Mobile 1
                  </label>
                  <div className="flex">
                    <div className="mr-1 mt-1">
                      <Select
                        options={phoneCodes}
                        onChange={handleCodeOneSelectChange}
                        styles={customStyles}
                        value={selectedPhoneCode1}
                        required
                      />
                    </div>
                    <InputComponent
                      label={''}
                      maxLength={18}
                      type={'text'}
                      placeholder={'Enter your Mobile Number'}
                      name={'mobile1'}
                      value={formValues.mobile1}
                      className="w-full"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleContactDetails(
                          e,
                          formValues,
                          setFormValues,
                          errors,
                          setErrors,
                        )
                      }
                      error={errors.mobile1}
                      required
                    />
                  </div>
                </div>
                <div className="mr-1 w-3/4 md:w-1/4 mt-3 md:mt-0">
                  <label className="text-sm font-semibold text-logoColorBlue">
                    Mobile 2
                  </label>
                  <div className="flex">
                    <div className="mr-1 mt-1">
                      <Select
                        options={phoneCodes}
                        onChange={handleCodeTwoSelectChange}
                        value={selectedPhoneCode2}
                        styles={customStyles}

                      />
                    </div>
                    <InputComponent
                      label={''}
                      maxLength={18}
                      type={'text'}
                      placeholder={'Enter your Mobile Number'}
                      name={'mobile2'}
                      value={formValues.mobile2}
                      className="w-full"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleContactDetails(
                          e,
                          formValues,
                          setFormValues,
                          errors,
                          setErrors,
                        )
                      }
                      error={errors.mobile2}

                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-x-44">
                <div className="mr-2 mt-1 w-full">
                  <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                    <InputComponent
                      label={'Address Line 1'}
                      maxLength={38}
                      minLength={3}
                      type={'text'}
                      placeholder={'Enter your Address Line 1'}
                      name={'addressLineOne'}
                      value={formValues.addressLineOne}
                      className="w-3/4 md:w-1/4"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleContactDetails(
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
                      label={'Address Line 2'}
                      maxLength={38}
                      minLength={3}
                      type={'text'}
                      placeholder={'Enter your Address Line 2'}
                      name={'addressLineTwo'}
                      value={formValues.addressLineTwo}
                      className="w-3/4 md:w-1/4 mt-3 md:mt-0"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleContactDetails(
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
              </div>
              <div className="mt-4 flex justify-center gap-x-44">
                <div className="mr-2 mt-1 w-full">
                  <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                    <div className="w-3/4 md:w-1/4">
                      <label className="text-sm font-semibold text-logoColorBlue">
                        Country
                      </label>
                      <Select
                        options={countries}
                        styles={visaTypeStyles}
                        onChange={handleCountrySelect}
                        value={selectedCountry}
                        required
                      />
                    </div>


                    <InputComponent
                      label={'City'}
                      maxLength={38}
                      minLength={3}
                      type={'text'}
                      placeholder={'Enter your City'}
                      name={'city'}
                      value={formValues.city}
                      className="w-3/4 md:w-1/4 mt-3 md:mt-0"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleContactDetails(
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
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-x-44">
                <div className="mr-2 mt-1 w-full">
                  <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                    <InputComponent
                      label={'Postal Code'}
                      maxLength={10}
                      minLength={3}
                      type={'text'}
                      placeholder={'Enter your Postal Code'}
                      name={'postalCode'}
                      value={formValues.postalCode}
                      className="w-3/4 md:w-1/4"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleContactDetails(
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
                    <div className="w-3/4 md:w-1/4">
                      <div className="hidden"></div>
                    </div>
                  </div>


                </div>
              </div>


              <div className="mt-10 flex justify-center">
                <div className=" mt-1 w-3/4 md:w-2/3">
                  <p className="md:text-2xl font-bold mb-3 text-logoColorBlue underline underline-offset-4">
                    {' '}
                    Social Media Handles
                  </p>
                  <div className="flex w-full items-center md:ms-10  justify-center gap-x-20  md:flex-row flex-col ">
                    <div className="w-full">
                      <label className="text-sm font-semibold text-logoColorBlue">
                        Account
                      </label>
                      <Select
                        options={socailMediaHandlesOptions}
                        styles={visaTypeStyles}
                        onChange={handleSocialMediaHandleSelect}
                        value={selectedSocialMediaHandle}
                      />
                    </div>

                    <InputComponent
                      label={'Handler '}
                      maxLength={32}
                      minLength={3}
                      type={'text'}
                      placeholder={'Enter your social handler here'}
                      name={'Link'}
                      value={socialMediaHandle.link}
                      className="w-full mt-3 md:mt-0"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setSocialMediahandle({
                          ...socialMediaHandle,
                          link: e.target.value
                        })
                      }
                      error={errors.postalCode}

                    />
                    <div className="mt-6 ms-7 w-1/2 md:w-1/5">
                      <div className="flex">
                        <button
                          className={classNames(
                            'rounded-md w-full md:w-32 py-3 bg-logoColorGreen',

                          )}
                          type="button"
                          onClick={() => {

                            if (selectedSocialMediaHandle !== null && socialMediaHandle.link !== '') {
                              addSocialMediaHandle();
                            } else {
                              toast.error('Please select a social media handle and enter a link')
                            }

                          }}
                        >
                          <span className="text-sm text-white ">
                            + Add To List
                          </span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              {
                socialMediaHandles.map((handle, index: number) => {
                  return (
                    <div className="mt-4 flex justify-center gap-x-44">
                      <div className=" mt-1 w-3/4 md:w-2/3">
                        {index === 0 && <p className="md:text-2xl font-bold text-logoColorBlue underline underline-offset-4">
                          {' '}
                          Handles
                        </p>}
                        <div className="flex w-full items-center md:ms-10  justify-center gap-x-20  md:flex-row flex-col ">

                          <InputComponent
                            label={index === 0 ? 'Handler' : ''}
                            maxLength={32}
                            minLength={3}
                            type={'text'}
                            placeholder={'Enter your social handler here'}
                            name={'Link'}
                            value={handle.socialMediaApp}
                            className="w-full"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { }
                            }
                            error={""}
                            disabled
                          />


                          <InputComponent
                            label={index === 0 ? 'Link ' : ''}
                            maxLength={32}
                            minLength={3}
                            type={'text'}
                            placeholder={''}
                            name={'Link'}
                            value={handle.link}
                            className="w-full mt-3 md:mt-0"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { }}
                            error={''}
                            disabled

                          />
                          <div className="mt-6 ms-7 w-1/2 md:w-1/5">


                            <button
                              className={classNames(
                                'rounded-md w-full md:w-32 py-3 bg-red-500',)}
                              type="button"
                              onClick={() => {

                                removeSocialMediaHandle(index);
                              }}
                            >
                              <span className="text-sm text-white ">
                                Delete From List

                              </span>
                            </button>

                          </div>

                        </div>
                      </div>
                    </div>
                  )

                })
              }

              <div className="mt-20 mb-32 flex justify-center">
                <button
                  type="submit"
                  className="w-3/4 md:w-1/4 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-base text-white"
                >
                  Continue
                </button>
              </div>
            </div>
          </form >
        </div >
      )
    }
    </>
  );
}
