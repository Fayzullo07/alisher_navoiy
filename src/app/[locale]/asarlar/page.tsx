"use client"
import { useQuery } from "@tanstack/react-query";
import Title from "@/components/Core/Title";
import { EyeIcon, MoveLeftIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { worksGetApi } from "@/api/AdminRequest";
import { useEffect, useState } from "react";

import { Pagination } from 'antd';
import type { PaginationProps } from 'antd'
import { useLocale } from "next-intl";

import { filtersGetApi } from "@/api/AdminRequest";

import { Spin } from 'antd';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import React from 'react';
import { Checkbox, Divider } from 'antd';
import type { CheckboxProps } from 'antd';

const CheckboxGroup = Checkbox.Group;

const Filter = ({ setAuditory_age__in, setText_type_id__in }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["filter_list"],
        queryFn: async () => {
            return await filtersGetApi();
        }
    });

    // ANT CHECKBOX GROUP
    const [optionsTextTypes, setOptionsTextTypes] = useState([]);
    const [checkedListTextTypes, setCheckedListTextTypes] = useState([]);

    const [optionsAges, setOptionsAges] = useState([]);
    const [checkedListAges, setCheckedListAges] = useState([]);

    useEffect(() => {
        if (data && data.data) {
            setOptionsTextTypes(data.data.text_types.map((text_type: { name: any; id: any; }) => ({ label: text_type.name, value: text_type.id })));
            // setCheckedListTextTypes(data.data.text_types.map(text_type => text_type.id));
            // setText_type_id__in(data.data.text_types.map(text_type => text_type.id).join(','));

            setOptionsAges(data.data.auditory_ages.map((age: { auditory_age: any; }) => age.auditory_age));
            // setCheckedListAges(data.data.auditory_ages.map((age: { auditory_age: any; }) => age.auditory_age));
            // setAuditory_age__in(data.data.auditory_ages.map((age: { auditory_age: any; }) => age.auditory_age).join(','));
        }
    }, [data]);

    let checkAllTextTypes = optionsTextTypes.length === checkedListTextTypes.length;
    const indeterminateTextTypes = checkedListTextTypes.length > 0 && checkedListTextTypes.length < optionsTextTypes.length;

    let checkAllAges = optionsAges.length === checkedListAges.length;
    const indeterminateAges = checkedListAges.length > 0 && checkedListAges.length < optionsAges.length;

    if (isLoading) {
        return <Spin size="large" />;
    }

    const onChangeListTextTypes = (list) => {
        setCheckedListTextTypes(list);
        setText_type_id__in(list.join(','));
    };

    const onChangeListAges = (list) => {
        setCheckedListAges(list);
        setAuditory_age__in(list.join(','));
        
    };

    const onCheckAllChangeAges: CheckboxProps['onChange'] = (e) => {
        setCheckedListAges(e.target.checked ? optionsAges : []);
        if (e.target.checked) {
            setAuditory_age__in(optionsAges.join(','));
        } else {
            setAuditory_age__in("");
        }
    };

    const onCheckAllChangeTextTypes: CheckboxProps['onChange'] = (e) => {
        setCheckedListTextTypes(e.target.checked ? optionsTextTypes.map(option => option.value) : []);
        if (e.target.checked) {
            setText_type_id__in(checkedListTextTypes.join(','));
        } else {
            setText_type_id__in("");
        }
    };

    return (
        <>
            <div className="w-full ">
                <Popover>
                    <PopoverTrigger>
                        <div className="flex w-max items-center gap-2 px-2 py-1 hover:bg-gray-50 duration-300  cursor-pointer border rounded-full">
                            <span className=" text-sm">{"Matn tipi"}</span>
                            <ChevronDownIcon strokeWidth={1} className="w-4 h-4 hover:scale-110 duration-300" />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent align="start">
                        <div className="">
                            <ScrollArea className="h-[30vh] p-2">

                                <Checkbox className="w-full" indeterminate={indeterminateTextTypes} onChange={onCheckAllChangeTextTypes} checked={checkAllTextTypes}>
                                    All
                                </Checkbox>
                                <Divider className="my-2" />
                                <CheckboxGroup
                                    options={optionsTextTypes}
                                    value={checkedListTextTypes}
                                    onChange={onChangeListTextTypes}
                                    className="grid grid-cols-1"
                                />
                            </ScrollArea>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="w-full ">
                <Popover>
                    <PopoverTrigger>
                        <div className="flex items-center gap-2  w-max  px-2 py-1 hover:bg-gray-50 duration-300  cursor-pointer border rounded-full">
                            <span className="text-sm">{"Yosh bo'yicha"}</span>
                            <ChevronDownIcon strokeWidth={1} className="w-4 h-4 hover:scale-110 duration-300" />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent align="start">
                        <div className="">
                            <ScrollArea className="h-[20vh] p-2">
                                <Checkbox className="w-full" indeterminate={indeterminateAges} onChange={onCheckAllChangeAges} checked={checkAllAges}>
                                    All
                                </Checkbox>
                                <Divider className="my-2" />
                                <CheckboxGroup
                                    options={optionsAges}
                                    value={checkedListAges}
                                    onChange={onChangeListAges}
                                    className="grid grid-cols-1"
                                />
                            </ScrollArea>
                        </div>

                    </PopoverContent>
                </Popover>
            </div>
        </>
    )
}

const AsarListMobile = ({ search, setCountPage, current, auditory_age__in, text_type_id__in }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["works", search, current, auditory_age__in, text_type_id__in],
        queryFn: async () => {
            return await worksGetApi({ search, page: current, auditory_age__in, text_type_id__in });
        }
    });

    useEffect(() => {
        if (data && data.data && data.data.count) {
            setCountPage(data.data.count);
        }
    }, [data])

    // if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <>
            {data?.data?.results.map((item: any, i: any) => (
                <div key={i} className="py-4 px-3 bg-white rounded-2xl space-y-2 border">
                    <div className="pb-2 text-sm font-semibold">{item.title}</div>
                    <div className="text-sm">
                        <div><span className="text-blue-300">Muallifi: </span> Alisher Navoiy</div>
                        <div className="pb-5"><span className="text-blue-300">Yaratilgan vaqti: </span> {item.from_year}-{item.to_year} yil</div>
                    </div>
                    <Link href={item.pdf_file} target="_blank">
                        <button className="bg-blue-100 text-gray-500 w-full font-semibold rounded-full text-sm md:text-sm py-2.5 ">{"Ko‘rish"}</button>
                    </Link>
                </div>
            ))}


        </>
    )

};

const AsarList = ({ search, setCountPage, current, auditory_age__in, text_type_id__in }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["works", search, current, auditory_age__in, text_type_id__in],
        queryFn: async () => {
            return await worksGetApi({ search, page: current, auditory_age__in, text_type_id__in });
        }
    });

    useEffect(() => {
        if (data && data.data && data.data.count) {
            setCountPage(data.data.count);
        }
    }, [data])

    // if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <>
            {data?.data?.results.map((item: any, i: any) => (
                <tr key={i} className="hover:bg-gray-100 duration-300 cursor-pointer" onClick={() => window.open(item.pdf_file, '_blank')}>
                    <td className="py-3 px-6 border-b border-gray-200 text-xs">{item.title}</td>
                    <td className="py-3 px-6 border-b border-gray-200 text-sm ">{"Alisher Navoiy"}</td>
                    <td className="py-3 px-6 border-b border-gray-200 text-sm">{item.from_year}-{item.to_year} yil</td>
                    <td className="py-3 px-6 border-b border-gray-200 text-sm">
                        <Link href={item.pdf_file} target="_blank">
                            <EyeIcon strokeWidth={1} size={20} className=" mx-auto" />
                        </Link>
                    </td>
                </tr >
            ))}


        </>
    )

};


const Asarlar = () => {
    const locale = useLocale();
    const [search, setSearch] = useState("");
    const [countPage, setCountPage] = useState(1);
    const [current, setCurrent] = useState(1);

    const [auditory_age__in, setAuditory_age__in] = useState("");
    const [text_type_id__in, setText_type_id__in] = useState("");

    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };

    return (
        <div className="bg-image-flower min-h-screen ">


            <div className="w-full lg:w-[85vw] mx-auto px-4 pb-10">
                <div className=" hidden md:block">
                    <Title title="Asarlar" />
                </div>

                <div className=" hidden md:block bg-white shadow-lg rounded-lg pb-5">

                    <div className={` overflow-hidden px-4 pt-6 ${countPage > 9 ? "h-[800px]" : "h-auto"} `}>
                        <div className="flex items-center float-center gap-2  md:hidden mb-2">
                            {/* Filter mobile */}
                            <Filter
                                setAuditory_age__in={setAuditory_age__in}
                                setText_type_id__in={setText_type_id__in}
                            />
                        </div>

                        <div className="flex items-center gap-2 mb-2 w-full ">

                            <div className="flex items-center gap-2 p-1 rounded-full bg-gray-50 border w-[50%]">
                                <SearchIcon strokeWidth={1} size={20} />
                                <input value={search} onChange={(e) => {
                                    if (/[a-zA-Z]/.test(e.target.value)) {
                                        return
                                    }
                                    setCurrent(1);
                                    setSearch(e.target.value)
                                }} type="number" placeholder="Raqam bo‘yicha qidiruv" className="w-full  placeholder:text-xs  bg-transparent focus:outline-none text-sm text-gray-500" />
                            </div>
                            <div className=" items-center gap-2 hidden md:flex">
                                {/* Filter Desktop */}
                                <Filter
                                    setAuditory_age__in={setAuditory_age__in}
                                    setText_type_id__in={setText_type_id__in}
                                />
                            </div>
                        </div>
                        <table className="w-full table-fixed">
                            <thead className="">
                                <tr className="bg-gray-100 overflow-hidden text-sm mb-5">
                                    <th className="w-3/5 py-2 px-6 text-left text-gray-600 rounded-tl-full rounded-bl-full">Nomi</th>
                                    <th className="w-1/5 py-2 px-6 text-left text-gray-600">Muallifi</th>
                                    <th className="w-1/5 py-2 px-6 text-left text-gray-600">Sanasi</th>
                                    <th className="w-1/5 py-2 px-6 text-center text-gray-600 rounded-tr-full rounded-br-full">{"Ko‘rish"}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white ">
                                <AsarList search={search} setCountPage={setCountPage} current={current} auditory_age__in={auditory_age__in} text_type_id__in={text_type_id__in} />
                            </tbody>
                        </table>
                    </div>
                    <div className={` text-center mt-3 my-2 ${countPage > 9 ? "" : "hidden"} `}>
                        <Pagination current={current} onChange={onChange} showSizeChanger={false} total={countPage} responsive={true} />
                    </div>
                </div>

                <div className="block md:hidden ">
                    <div className="flex items-center justify-center py-5 ">
                        <Link href={`/${locale}/asarlar`} className=" hover:scale-105 duration-300 cursor-pointer text-gray-500 text-base">
                            <MoveLeftIcon className="w-6 h-6" />
                        </Link>

                        <h2 className="text-xl font-semibold text-center flex-grow">Asarlar</h2>
                    </div>
                    <div className="flex items-center gap-2 mb-2 w-full ">

                        <div className="flex items-center gap-2 p-1 rounded-full bg-gray-50 border w-full">
                            <SearchIcon strokeWidth={1} size={20} />
                            <input value={search} onChange={(e) => {
                                if (/[a-zA-Z]/.test(e.target.value)) {
                                    return
                                }
                                setCurrent(1);
                                setSearch(e.target.value)
                            }} type="number" placeholder="Raqam bo‘yicha qidiruv" className="w-full  placeholder:text-xs  bg-transparent focus:outline-none text-sm text-gray-500" />
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Filter Desktop */}
                            <Filter
                                setAuditory_age__in={setAuditory_age__in}
                                setText_type_id__in={setText_type_id__in}
                            />
                        </div>
                    </div>
                    <div className=" space-y-4">
                        <AsarListMobile search={search} setCountPage={setCountPage} current={current} auditory_age__in={auditory_age__in} text_type_id__in={text_type_id__in} />
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Asarlar;