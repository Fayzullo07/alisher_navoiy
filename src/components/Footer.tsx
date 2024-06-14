"use client"
import Container from "./Core/Container";
import Image from "next/image";

const Footer = () => {

    return (
        <div className={`bg-white  md:py-6`}>
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
                            <h2 className="text-base md:text-xl font-semibold py-2">Runklar</h2>
                            <div className="text-sm md:text-base text-gray-400 space-y-2">
                                <div>Tarjimayi hol</div>
                                <div>Devonlar</div>
                                <div>Asarlar</div>
                                <div>Ilmiy tadqiqotlar</div>
                                <div>Korpus haqida</div>
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
                                <div>+998 91 333 86 55</div>
                                <div>+998 93 159 11 01</div>
                                <div>+998 91 254 50 10</div>
                                <div>sadullayevashahrizoda@gmail.com</div>
                                <div>Telegram: @programmer</div>
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
                    Copyright © 2023 Alisher Navoiy Korpusi. All rights reserved.
                </div>

            </Container>

        </div>
    )
}

export default Footer;