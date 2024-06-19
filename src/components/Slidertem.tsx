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
    const [active, setActive] = React.useState(0);

    return (
        <div>
            <Carousel
                className="w-full">
                <CarouselContent>
                    {Array.from({ length: 17 }).map((_, index) => (
                        <CarouselItem key={index} className="px-1 basis-1/4 lg:basis-[10%] md:basis-[15%]" onClick={() => setActive(index)}>
                            <div className="py-2">
                                <div className=" cursor-pointer hover:scale-105 duration-300">
                                    <div className="relative">
                                        <div >
                                            {index == active ? (
                                                <Image
                                                    src={"/item-active.png"}
                                                    width={50}
                                                    height={50}
                                                    className="transition scale-105 duration-300"
                                                    sizes="100vw"
                                                    style={{ width: '100%', height: 'auto' }} // optional
                                                    alt="Image"
                                                />
                                            ) : (
                                                <Image
                                                    src={"/item-disactive.png"}
                                                    width={50}
                                                    height={50}
                                                    className="transition hover:scale-105 duration-300"
                                                    sizes="100vw"
                                                    style={{ width: '100%', height: 'auto' }} // optional
                                                    alt="Image"
                                                />
                                            )}
                                        </div>
                                        <div className=" absolute top-2.5 lg:top-2.5 right-0 left-0">
                                            <div className="text-xs 2xl:text-2xl xl:text-lg lg:text-base md:text-base font-medium text-gray-700  text-center ">Ilk devon</div>
                                            <div className="text-[10px] 2xl:text-base xl:text-xs lg:text-xs md:text-xs font-medium text-gray-400  text-center ">(16{index + 1})</div>
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