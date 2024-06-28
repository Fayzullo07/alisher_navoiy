"use client"
import { questionsGetApi } from "@/api/AdminRequest";
import Container from "@/components/Core/Container";
import Loading from "@/components/Core/Loading";
import Title from "@/components/Core/Title";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRightIcon, MoveLeftIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

const AboutPage = () => {
    const locale = useLocale();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["about"],
        queryFn: async () => {
            return await questionsGetApi();
        }
    });

    // if (isLoading) return <Loading />;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    return (
        <>
            {data?.data?.results.map((item: any, i: number) => (
                <Link key={i} href={`/${locale}/about/${item.id}`} className="hover:scale-105 duration-300">
                    <div className="p-5 bg-blue-100 rounded-3xl shadow-lg">

                        <div className="flex justify-between items-center pb-1.5">
                            <div className="text-lg font-semibold">{item.question}?</div>
                            <div className="text-base rounded-full p-1 text-center bg-white">
                                <ArrowUpRightIcon strokeWidth={1} className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="text-sm font-normal text-gray-500 ">
                            {item.short_answer.length > 100 ? item.short_answer.substring(0, 100) + "..." : item.short_answer}
                        </div>
                    </div>
                </Link>
            ))}
        </>
    )
}


const About = () => {
    const locale = useLocale();
    return (
        <div className="pb-5 min-h-screen bg-image-flower pt-20">
            <Container>
                <div className="flex items-center justify-center">
                    <Title title="Korpus haqida" />
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AboutPage />
                </div>
            </Container>
        </div>

    )
}

export default About;