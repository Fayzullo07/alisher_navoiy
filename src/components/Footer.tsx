"use client"
import Link from "next/link";
import Container from "./Core/Container";
import Image from "next/image";
import { useLocale } from "next-intl";

const Footer = () => {
    const locale = useLocale();

    return (
        <div className={`bg-white py-6 px-2`}>
            <Container>
                {/* <!-- Footer --> */}
                <footer className=" border-b pb-6">
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-8 lg:grid-cols-4 text-black">
                        <div className="hidden md:block">
                            <Image
                                src="/logo_footer.png"
                                width={125}
                                height={0}
                                className=" hover:scale-105 duration-300 cursor-pointer"
                                alt="Image"
                            />
                        </div>
                        <div>
                            <h2 className="text-base md:text-xl font-semibold py-2">Ruknlar</h2>
                            <div className="text-sm md:text-base text-gray-400 space-y-2">
                                <div>
                                    <Link href={`/${locale}/biography`} className="text-maincolor">Tarjimayi hol</Link>
                                </div>
                                <div>
                                    <Link href={`/${locale}/devonlar`} className="text-maincolor">Devonlar</Link>
                                </div>
                                <div>
                                    <Link href={`/${locale}/asarlar`} className="text-maincolor">Asarlar</Link>
                                </div>
                                <div>
                                    <Link href={`/${locale}/tadqiqotlar`} className="text-maincolor">Ilmiy tadqiqotlar</Link>
                                </div>
                                <div>
                                    <Link href={`/${locale}/news`} className="text-maincolor">Yangiliklar</Link>
                                </div>
                                <div>
                                    <Link href={`/${locale}/about`} className="text-maincolor">Korpus haqida</Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-base md:text-xl font-semibold py-2">Janrlar</h2>
                            <div className="text-sm md:text-base text-gray-400 space-y-2">
                                <div>Maqollar</div>
                                <div>Iboralar</div>
                                <div>Arxaizm</div>
                                <div>Istorizm</div>
                                <div>{"She’riy san’at"}</div>
                            </div>
                        </div>
                        <div>
                            <h2 className=" text-base md:text-xl font-semibold py-2">Murojaat uchun</h2>
                            <div className="text-xs md:text-base text-gray-400 space-y-2">
                                <div>
                                    <Link href={"tel:+998 91 333 86 55"} target="_blank" className="text-maincolor">+998 91 333 86 55</Link>
                                </div>
                                <div>Telegram: <Link href="https://t.me/Manzura_Abdurashetovna" target="_blank" className="text-maincolor">Manzura Abdurashidova</Link></div>
                            </div>
                        </div>
                        <div className="block md:hidden mx-auto">
                            <Image
                                src="/logo_footer.png"
                                width={90}
                                height={0}
                                className=" hover:scale-105 duration-300 cursor-pointer"
                                alt="Image"
                            />
                        </div>
                    </div>
                </footer>
                <div className="text-xs md:text-base text-black pt-5">
                    Version 1.0.0 <Link href="http://v1.alishernavoicorpus.uz/" target="_blank" className="text-maincolor">alishernavoicorpus.uz/</Link>
                </div>
            </Container>

        </div>
    )
}

export default Footer;