"use client"
import { useQuery } from "@tanstack/react-query";
import Title from "@/components/Core/Title";
import { EyeIcon, MoveLeftIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { newsGetApi, worksGetApi } from "@/api/AdminRequest";
import { useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";

const NewsList = ({ search }: { search: string }) => {
    const locale = useLocale();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["news", search],
        queryFn: async () => {
            return await newsGetApi({ search });
        }
    });

    // if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <>
            {data?.data?.results.map((item: any, i: any) => (
                <div key={i} className="snip1360 shadow-md">
                    <div className="h-48 flex justify-center items-center bg-gray-100">
                        <Image
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: '100%' }}
                            src={item.main_image} alt="sample88"
                        />
                    </div>
                    <figcaption>
                        <h2>{item.title}</h2>
                        <p>{item.authors}</p>
                        <p>{item.published_at}</p>
                        <Link href={`/${locale}/news/${item.id}`} className="read-more">Read More</Link>
                    </figcaption>
                </div>

            ))}
        </>
    )

};


const News = () => {
    const locale = useLocale();
    const [search, setSearch] = useState("");

    return (
        <div className="bg-image-flower min-h-screen pt-10 md:pt-0 pb-10 relative">
            <div className=" md:hidden block absolute  top-0 left-0">
                <div className=" w-screen text-center relative">
                    <Link href={`/${locale}/nes`} className="hover:scale-105 duration-300 absolute top-0.5 left-2 md:hidden py-1 px-2 rounded-full cursor-pointer text-gray-500 text-base">
                        <MoveLeftIcon className="w-6 h-6" />
                    </Link>

                    <h2 className="text-xl font-semibold">News</h2>
                </div>
            </div>

            <div className="w-full lg:w-[85vw] mx-auto px-4">
                <div className=" hidden md:block">

                    <Title title="News" />
                </div>

                <div className=" ">

                    <div className="shadow-lg rounded-lg overflow-hidden px-4 bg-white py-6 ">
                        <div className="flex items-center gap-2 border p-2 rounded-full mb-5 w-60 ">
                            <SearchIcon strokeWidth={1} size={20} />
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Qidiruv" className=" inline-block bg-transparent focus:outline-none text-sm text-gray-500" />
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">

                            <NewsList search={search} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default News;