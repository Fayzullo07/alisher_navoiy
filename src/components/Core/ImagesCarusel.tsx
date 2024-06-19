import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { useRef } from "react"

import AutoScroll from "embla-carousel-auto-scroll"
import Link from "next/link"
const ImagesCarusel = ({ images }: { images: any }) => {
    const plugin1 = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
        // AutoScroll({ loop: true, speed: 1, autoScroll: true }),
    )
    return (
        <Carousel
            plugins={[plugin1.current]}
            className="w-full"
            onMouseEnter={plugin1.current.stop}
            onMouseLeave={plugin1.current.play}
        >
            <CarouselContent>
                {images.map((item: any, index: number) => (
                    <CarouselItem key={index}>
                        <div className=" h-80 w-full md:w-[80%] mx-auto flex justify-center items-center">
                            <Link href={item} target="_blank">
                                <Image
                                    src={item}
                                    width={0}
                                    height={0}
                                    className="object-cover"
                                    sizes="100vw"
                                    style={{ width: 'auto', height: 'auto' }} // optional
                                    alt="Image"
                                />
                            </Link>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>


        </Carousel>
    )
}

export default ImagesCarusel;