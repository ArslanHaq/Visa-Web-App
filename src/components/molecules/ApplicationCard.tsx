import { ApplicationStatus, getStatusColor, getStatusText } from '@/constants/constants';
import { capitalizeFirstLetter, capitalizeWords } from '@/constants/functions';
import { DataList } from '@/dto/ApplicationData.dto';
import classNames from 'classnames';

interface Props {
  application: DataList;
}
export default function ApplicationCard({ application }: Props) {
  const statusColor = getStatusColor(application.status as ApplicationStatus);
  const statusText = getStatusText(application.status as ApplicationStatus);
  return (
    <div className="my-4 flex flex-col w-full md:flex-row gap-x-32 cursor-pointer flex-wrap md:items-center justify-between rounded-xl bg-logoColorBlue px-20 py-12 opacity-90 drop-shadow-[0px_0px_10px_rgba(0,10,10,10)]">
      <div>
        <p className=" text-lg font-bold text-green-500"> Tracking Id</p>
        <p className="mt-4 ml-1 text-sm font-bold text-white">
          {application.trackingId}
        </p>
      </div>
      <div className=''>
        <p className=" text-lg font-bold text-green-500  md:mt-0 mt-3">Last Section</p>
        <p className="mt-4 text-sm font-bold text-white">
          {application.lastSection}
        </p>
      </div>
      <div className="">
        <p className="py-3 text-lg font-bold text-green-500">Status</p>
        <p
          className={classNames(
            'rounded-md w-40 flex justify-center -ml-1 py-2 text-sm font-bold text-white',
            statusColor
          )}
        >
          {capitalizeWords(statusText)}
        </p>
      </div>
    </div>
  );
}


// ---demo----
{/* <div className="">
<p className="py-3 text-lg font-bold text-green-500"> Status</p>
<p
  className={classNames(
    `-ml-1 flex w-40 justify-center rounded-md py-2 text-sm font-bold text-white`,
    {
      'bg-red-600': application.status === ApplicationStatus.REJECTED,
      'bg-orange-700': application.status === ApplicationStatus.MOVED,
      'bg-blue-800':
        application.status === ApplicationStatus.INPROGRESS,
      'bg-logoColorGreen':
        application.status === ApplicationStatus.APPROVED,
    },
  )}
>
  {capitalizeWords(
    application.status === ApplicationStatus.MOVED
      ? 'Awaiting Response'
      : application.status === ApplicationStatus.APPROVED
        ? 'In Process'
        : application.status,
  )}
</p>
</div> */}