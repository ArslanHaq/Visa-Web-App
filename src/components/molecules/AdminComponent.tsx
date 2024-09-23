'use client';

import { ChangeEvent, use, useEffect, useState } from 'react';
import InputComponent from '../atoms/InputComponent';
import Select from 'react-select';
import { Colors } from '@/constants/constants';
import { set } from 'animejs';
import { getCoatOfArms, getFlagDetails, saveCoatOfArms } from '@/server/Signup';
import { toast } from 'react-toastify';
import { CoatOfArmsDto } from '@/dto/Signup.dto';
import Image from 'next/image';
import Loader from '../atoms/Loader';
import { capitalizeWords } from '@/constants/functions';

export default function AdminComponent() {
    const [loading, setLoading] = useState<boolean>(false);

    const [coat_of_arms, setCoatOfArms] = useState<CoatOfArmsDto[]>();
    const [coat_of_arms_dropdown, setCoatOfArmsDropdown] = useState<any[]>([]);
    const [countryFullname, setCountryFullname] = useState<string>('');
    const [formValue, setFormValues] = useState<CoatOfArmsDto>({
        alpha3: '',
        alpha2: '',
        countryName: '',
        flagFile: '',
        coaFile: '',
    });
    const [flagSrc, setFlagSrc] = useState<string>('');
    const [coatSrc, setCoatSrc] = useState<string>('');

    const [selectedCoat, setSelectedCoat] = useState<any>(null as any);
    const handleCoatSelect = (selectedOption: any) => {
        setFormValues(
            coat_of_arms?.find(
                (item: CoatOfArmsDto) => item.alpha3 === selectedOption.value,
            ) as CoatOfArmsDto,
        );
        setSelectedCoat(selectedOption);
    };

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        const response = await saveCoatOfArms(formValue.alpha3, countryFullname);

        if (response.error && response.error.length > 0) {
            response.error.forEach((err: any) => {
                toast.error(`Error ${err.code}: ${err.description}`);
            });
        } else {
            toast.success('Coat of arms saved successfully');
            setCountryFullname('');
            setSelectedCoat(null);
            setFlagSrc('');
            setCoatSrc('');
        }
    };
    const getCoatOfArmsData = async () => {
        const response = await getCoatOfArms();
        if (response.error && response.error.length > 0) {
            response.error.forEach((err: any) => {
                toast.error(`Error ${err.code}: ${err.description}`);
            });
        } else {
            if (!response.data) {
                setLoading(false);
                return;
            }
            setCoatOfArms(response.data);
            setCoatOfArmsDropdown(
                response.data.map((item: CoatOfArmsDto) => {
                    return { value: item.alpha3, label: item.countryName };
                }),
            );
        }
    };

    const getFlagDetailsData = async () => {
        const response = await getFlagDetails(
            formValue.flagFile,
            formValue.coaFile,
        );
        if (response.error && response.error.length > 0) {
            response.error.forEach((err: any) => {
                toast.error(`Error ${err.code}: ${err.description}`);
            });
        } else {
            if (!response.data) {
                setLoading(false);
                return;
            }
            setFlagSrc(
                response.data?.flag
                    ? String(response.data?.flag).replace('+html', '+xml')
                    : '',
            );
            setCoatSrc(
                response.data?.coat
                    ? String(response.data?.coat).replace('+html', '+xml')
                    : '',
            );
        }
        setLoading(false);
    };
    useEffect(() => {
        getCoatOfArmsData();
    }, []);

    useEffect(() => {
        if (formValue.alpha3) {
            setLoading(true);
            getFlagDetailsData();
        }
    }, [formValue]);
    return (
        <div className="h-full">
            <form
                className="flex h-full items-center justify-center"
                onSubmit={handleFormSubmit}
            >
                <div className="w-full">
                    <div className="flex justify-center py-20">
                        <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
                            Admin Panel
                        </p>
                    </div>

                    <div className="mt-4 flex justify-center gap-x-44">
                        <div className="mt-1 w-full">
                            <div className="flex w-full flex-col items-center justify-center gap-x-44 lg:flex-row">
                                <InputComponent
                                    label={'Country Full Name'}
                                    maxLength={40}
                                    minLength={3}
                                    type={'text'}
                                    placeholder={'Enter your country full name'}
                                    name={'countryFullName'}
                                    value={countryFullname}
                                    className="w-1/2 lg:w-1/6"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setCountryFullname(capitalizeWords(e.target.value));
                                    }}
                                    required
                                    error={''}
                                />
                                <div className="w-1/2 lg:w-1/6">
                                    <label className="text-sm font-semibold text-logoColorBlue">
                                        Issuing Country
                                    </label>
                                    <Select
                                        options={coat_of_arms_dropdown}
                                        styles={visaTypeStyles}
                                        onChange={handleCoatSelect}
                                        value={selectedCoat}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex items-center justify-center gap-x-44">
                        {loading ? (
                            <Loader />
                        ) : (
                            <>
                                <div>
                                    {coatSrc && (
                                        <>
                                            <p className="mb-5 text-xl font-bold text-logoColorBlue">
                                                Coat of arms
                                            </p>
                                            <div>
                                                <Image
                                                    layout="responsive"
                                                    src={coatSrc}
                                                    alt="Uploaded Image"
                                                    width={200}
                                                    height={200}
                                                    quality={100}
                                                    style={{
                                                        maxWidth: '150px',
                                                        minWidth: '150px',
                                                        maxHeight: '150px',
                                                        minHeight: '150px',
                                                    }}
                                                    className="rounded-lg border-2 border-dashed border-gray-300 p-2"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div>
                                    {flagSrc && (
                                        <>
                                            <p className="mb-5 text-xl font-bold text-logoColorBlue">
                                                Flag
                                            </p>
                                            <Image
                                                layout="responsive"
                                                src={flagSrc}
                                                alt="Uploaded Image"
                                                width={200}
                                                height={200}
                                                quality={100}
                                                style={{
                                                    maxWidth: '150px',
                                                    minWidth: '150px',
                                                    maxHeight: '150px',
                                                    minHeight: '150px',
                                                }}
                                                className="rounded-lg border-2 border-dashed border-gray-300 p-2"
                                            />
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="my-20 flex justify-center">
                        <button
                            type="submit"
                            className="w-1/2 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-base text-white lg:w-1/4"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

const visaTypeStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        borderWidth: 1,
        fontSize: '14px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderColor: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
        boxShadow: 'none',
        '&:hover': {
            borderColor: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
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
