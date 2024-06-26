"use client"
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlignRightIcon, SearchIcon } from "lucide-react";
import LocalSwitcher from "./Core/local-switcher";
import { useLocale, useTranslations } from "next-intl";

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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Navbar = () => {
    const inputRef = useRef(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const searchParam = searchParams.get('search');
    const locale = useLocale();
    const [stickyNav, setStickyNav] = useState(false);
    const [search, setSearch] = useState(searchParam ? searchParam : "");
    const router = useRouter();

    const handleScroll = () => {
        window.pageYOffset >= 50 ? setStickyNav(true) : setStickyNav(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.addEventListener("scroll", handleScroll);
    });

    useEffect(() => {
        router.push(`/${locale}/${pathname.split("/")[2] ? pathname.split("/")[2] : ""}`);
        setSearch("");
    }, []);
    const t = useTranslations('Navbar');
    const enterSearch = (e: any) => {
        if (e.key == "Enter") {
            router.push(`/${locale}/devonlar?search=` + e.target.value);
            inputRef.current.blur();
        }
    }
    return (
        <header className={`flex justify-center items-center    z-[100]`}>
            <nav className={`${stickyNav ? "active border-b" : ""} max-w-screen-2xl   fixed ${stickyNav ? "top-0" : "top-0 md:top-6"} duration-300  z-50 2xl:rounded-full flex items-center justify-between gap-2 md:gap-8 w-screen mx-auto px-5 py-1.5 text-lg text-gray-700  bg-white z-[10] `}>

                <Link href={"/"}>
                    <Image
                        src="/logo.png"
                        width={40}
                        height={40}
                        className=" rounded-full object-cover"
                        alt="Logo"
                    />
                </Link>

                <div className="flex items-center gap-2 border p-2 rounded-full flex-1">
                    <SearchIcon strokeWidth={1} size={20} />
                    <input ref={inputRef} value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={enterSearch} type="text" placeholder="Qidiruv ..." className=" flex-grow bg-transparent focus:outline-none text-sm text-gray-500" />
                </div>

                <div className={`hidden w-full lg:flex md:items-center lg:w-auto overflow-auto bg-transparent z-10`}>
                    <ul
                        className="text-sm text-black lg:flex lg:justify-between">
                        {navbar.map((item, i) => (
                            <li key={item.name}>
                                <Link href={`/${locale}${item.slug}`} className={`*:hover:w-full  p-2 font-semibold tracking-wide block ${item.slug == '/' + pathname.split("/")[2] ? "text-maincolor" : "text-black"} hover:text-maincolor duration-300`} >
                                    {t(`${i}`)}
                                    <div className={`duration-1000 h-0.5 bg-maincolor ${item.slug == '/' + pathname.split("/")[2] ? "w-full" : "w-0"}`}></div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center gap-2 z-[9]">
                    <div className="hidden md:block">
                        <LocalSwitcher />
                    </div>

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
                                                        <Link href={`/${locale}${item.slug}`} className={`md:p-3 py-2 flex gap-2 ${item.slug == '/' + pathname.split("/")[2] ? "text-maincolor" : "text-black"} items-center hover:text-maincolor duration-300`}>
                                                            {item.icon}
                                                            <p>
                                                                {t(`${i}`)}
                                                            </p>
                                                        </Link>
                                                    </SheetClose>
                                                </li>
                                            ))}
                                            <div className="block md:hidden text-end w-full">
                                                <LocalSwitcher />
                                            </div>
                                        </ul>
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

            </nav>
        </header>
    )
}

export default Navbar;