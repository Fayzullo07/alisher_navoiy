"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlignRightIcon, SearchIcon } from "lucide-react";
import LocalSwitcher from "./Core/local-switcher";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "./ui/button";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import { navbar } from "../../data/data";
import Image from "next/image";
import Container from "./Core/Container";

const Navbar = () => {
    const locale = useLocale();
    const [stickyNav, setStickyNav] = useState(false);

    const pathname = usePathname();

    const handleScroll = () => {
        window.pageYOffset >= 10 ? setStickyNav(true) : setStickyNav(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.addEventListener("scroll", handleScroll);
    });

    const t = useTranslations('Navbar');

    return (
        <Container >
            <header className="flex justify-center items-center">
                <nav className={`flex items-center justify-between gap-8 w-[80vw] mx-auto fixed rounded-full  px-5 py-1.5 text-lg text-gray-700  top-10 bg-white z-[100]`}>

                    <Link href={"/"}>
                        <Image
                            src="/logo.png"
                            width={40}
                            height={40}
                            className=" rounded-full"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-full flex-1">
                        <SearchIcon strokeWidth={1} size={20} />
                        <input type="text"  placeholder="Qidiruv" className="bg-transparent focus:outline-none text-sm text-gray-500" />
                    </div>
                    <div className={`hidden w-full lg:flex md:items-center lg:w-auto overflow-auto bg-white z-10`}>
                        <ul
                            className="text-sm text-black lg:flex lg:justify-between">
                            {navbar.map((item, i) => (
                                <li key={item.name}>
                                    <Link href={`/${locale}/${item.slug}`} className="*:hover:w-full p-2 font-semibold text-black tracking-wide block hover:text-maincolor duration-300" >
                                        {t(`${i}`)}
                                        <div className="w-0 duration-1000 h-0.5 bg-maincolor"></div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center gap-2 z-[9]">
                        <LocalSwitcher />

                        <div className="h-6 w-6 cursor-pointer lg:hidden block " >
                            <Sheet>
                                <SheetTrigger>
                                    <AlignRightIcon />
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetDescription className="z-[999]">
                                            <ul
                                                className="text-xl text-gray-700 flex flex-col justify-start items-start z-[999]">
                                                {navbar.map((item, i) => (
                                                    <li key={item.name} data-aos="fade-left" data-aos-delay={(i + 1) * 100} data-aos-duration={(i + 1) * 100} >
                                                        <SheetClose asChild>
                                                            <a href={`/${locale}${item.slug}`} className="md:p-3 py-2 flex gap-2 items-center hover:text-maincolor duration-300">
                                                                {item.icon}
                                                                <p>
                                                                    {t(`${i}`)}
                                                                </p>

                                                            </a>
                                                        </SheetClose>
                                                    </li>
                                                ))}
                                                <SheetClose asChild>
                                                    <a href="#contact" className="duration-300 hover:scale-95">
                                                        <Button className="w-full" data-aos="fade-left" data-aos-delay={8 * 100} data-aos-duration={8 * 100} variant="default">{"Bog'lanish"}</Button>
                                                    </a>
                                                </SheetClose>
                                            </ul>
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>

                        </div>
                    </div>

                </nav>
            </header>
        </Container>
    )
}

export default Navbar;