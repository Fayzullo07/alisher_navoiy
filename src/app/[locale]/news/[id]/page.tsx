"use client"
import { newsGetOneAPI } from "@/api/AdminRequest";
import Container from "@/components/Core/Container";
import ImagesCarusel from "@/components/Core/ImagesCarusel";
import { useQuery } from "@tanstack/react-query";
import { ClockIcon, MoveLeftIcon, UserIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

const New = () => {
    const locale = useLocale();
    const { id } = useParams();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["news_id", id],
        queryFn: async () => {
            return await newsGetOneAPI({ id });
        }
    });

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <div className="bg-image-flower min-h-screen py-5">
            <div className="mx-auto xl:w-[65vw] lg:w-[85vw] md:w-[95vw]  max-w-full px-4 sm:px-6 lg:px-8">
                <div className=" bg-white px-5  rounded overflow-hidden flex flex-col mx-auto">
                    <div className="flex items-center justify-center py-5 ">
                        <Link href={`/${locale}/news`} className=" hover:scale-105 duration-300 cursor-pointer text-gray-500 text-base">
                            <MoveLeftIcon className="w-6 h-6" />
                        </Link>

                        <h2 className="text-xl font-semibold text-center flex-grow">{data?.data?.title}</h2>
                    </div>

                    <div className="relative">
                        <ImagesCarusel images={[data?.data?.main_image, ...data?.data?.images]} />
                    </div>
                    <div
                        className="text-gray-700 py-5 text-base leading-8"
                        style={{ whiteSpace: "pre-line" }}
                        dangerouslySetInnerHTML={{ __html: data?.data?.content }}></div>

                    <div className="py-5 text-sm font-regular text-gray-900 flex">
                        <span className="mr-3 flex flex-row items-center">
                            <ClockIcon strokeWidth={1} size={18} className=" mx-auto text-indigo-600" />
                            <span className="ml-1">{data?.data?.published_at}</span>
                        </span>
                        <div className=" flex justify-between items-center hover:text-indigo-600">
                            <UserIcon strokeWidth={1} size={18} className=" mx-auto text-indigo-600" />
                            <span className="ml-1">{data?.data?.authors}</span>
                        </div>
                    </div>
                    <hr />

                </div>
            </div>

        </div>
    )
}

export default New;