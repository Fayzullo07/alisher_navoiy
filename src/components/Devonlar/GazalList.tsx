import { devonsGetApi, filtersGetApi } from "@/api/AdminRequest";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Pagination, Spin } from 'antd';
import type { PaginationProps } from 'antd';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import GazalMobile from "./GazalMobile";
import Loading from "../Core/Loading";

import React from 'react';
import { Checkbox, Divider } from 'antd';
import type { CheckboxProps } from 'antd';

const CheckboxGroup = Checkbox.Group;


const Filter = ({ setAuditory_age__in, setText_type_id__in }) => {
    const [agesAll, setAgesAll] = useState(false);
    const [ages, setAges] = useState<string[]>([]);

    const [textTypeAll, setTextTypeAll] = useState(false);
    const [textType, setTextType] = useState<string[]>([]);

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
            setCheckedListTextTypes(data.data.text_types.map(text_type => text_type.id));

            setOptionsAges(data.data.auditory_ages.map((age: { auditory_age: any; }) => age.auditory_age));
            setCheckedListAges(data.data.auditory_ages.map((age: { auditory_age: any; }) => age.auditory_age));
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
        setAuditory_age__in(checkedListAges.join(','));
    };

    const onCheckAllChangeTextTypes: CheckboxProps['onChange'] = (e) => {
        setCheckedListTextTypes(e.target.checked ? optionsTextTypes.map(option => option.value) : []);
        setText_type_id__in(checkedListTextTypes.join(','));
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

                                <Checkbox indeterminate={indeterminateTextTypes} onChange={onCheckAllChangeTextTypes} checked={checkAllTextTypes}>
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
                                <Checkbox indeterminate={indeterminateAges} onChange={onCheckAllChangeAges} checked={checkAllAges}>
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

const GazalList = ({ search, devan_id, genre_id, gazal_id, setGazal_id, firstFilter, firstFilterChild, current, setCurrent, auditory_age__in, setAuditory_age__in, text_type_id__in, setText_type_id__in }) => {

    const [countPage, setCountPage] = useState(1);
    const [genre_detail_number, setGenre_detail_number] = useState("");
    const [isInitialized, setIsInitialized] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["gazal_list", genre_detail_number, current, devan_id.id, genre_id.id, search, firstFilter.id, auditory_age__in, text_type_id__in, firstFilterChild.id],
        queryFn: async () => {
            return await devonsGetApi({ genre_detail_number, page: current, devan_id: devan_id.id, genre_id: genre_id.id, search, second: firstFilter.id == 0 ? "" : firstFilter.id, auditory_age__in, text_type_id__in, poetic_art_id: firstFilterChild.id == 0 ? "" : firstFilterChild.id });
        }
    });

    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };

    useEffect(() => {
        if (data && data.data && data.data.main) {
            setCountPage(data.data.main.count);
        }
    }, [data])

    useEffect(() => {
        setCurrent(1);
    }, [search, firstFilter, firstFilterChild, auditory_age__in, text_type_id__in]);

    useEffect(() => {
        if (!isInitialized && data && data.data && data.data.main) {
            setGazal_id(data.data.main.results[0]);
            setIsInitialized(true);
        }
        return () => { }; // cleanup funksiyasi
    }, [isInitialized, data]);

    return (
        <>
            {/* G'azallar */}
            {firstFilter.id == 0 && (
                <div className="bg-white h-fit rounded-2xl text-center py-2 px-3" >
                    <div className="text-xl flex-grow text-center font-semibold py-1 pb-2">{"G'azallar"}</div>
                    <div className="flex items-center float-center gap-2  md:hidden mb-2">
                        {/* Filter mobile */}
                        <Filter
                            setAuditory_age__in={setAuditory_age__in}
                            setText_type_id__in={setText_type_id__in}
                        />
                    </div>

                    <div className="flex items-center gap-2 mb-2 w-full ">

                        <div className="flex items-center gap-2 p-1 rounded-full bg-gray-50 border w-full">
                            <SearchIcon strokeWidth={1} size={20} />
                            <input value={genre_detail_number} onChange={(e) => {
                                if (/[a-zA-Z]/.test(e.target.value)) {
                                    return
                                }
                                setCurrent(1);
                                setGenre_detail_number(e.target.value)
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

                    <div className="space-y-2 h-[350px] md:h-[400px]">
                        {data?.data?.main?.count == 0 && (
                            <div
                                className={` flex justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`}
                            >
                                <div className="text-sm text-center w-full">Not found</div>
                            </div>
                        )}

                        {isLoading && <Loading />}

                        {data?.data?.main?.results.map((item: any, i: any) => (
                            <div key={i} >
                                <div className=" hidden lg:block">
                                    <div
                                        className={` ${gazal_id.id == item.id ? "bg-blue-100" : ""} w-full text-start flex justify-between items-center hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`}
                                        onClick={() => setGazal_id(item)}
                                    >
                                        <div className="flex gap-1 items-center text-xs xl:text-base md:text-sm">
                                            <span>{item.number}.</span>
                                            <div>{item.text}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" block lg:hidden">
                                    <GazalMobile gazal_id={gazal_id} setGazal_id={setGazal_id} current={current} setCurrent={setCurrent} firstFilter={firstFilter}>
                                        <div
                                            className={` ${gazal_id.id == item.id ? "bg-blue-100" : ""} w-full text-start flex justify-between items-center hover:bg-blue-100 rounded-full duration-300 py-1 px-1 md:px-2 cursor-pointer`}
                                            onClick={() => setGazal_id(item)}
                                        >
                                            <div className="flex gap-1 items-center text-xs lg:text-sm md:text-base">
                                                <span>{item.number}.</span>
                                                <div>{item.text}</div>
                                            </div>
                                        </div>
                                    </GazalMobile>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={` text-center mt-3 my-2 ${countPage > 9 ? "" : "hidden"} `}>
                        <Pagination current={current} onChange={onChange} showSizeChanger={false} total={countPage} responsive={true} />
                    </div>


                </div>
            )}

            {/* Arxaizm */}
            {firstFilter.id == 1 && (
                <div className="bg-white h-fit rounded-2xl text-center py-2 px-3" >
                    <div className="text-xl flex-grow text-center font-semibold py-1 pb-2">{firstFilter.name}</div>
                    <div className="h-[380px] md:h-[430px]">
                        {data?.data?.main?.count == 0 && (
                            <div
                                className={` flex justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`}
                            >
                                <div className="text-sm text-center w-full">Not found</div>
                            </div>
                        )}

                        {isLoading && <Loading />}

                        {data?.data?.main?.results.map((item: any, i: any) => (
                            <div key={i} >

                                <div
                                    className={`w-full text-start flex justify-between items-center hover:bg-blue-100 border-b duration-300 py-2 px-2 cursor-pointer`}
                                >
                                    <div className="flex gap-1 items-center text-sm md:text-base">
                                        <span>{current <= 1 ? i + 1 : i + 1 + (current - 1) * 10}.</span>
                                        <div>{item.text}</div>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>

                    <div className={` text-center mt-3 my-2 ${countPage > 9 ? "" : "hidden"} `}>
                        <Pagination current={current} onChange={onChange} showSizeChanger={false} total={countPage} responsive={true} />
                    </div>
                </div>
            )}

            {/* Istorizm */}
            {firstFilter.id == 2 && (
                <div className="bg-white h-fit rounded-2xl text-center py-2 px-3" >
                    <div className="text-xl flex-grow text-center font-semibold py-1 pb-2">{firstFilter.name}</div>
                    <div className="h-[380px] md:h-[430px]">
                        {data?.data?.main?.count == 0 && (
                            <div
                                className={` flex justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`}
                            >
                                <div className="text-sm text-center w-full">Not found</div>
                            </div>
                        )}

                        {isLoading && <Loading />}

                        {data?.data?.main?.results.map((item: any, i: any) => (
                            <div key={i} >

                                <div
                                    className={`w-full text-start flex justify-between items-center hover:bg-blue-100 border-b duration-300 py-2 px-2 cursor-pointer`}
                                >
                                    <div className="flex gap-1 items-center text-sm md:text-base">
                                        <span>{current <= 1 ? i + 1 : i + 1 + (current - 1) * 10}.</span>
                                        <div>{item.text}</div>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>

                    <div className={` text-center mt-3 my-2 ${countPage > 9 ? "" : "hidden"} `}>
                        <Pagination current={current} onChange={onChange} showSizeChanger={false} total={countPage} responsive={true} />
                    </div>


                </div>
            )}

            {/* Ibora */}
            {firstFilter.id == 3 && (
                <div className="bg-white h-fit rounded-2xl text-center py-2 px-3" >
                    <div className="text-xl flex-grow text-center font-semibold py-1 pb-2">{firstFilter.name}</div>
                    <div className="flex items-center float-center gap-2  md:hidden mb-2">
                        {/* Filter mobile */}
                        <Filter
                            setAuditory_age__in={setAuditory_age__in}
                            setText_type_id__in={setText_type_id__in}
                        />
                    </div>

                    <div className="flex items-center gap-2 mb-2 w-full ">

                        <div className="flex items-center  gap-2  p-1 rounded-full bg-gray-50 border w-full">
                            <SearchIcon strokeWidth={1} size={20} />
                            <input value={genre_detail_number} onChange={(e) => {
                                if (/[a-zA-Z]/.test(e.target.value)) {
                                    return
                                }
                                setCurrent(1);
                                setGenre_detail_number(e.target.value)
                            }} type="number" placeholder="Raqam bo‘yicha qidiruv" className="w-full placeholder:text-xs  bg-transparent focus:outline-none text-sm text-gray-500" />
                        </div>
                        <div className=" items-center gap-2 hidden md:flex">
                            {/* Filter Desktop */}
                            <Filter
                                setAuditory_age__in={setAuditory_age__in}
                                setText_type_id__in={setText_type_id__in}
                            />
                        </div>
                    </div>

                    <div className="h-[560px] md:h-[580px]">
                        {data?.data?.main?.count == 0 && (
                            <div
                                className={` flex justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`}
                            >
                                <div className="text-sm text-center w-full">Not found</div>
                            </div>
                        )}

                        {isLoading && <Loading />}

                        {data?.data?.main?.results.map((item: any, i: any) => (
                            <div key={i}>
                                <div className=" hidden md:block">

                                    <div
                                        className={` ${gazal_id.index == i ? "bg-blue-100" : ""} w-full text-start flex justify-between items-center hover:bg-blue-100  border-b duration-300 py-1 px-2 cursor-pointer`}
                                        onClick={() => setGazal_id({ ...item, index: i })}
                                    >
                                        <div className="w-full">

                                            <div className="flex gap-1 items-start text-xs md:text-sm">
                                                <span>{current <= 1 ? i + 1 : i + 1 + (current - 1) * 10}.</span>
                                                <div className="flex flex-wrap">
                                                    {item.text}{""}
                                                </div>
                                            </div>
                                            <div className=" text-end text-sm text-gray-400 ml-1 ">({item.number} - {item.genre_name}, {item.byte} - bayt)</div>

                                        </div>
                                    </div>
                                </div>
                                <div className=" block md:hidden">
                                    <GazalMobile gazal_id={gazal_id} setGazal_id={setGazal_id} current={current} setCurrent={setCurrent} firstFilter={firstFilter}>
                                        <div
                                            className={` ${gazal_id.index == i ? "bg-blue-100" : ""} w-full text-start flex justify-between items-center hover:bg-blue-100  border-b duration-300 py-1 px-2 cursor-pointer`}
                                            onClick={() => setGazal_id({ ...item, index: i })}
                                        >
                                            <div className="w-full">

                                                <div className="flex gap-1 items-start text-xs md:text-sm">
                                                    <span>{current <= 1 ? i + 1 : i + 1 + (current - 1) * 10}.</span>
                                                    <div className="flex flex-wrap">
                                                        {item.text}{""}
                                                    </div>
                                                </div>
                                                <div className=" text-end text-sm text-gray-400 ml-1 ">({item.number} - {item.genre_name}, {item.byte} - bayt)</div>

                                            </div>
                                        </div>
                                    </GazalMobile>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={` text-center mt-3 my-2 ${countPage > 9 ? "" : "hidden"} `}>
                        <Pagination current={current} onChange={onChange} showSizeChanger={false} total={countPage} responsive={true} />
                    </div>


                </div>
            )}

            {/* Maqol */}
            {firstFilter.id == 4 && (
                <div className="bg-white h-fit rounded-2xl text-center py-2 px-3" >
                    <div className="text-xl flex-grow text-center font-semibold py-1 pb-2">{firstFilter.name}</div>
                    <div className="flex items-center float-center gap-2  md:hidden mb-2">
                        {/* Filter mobile */}
                        <Filter
                            setAuditory_age__in={setAuditory_age__in}
                            setText_type_id__in={setText_type_id__in}
                        />
                    </div>

                    <div className="flex items-center gap-2 mb-2 w-full ">

                        <div className="flex items-center  gap-2  p-1 rounded-full bg-gray-50 border w-full">
                            <SearchIcon strokeWidth={1} size={20} />
                            <input value={genre_detail_number} onChange={(e) => {
                                if (/[a-zA-Z]/.test(e.target.value)) {
                                    return
                                }
                                setCurrent(1);
                                setGenre_detail_number(e.target.value)
                            }} type="number" placeholder="Raqam bo‘yicha qidiruv" className="w-full placeholder:text-xs  bg-transparent focus:outline-none text-sm text-gray-500" />
                        </div>
                        <div className=" items-center gap-2 hidden md:flex">
                            {/* Filter Desktop */}
                            <Filter
                                setAuditory_age__in={setAuditory_age__in}
                                setText_type_id__in={setText_type_id__in}
                            />
                        </div>
                    </div>
                    <div className="h-[620px] md:h-[650px]">
                        {data?.data?.main?.count == 0 && (
                            <div
                                className={` flex justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`}
                            >
                                <div className="text-sm text-center w-full">Not found</div>
                            </div>
                        )}

                        {isLoading && <Loading />}

                        {data?.data?.main?.results.map((item: any, i: any) => (
                            <div key={i}>
                                <div className=" hidden md:block">

                                    <div
                                        className={` ${gazal_id.index == i ? "bg-blue-100" : ""} w-full text-start flex justify-between items-center hover:bg-blue-100  border-b duration-300 py-1 px-2 cursor-pointer`}
                                        onClick={() => setGazal_id({ ...item, index: i })}
                                    >
                                        <div className="w-full">

                                            <div className="flex gap-1 items-start text-xs md:text-sm">
                                                <span>{current <= 1 ? i + 1 : i + 1 + (current - 1) * 10}.</span>
                                                <div className="flex flex-wrap">
                                                    {item.text}{""}
                                                </div>
                                            </div>
                                            <div className=" text-end text-sm text-gray-400 ml-1 ">({item.number} - {item.genre_name}, {item.byte} - bayt)</div>

                                        </div>
                                    </div>
                                </div>
                                <div className=" block md:hidden">
                                    <GazalMobile gazal_id={gazal_id} setGazal_id={setGazal_id} current={current} setCurrent={setCurrent} firstFilter={firstFilter}>
                                        <div
                                            className={` ${gazal_id.index == i ? "bg-blue-100" : ""} w-full text-start flex justify-between items-center hover:bg-blue-100  border-b duration-300 py-1 px-2 cursor-pointer`}
                                            onClick={() => setGazal_id({ ...item, index: i })}
                                        >
                                            <div className="w-full">

                                                <div className="flex gap-1 items-start text-xs md:text-sm">
                                                    <span>{current <= 1 ? i + 1 : i + 1 + (current - 1) * 10}.</span>
                                                    <div className="flex flex-wrap">
                                                        {item.text}{""}
                                                    </div>
                                                </div>
                                                <div className=" text-end text-sm text-gray-400 ml-1 ">({item.number} - {item.genre_name}, {item.byte} - bayt)</div>

                                            </div>
                                        </div>
                                    </GazalMobile>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={` text-center mt-3 my-2 ${countPage > 9 ? "" : "hidden"} `}>
                        <Pagination current={current} onChange={onChange} showSizeChanger={false} total={countPage} responsive={true} />
                    </div>


                </div>
            )}

            {/* She'riy San'at */}
            {firstFilter.id == 5 && (
                <div className="bg-white h-fit rounded-2xl text-center py-2 px-3" >
                    <div className="text-xl flex-grow text-center font-semibold py-1 pb-2">{firstFilter.name}</div>
                    <div className="flex items-center float-center gap-2  md:hidden mb-2">
                        {/* Filter mobile */}
                        <Filter
                            setAuditory_age__in={setAuditory_age__in}
                            setText_type_id__in={setText_type_id__in}
                        />
                    </div>

                    <div className="flex items-center gap-2 mb-2 w-full ">

                        <div className="flex items-center  gap-2  p-1 rounded-full bg-gray-50 border w-full">
                            <SearchIcon strokeWidth={1} size={20} />
                            <input value={genre_detail_number} onChange={(e) => {
                                if (/[a-zA-Z]/.test(e.target.value)) {
                                    return
                                }
                                setCurrent(1);
                                setGenre_detail_number(e.target.value)
                            }} type="number" placeholder="Raqam bo‘yicha qidiruv" className="w-full placeholder:text-xs  bg-transparent focus:outline-none text-sm text-gray-500" />
                        </div>
                        <div className=" items-center gap-2 hidden md:flex">
                            {/* Filter Desktop */}
                            <Filter
                                setAuditory_age__in={setAuditory_age__in}
                                setText_type_id__in={setText_type_id__in}
                            />
                        </div>
                    </div>
                    <div className="h-[560px] md:h-[580px]">
                        {data?.data?.main?.count == 0 && (
                            <div
                                className={` flex justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`}
                            >
                                <div className="text-sm text-center w-full">Not found</div>
                            </div>
                        )}

                        {isLoading && <Loading />}

                        {data?.data?.main?.results.map((item: any, i: any) => (
                            <div key={i}>
                                <div className=" hidden md:block">

                                    <div
                                        className={` ${gazal_id.index == i ? "bg-blue-100" : ""} w-full text-start flex justify-between items-center hover:bg-blue-100  border-b duration-300 py-1 px-2 cursor-pointer`}
                                        onClick={() => setGazal_id({ ...item, index: i })}
                                    >
                                        <div className="w-full">

                                            <div className="flex gap-1 items-start text-xs md:text-sm">
                                                <span>{current <= 1 ? i + 1 : i + 1 + (current - 1) * 10}.</span>
                                                <div className="flex flex-wrap">
                                                    {item.text}{""}
                                                </div>
                                            </div>
                                            <div className=" text-end text-sm text-gray-400 ml-1 ">({item.number} - {item.genre_name}, {item.byte} - bayt)</div>

                                        </div>
                                    </div>
                                </div>
                                <div className=" block md:hidden">
                                    <GazalMobile gazal_id={gazal_id} setGazal_id={setGazal_id} current={current} setCurrent={setCurrent} firstFilter={firstFilter}>
                                        <div
                                            className={` ${gazal_id.index == i ? "bg-blue-100" : ""} w-full text-start flex justify-between items-center hover:bg-blue-100  border-b duration-300 py-1 px-2 cursor-pointer`}
                                            onClick={() => setGazal_id({ ...item, index: i })}
                                        >
                                            <div className="w-full">

                                                <div className="flex gap-1 items-start text-xs md:text-sm">
                                                    <span>{current <= 1 ? i + 1 : i + 1 + (current - 1) * 10}.</span>
                                                    <div className="flex flex-wrap">
                                                        {item.text}{""}
                                                    </div>
                                                </div>
                                                <div className=" text-end text-sm text-gray-400 ml-1 ">({item.number} - {item.genre_name}, {item.byte} - bayt)</div>

                                            </div>
                                        </div>
                                    </GazalMobile>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={` text-center mt-3 my-2 ${countPage > 9 ? "" : "hidden"} `}>
                        <Pagination current={current} onChange={onChange} showSizeChanger={false} total={countPage} responsive={true} />
                    </div>
                </div>
            )}
        </>
    )
}

export default GazalList;
