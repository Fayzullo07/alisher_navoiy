import { ArrowUpRightIcon } from "lucide-react";
import Container from "./Core/Container";
import Title from "./Core/Title";
import Hero from "./Hero";
import SliderCard from "./SliderCard";
import Image from "next/image";

const Home = () => {
    const data = [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
    ]
    return (
        <>
            <Hero />
            <div className="bg-image-flower">

                <Container>
                    <div className="my-5">

                        <Title title="Devonlar" />

                        <SliderCard isTrue={false} />
                    </div>

                    <div className="my-5">
                        <Title title="Korpus haqida" />
                        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {data.map((item, i) => (
                                <div key={i} className="p-4 bg-pink-100 rounded-3xl shadow-lg">
                                    <div className="flex justify-between items-center pb-1.5">
                                        <div className="text-base font-semibold">Til korpusi nima?</div>
                                        <div className="text-base rounded-full p-1 text-center bg-white">
                                            <ArrowUpRightIcon strokeWidth={1} size={16} />
                                        </div>
                                    </div>
                                    <div className="text-sm font-normal text-gray-500">
                                        Tilshunoslar uchun turli muammolarni
                                        hal etish manbasi, foydalanuvchilar
                                        uchun esa...
                                    </div>
                                </div>
                            ))}
                            <div className="text-center block md:hidden">

                                <div className=" inline-block text-xs text-center bg-white rounded-2xl border px-2 py-1">{"Ko‘proq ko’rish"}</div>
                            </div>
                        </div>
                    </div>

                    <div className="py-5 pb-10">
                        <Title title="Alisher Navoiy biografiyasi" />
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 bg-white p-4 md:p-6 shadow-lg rounded-3xl relative">
                            <div className=" overflow-hidden rounded-xl">
                                <Image
                                    src={"/home_alisher_navoiy.png"}
                                    width={350}
                                    height={0}
                                    className="transition hover:scale-105 duration-300 shadow-xl rounded-xl"
                                    sizes="100vw" style={{ width: '100%', height: 'auto' }}
                                    alt="Image"
                                />
                            </div>
                            <div className=" text-sm md:text-base font-normal text-gray-500 md:pb-4">
                                {`Alisher Navoiy (1441-1501) - buyuk shoir va mutafakkir, davlat arbobi. To‘liq ismi – Nizomiddin Mir Alisher. “Navoiy” taxallusi ostida chig‘atoy (eski o‘zbek tili) hamda fors tilida “Foniy” taxallusi bilan ijod qilgan. Navoiy yoshligidan Xurosonning bo‘lajak hukmdori Husayn
                                Boyqaro bilan (humronlik davri:1469-1506 - yillar) do‘st bo‘lgan. 7-8 yoshidan
                                she’rlar yozishni boshlagan. Navoiyning zamondoshi bo‘lmish tarixchi
                                Xondamir qoldirgan ma’lumotlarga ko‘ra, mashhur o‘zbek shoiri
                                Lutfiy (1369-1465) keksaygan chog‘larida yosh Alisher bilan
                                ko‘rishadi va uning she’riy iqtidorini yuqori baholaydi.`}
                            </div>
                            <div className=" text-blue-500 text-base font-semibold text-center cursor-pointer relative sm:absolute sm:bottom-5 sm:right-5">{"Ko‘proq o‘qish..."}</div>
                        </div>
                    </div>
                </Container>
            </div>
        </>

    )
}

export default Home;