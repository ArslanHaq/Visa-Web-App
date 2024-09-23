import {
  getTodayDate,
  handleFinancialDetails,
  handleTravelPlan,
} from '@/constants/functions';
import { TravelHistory, TravelPlanDto } from '@/dto/ApplicationData.dto';
import { ChangeEvent, use, useEffect, useState } from 'react';
import InputComponent from '../atoms/InputComponent';
import TravelHistoryCardComponent from './travelHistoryCardComponent';
import {
  getTravelPlans,
  submitFinancialDetails,
  submitTravelPlan,
} from '@/server/Application';
import { toast } from 'react-toastify';
import { set } from 'animejs';
import Loader from '../atoms/Loader';

interface TravelPlanFormComponentProps {
  trackingId: string;
  setCurrentStep: any;
  countries: any;
}
export default function TravelPlanFormComponent({
  trackingId,
  setCurrentStep,
  countries,
}: TravelPlanFormComponentProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [formValues, setFormValues] = useState<TravelPlanDto>({
    trackingId,
    travelDate: '',
    arrivalPort: '',
    cities: '',
    travelHistory: [],
  });
  const [errors, setErrors] = useState<TravelPlanDto>({
    trackingId: '',
    travelDate: '',
    arrivalPort: '',
    cities: '',
    travelHistory: [],
  });

  const [travelHistoryRecord, setTravelHistoryRecord] =
    useState<TravelHistory[]>();
  const [travelHistory, setTravelHistory] = useState<TravelHistory>({
    finalDestination: '',
    travelDate: '',
    travelPurpose: '',
  });
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await submitTravelPlan({
      ...formValues,
      travelHistory: travelHistoryRecord as TravelHistory[],
    });
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      toast.success('Form submitted successfully');
      setCurrentStep(7);
    }
  };

  const getTravelPlanData = async () => {
    const response = await getTravelPlans(trackingId);
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
        trackingId,
        travelDate: response.data.data.travelDate,
        arrivalPort: response.data.data.arrivalPort,
        cities: response.data.data.cities,
        travelHistory: response.data.data.travelHistory,
      });
      setTravelHistoryRecord(response.data.data.travelHistory);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (trackingId) {

      getTravelPlanData();
      setFormValues({
        ...formValues,
        trackingId,
      });
    }
  }, [, trackingId]);

  useEffect(() => { }, [formValues]);

  return (
    <>
      {
        loading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        ) : (

          <div className='h-full'>
            <div className='h-full'>
              <form onSubmit={handleFormSubmit} className='flex items-center justify-center h-full '>

                <div className="w-full">
                  <div className="mt-5 flex justify-center">
                    <p className="font-serif  text-2xl font-bold text-logoColorBlue md:text-4xl">
                      Travel Plan and History
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
                        Travel Details
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 w-full">
                    <div className="flex w-full items-center justify-center gap-x-44 flex-col md:flex-row">
                      <InputComponent
                        label={'Travel Date'}
                        maxLength={30}
                        minLength={3}
                        type={'date'}
                        placeholder={'Enter your travel Date'}
                        name={'travelDate'}
                        value={formValues.travelDate.split('T')[0]}
                        className="w-3/4 md:w-1/4"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleTravelPlan(
                            e,
                            formValues,
                            setFormValues,
                            errors,
                            setErrors,
                          )
                        }
                        error={errors.travelDate}
                        min={getTodayDate()}
                        required
                      />
                      <InputComponent
                        label={'Arrival Port'}
                        maxLength={50}
                        minLength={3}
                        type={'text'}
                        placeholder={'Enter your Arrival Port'}
                        name={'arrivalPort'}
                        value={formValues.arrivalPort}
                        className="w-3/4 md:w-1/4"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleTravelPlan(
                            e,
                            formValues,
                            setFormValues,
                            errors,
                            setErrors,
                          )
                        }
                        error={errors.arrivalPort}
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4 w-full">
                    <div className="flex w-full items-center justify-center gap-x-44 flex-col md:flex-row">
                      <InputComponent
                        label={'City / Cities'}
                        maxLength={50}
                        minLength={3}
                        type={'text'}
                        placeholder={'You can enter multiple cities comma seperated'}
                        name={'cities'}
                        value={formValues.cities}
                        className="w-3/4 md:w-1/4"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleTravelPlan(
                            e,
                            formValues,
                            setFormValues,
                            errors,
                            setErrors,
                          )
                        }
                        error={errors.cities}
                        required
                      />
                      <div className="w-1/4"></div>
                    </div>
                  </div>
                  <div className=" mt-16 flex w-full items-center justify-center gap-x-44">
                    <div className="flex -ml-5 w-3/5">
                      <p className="md:text-2xl font-bold text-logoColorBlue underline underline-offset-4">
                        {' '}
                        Travel History
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 w-full">
                    <div className="flex w-full items-center justify-center gap-x-44">
                      <div className="flex w-1/4"></div>
                      <div className="w-1/4"></div>
                    </div>
                  </div>
                  <div className="mt-2 w-full">
                    <TravelHistoryCardComponent
                      travelHistory={travelHistory}
                      setTravelHistory={setTravelHistory}
                      travelHistoryRecord={travelHistoryRecord}
                      setTravelHistoryRecord={setTravelHistoryRecord}
                      showbutton
                      countries={countries}
                      isDelete={true}
                      index={0}
                    />
                  </div>
                  <div className="my-10 flex w-full justify-center">
                    <div className="w-9/12 border-[1px] border-double"></div>
                  </div>
                  {
                    travelHistoryRecord && travelHistoryRecord?.length > 0 && (


                      <div className="w-full">
                        <div className="my-3 flex w-full items-center justify-center gap-x-44">
                          <div className="w-1/4">
                            <p className="font-bold text-logoColorBlue underline text-md ms-10 md:ms-0">
                              History:
                            </p>
                          </div>
                          <div className="w-1/4"></div>
                        </div>

                        {travelHistoryRecord?.map((travelHistory, index) => (
                          <div className="my-2 flex w-full justify-center">
                            <TravelHistoryCardComponent
                              travelHistory={travelHistory}
                              setTravelHistory={setTravelHistory}
                              travelHistoryRecord={travelHistoryRecord}
                              setTravelHistoryRecord={setTravelHistoryRecord}
                              countries={countries}
                              isDelete={true}
                              index={index}
                            />
                          </div>
                        ))}
                      </div>
                    )
                  }
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
          </div>

        )
      }
    </>
  );
}
