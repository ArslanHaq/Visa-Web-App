import { DataList } from "@/dto/ApplicationData.dto";
import { use, useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import Loader from "../atoms/Loader";
import ApplicationCard from "./ApplicationCard";
import { getApplicationList } from "@/server/Application";
import { Pages } from "@/constants/constants";
import { useRouter } from "next/navigation";


export default function AllApplicationComponent() {
    const [page, setPage] = useState(1);
    const [applications, setApplications] = useState<DataList[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const router = useRouter();

    const isInitialMount = useRef(true);


    // Fetch application data list
    const getApplicationDataList = useCallback(async () => {
        let response = await getApplicationList(page, 5);
        if (response.error && response.error.length > 0) {
            response.error.forEach((err) => {
                toast.error(`Error ${err.code}: ${err.description}`);
            });
        } else {
            let newApplications = response.data?.dataList as DataList[];
            if (totalCount === 0) {
                setTotalCount(response.data?.totalCount as number);
            }

            setApplications((prevApplications) => [...prevApplications, ...newApplications]);
            //newApplications = [];
            if (applications.length + newApplications.length >= (response.data?.totalCount as number)) {
                setHasMore(false);
            } else {
                setPage((prevPage) => prevPage + 1);
            }
        }
    }, [page, applications.length, totalCount]);


    useEffect(() => {
        if (isInitialMount.current) {
            setPage(1);
            setApplications([]);
            setHasMore(true);
            setTotalCount(0);
            getApplicationDataList();
            isInitialMount.current = false;
        }
    }, [, getApplicationDataList]);

    return (
        <div className="">

            <InfiniteScroll
                dataLength={applications.length}
                next={page > 1 ? getApplicationDataList : () => { }}
                hasMore={hasMore}
                loader={<Loader />}
                endMessage={
                    <div className="flex cursor-pointer justify-center">
                        <div className="my-10 w-7/12 rounded-xl text-center opacity-90 drop-shadow-[0px_10px_25px_rgba(0,10,10,10)]">
                            <p className="md:text-3xl text-xl font-bold text-logoColorBlue">
                                {applications.length > 0 ? "No more applications found" : "No applications found"}
                            </p>
                        </div>
                    </div>
                }
                style={{ overflow: 'unset' }}
            >
                <div className="w-full">
                    {applications.map((application, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                const query = `?trackingId=${application.trackingId}&lastSection=${application.lastSection}&status=${application.status}`;
                                router.push(`${Pages.PLANNING}${query}`);
                            }}
                        >
                            <ApplicationCard application={application} />
                        </div>
                    ))}
                </div>

            </InfiniteScroll>
        </div>
    )
}