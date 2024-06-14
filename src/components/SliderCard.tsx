"use client"
import React from "react";
import { RssIcon } from "lucide-react";
import Container from "./Core/Container"

import AutoScroll from "embla-carousel-auto-scroll"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import Image from "next/image";
const SliderCard = ({ isTrue = true }) => {
    const plugin2 = React.useRef(
        AutoScroll({ loop: true, speed: 0.2, autoScroll: true }),
        // Autoplay({ delay: 2000, stopOnInteraction: true, speed: 1, })
    )

    return (
        <div>
            <Carousel
                plugins={[plugin2.current]}
                onMouseEnter={plugin2.current.stop}
                onMouseLeave={plugin2.current.play}
                className={`${isTrue && "w-[90%]"} mx-auto`}>
                <CarouselContent>
                    {Array.from({ length: 7 }).map((_, index) => (
                        <CarouselItem key={index} className="px-1.5 md:px-2 basis-2/5 md:basis-1/3 lg:basis-1/4">
                            <div className="py-2">
                                <div className=" cursor-pointer hover:scale-105 duration-300">
                                    <div className="bg-white rounded-2xl ">
                                        <div >
                                            <Image
                                                src={"/image.png"}
                                                width={150}
                                                height={0}
                                                // className="transition hover:scale-110 duration-300 shadow-xl"
                                                sizes="100vw"
                                                style={{ width: '100%', height: 'auto' }} // optional
                                                alt="Image"
                                            />
                                        </div>
                                        <div className="p-1.5 md:p-3 space-y-2">
                                            <div className="text-sm md:text-base font-semibold text-gray-700">Ilk devon</div>
                                            <p className=" text-xs md:text-sm  text-gray-500">zamondosh muxlislari tomonidan
                                                tartib berilgan. 1465-1466-yillar</p>
                                            <button className="bg-blue-100 w-full rounded-lg text-xs md:text-sm py-0.5  md:py-1">Batafsil</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {isTrue && (
                    <>
                        <CarouselPrevious />
                        <CarouselNext />
                    </>
                )}
            </Carousel>

        </div>
    )
}

export default SliderCard;