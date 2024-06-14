import Container from "@/components/Core/Container";
import Title from "@/components/Core/Title";
import { ArrowUpRightIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

const About = () => {
    const locale = useLocale();
    return (
        <div className="my-5">
            <Container>

                <Title title="Korpus haqida" />
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="p-5 bg-pink-100 rounded-3xl shadow-lg">
                            <div className="flex justify-between items-center pb-1.5">
                                <div className="text-base font-semibold">Til korpusi nima?</div>
                                <Link href={`/${locale}/about/${i}`} className="text-base rounded-full p-1 text-center bg-white">
                                    <ArrowUpRightIcon strokeWidth={1} className="w-5 h-5" />
                                </Link>
                            </div>
                            <div className="text-sm font-normal text-gray-500">
                                Tilshunoslar uchun turli muammolarni
                                hal etish manbasi, foydalanuvchilar
                                uchun esa...
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>

    )
}

export default About;