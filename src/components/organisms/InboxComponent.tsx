'use client';
import { InitiatorApplicationStatus, Pages } from '@/constants/constants';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import classNames from 'classnames';
import AllApplicationComponent from '../molecules/AllApplicationComponent';
import AwaitingReviewApplicationComponent from '../molecules/AwaitingReviewApplicationComponent';
import ApprovedApplicationComponent from '../molecules/ApprovedApplicationComponent';
import RejectedApplicationComponent from '../molecules/RejectedApplicationComponent';
import InProcessApplicationComponent from '../molecules/InProcessApplicationComponent';
import EditApplicationComponent from '../molecules/EditApplicationComponent';
import { useAccessTokenMonitor } from '@/hooks/useAccessTokenMonitor';
import { useSession } from 'next-auth/react';


interface Props {
  accessToken: any;
  responseStatus?: any;
}
export default function InboxComponent({ accessToken, responseStatus }: Props) {
  const [activeTab, setActiveTab] = useState(InitiatorApplicationStatus.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { data: session, update } = useSession();

  const monitoredToken = useAccessTokenMonitor({ accessTokenCookie: accessToken, accessToken: session?.user.accessToken, update, session, responseStatus });

  return (
    <div className="mt-10 flex items-center ">
      <div className="w-full">
        <div className="mt-5 flex justify-center">
          <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
            Applications Inbox
          </p>
        </div>
        {/* <div className="mt-3 flex justify-center">
          <p className="text-xs text-logoColorGreen lg:text-base">
            Sign up to enjoy all the benefits of visa
          </p>
        </div> */}
        <div className="mt-20">
          <div className="container mx-auto">
            <div className="flex justify-center mb-6">
              <div className='w-full flex flex-wrap justify-between px-3'>
                <div className="flex flex-wrap gap-x-4 mt-2">
                  {[InitiatorApplicationStatus.ALL, InitiatorApplicationStatus.INPROCESS, InitiatorApplicationStatus.AWAITINGREVIEW, InitiatorApplicationStatus.APPROVEDAPPLICATION,
                  InitiatorApplicationStatus.REJECTEDAPPLICATION, InitiatorApplicationStatus.AWAIRINGYOURRESPONSE
                  ].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 mt-2 ${activeTab === tab
                        ? 'bg-logoColorGreen text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-logoColorGreen hover:bg-logoColorBlue hover:text-white'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-logoColorGreen"
                  />
                </div>
              </div>
            </div>


            <div className='h-[0.5px] mt-2 mb-7 bg-slate-400'></div>
            <div className='flex justify-end pe-3'>
              <div className={classNames("mb-10 flex justify-end")}>
                <button
                  onClick={() => {
                    const query = `?trackingId=`;
                    router.push(`${Pages.PLANNING}${query}`);
                  }}
                >
                  <div className="rounded-md bg-logoColorGreen px-5 py-3 text-white">
                    <p className=" text-xs md:text-sm font-semibold flex items-center gap-x-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                        >
                          <g>
                            <g
                              fill="none"
                              stroke="#ffff"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              data-name="add"
                            >
                              <path strokeLinecap="round" d="M12 19L12 5"></path>
                              <path d="M5 12L19 12"></path>
                            </g>
                          </g>
                        </svg>
                      </span>
                      Start New Application
                    </p>
                  </div>
                </button>
              </div>
            </div>
            {
              activeTab === InitiatorApplicationStatus.ALL &&
              <div className=' flex justify-center w-full'>
                <AllApplicationComponent />
              </div>
            }
            {
              activeTab === InitiatorApplicationStatus.INPROCESS &&
              <div className=' flex justify-center w-full'>
                <InProcessApplicationComponent />
              </div>
            }
            {
              activeTab === InitiatorApplicationStatus.AWAITINGREVIEW &&
              <div className=' flex justify-center w-full'>
                <AwaitingReviewApplicationComponent />
              </div>
            }
            {
              activeTab === InitiatorApplicationStatus.APPROVEDAPPLICATION &&
              <div className=' flex justify-center w-full'>
                <ApprovedApplicationComponent />
              </div>
            }
            {
              activeTab === InitiatorApplicationStatus.REJECTEDAPPLICATION &&
              <div className=' flex justify-center w-full'>
                <RejectedApplicationComponent />
              </div>
            }
            {
              activeTab === InitiatorApplicationStatus.AWAIRINGYOURRESPONSE &&
              <div className=' flex justify-center w-full'>
                <EditApplicationComponent />
              </div>
            }

          </div>
        </div>
      </div>
    </div >
  );
}
