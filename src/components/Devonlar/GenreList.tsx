import { devonsGetApi } from "@/api/AdminRequest";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { set } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

const GenreList = ({ search, devan_id, genre_id, setGenreId, firstFilter, auditory_age__in, text_type_id__in, genre_detail_number }) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [dataGenres, setDataGenres] = useState([]);

    const { data } = useQuery({
        queryKey: ["genre_list", devan_id.id, search, firstFilter.id, auditory_age__in, text_type_id__in, genre_detail_number],
        queryFn: async () => {
            return await devonsGetApi({ devan_id: devan_id.id, search, second: firstFilter.id == 0 ? "" : firstFilter.id, auditory_age__in: auditory_age__in ? auditory_age__in : "", text_type_id__in: text_type_id__in ? text_type_id__in : "", genre_detail_number });
        }
    });

    useEffect(() => {
        if (data && data.data && data.data.genres) {
            setDataGenres(data.data.genres);
            if (genre_id.name != "") {

                let genre = data.data.genres.find(genre => genre.id == genre_id.id);
                setGenreId(genre);
            }

        }
    }, [data])



    useEffect(() => {
        if (!isInitialized && data && data.data && data.data.genres) {
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
                                        <div className=" h-16 2xl:h-20" >
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
                                        <div className=" absolute top-2.5 lg:top-2.5 right-0 left-0 text-center">
                                            <div className="text-sm 2xl:text-lg xl:text-base lg:text-sm md:text-base font-medium text-gray-700  text-center capitalize">{item.name}</div>
                                            <div className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full inline-block text-[10px] 2xl:text-base xl:text-xs lg:text-xs md:text-xs font-medium  text-center ">{item.counts} ta</div>

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

export default GenreList;