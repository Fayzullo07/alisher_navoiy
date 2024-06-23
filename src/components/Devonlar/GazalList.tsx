import { devonsGetApi } from "@/api/AdminRequest";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Pagination } from 'antd';
import type { PaginationProps } from 'antd'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import GazalMobile from "./GazalMobile";

const GazalList = ({ search, devan_id, genre_id, gazal_id, setGazal_id, firstFilter }) => {
    const [current, setCurrent] = useState(1);
    const [countPage, setCountPage] = useState(1);
    const [genre_detail_number, setGenre_detail_number] = useState("");
    const [isInitialized, setIsInitialized] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["gazal_list", genre_detail_number, current, devan_id.id, genre_id.id, search, firstFilter.id],
        queryFn: async () => {
            return await devonsGetApi({ genre_detail_number, page: current, devan_id: devan_id.id, genre_id: genre_id.id, search, second: firstFilter.id == 0 ? "" : firstFilter.id });
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
    }, [search, firstFilter])

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
                    {/* Header */}
                    <div className="flex items-center float-center gap-2  md:hidden mb-2">
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
                                        <ScrollArea className="h-[30vh]">

                                            {data?.data?.text_types.map((item: any, i: any) => (
                                                <div key={i} className="flex items-center space-x-2 hover:bg-blue-100 px-2 py-1 rounded-xl duration-300 cursor-pointer">
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
                                        <ScrollArea className="h-[15vh]">
                                            {data?.data?.auditory_ages.map((item: any, i: any) => (
                                                <div key={i} className="flex items-center space-x-2 hover:bg-blue-100 px-2 py-1 rounded-xl duration-300 cursor-pointer">
                                                    <Checkbox id="terms" />
                                                    <label
                                                        htmlFor="terms"
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {item.auditory_age}
                                                    </label>
                                                </div>
                                            ))}
                                        </ScrollArea>
                                    </div>

                                </PopoverContent>
                            </Popover>
                        </div>
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
                                            <ScrollArea className="h-[30vh]">

                                                {data?.data?.text_types.map((item: any, i: any) => (
                                                    <div key={i} className="flex items-center space-x-2 hover:bg-blue-100 px-2 py-1 rounded-xl duration-300 cursor-pointer">
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
                                            <ScrollArea className="h-[15vh]">
                                                {data?.data?.auditory_ages.map((item: any, i: any) => (
                                                    <div key={i} className="flex items-center space-x-2 hover:bg-blue-100 px-2 py-1 rounded-xl duration-300 cursor-pointer">
                                                        <Checkbox id="terms" />
                                                        <label
                                                            htmlFor="terms"
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            {item.auditory_age}
                                                        </label>
                                                    </div>
                                                ))}
                                            </ScrollArea>
                                        </div>

                                    </PopoverContent>
                                </Popover>
                            </div>
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

                        {isLoading && (
                            <div className="h-full  bg-white rounded-2xl  flex justify-center items-center">
                                <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                                    <svg className="h-10 w-10 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                                        <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                        <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="24"></line>
                                        <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                        </line>
                                        <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="24"></line>
                                        <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                        </line>
                                        <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="24"></line>
                                        <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                        <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                        </line>
                                    </svg>
                                </div>
                            </div>
                        )}

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
                                    <GazalMobile item={item.id} setGazal_id={setGazal_id}>
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

                        {isLoading && (
                            <div className="h-full  bg-white rounded-2xl  flex justify-center items-center">
                                <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                                    <svg className="h-10 w-10 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                                        <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                        <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="24"></line>
                                        <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                        </line>
                                        <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="24"></line>
                                        <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                        </line>
                                        <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="24"></line>
                                        <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                        <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                        </line>
                                    </svg>
                                </div>
                            </div>
                        )}

                        {data?.data?.main?.results.map((item: any, i: any) => (
                            <div key={i} >

                                <div
                                    className={`w-full text-start flex justify-between items-center hover:bg-gray-100 border-b duration-300 py-2 px-2 cursor-pointer`}
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

                        {isLoading && (
                            <div className="h-full  bg-white rounded-2xl  flex justify-center items-center">
                                <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                                    <svg className="h-10 w-10 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                                        <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                        <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="24"></line>
                                        <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                        </line>
                                        <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="24"></line>
                                        <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                        </line>
                                        <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="24"></line>
                                        <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                        <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                        </line>
                                    </svg>
                                </div>
                            </div>
                        )}

                        {data?.data?.main?.results.map((item: any, i: any) => (
                            <div key={i} >

                                <div
                                    className={`w-full text-start flex justify-between items-center hover:bg-gray-100 border-b duration-300 py-2 px-2 cursor-pointer`}
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
                    <div className="text-xl font-semibold py-1 pb-2">{firstFilter.name}</div>
                    <div className="flex items-center mb-2 gap-2 p-2 rounded-full bg-gray-50 ">
                        <SearchIcon strokeWidth={1} size={20} />
                        <input value={genre_detail_number} onChange={(e) => {
                            if (/[a-zA-Z]/.test(e.target.value)) {
                                return
                            }
                            setCurrent(1);
                            setGenre_detail_number(e.target.value)
                        }} type="search" placeholder="Raqamlar bo‘yicha qidiruv" className=" w-full placeholder:text-xs inline-block bg-transparent focus:outline-none text-sm text-gray-500" />
                    </div>
                    <div className="space-y-2">
                        {data?.data?.main?.count == 0 && (
                            <div
                                className={` flex justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`}
                            >
                                <div className="text-sm text-center w-full">Not found</div>
                            </div>
                        )}
                        {isLoading && Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className={` flex justify-between items-center bg-gray-100 rounded-full duration-300 py-2.5 md:py-4 px-2 cursor-pointer`}
                            >

                            </div>
                        ))}

                        {data?.data?.main?.results.map((item: any, i: any) => (
                            <div key={i}>
                                <div className=" hidden md:block">

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
                                <div className=" block md:hidden">
                                    <GazalMobile item={item.id} setGazal_id={setGazal_id}>
                                        <div
                                            className={` ${gazal_id.id == item.id ? "bg-blue-100" : ""} w-full text-start flex justify-between items-center hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`}
                                            onClick={() => setGazal_id(item)}
                                        >
                                            <div className="flex gap-1 items-center text-xs md:text-sm">
                                                <span>{item.number}.</span>
                                                <div>{item.text}</div>
                                            </div>
                                        </div>
                                    </GazalMobile>
                                </div>
                            </div>
                        ))}
                    </div>
                    {!isLoading && (
                        <div className={` text-center my-2 ${data?.data?.main?.count > 9 ? "" : "hidden"} `}>
                            <Pagination current={current} onChange={onChange} showSizeChanger={false} total={data?.data?.main?.count} responsive={true} />
                        </div>
                    )}

                </div>
            )}

            {/* Maqol */}
            {firstFilter.id == 4 && (
                <div className="bg-white h-fit rounded-2xl text-center py-2 px-3" >
                    <div className="text-xl font-semibold py-1 pb-2">{firstFilter.name}</div>
                    <div className="flex items-center mb-2 gap-2 p-2 rounded-full bg-gray-50 ">
                        <SearchIcon strokeWidth={1} size={20} />
                        <input value={genre_detail_number} onChange={(e) => {
                            if (/[a-zA-Z]/.test(e.target.value)) {
                                return
                            }
                            setCurrent(1);
                            setGenre_detail_number(e.target.value)
                        }} type="search" placeholder="Raqamlar bo‘yicha qidiruv" className=" w-full placeholder:text-xs inline-block bg-transparent focus:outline-none text-sm text-gray-500" />
                    </div>
                    <div className="space-y-2">
                        {data?.data?.main?.count == 0 && (
                            <div
                                className={` flex justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`}
                            >
                                <div className="text-sm text-center w-full">Not found</div>
                            </div>
                        )}
                        {isLoading && Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className={` flex justify-between items-center bg-gray-100 rounded-full duration-300 py-2.5 md:py-4 px-2 cursor-pointer`}
                            >

                            </div>
                        ))}

                        {data?.data?.main?.results.map((item: any, i: any) => (
                            <div key={i}>
                                <div className=" hidden md:block">

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
                                <div className=" block md:hidden">
                                    <GazalMobile item={item.id} setGazal_id={setGazal_id}>
                                        <div
                                            className={` ${gazal_id.id == item.id ? "bg-blue-100" : ""} w-full text-start flex justify-between items-center hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`}
                                            onClick={() => setGazal_id(item)}
                                        >
                                            <div className="flex gap-1 items-center text-xs md:text-sm">
                                                <span>{item.number}.</span>
                                                <div>{item.text}</div>
                                            </div>
                                        </div>
                                    </GazalMobile>
                                </div>
                            </div>
                        ))}
                    </div>
                    {!isLoading && (
                        <div className={` text-center my-2 ${data?.data?.main?.count > 9 ? "" : "hidden"} `}>
                            <Pagination current={current} onChange={onChange} showSizeChanger={false} total={data?.data?.main?.count} responsive={true} />
                        </div>
                    )}

                </div>
            )}

            {/* She'riy San'at */}
            {firstFilter.id == 5 && (
                <div className="bg-white h-fit rounded-2xl text-center py-2 px-3" >
                    <div className="text-xl font-semibold py-1 pb-2">{firstFilter.name}</div>
                    <div className="flex items-center mb-2 gap-2 p-2 rounded-full bg-gray-50 ">
                        <SearchIcon strokeWidth={1} size={20} />
                        <input value={genre_detail_number} onChange={(e) => {
                            if (/[a-zA-Z]/.test(e.target.value)) {
                                return
                            }
                            setCurrent(1);
                            setGenre_detail_number(e.target.value)
                        }} type="search" placeholder="Raqamlar bo‘yicha qidiruv" className=" w-full placeholder:text-xs inline-block bg-transparent focus:outline-none text-sm text-gray-500" />
                    </div>
                    <div className="space-y-2">
                        {data?.data?.main?.count == 0 && (
                            <div
                                className={` flex justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`}
                            >
                                <div className="text-sm text-center w-full">Not found</div>
                            </div>
                        )}
                        {isLoading && Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className={` flex justify-between items-center bg-gray-100 rounded-full duration-300 py-2.5 md:py-4 px-2 cursor-pointer`}
                            >

                            </div>
                        ))}

                        {data?.data?.main?.results.map((item: any, i: any) => (
                            <div key={i}>
                                <div className=" hidden md:block">

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
                                <div className=" block md:hidden">
                                    <GazalMobile item={item.id} setGazal_id={setGazal_id}>
                                        <div
                                            className={` ${gazal_id.id == item.id ? "bg-blue-100" : ""} w-full text-start flex justify-between items-center hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`}
                                            onClick={() => setGazal_id(item)}
                                        >
                                            <div className="flex gap-1 items-center text-xs md:text-sm">
                                                <span>{item.number}.</span>
                                                <div>{item.text}</div>
                                            </div>
                                        </div>
                                    </GazalMobile>
                                </div>
                            </div>
                        ))}
                    </div>
                    {!isLoading && (
                        <div className={` text-center my-2 ${data?.data?.main?.count > 9 ? "" : "hidden"} `}>
                            <Pagination current={current} onChange={onChange} showSizeChanger={false} total={data?.data?.main?.count} responsive={true} />
                        </div>
                    )}

                </div>
            )}
        </>
    )
}

export default GazalList;
