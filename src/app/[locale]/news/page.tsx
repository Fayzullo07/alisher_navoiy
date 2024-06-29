"use client"
import { useQuery } from "@tanstack/react-query";
import Title from "@/components/Core/Title";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { newsGetApi } from "@/api/AdminRequest";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";

import { Pagination } from 'antd';
import type { PaginationProps } from 'antd'

const NewsList = ({ search, setCountPage, current }: { search: string, setCountPage: any, current: number }) => {
    const locale = useLocale();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["news", search, current],
        queryFn: async () => {
            return await newsGetApi({ search, page: current, page_size: 2 });
        }
    });
    useEffect(() => {
        if (data && data.data && data.data.count) {
            setCountPage(data.data.count);
        }
    }, [data]);

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {data?.data?.results.map((item: any, i: any) => (
                <Link key={i} href={`/${locale}/news/${item.id}`} className="w-full  mb-8  flex flex-col cursor-pointer hover:shadow-2xl duration-300">
                    <div className=" overflow-hidden h-40 md:h-80 w-full">
                        <Image
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="object-cover object-center w-full h-48 hover:scale-110 duration-300"
                            style={{ width: '100%', height: '100%' }}
                            src={item.main_image} alt="News"
                        />
                    </div>
                    <div className="flex flex-grow">
                        <div className="triangle"></div>
                        <div className="flex flex-col justify-between px-4 py-6 bg-white border border-gray-400 w-full">
                            <div>
                                <p
                                    className="inline-block mb-4 text-xs font-bold capitalize border-b-2 border-blue-600 hover:text-blue-600">
                                    {item.published_at}
                                </p>
                                <p
                                    className="block mb-4 text-base md:text-xl font-black leading-tight ">
                                    {item.title}
                                </p>
                                <p className="mb-4 text-sm md:text-base">
                                    {item.authors}
                                </p>
                            </div>
                            <div>
                                <Link href={`/${locale}/news/${item.id}`}
                                    className="inline-block pb-1 mt-2 text-sm md:text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600">Read
                                    More -{">"}
                                </Link>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )

};


const News = () => {
    const [search, setSearch] = useState("");

    const [countPage, setCountPage] = useState(1);
    const [current, setCurrent] = useState(1);


    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };

    return (
        <div className="bg-image-flower min-h-screen pt-20">

            <div className="w-full lg:w-[85vw] mx-auto px-4 pb-10">


                <div>
                    <div className="flex items-center justify-center  ">
                        <Title title="Yangiliklar" />
                    </div>
                    <div className=" rounded-lg overflow-auto px-4 py-2 md:py-6 h-[80vh] md:h-[90vh]">
                        <div className="flex items-center gap-2 border w-full bg-white p-2 rounded-full mb-5 md:w-[50%] ">
                            <SearchIcon strokeWidth={1} size={20} />
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Qidiruv" className="w-full inline-block bg-transparent focus:outline-none text-sm text-gray-500" />
                        </div>
                        <NewsList search={search} setCountPage={setCountPage} current={current} />
                    </div>
                    <div className={` text-center mt-3 my-2 ${countPage > 1 ? "" : "hidden"} `}>
                        <Pagination current={current} onChange={onChange} showSizeChanger={false} total={countPage} responsive={true} defaultPageSize={2} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default News;