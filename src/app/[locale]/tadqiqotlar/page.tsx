"use client";
import { researchGetApi } from "@/api/AdminRequest";
import Title from "@/components/Core/Title";
import { useQuery } from "@tanstack/react-query";
import { EyeIcon, MoveLeftIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Pagination } from 'antd';
import type { PaginationProps } from 'antd'
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocale } from "next-intl";

const TadqiqotListMobile = ({ search, setCountPage, current }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["works", search, current],
        queryFn: async () => {
            return await researchGetApi({ search, page: current });
        }
    });

    useEffect(() => {
        if (data && data.data && data.data.count) {
            setCountPage(data.data.count);
        }
    }, [data])

    // if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <>
            {data?.data?.results.map((item: any, i: any) => (
                <div key={i} className="py-4 px-3 bg-white rounded-2xl space-y-2 border mb-3">
                    <div className="pb-2 text-sm font-semibold">{item.title}</div>
                    <div className="text-sm">
                        <div><span className="text-blue-300">Muallifi: </span> {item.authors}</div>
                        <div className="pb-5"><span className="text-blue-300">Yaratilgan vaqti: </span> {item.published_at}</div>
                    </div>
                    <Link href={item.pdf_file} target="_blank">
                        <button className="bg-blue-100 text-gray-500 w-full font-semibold rounded-full text-sm md:text-sm py-2.5 ">{"Ko‘rish"}</button>
                    </Link>
                </div>
            ))}
        </>
    )

};


const TadqiqotList = ({ search, setCountPage, current }) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["researches", search, current],
        queryFn: async () => {
            return await researchGetApi({ search });
        }
    });

    useEffect(() => {
        if (data && data.data && data.data.count) {
            setCountPage(data.data.count);
        }
    }, [data])

    // if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>{error?.message}</div>;
    return (
        <>
            {data?.data?.results.map((item: any, i: any) => (
                <tr key={i} className="hover:bg-gray-100 duration-300 cursor-pointer" onClick={() => window.open(item.pdf_file, '_blank')}>
                    <td className="py-3 px-6 border-b border-gray-200 text-sm rounded-tl-full rounded-bl-full">{item.title}</td>
                    <td className="py-3 px-6 border-b border-gray-200 text-sm">{item.authors}</td>
                    <td className="py-3 px-6 border-b border-gray-200 text-sm">{item.published_at}</td>
                    <td className="py-3 px-6 border-b border-gray-200 text-sm rounded-tr-full rounded-br-full">
                        <Link href={item.pdf_file} target="_blank">
                            <EyeIcon strokeWidth={1} size={20} className="mx-auto" />
                        </Link>
                    </td>
                </tr>
            ))}

            {data?.data?.results.length == 0 && (

                <tr >
                    <td className="py-3 px-6 border-b border-gray-200 text-sm">{""}</td>
                </tr >
            )}
        </>
    )

};

const Tadqiqotlar = () => {
    const [search, setSearch] = useState("");
    const [countPage, setCountPage] = useState(1);
    const [current, setCurrent] = useState(1);

    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };
    return (
        <div className="bg-image-flower min-h-screen pt-14 md:pt-20">
            <div className="w-full lg:w-[85vw] mx-auto px-4 pb-10">
                <div className=" hidden md:block">
                    <Title title="Ilmiy tadqiqotlar" />
                </div>

                <div className=" hidden md:block bg-white shadow-lg rounded-lg pb-5 ">

                    <div className={` overflow-hidden px-4 pt-6 ${countPage > 9 ? "h-[700px]" : "h-auto"} `}>
                        <div className="flex items-center gap-2 border p-2 rounded-full mb-5 w-full md:w-[50%] ">
                            <SearchIcon strokeWidth={1} size={20} />
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Qidiruv" className=" w-full inline-block bg-transparent focus:outline-none text-sm text-gray-500" />
                        </div>
                        <table className="w-full table-fixed">
                            <thead className=" rounded-full overflow-hidden">
                                <tr className="bg-gray-100 rounded-full overflow-hidden text-sm">
                                    <th className="w-3/4 py-2 px-6 text-left text-gray-600 rounded-tl-full rounded-bl-full">Nomi</th>
                                    <th className="w-1/4 py-2 px-6 text-left text-gray-600">Muallifi</th>
                                    <th className="w-1/4 py-2 px-6 text-left text-gray-600">Sanasi</th>
                                    <th className="w-1/4 py-2 px-6 text-center text-gray-600 rounded-tr-full rounded-br-full">{"Ko‘rish"}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white ">
                                <TadqiqotList search={search} setCountPage={setCountPage} current={current} />
                            </tbody>
                        </table>
                    </div>
                    <div className={` text-center mt-3 my-2 ${countPage > 9 ? "" : "hidden"} `}>
                        <Pagination current={current} onChange={onChange} showSizeChanger={false} total={countPage} responsive={true} />
                    </div>
                </div>

                <div className="block md:hidden">
                    <div className="flex items-center justify-center py-5 ">
                        <h2 className="text-xl font-semibold text-center flex-grow">Ilmiy tadqiqotlar</h2>
                    </div>
                    <div className="flex items-center gap-2 border p-2 rounded-full mb-5 bg-white ">
                        <SearchIcon strokeWidth={1} size={20} />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Qidiruv" className=" w-full bg-transparent focus:outline-none text-sm text-gray-500" />
                    </div>
                    <ScrollArea className="  h-[80vh] md:h-[95vh]">
                        <TadqiqotListMobile search={search} setCountPage={setCountPage} current={current} />
                    </ScrollArea>
                    <div className={` text-center mt-3 my-2 ${countPage > 9 ? "" : "hidden"} `}>
                        <Pagination current={current} onChange={onChange} showSizeChanger={false} total={countPage} responsive={true} />
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Tadqiqotlar;