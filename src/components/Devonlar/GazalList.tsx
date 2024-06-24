import { devonsGetApi, filtersGetApi } from "@/api/AdminRequest";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import GazalMobile from "./GazalMobile";
import Loading from "../Core/Loading";

const Filter = ({ text_types, auditory_ages, auditory_age__in, setAuditory_age__in }) => {
    const [agesAll, setAgesAll] = useState(false);
    const [ages, setAges] = useState<string[]>([]);

    const { data } = useQuery({
        queryKey: ["filter_list"],
        queryFn: async () => {
            return await filtersGetApi();
        }
    });

    function getAges(age: string) {
        if (ages.includes(age)) {
            let agesFilter = ages.filter((agef) => agef !== age);
            setAges(agesFilter)
            setAuditory_age__in(agesFilter.join(','));
        } else {
            let copyAges = [...ages, age];
            setAges(copyAges);
            setAuditory_age__in(copyAges.join(','));
        }
    }

    useEffect(() => {
        if (!agesAll) {
            setAges([]);
            setAuditory_age__in("");
        } else {
            let listAgesAll = data?.data?.auditory_ages.map((age) => age.auditory_age);
            setAges(listAgesAll);
            setAuditory_age__in(listAgesAll);
        }
    }, [agesAll])

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
                            <ScrollArea className="h-[30vh] ">
                                <div className="flex items-center space-x-2 hover:bg-blue-100 px-2 py-1 rounded-xl duration-300 cursor-pointer">
                                    <Checkbox id="terms" />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium"
                                    >
                                        All
                                    </label>
                                </div>
                                {data?.data?.text_types.map((item: any, i: any) => (
                                    <div key={i} className="flex items-center space-x-2 mb-4 hover:bg-blue-100 px-2 py-1 duration-300 cursor-pointer">
                                        <Checkbox id="terms" />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {item.name}
                                        </label>
                                    </div>
                                ))}
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
                            <ScrollArea className="h-[20vh]">
                                <div className="flex items-center space-x-2 hover:bg-blue-100 px-2 py-1 rounded-xl duration-300 cursor-pointer" onClick={() => setAgesAll(!agesAll)}>
                                    <Checkbox id="termsAll" checked={agesAll} />
                                    <label
                                        htmlFor="termsAll"
                                        className="text-sm font-medium"
                                    >
                                        All
                                    </label>
                                </div>
                                {data?.data?.auditory_ages.map((item: any, i: any) => (
                                    <div key={i} className={`flex items-center space-x-2 ${ages.includes(item.auditory_age) ? " bg-blue-100" : ""}  hover:bg-blue-100 px-2 py-1 mb-1 rounded duration-300 cursor-pointer`} onClick={() => getAges(item.auditory_age)}>
                                        <Checkbox id="terms" checked={ages.includes(item.auditory_age)} />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {item.auditory_age}<span>+</span>
                                        </label>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>

                    </PopoverContent>
                </Popover>
            </div>
        </>
    )
}

const GazalList = ({ search, devan_id, genre_id, gazal_id, setGazal_id, firstFilter, current, setCurrent, auditory_age__in, setAuditory_age__in }) => {

    const [countPage, setCountPage] = useState(1);
    const [genre_detail_number, setGenre_detail_number] = useState("");
    const [isInitialized, setIsInitialized] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["gazal_list", genre_detail_number, current, devan_id.id, genre_id.id, search, firstFilter.id, auditory_age__in],
        queryFn: async () => {
            return await devonsGetApi({ genre_detail_number, page: current, devan_id: devan_id.id, genre_id: genre_id.id, search, second: firstFilter.id == 0 ? "" : firstFilter.id, auditory_age__in });
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
    }, [search, firstFilter, auditory_age__in])

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
                            text_types={data?.data?.text_types || []}
                            auditory_ages={data?.data?.auditory_ages || []}
                            auditory_age__in={auditory_age__in}
                            setAuditory_age__in={setAuditory_age__in}
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
                            }} type="number" placeholder="Raqam bo‘yicha qidiruv" className="w-full md:w-40  placeholder:text-xs  bg-transparent focus:outline-none text-sm text-gray-500" />
                        </div>
                        <div className=" items-center gap-2 hidden md:flex">
                            {/* Filter Desktop */}
                            <Filter
                                text_types={data?.data?.text_types || []}
                                auditory_ages={data?.data?.auditory_ages || []}
                                auditory_age__in={auditory_age__in}
                                setAuditory_age__in={setAuditory_age__in}
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
                                        <div className="flex gap-1 items-center text-xs md:text-sm">
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
                        <Filter text_types={data?.data?.text_types || []} auditory_ages={data?.data?.auditory_ages || []} auditory_age__in={auditory_age__in}
                            setAuditory_age__in={setAuditory_age__in} />
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
                            }} type="number" placeholder="Raqam bo‘yicha qidiruv" className="w-full md:w-40  placeholder:text-xs  bg-transparent focus:outline-none text-sm text-gray-500" />
                        </div>
                        <div className=" items-center gap-2 hidden md:flex">
                            {/* Filter Desktop */}
                            <Filter text_types={data?.data?.text_types || []} auditory_ages={data?.data?.auditory_ages || []} auditory_age__in={auditory_age__in}
                                setAuditory_age__in={setAuditory_age__in} />
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
                        <Filter text_types={data?.data?.text_types || []} auditory_ages={data?.data?.auditory_ages || []} auditory_age__in={auditory_age__in}
                            setAuditory_age__in={setAuditory_age__in} />
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
                            }} type="number" placeholder="Raqam bo‘yicha qidiruv" className="w-full md:w-40  placeholder:text-xs  bg-transparent focus:outline-none text-sm text-gray-500" />
                        </div>
                        <div className=" items-center gap-2 hidden md:flex">
                            {/* Filter Desktop */}
                            <Filter text_types={data?.data?.text_types || []} auditory_ages={data?.data?.auditory_ages || []} auditory_age__in={auditory_age__in}
                                setAuditory_age__in={setAuditory_age__in} />
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
                        <Filter text_types={data?.data?.text_types || []} auditory_ages={data?.data?.auditory_ages || []} auditory_age__in={auditory_age__in}
                            setAuditory_age__in={setAuditory_age__in} />
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
                            }} type="number" placeholder="Raqam bo‘yicha qidiruv" className="w-full md:w-40  placeholder:text-xs  bg-transparent focus:outline-none text-sm text-gray-500" />
                        </div>
                        <div className=" items-center gap-2 hidden md:flex">
                            {/* Filter Desktop */}
                            <Filter text_types={data?.data?.text_types || []} auditory_ages={data?.data?.auditory_ages || []} auditory_age__in={auditory_age__in}
                                setAuditory_age__in={setAuditory_age__in} />
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
