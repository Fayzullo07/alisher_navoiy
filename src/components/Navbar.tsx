"use client"
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlignRightIcon, MessageCircleIcon, MessageCircleQuestionIcon, SearchIcon, XIcon } from "lucide-react";
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

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

const Navbar = () => {
    const inputRef = useRef(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const searchParam = searchParams.get('search');
    const locale = useLocale();
    const [isInfo, setIsInfo] = useState(false);
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
        if (pathname.split("/")[2] != "devonlar") {
            setSearch("");
        }
    }, [pathname]);

    useEffect(() => {
        setSearch("");
        router.push(`/${locale}/${pathname.split("/")[2] ? pathname.split("/")[2] : ""}`);
    }, []);

    const t = useTranslations('Navbar');
    const s = useTranslations();

    const enterSearch = (e: any) => {
        if (e.key == "Enter") {
            router.push(`/${locale}/devonlar?search=` + e.target.value);
            inputRef.current.blur();
        }
    }
    return (
        <header className={`flex justify-center items-center    z-[100]`}>
            <nav className={`${stickyNav ? "active border-b" : ""} max-w-screen-2xl   fixed ${stickyNav ? "top-0" : "top-0 md:top-6"} duration-300  z-50 2xl:rounded-full flex items-center justify-between gap-2 md:gap-8 w-screen mx-auto px-5 py-1.5 text-lg text-gray-700  bg-white`} style={{ boxShadow: '0px 10px 20px #00000020' }}>
                <Link href={"/"}>
                    <Image
                        src="/navLogo.svg"
                        width={40}
                        height={40}
                        className=" rounded-full object-cover"
                        alt="Logo"
                    />
                </Link>

                <div className="flex items-center gap-2 border p-2 rounded-full flex-1">
                    <SearchIcon strokeWidth={1} size={20} />
                    <input ref={inputRef} value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={enterSearch} type="text" placeholder={`${s("search")} ...`} className=" flex-grow bg-transparent focus:outline-none text-sm text-gray-500" />
                    <div className=" relative">
                        <div className="cursor-pointer md:hidden block m-0 p-0 h-5 w-5">
                            <Sheet >
                                <SheetTrigger >
                                    <div >
                                        <MessageCircleQuestionIcon strokeWidth={1} size={20} />
                                    </div>
                                </SheetTrigger>
                                <SheetContent side="top">
                                    <SheetHeader>
                                        <SheetDescription className="z-[999]">
                                            <table className="w-full border-collapse border border-blue-500 max-w-xl mt-8 mx-auto">
                                                <thead>
                                                    <tr className="bg-blue-500 text-white">
                                                        <th className="py-2 px-4 text-left w-10">Search operations</th>
                                                        <th className="py-2 px-4 text-left">What id does</th>
                                                        <th className="py-2 px-4 text-left">Example</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="bg-white border-b border-blue-500">
                                                        <td className="py-2 px-4 text-red-500">{`"`}<span className="text-black">bla bla bla</span>{`"`}</td>
                                                        <td className="py-2 px-4">Lorem ipsum dolor sit amet.</td>
                                                        <td className="py-2 px-4">Lorem ipsum dolor sit amet.</td>
                                                    </tr>
                                                    <tr className="bg-white border-b border-blue-500">
                                                        <td className="py-2 px-4 text-red-500"><span className="text-black">bla</span>{`*`}</td>
                                                        <td className="py-2 px-4">Lorem ipsum dolor sit amet.</td>
                                                        <td className="py-2 px-4">Lorem ipsum dolor sit amet.</td>
                                                    </tr>
                                                    <tr className="bg-white border-b border-blue-500">
                                                        <td className="py-2 px-4 text-red-500">{`*`}<span className="text-black">bla</span></td>s
                                                        <td className="py-2 px-4">Lorem ipsum dolor sit amet.</td>
                                                        <td className="py-2 px-4">Lorem ipsum dolor sit amet.</td>
                                                    </tr>

                                                    <tr className="bg-white border-b border-blue-500">
                                                        <td className="py-2 px-4 text-red-500">{`*`}<span className="text-black">bla</span>{`*`}</td>
                                                        <td className="py-2 px-4">Lorem ipsum dolor sit amet.</td>
                                                        <td className="py-2 px-4">Lorem ipsum dolor sit amet.</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>



                        </div>

                        <div className="cursor-pointer md:block hidden" onMouseEnter={() => setIsInfo(true)} onMouseLeave={() => setIsInfo(false)}>
                            <MessageCircleQuestionIcon strokeWidth={1} size={20} />
                        </div>
                        {isInfo && (
                            <div onMouseEnter={() => setIsInfo(true)} onMouseLeave={() => setIsInfo(false)} className="absolute right-0 cursor-pointer w-auto h-auto rounded-lg shadow border bg-white z-50 flex justify-center items-center">
                                <div className="w-max h-full p-2">

                                    <table className="text-base">
                                        <thead>
                                            <tr className="">
                                                <th className="px-2 text-start">Search operations</th>
                                                <th className="px-2">What id does</th>
                                                <th className="px-2">Example</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td className="px-2 text-red-500">{`"`}<span className="text-black">bla bla bla</span>{`"`}</td>
                                                <td className="px-2">Lorem ipsum dolor sit amet.</td>
                                                <td className="px-2">Lorem ipsum dolor sit amet.</td>
                                            </tr>
                                            <tr>
                                                <td className="px-2 text-red-500"><span className="text-black">bla</span>{`*`}</td>
                                                <td className="px-2">Lorem ipsum dolor sit amet.</td>
                                                <td className="px-2">Lorem ipsum dolor sit amet.</td>

                                            </tr>
                                            <tr>
                                                <td className="px-2 text-red-500">{`*`}<span className="text-black">bla</span></td>
                                                <td className="px-2">Lorem ipsum dolor sit amet.</td>
                                                <td className="px-2">Lorem ipsum dolor sit amet.</td>
                                            </tr>
                                            <tr>
                                                <td className="px-2 text-red-500">{`*`}<span className="text-black">bla</span>{`*`}</td>
                                                <td className="px-2">Lorem ipsum dolor sit amet.</td>
                                                <td className="px-2">Lorem ipsum dolor sit amet.</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>)}
                    </div>
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
                                            className="text-base text-gray-700 flex flex-col justify-start items-start z-[999]">
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