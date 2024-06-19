"use client"
import { questionsGetApi } from "@/api/AdminRequest";
import Container from "@/components/Core/Container";
import Title from "@/components/Core/Title";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRightIcon } from "lucide-react";
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

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    return (
        <>
            {data?.data?.results.map((item: any, i: number) => (
                <div key={i} className="p-5 bg-pink-100 rounded-3xl shadow-lg">
                    <div className="flex justify-between items-center pb-1.5">
                        <div className="text-lg font-semibold">{item.question}?</div>
                        <Link href={`/${locale}/about/${item.id}`} className="text-base rounded-full p-1 text-center bg-white">
                            <ArrowUpRightIcon strokeWidth={1} className="w-5 h-5" />
                        </Link>
                    </div>
                    <div className="text-sm font-normal text-gray-500 ">
                        {item.short_answer.length > 100 ? item.short_answer.substring(0, 100) + "..." : item.short_answer}
                    </div>
                </div>
            ))}
        </>
    )
}


const About = () => {
    return (
        <div className="pb-5 min-h-screen bg-image-flower">
            <Container>

                <Title title="Korpus haqida" />
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AboutPage />
                </div>
            </Container>
        </div>

    )
}

export default About;