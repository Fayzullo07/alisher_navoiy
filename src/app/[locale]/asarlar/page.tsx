"use client"
import { useQuery } from "@tanstack/react-query";
import Title from "@/components/Core/Title";
import { EyeIcon, MoveLeftIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { worksGetApi } from "@/api/AdminRequest";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Pagination } from 'antd';
import type { PaginationProps } from 'antd'
import Loading from "@/components/Core/Loading";


const AsarList = ({ search, setCountPage, current }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["works", search, current],
        queryFn: async () => {
            return await worksGetApi({ search, page: current });
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
            {isLoading && <Loading />}
            {data?.data?.results.map((item: any, i: any) => (
                <tr key={i} className="hover:bg-gray-100 duration-300 cursor-pointer" onClick={() => window.open(item.pdf_file, '_blank')}>
                    <td className="py-3 px-6 border-b border-gray-200 text-xs">{item.title}</td>
                    <td className="py-3 px-6 border-b border-gray-200 text-sm ">{"Alisher Navoiy"}</td>
                    <td className="py-3 px-6 border-b border-gray-200 text-sm">{item.from_year}-{item.to_year} yil</td>
                    <td className="py-3 px-6 border-b border-gray-200 text-sm">
                        <Link href={item.pdf_file} target="_blank">
                            <EyeIcon strokeWidth={1} size={20} className=" mx-auto" />
                        </Link>
                    </td>
                </tr >
            ))}

            {data?.data?.results.length == 0 && (

                <tr >
                    <td className="py-3 px-6 border-b border-gray-200 text-sm">{""}</td>
                </tr >
            )}
        </>
    )

};


const Asarlar = () => {
    const [search, setSearch] = useState("");
    const [countPage, setCountPage] = useState(1);
    const [current, setCurrent] = useState(1);

    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };

    return (
        <div className="bg-image-flower min-h-screen pt-10 md:pt-0 pb-10 relative">
            <div className=" md:hidden block absolute  top-0 left-0">
                <div className=" w-screen text-center relative">
                    <Link href={`/`} className=" hover:scale-105 duration-300 absolute top-0.5 left-2 md:hidden py-1 px-2 rounded-full cursor-pointer text-gray-500 text-base">
                        <MoveLeftIcon className="w-6 h-6" />
                    </Link>

                    <h2 className="text-xl font-semibold">Asarlar</h2>
                </div>
            </div>

            <div className="w-full lg:w-[85vw] mx-auto px-4">
                <div className=" hidden md:block">
                    <Title title="Asarlar" />
                </div>

                <div className=" hidden md:block bg-white shadow-lg rounded-lg pb-5">

                    <div className={` overflow-hidden px-4 pt-6 ${countPage > 9 ? "h-[800px]" : "h-auto"} `}>
                        <div className="flex items-center gap-2 border p-2 rounded-full mb-5 w-80 ">
                            <SearchIcon strokeWidth={1} size={20} />
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Qidiruv" className=" inline-block bg-transparent focus:outline-none text-sm text-gray-500" />
                        </div>
                        <table className="w-full table-fixed">
                            <thead className="">
                                <tr className="bg-gray-100 overflow-hidden text-sm mb-5">
                                    <th className="w-3/5 py-2 px-6 text-left text-gray-600 rounded-tl-full rounded-bl-full">Nomi</th>
                                    <th className="w-1/5 py-2 px-6 text-left text-gray-600">Muallifi</th>
                                    <th className="w-1/5 py-2 px-6 text-left text-gray-600">Sanasi</th>
                                    <th className="w-1/5 py-2 px-6 text-center text-gray-600 rounded-tr-full rounded-br-full">{"Ko‘rish"}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white ">
                                <AsarList search={search} setCountPage={setCountPage} current={current} />
                            </tbody>
                        </table>
                    </div>
                    <div className={` text-center mt-3 my-2 ${countPage > 9 ? "" : "hidden"} `}>
                        <Pagination current={current} onChange={onChange} showSizeChanger={false} total={countPage} responsive={true} />
                    </div>
                </div>

                <div className="block md:hidden">
                    <div className=" space-y-4">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="py-4 px-3 bg-white rounded-2xl space-y-2 border">
                                <div className="pb-2 text-base font-semibold">{`"Xamsa" - "Hayrat ul-abror" dostoni`}</div>
                                <div className="text-sm">
                                    <div><span className="text-blue-300">Muallifi: </span> Alisher Navoiy</div>
                                    <div className="pb-5"><span className="text-blue-300">Yaratilgan vaqti: </span> 1483-yil</div>
                                </div>
                                <button className="bg-blue-100 text-gray-500 w-full font-semibold rounded-full text-sm md:text-sm py-2.5 ">{"Ko‘rish"}</button>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </div>

    )
}

export default Asarlar;