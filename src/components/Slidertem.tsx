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

import useEmblaCarousel from 'embla-carousel-react'
import Image from "next/image";
const SliderItem = () => {
    const plugin2 = React.useRef(
        AutoScroll({ loop: true, speed: 1, autoScroll: false }),
        // Autoplay({ delay: 2000, stopOnInteraction: true, speed: 1, })
    )

    return (
        <div>
            <Carousel
              
                className="w-full">
                <CarouselContent>
                    {Array.from({ length: 17 }).map((_, index) => (
                        <CarouselItem key={index} className="pr-1 basis-1/3 lg:basis-[12.5%]">
                            <div className="p-0.5">
                                <div className=" cursor-pointer hover:scale-105 duration-300">
                                    <div className="p-0 relative">
                                        <div >
                                            <Image
                                                src={"/item.png"}
                                                width={50}
                                                height={0}
                                                // className="transition hover:scale-110 duration-300 shadow-xl"
                                                sizes="100vw"
                                                style={{ width: '100%', height: 'auto' }} // optional
                                                alt="Image"
                                            />
                                        </div>
                                        <div className=" absolute top-2 right-0 left-0">
                                            <div className="text-base font-semibold text-gray-700  text-center ">Ilk devon</div>
                                            <div className="text-base font-normal text-gray-400  text-center ">(160)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

        </div>
    )
}

export default SliderItem;