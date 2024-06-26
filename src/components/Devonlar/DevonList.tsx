"use client"
import { useEffect, useState } from "react";
import { devonsGetApi } from "@/api/AdminRequest";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { CalendarClockIcon, CalendarFoldIcon } from "lucide-react";

const DevonList = ({ devan_id, setDevan_id, genre_id, search }) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [dataDevons, setDataDevons] = useState([]);

    const { data } = useQuery({
        queryKey: ["devans_list", genre_id, search],
        queryFn: async () => {
            return await devonsGetApi({ genre_id: genre_id.id, search });
        }
    });

    useEffect(() => {
        if (data && data.data && data.data.devans) {
            setDataDevons(data.data.devans);
        }
    }, [data])

    useEffect(() => {
        if (!isInitialized && data && data.data && data.data.devans) {
            // setGenreId(data.data.genres[0]);
            setDataDevons(data.data.devans);
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
                            <CarouselItem key={i} className="px-2 md:p-3 basis-[48%] md:basis-1/3 lg:basis-[22.5%] 2xl:basis-[21%]">
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
                    {dataDevons.map((item: any, index: any) => (
                        <CarouselItem key={index} className="px-2 md:p-3 basis-[48%] md:basis-1/3 lg:basis-[24%] 2xl:basis-[21%]" onClick={() => setDevan_id(item)}>
                            <div className="py-2">
                                <div className=" cursor-pointer hover:scale-105 duration-300">
                                    <div className={`${item.id == devan_id.id ? " bg-blue-100 shadow-lg border shadow-gray-500 " : "bg-white"} rounded-2xl overflow-hidden`}>
                                        {/* <Link href={item.image} target="_blank"> */}
                                        <div className="w-full h-32 md:h-40 bg-gray-200">
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
                                            <div className="flex flex-between items-center relative">

                                                <div className="w-[85%] h-10 md:h-14 text-sm md:text-base font-semibold text-gray-700">{item.name}</div>
                                                <div className=" absolute right-0 top-0 text-[10px] w-max  text-green-600 px-2 py-1 rounded-full bg-green-100">
                                                    {item.counts} ta
                                                </div>
                                            </div>
                                            <div className="h-20 md:h-28 text-xs md:text-sm  text-gray-500 flex flex-col">
                                                <div className="flex-grow">

                                                    {item.desc.length > 100 ? item.desc.substring(0, 100) + "..." : item.desc}
                                                </div>

                                                <span className="flex items-center">

                                                    <CalendarClockIcon className="w-4 h-4 text-gray-400 mr-1" />
                                                    {item.to_year ? item.from_year + "-" + item.to_year + "-yillar" : item.from_year + "-yil"}
                                                </span>
                                                <span className="flex items-center mb-1">

                                                    <CalendarFoldIcon className="w-4 h-4 text-gray-400 mr-1" />
                                                    {item.to_age ? item.from_age + "-" + item.to_age + "-yoshlar" : item.from_age + "-yosh"}
                                                </span>

                                            </div>
                                            <Link href={item.pdf_file} target="_blank">
                                                <button className={`${item.id == devan_id.id ? "bg-white" : "bg-blue-100"}  w-full rounded-lg text-xs md:text-sm py-0.5  md:py-1`}>Batafsil</button>
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

export default DevonList;