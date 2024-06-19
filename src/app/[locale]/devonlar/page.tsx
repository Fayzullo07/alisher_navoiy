"use client"
import Container from "@/components/Core/Container"
import Title from "@/components/Core/Title"
import SliderCard from "@/components/SliderCard"
import SliderItem from "@/components/Slidertem"
import { MoveLeftIcon, MoveRightIcon, ScrollTextIcon, SearchIcon } from "lucide-react"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { devonsGetApi } from "@/api/AdminRequest"
import { useQuery } from "@tanstack/react-query"


import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"


const Devonlar = () => {
    const [active, setActive] = useState(0);
    const [activeGenres, setActiveGenres] = useState({ name: "G'azal", counts: 0 });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["devans"],
        queryFn: async () => {
            return await devonsGetApi();
        }
    });

    useEffect(() => {
        if (data && data.data && data.data.genres) {
            setActiveGenres(data.data.genres[0]);
        }
    }, [data]);


    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <div className="pb-5 bg-image-flower ">
            <Container>

                <div>
                    <Title title="Devonlar" />
                    <div>
                        <Carousel
                            className={`w-full md:w-[95%] mx-auto py-1.5`}>
                            <CarouselContent>
                                {data?.data.devans.map((item: any, index: any) => (
                                    <CarouselItem key={index} className="px-2 md:p-3 basis-2/4 md:basis-1/3 lg:basis-1/4" onClick={() => setActive(index)}>
                                        <div className="py-2">
                                            <div className=" cursor-pointer hover:scale-105 duration-300">
                                                <div className={`${index == active && "shadow-xl shadow-gray-500 "} bg-white rounded-2xl overflow-hidden`}>
                                                    <Link href={item.image} target="_blank">
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
                                                    </Link>
                                                    <div className="p-1.5 md:p-3">
                                                        <div className="text-sm md:text-base font-semibold text-gray-700">{item.name}</div>
                                                        <p className="min-h-12 md:min-h-16 text-xs md:text-sm  text-gray-500">
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

                    </div>
                </div>

                <div>
                    <Title title="Janrlar" />
                    <div>
                        <Carousel
                            className="w-full">
                            <CarouselContent>
                                {data?.data.genres.map((item: any, index: any) => (
                                    <CarouselItem key={index} className="px-1 basis-1/4 lg:basis-[10%] md:basis-[15%]" onClick={() => setActiveGenres(item)}>
                                        <div className="py-2">
                                            <div className=" cursor-pointer hover:scale-105 duration-300">
                                                <div className="relative">
                                                    <div >
                                                        <Image
                                                            src={`${item.name == activeGenres?.name ? "/item-active.png" : "/item-disactive.png"}`}
                                                            width={50}
                                                            height={50}
                                                            className={`${item.name == activeGenres?.name && "scale-105"}`}
                                                            sizes="100vw"
                                                            style={{ width: '100%', height: 'auto' }} // optional
                                                            alt="Image"
                                                        />
                                                    </div>
                                                    <div className=" absolute top-2.5 lg:top-2.5 right-0 left-0">
                                                        <div className="text-xs 2xl:text-xl xl:text-base lg:text-sm md:text-base font-medium text-gray-700  text-center capitalize ">{item.name}</div>
                                                        <div className="text-[10px] 2xl:text-base xl:text-xs lg:text-xs md:text-xs font-medium text-gray-400  text-center ">({item.counts})</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>

                    </div>
                </div>

                <div className="py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-3">
                        <div className="bg-white rounded-2xl text-center py-2 px-4" >
                            <div className="text-xl py-1 font-semibold">Janrlar</div>
                            <div className="">
                                <div className="flex justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">
                                    <div className="flex gap-2 items-center">
                                        <ScrollTextIcon strokeWidth={1} className="w-5 h-5" />
                                        <div className="text-base">{activeGenres?.name}</div>
                                    </div>
                                    <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">{activeGenres?.counts} ta</span>
                                </div>
                                {data?.data?.seconds.map((item: any, i: any) => (
                                    <div key={i} className="flex justify-between items-center hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">
                                        <div className="flex gap-2 items-center">
                                            <ScrollTextIcon strokeWidth={1} className="w-5 h-5" />
                                            <div className="text-base">{item.name}</div>
                                        </div>
                                        <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">{item.counts} ta</span>
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div className=" md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            <div className="bg-white rounded-2xl text-center py-2 px-4" >
                                <div className="text-xl font-semibold py-1">{"G'azallar"}</div>
                                <div className="flex items-center gap-2 p-2 rounded-full bg-gray-50 ">
                                    <SearchIcon strokeWidth={1} size={20} />
                                    <input type="search" placeholder="Raqamlar bo‘yicha qidiruv" className=" placeholder:text-xs inline-block bg-transparent focus:outline-none text-sm text-gray-500" />
                                </div>
                                <div className="">
                                    {Array.from({ length: 11 }).map((_, i) => (
                                        <div key={i} className="flex justify-between items-center hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">
                                            <div className="flex gap-1 items-center">
                                                <span>{i + 1}.</span>
                                                <div className="text-sm">{"Ey navbahori orazing subhig'a jonparvar havo"}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-2">
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious href="/" />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="/">1</PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="/">2</PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="/">3</PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationNext href="/" />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>

                                </div>

                            </div>
                            <div className="bg-white rounded-2xl text-center py-2 md:px-8 px-2" >
                                <div className="text-xl font-semibold py-1">{"1-G'azal"}</div>
                                <div>
                                    <p className="text-sm leading-7 text-justify">
                                        {`Ey navbahori orazing subhig'a jonparvar havo, Andin gulu bulbul topib yuz barg birla ming navo. To'bi-yu shohi sidradur ko'yung giyohi, negakim Ushshoq ashku ohidin har dam topar su-yu havo. Zahri firoqingdin qayu oshiqki bo'ldi talxkom,No'shi visoling yetmasa Iso anga topmas davo. Chun qoziy ul-hojot sen da'voi mahring qilg'ali,Dard-u firoq anduhidin kelturmisham ikki guvo. Qilmay qabul ijodning imkoni yo'q, so'ngra yanaMaqbulini rad aylamak lutfungdin o'lg'aymu ravoZohid, ko'ngulning xilvatin matlub g'ayridin orit Sen sayr qilsang qil kerak ko'nglungga bo'lsa inzivo. Desang Navoiy jon aro mahbub bo'lg'ay jilvagarAvval ko'ngul ko'zgusidin mahv ayla naqshi mosivo.`.split(" ").map((item, i) => (
                                            <HoverCard key={i}>
                                                <HoverCardTrigger>
                                                    <span className="text-sm hover:bg-yellow-300 px-1 duration-300 py-1 rounded-full cursor-pointer">{item} </span>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="p-2 px-4 w-fit">
                                                    <div>
                                                        <p className="text-xs">Semantik izoh:</p>
                                                        <span>{item}</span> - <span>{i} {item}</span>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>


                                        ))}
                                    </p>
                                    <div className="flex justify-between items-center gap-2 pt-2">
                                        <div className="p-1.5 border rounded-full cursor-pointer">
                                            <MoveLeftIcon className="w-4 h-4" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="px-2 py-1 border rounded-full cursor-pointer">{"Batafsil"}</div>
                                            <div className="px-2 py-1 border rounded-full cursor-pointer">{"Nasriy bayoni"}</div>
                                        </div>
                                        <div className="p-1.5 border rounded-full cursor-pointer">
                                            <MoveRightIcon className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Devonlar