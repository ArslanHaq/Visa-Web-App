import { useEffect, useState } from "react";
import SuccessIcon from "../atoms/Svg/SuccessIcon";
import { getApplication } from "@/server/Application";
import { toast } from "react-toastify";
import { formatCurrency } from "@/constants/functions";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { set } from "animejs";


interface PaymentReviewComponentProps {
    trackingId: string;

}
export default function PaymentReviewComponent({ trackingId }: PaymentReviewComponentProps) {
    const router = useRouter();
    const [modal, setModal] = useState(false);
    const [data, setData] = useState({
        amount: '100',
        refNumber: '123456789',
        paymentTime: '25-02-2024, 13:22:16',
        paymentMethod: 'Visa Card',
        senderName: 'John Doe',
        adminFee: 10,
        currency: 'USD'
    }
    )
    return (
        <>
            <Modal showModal={modal}>
                <div className="flex h-40 w-72 md:w-96 px-5 flex-col items-center justify-center text-center">
                    <p className="mt-4 text-sm  md:text-base text-slate-200 max-w-lg ">
                        Your visa application is submitted and we will keep you informed on the application status through your registered email.
                    </p>
                    <button
                        onClick={() => {
                            setModal(false);
                            router.push('/');
                        }}
                        className="mt-4 text-sm md:text-base rounded-xl bg-slate-500 px-6 py-2 text-white hover:bg-black"
                    >
                        Continue
                    </button>
                </div>
            </Modal>
            <div className="flex items-center justify-center h-full flex-col mt-10">
                <div className="bg-slate-200 border md:w-[400px] w-[350px] border-gray-300 py-12 px-7 shadow-md overflow-hidden rounded-xl">
                    <div className="flex flex-col items-center justify-center mb-4">
                        <SuccessIcon />
                        <p className="mt-1 text-sm text-logoColorBlue font-bold">
                            Payment Success
                        </p>
                        <p className="mt-3 text-2xl text-logoColorBlue font-bold">
                            {formatCurrency(parseInt(data.amount), data.currency)}
                        </p>
                    </div>
                    <div className="h-[2px] bg-slate-400"></div>
                    <div className="flex flex-col items-center justify-center mt-6">
                        <div className="flex justify-between w-full">
                            <p className="mt-1 text-base text-logoColorBlue font-bold underline">
                                Reference Number
                            </p>
                            <p className="mt-1 text-sm text-logoColorGreen font-bold">
                                {data.refNumber}
                            </p>

                        </div>
                        <div className="flex mt-3 justify-between w-full">
                            <p className=" text-base text-logoColorBlue font-bold  underline">
                                Payment Time
                            </p>
                            <p className=" text-sm text-logoColorGreen font-bold  ">
                                {data.paymentTime}
                            </p>

                        </div>

                        <div className="flex mt-3 justify-between w-full">
                            <p className=" text-base text-logoColorBlue font-bold underline">
                                Payment Method
                            </p>
                            <p className=" text-sm text-logoColorGreen font-bold">
                                {data.paymentMethod}
                            </p>

                        </div>
                        <div className="flex mt-3 justify-between w-full">
                            <p className=" text-base text-logoColorBlue font-bold underline">
                                Sender Name
                            </p>
                            <p className=" text-sm text-logoColorGreen font-bold">
                                {data.senderName}
                            </p>

                        </div>

                        <div className="flex mt-7 justify-between w-full">
                            <p className=" text-base text-logoColorBlue font-bold underline">
                                Amount
                            </p>
                            <p className=" text-sm text-logoColorGreen font-bold">
                                {formatCurrency(parseInt(data.amount), data.currency)}
                            </p>
                        </div>
                        <div className="flex mt-1 justify-between w-full">
                            <p className=" text-base text-logoColorBlue font-bold underline">
                                Admin Fee
                            </p>
                            <p className=" text-sm text-logoColorGreen font-bold">
                                {formatCurrency(data.adminFee, data.currency)}
                            </p>

                        </div>
                        <div className="flex mt-1 justify-between w-full">
                            <p className=" text-base text-logoColorBlue font-bold underline">
                                Total Fee
                            </p>
                            <p className=" text-sm text-logoColorGreen font-bold">
                                {formatCurrency(data.adminFee + parseInt(data.amount), data.currency)}
                            </p>

                        </div>
                    </div>

                </div>
                <div className="my-20 flex justify-center gap-x-10 w-full">
                    <button
                        type="button"
                        onClick={() => setModal(true)}
                        className="w-3/4 md:w-1/5 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-sm md:text-base text-white"
                    >
                        Submit Application
                    </button>
                </div>
            </div>
        </>
    );
}