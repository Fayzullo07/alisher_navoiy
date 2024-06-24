import { devonsGetApi } from "@/api/AdminRequest";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

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
                    {data?.data.devans.map((item: any, index: any) => (
                        <CarouselItem key={index} className="px-2 md:p-3 basis-[48%] md:basis-1/3 lg:basis-[24%] 2xl:basis-[21%]" onClick={() => setDevan_id(item)}>
                            <div className="py-2">
                                <div className=" cursor-pointer hover:scale-105 duration-300">
                                    <div className={`${item.id == devan_id.id && " bg-[#c7e2f300] shadow-lg border shadow-gray-500 "} bg-white rounded-2xl overflow-hidden`}>
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
                                            <div className="text-sm md:text-base font-semibold text-gray-700">{item.name}</div>
                                            <p className="min-h-16 md:min-h-16 text-xs md:text-sm  text-gray-500">
                                                {item.desc}
                                                <br />
                                                {item.from_year}-{item.to_year}-yillar
                                            </p>
                                            <Link href={item.pdf_file} target="_blank">
                                                <button className={`${item.id == devan_id.id ? "bg-white": "bg-blue-100"}  w-full rounded-lg text-xs md:text-sm py-0.5  md:py-1`}>Batafsil</button>
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