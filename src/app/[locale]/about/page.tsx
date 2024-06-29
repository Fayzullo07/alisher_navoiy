"use client"
import { questionsGetApi, workersGetApi } from "@/api/AdminRequest";
import Container from "@/components/Core/Container";
import Title from "@/components/Core/Title";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRightIcon, ImageIcon, UserIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

import React from "react";

import AutoScroll from "embla-carousel-auto-scroll"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import Image from "next/image";


const Workers = () => {
    const plugin2 = React.useRef(
        AutoScroll({ loop: true, speed: 1, autoScroll: true }),
        // Autoplay({ delay: 2000, stopOnInteraction: true, speed: 1, })
    )

    const { data, isLoading, isError } = useQuery({
        queryKey: ["workers"],
        queryFn: async () => {
            return await workersGetApi();
        }
    });

    // if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    return (
        <div>
            {data?.data.length != 0 && (

                <Container>
                    <Carousel
                        plugins={[plugin2.current]}
                        onMouseEnter={plugin2.current.stop}
                        onMouseLeave={plugin2.current.play}
                        className="w-full">
                        <CarouselContent>
                            {data?.data.map((item: any, index: any) => (
                                <CarouselItem key={index} className="pr-5 basis-full lg:basis-2/6 cursor-pointer">
                                    <div
                                        className="bg-gray-100 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
                                        <div className="flex items-center gap-4">
                                            {item.image == null ? (
                                                <UserIcon
                                                    strokeWidth={1}
                                                    className="border w-18 md:w-24 group-hover:w-28 group-hover:h-28 h-18 md:h-24 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                                                />
                                            ) : (

                                                <Image
                                                    src={item.image}
                                                    className=" w-18 md:w-24 group-hover:w-28 group-hover:h-28 h-18 md:h-24 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                                                    width={0}
                                                    height={0}
                                                    sizes="100vw"
                                                    style={{ width: '100px', height: '100px' }} // optional
                                                    alt="Image"
                                                />
                                            )}

                                            <div className="w-fit transition-all transform duration-500">
                                                <h1 className="text-gray-600 font-bold text-base">
                                                    {item.fullname}
                                                </h1>

                                                <p
                                                    className="text-base text-gray-500 transform transition-all delay-300 duration-500">
                                                    {item.role && <span className="text-maincolor inline-block">Role: <span className="text-gray-700">{item.role}</span></span>}
                                                    {item.phone_number && <span className="text-maincolor inline-block">Phone: <span className="text-gray-700">{item.phone_number}</span></span>}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="">
                                            {item.telegram_link && <Link href={item.telegram_link} target="_blank" className="text-base text-maincolor">Telegram: <span className="text-gray-700">{item.telegram_link}</span></Link>}
                                        </div>
                                       
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                      
                    </Carousel>
                </Container>
            )}
        </div>
    )
}


const AboutPage = () => {
    const locale = useLocale();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["about"],
        queryFn: async () => {
            return await questionsGetApi();
        }
    });

    // if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    return (
        <>
            {data?.data?.results.length != 0 && (
                <>
                    {data?.data?.results.map((item: any, i: number) => (
                        <Link key={i} href={`/${locale}/about/${item.id}`} className="hover:scale-105 duration-300">
                            <div className="p-5 bg-blue-100 rounded-3xl shadow-lg">

                                <div className="flex justify-between items-center pb-1.5">
                                    <div className="text-lg font-semibold">{item.question}?</div>
                                    <div className="text-base rounded-full p-1 text-center bg-white">
                                        <ArrowUpRightIcon strokeWidth={1} className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="text-sm font-normal text-gray-500 ">
                                    {item.short_answer.length > 100 ? item.short_answer.substring(0, 100) + "..." : item.short_answer}
                                </div>
                            </div>
                        </Link>
                    ))}
                </>
            )}
        </>
    )
}


const About = () => {
    return (
        <div className="pb-5 min-h-screen bg-image-flower pt-20">
            <Container>
                <div className="flex items-center justify-center">
                    <Title title="Xodimlar haqida" />
                </div>
                <div>
                    <Workers />
                </div>
                <div className="flex items-center justify-center">
                    <Title title="Korpus haqida" />
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AboutPage />
                </div>
            </Container>
        </div>

    )
}

export default About;