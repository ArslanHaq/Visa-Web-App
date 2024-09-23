import React, { use, useEffect, useState } from 'react';
import Loader from '../atoms/Loader';
import ImageUpload from '../atoms/ImageUploader';
import TickIcon from '../atoms/Svg/TickIcon';
import classNames from 'classnames';
import { ApplicationStatus, PHTOTGUIDELINES } from '@/constants/constants';
import { uploadedPicture, uploadPicture } from '@/server/Application';
import { toast } from 'react-toastify';
import { UploadPhotoResponse } from '@/dto/ApplicationData.dto';
import CrossSvg from '../atoms/Svg/Cross';

interface TravelPlanFormComponentProps {
  trackingId: string;
  setCurrentStep: any;
  countries: any;
  setEditCurrentStep?: any;
  status?: string;
}

interface Guideline {
  id: number;
  text: string;
  isValid: boolean;
}

export default function UploadPhotoComponent({
  trackingId,
  setCurrentStep,
  setEditCurrentStep,
  status

}: TravelPlanFormComponentProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [formValues, setFormValues] = useState({ photographBase64: '' });
  const [upload, setUpload] = useState(false);
  const [guidelines, setGuidelines] = useState<Guideline[]>([
    { id: 8, text: PHTOTGUIDELINES.GUIDLINE8, isValid: true },
    { id: 1, text: PHTOTGUIDELINES.GUIDLINE1, isValid: false },
    { id: 2, text: PHTOTGUIDELINES.GUIDLINE2, isValid: false },
    { id: 3, text: PHTOTGUIDELINES.GUIDLINE3, isValid: false },
    { id: 4, text: PHTOTGUIDELINES.GUIDLINE4, isValid: false },
    { id: 5, text: PHTOTGUIDELINES.GUIDLINE5, isValid: false },
    { id: 6, text: PHTOTGUIDELINES.GUIDLINE6, isValid: false },
    { id: 7, text: PHTOTGUIDELINES.GUIDLINE7, isValid: false },
  ]);

  const [photoValidationResponse, setPhotoValidationResponse] = useState<UploadPhotoResponse>();
  const handleImageUpload = async (base64Image: string) => {
    setLoading(true);
    const response = await uploadPicture(trackingId, base64Image);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data) {
        setLoading(false);
        return;
      }
      setPhotoValidationResponse(response.data);
    };

    setLoading(false);
  }



  function checkGuidlines() {


    const results = photoValidationResponse?.data.passportPhotoCheckResults;

    const guidelineUpdates: any = {
      1: results?.face === 1,
      2: results?.correctProportion === true,
      3: results?.text === 'Straight',
      4: results?.backgroundBlank === true,
      5: results?.imageQuality === true,
      6: results?.imageBrightness === true,
      7: results?.colored === true,
    };

    setGuidelines((prevGuidelines) =>
      prevGuidelines.map((guideline) =>
        guideline.id in guidelineUpdates
          ? { ...guideline, isValid: guidelineUpdates[guideline.id] }
          : guideline
      )
    );
  }

  const allGuidelinesValid = guidelines.every(guideline => guideline.isValid);

  useEffect(() => {
    if (upload) {
      handleImageUpload(formValues.photographBase64);
    }
  }, [upload]);

  useEffect(() => {

    if (photoValidationResponse) {
      checkGuidlines();
    }

  }, [photoValidationResponse]);

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
      setFormValues({ photographBase64: response.data.data.photographBase64 });
      setGuidelines((prevGuidelines) => {
        return prevGuidelines.map((guideline) => {
          if (guideline.id === 3 || guideline.id === 1 || guideline.id === 7 || guideline.id === 6 || guideline.id === 5 || guideline.id === 4 || guideline.id === 2) {
            return { ...guideline, isValid: true };
          }
          return guideline;
        });
      }
      );
      setLoading(false);
    };
  }
  useEffect(() => {
    getImageUploaded()
  }, [, trackingId]);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="h-full">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-full">
              <div className="mt-5 flex justify-center">
                <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-4xl">
                  Upload  Photograph
                </p>
              </div>
              <div className="mt-16 flex justify-center">
                {/* <p className={classNames("font-serif text-base font-bold text-logoColorGreen ", {
                  "text-red-600": photoValidationResponse?.data.passportPhotoCheckResults.text !== 'Straight'
                }, {
                  "text-logoColorGreen": photoValidationResponse?.data.passportPhotoCheckResults.text === 'Straight'
                })}>
                  {photoValidationResponse?.data.passportPhotoCheckResults.text}
                </p> */}
              </div>
              <div className="mt-3 mb-10 flex w-full justify-center">
                <ImageUpload
                  setFormValues={setFormValues}
                  formValues={formValues}
                  photographBase64={formValues.photographBase64}
                  width='270px'
                  height='270px'
                  setUpload={setUpload}
                />
              </div>


              {/* Display guidelines dynamically */}
              <div className=' flex justify-center flex-col items-center'>

                {guidelines.map((guideline) => (
                  <div key={guideline.id} className=" mt-4 flex justify-center items-center gap-x-2 font-sans w-11/12 md:ms-10  ">
                    <div className='flex justify-start items-center gap-x-2 md:w-3/4 md:ms-20 '>
                      {guideline.id === 8 ?
                        <>
                          <p className='text-orange-600 text-base md:text-xl font-bold mb-12'>*</p>
                        </> : <span>
                          {
                            guideline.isValid ? <TickIcon width="20" height="20" isTrue={guideline.isValid} /> :
                              <CrossSvg size={20} color='#ef4444' />
                          }
                        </span>}
                      <p
                        className={classNames("text-sm md:text-base  font-bold text-start", {
                          "text-logoColorGreen": guideline.isValid,
                          "text-red-500": !guideline.isValid,
                          "text-orange-600": guideline.id === 8,
                        })}
                      >
                        {guideline.text}
                        {guideline.id == 8 && <div className="h-[0.8px] mt-2 mb-7 bg-slate-500 w-full"></div>}
                      </p>

                    </div>


                  </div>
                ))}
              </div>

              <div className="my-20 md:ms-10 flex justify-center">
                <button
                  type='button'
                  onClick={() => {
                    if (status === ApplicationStatus.EDITDOCUMENTS) {
                      setEditCurrentStep(2);
                    }
                    setCurrentStep(3)
                  }}
                  className={classNames(
                    "w-3/4 lg:w-1/6 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-sm md:text-base text-white",
                    { "opacity-50 cursor-not-allowed": !allGuidelinesValid }
                  )}
                  disabled={!allGuidelinesValid} // Disable button if not all guidelines are valid
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
