/* eslint-disable prettier/prettier */
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import PlaneIcon from '../atoms/Svg/PlaneIcon';
import Loader from '../atoms/Loader';
import { OriginDto } from '@/dto/Signup.dto';
import { getCountryOrigin } from '@/server/Signup';
import { useRouter } from 'next/navigation';

export default function LandingComponent() {
    const imgSrc = '/bg2.jpg';
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [countryData, setCountryData] = useState<OriginDto>();
    const [flagSrc, setFlagSrc] = useState<string>('');
    const [coatSrc, setCoatSrc] = useState<string>('');

    async function getCountryData() {
        const response = await getCountryOrigin();
        if (response.error && response.error.length > 0) {
            response.error.forEach((err) => {
                console.log(`Error ${err.code}: ${err.description}`);
            });
        } else {
            if (!response.data) return;
            setCountryData(response);
            setFlagSrc(response.data.flag ? String(response.data?.flag) : '');
            setCoatSrc(
                response.data?.coat
                    ? String(response.data?.coat).replace('+html', '+xml')
                    : '',
            );
            setLoading(false);
        }
    }

    useEffect(() => {
        getCountryData();
    }, []);

    return (
        <>
            {loading ? (
                <div className="flex h-screen items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <div className="relative flex h-screen w-full items-center justify-center ">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
                        style={{ backgroundImage: `url(${imgSrc})` }}
                    ></div>
                    <div className="animate-slide-left-to-right absolute left-10 md:left-24 top-10">
                        <div className="flex items-center justify-center gap-x-2">
                            <div>
                                {coatSrc ? (
                                    <Image
                                        src={coatSrc}
                                        alt="Picture of the author"
                                        width={130}
                                        height={130}
                                        quality={500}
                                        className="rounded-xl"
                                        style={{
                                            maxWidth: '110px',
                                            minWidth: '110px',
                                            maxHeight: '110px',
                                            minHeight: '110px',
                                            filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.9))', // Drop shadow

                                        }}
                                    />
                                ) : (
                                    <PlaneIcon width={100} height={100} />
                                )}
                            </div>
                            <p className="font-serif text-xl md:text-3xl font-bold text-logoColorBlue" style={{
                                filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.9))', // Drop shadow
                            }}>
                                {countryData?.data?.countryName} Visa
                            </p>
                        </div>
                    </div>
                    <div className="animate-slide-up relative z-10 mt-36 w-11/12 md:w-1/2 text-center text-white py-28 rounded-2xl bg-opacity-70 bg-white custom-shadow">
                        <div className="w-full">
                            <div className="flex justify-center">
                                <p className="font-serif text-xl font-bold text-logoColorBlue lg:text-5xl">
                                    Apply Online for Visa
                                </p>
                            </div>
                            <div className="mt-10 flex justify-center">
                                <p className="max-w-lg font-sans text-xl text-logoColorGreen lg:text-3xl">
                                    Simplest and Fastest way to submit a{' '}
                                    <span className="font-bold">
                                        {countryData?.data?.countryName} Visa Application{' '}
                                    </span>
                                </p>
                            </div>
                            <div className="mt-20 flex w-full justify-center gap-x-10">
                                <button
                                    type="button"
                                    onClick={() => router.push('/signup')}
                                    className="w-1/3 md:w-1/4 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-3 text-sm text-white lg:w-1/6"
                                >
                                    New Account
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.push('/signin')}
                                    className="w-1/3 md:w-1/4 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-3 text-sm text-white lg:w-1/6"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
