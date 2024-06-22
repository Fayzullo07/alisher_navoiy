"use client"
import Container from "@/components/Core/Container";
import Title from "@/components/Core/Title";
import { ArrowDownIcon, ChevronDownIcon, ChevronUpIcon, CircleIcon, FilterIcon, MoveLeftIcon, MoveRightIcon, ScrollTextIcon, SearchIcon, XIcon } from "lucide-react";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { devonsGetApi, genresGetOneAPI } from "@/api/AdminRequest";
import { useQuery } from "@tanstack/react-query";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Pagination } from 'antd';
import type { PaginationProps } from 'antd'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Checkbox } from "@/components/ui/checkbox"
import Modal from "@/components/Core/Modal";


const DevonList = ({ devan_id, setDevan_id }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["devans_list"],
        queryFn: async () => {
            return await devonsGetApi({});
        }
    });
    // if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <>
            {isLoading && (
                <Carousel
                    className="w-full">
                    <CarouselContent>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <CarouselItem key={i} className="px-2 md:p-3 basis-[48%] md:basis-1/3 lg:basis-1/4">
                                <div className="h-60 md:h-80  bg-gray-200 rounded-3xl"></div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className=" hidden md:block">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            )}
            <Carousel
                className={`w-full md:w-[95%] mx-auto `}>
                <CarouselContent>
                    {data?.data.devans.map((item: any, index: any) => (
                        <CarouselItem key={index} className="px-2 md:p-3 basis-[48%] md:basis-1/3 lg:basis-1/4" onClick={() => setDevan_id(item)}>
                            <div className="py-2">
                                <div className=" cursor-pointer hover:scale-105 duration-300">
                                    <div className={`${item.id == devan_id.id && "shadow-2xl border shadow-gray-500 "} bg-white rounded-2xl overflow-hidden`}>
                                        {/* <Link href={item.image} target="_blank"> */}
                                        <div className="w-full h-36 bg-gray-200">
                                            <Image
                                                src={item.image}
                                                width={0}
                                                height={0}
                                                // className="transition hover:scale-110 duration-300 shadow-xl"
                                                sizes="100vw"
                                                style={{ width: '100%', height: '100%' }} // optional
                                                alt="Image"
                                            />
                                        </div>
                                        {/* </Link> */}
                                        <div className="p-1.5 md:p-3">
                                            <div className="text-sm md:text-base font-semibold text-gray-700">{item.name}</div>
                                            <p className="min-h-16 md:min-h-16 text-xs md:text-sm  text-gray-500">
                                                {item.desc}
                                                <br />
                                                {item.from_year}-{item.to_year}-yillar
                                            </p>
                                            <Link href={item.pdf_file} target="_blank">
                                                <button className="bg-blue-100 w-full rounded-lg text-xs md:text-sm py-0.5  md:py-1">Batafsil</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className=" hidden md:block">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>

        </>
    )
}

const GenreList = ({ search, devan_id, genre_id, setGenreId, firstFilter }) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [dataGenres, setDataGenres] = useState([]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["genre_list", devan_id, search, firstFilter],
        queryFn: async () => {
            return await devonsGetApi({ devan_id: devan_id.id, search, second: firstFilter.id == 0 ? "" : firstFilter.id });
        }
    });

    // if (isLoading) return <h1>Loading...</h1>;
    // if (isError) return <div>Xatolik yuz berdi...</div>;

    useEffect(() => {
        if (data && data.data && data.data.genres) {
            setDataGenres(data.data.genres);
        }
    }, [data])

    useEffect(() => {
        if (!isInitialized && data && data.data && data.data.genres) {
            setGenreId(data.data.genres[0]);
            setDataGenres(data.data.genres);
            setIsInitialized(true);
        }
        return () => { }; // cleanup funksiyasi
    }, [isInitialized, data]);

    return (
        <>
            {!isInitialized && (

                <Carousel
                    className="w-full">
                    <CarouselContent>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <CarouselItem key={i} className="px-2 basis-[30%] lg:basis-[11%] md:basis-[20%] 2xl:basis-[10%] ">
                                <div className="h-[50px] md:h-[60px]  bg-gray-200 rounded-2xl"></div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            )}
            <Carousel
                className="w-full">
                <CarouselContent>
                    {dataGenres.map((item: any, index: any) => (
                        <CarouselItem key={index} className="px-2 basis-[30%] lg:basis-[11%] md:basis-[20%] 2xl:basis-[10%] " onClick={() => setGenreId(item)}>
                            <div className="py-2">
                                <div className=" cursor-pointer hover:scale-105 duration-300">
                                    <div className="relative">
                                        <div className=" h-14 2xl:h-16" >
                                            <Image
                                                src={`${item.name == genre_id?.name ? "/item-active.png" : "/item-disactive.png"}`}
                                                width={50}
                                                height={50}
                                                className={`${item.name == genre_id?.name && "scale-105"}`}
                                                sizes="100vw"
                                                style={{ width: '100%', height: '100%' }} // optional
                                                alt="Image"
                                            />
                                        </div>
                                        <div className=" absolute top-2.5 lg:top-2.5 right-0 left-0">
                                            <div className="text-xs 2xl:text-lg xl:text-base lg:text-sm md:text-base font-medium text-gray-700  text-center capitalize">{item.name}</div>
                                            <div className="text-[10px] 2xl:text-base xl:text-xs lg:text-xs md:text-xs font-medium text-gray-400  text-center ">({item.counts})</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </>
    )
}

const GazalList = ({ search, devan_id, genre_id, gazal_id, setGazal_id, firstFilter, firstFilterChild }) => {
    const [current, setCurrent] = useState(1);
    const [countPage, setCountPage] = useState(1);
    const [genre_detail_number, setGenre_detail_number] = useState("");


    const { data, isLoading, isError } = useQuery({
        queryKey: ["gazal_list", genre_detail_number, current, devan_id, genre_id, search, firstFilter],
        queryFn: async () => {
            return await devonsGetApi({ genre_detail_number, page: current, devan_id: devan_id.id, genre_id: genre_id.id, search, second: firstFilter.id == 0 ? "" : firstFilter.id });
        }
    });

    // if (isLoading) return <h1>Loading...</h1>;
    // if (isError) return <div>Xatolik yuz berdi...</div>;
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
    }, [search])

    return (
        <>
            {/* G'azallar */}
            {firstFilter.id == 0 && (
                <div className="bg-white h-fit rounded-2xl text-center py-2 px-3" >
                    <div className="text-xl flex-grow text-center font-semibold py-1 pb-2">{"G'azallar"}</div>
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
                                    <GazalMobile item={item.id} >
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
                                    <GazalMobile item={item.id} >
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

            {/* Istorizm */}
            {firstFilter.id == 2 && (
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
                                    <GazalMobile item={item.id} >
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
                                    <GazalMobile item={item.id} >
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
                                    <GazalMobile item={item.id} >
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
                                    <GazalMobile item={item.id} >
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

const Gazal = ({ id }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["genres_id", id],
        queryFn: async () => {
            return await genresGetOneAPI({ id });
        }
    });

    // if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    function getExplanation(searchWord) {
        const result = data.data.word_explanations.find(entry => entry.word === searchWord);
        return result ? result.explanation : 'Kiritilmagan';
    }
    return (
        <>
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
            {!isLoading && (
                <div className="h-fit bg-white rounded-2xl text-center py-2 pb-4" >
                    <div className="text-xl font-semibold py-1 pb-2">{data?.data?.number} - {data?.data?.genre_name}</div>
                    <div>
                        <ScrollArea className=" h-[60vh] md:h-auto border md:border-0">
                            <div className="text-sm  leading-7 space-y-1 overflow-auto">
                                {data?.data?.lines.map((item: any, i: any) =>
                                    <div key={i} className={`${i == 2 || i == 3 ? "bg-yellow-200 w-fit mx-auto rounded-full" : ""} `}>
                                        {item.text.split(" ").map((item_in: any, i: any) => (
                                            <HoverCard key={i} >
                                                <HoverCardTrigger>
                                                    <span className="text-xs md:text-sm hover:bg-yellow-300 px-[1px] md:px-0.5  duration-300 py-1 rounded-full cursor-pointer">{item_in}</span>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="p-2 px-4 w-fit">
                                                    <div>
                                                        <p className="text-xs">Semantik izoh:</p>
                                                        <span>{getExplanation(item_in)}</span>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                        <div className="flex justify-between items-center gap-2 p-4 w-full  md:w-[80%] mx-auto">
                            <div className="p-1.5 border rounded-full cursor-pointer hover:scale-110 duration-300">
                                <MoveLeftIcon className="w-4 h-4" />
                            </div>
                            <div className="flex items-center gap-2 ">
                                <Modal title="Metama’lumot" button={
                                    <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{"Batafsil"}</div>
                                } >

                                    {Object.entries(data?.data?.metadata).map(([key, value]) => (
                                        <div key={key}>
                                            {/* Desktop */}
                                            <div className="hidden md:block">

                                                <div className="grid grid-cols-2 gap-2 items-center border-b py-1 text-black">
                                                    <div className="text-start">{key}</div>
                                                    <div className="text-end">{value.toString()}</div>
                                                </div>
                                            </div>
                                            {/* Mobile */}
                                            <div className="block md:hidden">
                                                <div className=" text-start text-black mb-1 ">
                                                    <span className="text-gray-400">{key}:</span> {value.toString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Modal>
                                <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{"Nasriy bayoni"}</div>
                            </div>
                            <div className="p-1.5 border rounded-full cursor-pointer hover:scale-110 duration-300">
                                <MoveRightIcon className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

const GazalMobile = ({ item, children }) => {

    return (
        <Drawer>
            <DrawerTrigger className="w-full">
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className=" absolute right-0 top-0">
                    <DrawerClose>
                        <XIcon />
                    </DrawerClose>
                </DrawerHeader>
                <Gazal id={item} />
                <DrawerFooter>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}

const JanrlarFilter = ({ search, devan_id, genre_id, firstFilter, setFirstFilter, firstFilterChild, setFirstFilterChild }) => {
    const [secondsData, setSecondsData] = useState([]);
    const [poetic_artsData, setPoeticArtsData] = useState([]);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["janrlar_filter", search, devan_id, firstFilter, firstFilterChild],
        queryFn: async () => {
            return await devonsGetApi({ search: search == null ? "" : search, devan_id: devan_id.id, genre_id: genre_id.id, second: firstFilter.id == 0 ? "" : firstFilter.id, poetic_art_id: firstFilterChild.id == 0 ? "" : firstFilterChild.id });
        }
    });

    // if (isLoading) return <h1>Loading...</h1>;
    useEffect(() => {
        if (data && data.data && data.data.seconds) {
            setSecondsData(data.data.seconds);
            setPoeticArtsData(data.data.poetic_arts);
        }
    }, [data]);


    useEffect(() => {
        setFirstFilterChild({ id: 0, name: "" })
    }, [firstFilter]);

    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <>
            {/* Desktop */}
            <div className="bg-white h-fit rounded-2xl text-center py-2 px-4 hidden lg:block" >
                <div className="text-xl py-1 pb-2 font-semibold">Janrlar</div>
                <div className=" space-y-2">
                    {genre_id.name == "" ? (
                        <div className="flex h-6 justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">

                        </div>
                    ) : (
                        <div className={`flex justify-between items-center ${firstFilter.id != 0 ? "" : "bg-blue-100"} hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilter({ id: 0, name: "" })}>
                            <div className="flex gap-2 items-center">
                                <ScrollTextIcon strokeWidth={1} className="w-5 h-5" />
                                <div className="text-base">{genre_id?.name}</div>
                            </div>
                            <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">{genre_id?.counts} ta</span>
                        </div>
                    )}
                    {secondsData.map((item: any, i: any) => (
                        <div key={i}>
                            <div className={`flex justify-between items-center ${firstFilter.id == item.id ? "bg-blue-100" : ""} hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilter(item)}>
                                <div className="flex gap-2 items-center">
                                    <ScrollTextIcon strokeWidth={1} className="w-5 h-5" />
                                    <div className="text-sm">{item.name}</div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {i == 4 && (
                                        <>
                                            {firstFilter.id == 5 ? (
                                                <ChevronUpIcon strokeWidth={1} className="w-5 h-5" />
                                            ) : (
                                                <ChevronDownIcon strokeWidth={1} className="w-5 h-5" />
                                            )}
                                        </>
                                    )}
                                    <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">
                                        {item.counts} ta
                                    </span>
                                </div>
                            </div>
                            {4 == i && firstFilter.id == 5 && poetic_artsData.map((itemchild: any, i: any) => (

                                <div key={i} className={`w-[95%] my-1.5 ml-auto flex justify-between items-center ${firstFilterChild.id == itemchild.id ? "bg-blue-100" : ""} hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilterChild(itemchild)}>
                                    <div className="flex gap-2 items-center">
                                        <CircleIcon strokeWidth={3} className="w-3 h-3 text-green-500" />
                                        <div className="text-sm">{itemchild.name}</div>
                                    </div>
                                    <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">{itemchild.counts} ta</span>
                                </div>
                            ))}

                        </div>
                    ))}

                    {/* {isInitialized && Array.from({ length: 4 }).map((_, i) => (
                        <div key={i}>
                            <div className="flex h-6 justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">

                            </div>
                            {i == 3 && Array.from({ length: 4 }).map((_: any, i: any) => (
                                <div key={i} className="w-[80%] h-6 ml-auto flex justify-between items-center my-1.5 bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">
                                </div>
                            ))}

                        </div>
                    ))} */}
                </div>

            </div>

            {/* Mobile */}
            <div className=" rounded-2xl text-start block lg:hidden" >
                <Title title="Janrlar filter" />
                <ScrollArea className="py-2  whitespace-nowrap ">
                    <div className=" flex gap-2 items-center">
                        {genre_id.name == "" ? (
                            <div className="flex h-6 justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">

                            </div>
                        ) : (
                            <div className={`flex justify-between gap-2 items-center ${firstFilter.id != 0 ? "" : "bg-blue-100"} hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilter({ id: 0, name: "" })}>
                                <div className="flex gap-2 items-center">
                                    <ScrollTextIcon strokeWidth={1} className="w-5 h-5" />
                                    <div className="text-base">{genre_id?.name}</div>
                                </div>
                                <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">{genre_id?.counts} ta</span>
                            </div>
                        )}
                        {data?.data?.seconds.map((item: any, i: any) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className={`flex justify-between items-center gap-2 ${firstFilter.id == item.id ? "bg-blue-100" : ""} hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilter(item)}>
                                    <div className="flex gap-2 items-center">
                                        <ScrollTextIcon strokeWidth={1} className="w-5 h-5" />
                                        <div className="text-sm">{item.name}</div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {i == 4 && (
                                            <>
                                                {firstFilter.id == 5 ? (
                                                    <ChevronUpIcon strokeWidth={1} className="w-5 h-5" />
                                                ) : (
                                                    <ChevronDownIcon strokeWidth={1} className="w-5 h-5" />
                                                )}
                                            </>
                                        )}
                                        <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">
                                            {item.counts} ta
                                        </span>
                                    </div>
                                </div>
                                {4 == i && firstFilter.id == 5 && data?.data?.poetic_arts.map((item: any, i: any) => (

                                    <div key={i} className={`w-[80%] space-x-2  ml-auto flex justify-between items-center ${firstFilterChild.id == item.id ? "bg-blue-100" : ""} hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilterChild(firstFilterChild.id == 0 && firstFilter.id == 5 ? item : { id: 0, name: "" })}>
                                        <div className="flex gap-2 items-center">
                                            <CircleIcon strokeWidth={1} className="w-3 h-3" />
                                            <div className="text-sm">{item.name}</div>
                                        </div>
                                        <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">{item.counts} ta</span>
                                    </div>
                                ))}

                            </div>
                        ))}

                        {isLoading && Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="flex h-6 w-20 justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">

                                </div>
                                {i == 3 && Array.from({ length: 4 }).map((item: any, i: any) => (
                                    <div key={i} className="flex h-6 w-16 ml-auto  justify-between items-center my-1.5 bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">
                                    </div>
                                ))}

                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>

            </div>
        </>
    )
}

const Devonlar = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('search') ?? "";
    const [genre_id, setGenreId] = useState({ id: "", name: "", counts: 0 });
    const [devan_id, setDevan_id] = useState({ id: "", name: "" });
    const [gazal_id, setGazal_id] = useState({ id: "", name: "" });

    // Filter Janrlar
    const [firstFilter, setFirstFilter] = useState({ id: 0, name: "" });
    const [firstFilterChild, setFirstFilterChild] = useState({ id: 0, name: "" });

    useEffect(() => {
        setGazal_id({ id: "", name: "" });
    }, [devan_id, genre_id, search]);
    return (
        <div className="pb-5 bg-image-flower min-h-screen">
            <Container>
                {/* Devonlar */}
                <div>
                    <Title title="Devonlar" />
                    <DevonList devan_id={devan_id} setDevan_id={setDevan_id} />
                </div>

                {/* Janrlar */}
                <div>
                    <Title title="Janrlar" />
                    <GenreList search={search} devan_id={devan_id} genre_id={genre_id} setGenreId={setGenreId} firstFilter={firstFilter} />
                </div>


                {/* Filter */}
                <div className="py-5">
                    <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-5 gap-3">

                        {/* Filter 1 */}
                        <JanrlarFilter
                            search={search}
                            devan_id={devan_id}
                            genre_id={genre_id}
                            // Filter
                            firstFilter={firstFilter}
                            setFirstFilter={setFirstFilter}
                            firstFilterChild={firstFilterChild}
                            setFirstFilterChild={setFirstFilterChild}
                        />


                        {/* Filter 2 */}
                        <div className=" md:col-span-4 grid grid-cols-1  lg:grid-cols-2  gap-4">

                            {/* Filter 2.2 */}
                            <GazalList
                                search={search}
                                devan_id={devan_id}
                                genre_id={genre_id}
                                gazal_id={gazal_id}
                                setGazal_id={setGazal_id}

                                // Filter
                                firstFilter={firstFilter}
                                firstFilterChild={firstFilterChild}
                            />

                            {/* Deteil */}
                            <div className="hidden lg:block">
                                {gazal_id.id && <Gazal id={gazal_id.id} />}
                            </div>

                        </div>

                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Devonlar