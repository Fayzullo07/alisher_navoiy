"use client"
import { questionGetOneAPI } from "@/api/AdminRequest";
import Title from "@/components/Core/Title";
import { useQuery } from "@tanstack/react-query";
import { MoveLeftIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

const About = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const locale = useLocale();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["question_id", id],
        queryFn: async () => {
            return await questionGetOneAPI({ id });
        }
    });

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    return (
        <div className="bg-image-flower min-h-screen ">
            <div className="w-[95vw] md:w-[80vw] lg:w-[55vw] mx-auto flex items-center justify-center py-5 ">
                <Link href={`/${locale}/about`} className=" hover:scale-105 duration-300 cursor-pointer text-gray-500 text-base">
                    <MoveLeftIcon className="w-6 h-6" />
                </Link>

                <h2 className="text-xl font-semibold text-center flex-grow">{data?.data?.question + " ?"}</h2>
            </div>
            
            <div className="w-full md:w-[80vw] lg:w-[55vw] mx-auto bg-white px-6 pb-6 pt-6 md:pt-0 text-center rounded-xl shadow">
                <div className="hidden md:block">
                    <Title title={data?.data?.question + " ?"} />
                </div>
                <div className="">
                    <div

                        className="text-sm md:text-base text-justify text-gray-500"
                        style={{ whiteSpace: "pre-line" }}
                        dangerouslySetInnerHTML={{ __html: data?.data?.answer }}
                    />

                </div>
            </div>
        </div>
    )
}

export default About;