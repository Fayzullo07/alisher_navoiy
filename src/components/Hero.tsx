'use client'
import Image from "next/image";
import Container from "./Core/Container";


import AutoScroll from "embla-carousel-auto-scroll"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { provebsGetApi } from "@/api/AdminRequest";
import Autoplay from "embla-carousel-autoplay"

const Hero = ({ h }) => {
    const plugin2 = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
        // Autoplay({ delay: 2000, stopOnInteraction: true, speed: 1, })
    )

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["proverbs"],
        queryFn: async () => {
            return await provebsGetApi();
        }
    });

    // if (isLoading) return <h1></h1>;
    if (isError) return <div>{error?.message}</div>;
    return (
        <div>
            {/* Desktop */}
            <div className=" hidden md:block relative h-screen overflow-hidden">
                <Image
                    src={"/hero.png"}
                    width={0}
                    height={0}
                    className="object-cover"
                    sizes="100vw" style={{ width: '100%', height: 'auto' }}
                    alt="Image"
                />
                <div className=" absolute top-0 left-0 bottom-0 right-0">
                    <Container>
                        <div className=" flex justify-center items-center">
                            <div className="flex flex-col justify-between h-full w-full  items-center pt-20 absolute bottom-0 ">
                                <div className="font-bold text-white font-serif md:pt-20">
                                    <h1 className="md:text-9xl text-4xl" data-aos="fade-up" data-aos-delay="100">Alisher Navoiy</h1>
                                    <p className=" text-center md:text-xl text-base font-semibold" data-aos="fade-up" data-aos-delay="200">{h("hero_desc")}</p>
                                </div>
                                <div className=" w-[80%] mx-auto absolute top-0 bottom-0 left-0 right-0">

                                    <div className="hidden w-[46vw]   md:block absolute  bottom-0 -left-10 ">
                                        <Image
                                            src={"/alisher_navoiy_book.png"}
                                            width={0}
                                            height={0}
                                            sizes="100vw" style={{ width: '100%', height: 'auto' }}
                                            alt="Image"
                                        />
                                    </div>
                                    <div className="hidden md:flex justify-center absolute items-center right-0 bottom-0 ">
                                        <Image
                                            src={"/hero-item.png"}
                                            width={0}
                                            height={0}
                                            sizes="100vw" style={{ width: '100%', height: 'auto' }}
                                            alt="Image"
                                        />
                                        <div className="absolute bottom-0 left-0 top-0 right-0 z-10 text-2xl flex items-center justify-center text-black text-center">
                                            <Carousel
                                                plugins={[plugin2.current]}
                                                onMouseEnter={plugin2.current.stop}
                                                onMouseLeave={plugin2.current.play}
                                                className="w-[60%]  h-20 flex justify-center items-center ">
                                                <CarouselContent>
                                                    {data?.data?.map((item: any, index: any) => (
                                                        <CarouselItem key={index} className="basis-full  cursor-pointer my-auto">
                                                            <div
                                                                className=" whitespace-pre-line text-sm md:text-lg   "
                                                                style={{ whiteSpace: "pre-line" }}
                                                                dangerouslySetInnerHTML={{ __html: item.text.substring(0, 200) }} />
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>

                                            </Carousel>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Container>
                </div>
            </div>

            {/* Mobile */}
            <div className=" block md:hidden relative mt-8">
                <Image
                    src={"/hero.png"}
                    width={0}
                    height={0}
                    sizes="100vw" style={{ width: '100%', height: 'auto' }}
                    alt="Image"
                />
                <div className=" absolute top-0 left-0 bottom-0 right-0 border border-red-500">
                    <Container>
                        <div className=" flex justify-center items-center">
                            <div className="flex flex-col justify-between h-full  items-center pt-20 absolute bottom-0 ">
                                <div className="font-bold text-white font-serif md:pt-20">
                                    <h1 className="md:text-9xl text-4xl" data-aos="fade-up" data-aos-delay="100">Alisher Navoiy</h1>
                                    <p className=" text-center md:text-xl text-base font-semibold" data-aos="fade-up" data-aos-delay="200">{h("hero_desc")}</p>
                                </div>

                            </div>

                        </div>
                    </Container>
                </div>
            </div>

        </div>



    )
}

export default Hero;