import Title from "@/components/Core/Title";
import { ArrowLeftIcon, MoveLeftIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useNavigation } from "react-day-picker";

const About = () => {
    const locale = useLocale();
    return (
        <div className="bg-image-flower py-10 md:pt-12 relative">
            <div className=" md:hidden block absolute  top-0 left-0">
                <div className=" w-screen text-center relative">
                    <Link href={`/${locale}/about`} className=" absolute top-0 left-2 md:hidden py-1 px-2 rounded-full cursor-pointer text-gray-500 text-base">
                        <MoveLeftIcon className="w-5 h-5" />
                    </Link>

                    <h2 className="text-lg font-semibold">Til korpusi nima ?</h2>
                </div>
            </div>
            <Link href={`/${locale}/about`} className="md:flex absolute top-2 lg:top-12 left-2 lg:left-12 hidden gap-2 bg-white py-1 px-2 rounded-full shadow cursor-pointer text-gray-500 text-base">
                <MoveLeftIcon className="w-6 h-6" />
                Ortga
            </Link>
            <div className="w-full md:w-[80vw] lg:w-[55vw] mx-auto bg-white px-6 pb-6 pt-6 md:pt-0 text-center rounded-xl shadow">
                <div className="hidden md:block">

                    <Title title="Til korpusi nima ?" />
                </div>
                <div className="">
                    <p className="text-sm md:text-lg text-justify text-gray-500">
                        {"Korpus (lotincha “tana” demakdir) elektron holda saqlanadigan til birliklari majmuasi bo‘lib, tilshunoslar uchun turli muammolarni hal etish manbasi, foydalanuvchilar uchun esa lingvodidaktik va ta’limiy ahamiyatga ega tizimdir. Korpus tilshunosligi kompyuter lingvistikasi zamirida shakllangan soha bo‘lib, uning obyekti tabiiy tildagi matnlar, predmeti esa til korpuslari hisoblanadi. Muayyan tilning deyarli barcha tipdagi matnlari bazasidan iborat, turli maqsadlar doirasida lingvistik izohlari bilan qayta ishlangan korpus turi Milliy til korpusi, muayyan maqsadga mo‘ljallangan maxsus korpuslar esa uning xususiy / tarkibiy turi hisoblanadi. Jumladan, aksentologik korpus, parallel korpus, mualliflik korpusi, gazetalar korpusi, ta’limiy korpus, badiiy matnlar korpusi va h.k."}
                    </p>
                    <br />
                    <p className="text-sm md:text-lg text-justify text-gray-500">
                        {"Mualliflik korpusi muayyan bir muallif qalamiga mansub matnlar majmuasidan iborat tizim bo‘lib, asosan, yozuvchining yozish uslubi, asarlaridagi til, matn xususiyatlarini axborot texnologiyalari yordamida semantik tasniflab, tadqiq etishga asoslangan elektron shakdagi ma’lumotlar bazasi sanaladi. Mualliflik korpusining boshqa korpuslardan farqi uning bazasida muayyan bir muallif asarlari jamlanadi, matnlar qayta ishlanadi, grammatik va semantik teglanadi, qidiruv tizimi orqali muallifga tegishli materiallardan zaruriy ma’lumotlar, lingvistik ifodalar aniqlanadi, matnlar asosida statistik ma’lumotlar taqdim etiladi, metama’lumotlar aniq beriladi. Shunday qilib mualliflik korpusi keng imkoniyatli qidiruv tizimiga ega bo‘lib, muallif ijod qilgan barcha tur va janrdagi asarlar qamrab olinadigan, maxsus parametrlar asosida ham qidiruv imkoniyatiga ega, hajmi chegaralanmagan, muallif va uning ijodi bilan bog‘liq manbalarni qulay va tezkor olish mumkin bo‘lgan elektron ma’lumotlar bazasi hisoblanadi"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;