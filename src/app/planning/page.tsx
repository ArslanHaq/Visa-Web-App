import ProcedureComponent from '@/components/organisms/ProcedureComponent';
import { getVisaDuration, getVisaTypes } from '@/server/Application';
// import { useSearchParams } from 'next/navigation';
import { cookies } from 'next/headers'

import {
  getCountryData,
  getPhoneCodeData,
  getOccupationsData,
} from '@/server/Signup';

export default async function PlanningPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const visaTypes = await getVisaTypes();
  const nationalities = await getCountryData();
  const phoneCodes = await getPhoneCodeData();
  const occupations = await getOccupationsData();

  const applicationTrackingID = searchParams.trackingId as string;
  const lastSection = searchParams.lastSection as string;
  const status = searchParams.status as string;

  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const responseStatus = cookieStore.get('status')
  return (
    <div className='h-[90%]'>
      <ProcedureComponent
        applicationTrackingID={applicationTrackingID}
        visaTypes={visaTypes}
        nationalities={nationalities}
        phoneCodes={phoneCodes}
        occupations={occupations}
        lastSection={lastSection}
        status={status}
        accessToken={accessToken}
        responseStatus={responseStatus}
      />
    </div>
  );
}
