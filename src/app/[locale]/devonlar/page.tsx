import Container from "@/components/Core/Container"
import Title from "@/components/Core/Title"
import SliderCard from "@/components/SliderCard"
import SliderItem from "@/components/Slidertem"
import { MoveLeftIcon, MoveRightIcon, ScrollTextIcon, SearchIcon } from "lucide-react"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

const Devonlar = () => {
    return (
        <div className="pb-5 bg-image-flower ">
            <Container>

                <div>
                    <Title title="Devonlar" />
                    <SliderCard />
                </div>

                <div>
                    <Title title="Devon tarkibi" />
                    <SliderItem />
                </div>

                <div className="py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-3">
                        <div className="bg-white rounded-2xl text-center py-2 px-4" >
                            <div className="text-xl py-1 font-semibold">Janrlar</div>
                            <div className="">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="flex justify-between items-center hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">
                                        <div className="flex gap-2 items-center">
                                            <ScrollTextIcon strokeWidth={1} className="w-5 h-5" />
                                            <div className="text-base">{"G'azallar"}</div>
                                        </div>
                                        <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">630 ta</span>
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div className=" md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            <div className="bg-white rounded-2xl text-center py-2 px-4" >
                                <div className="text-xl font-semibold py-1">{"G'azallar"}</div>
                                <div className="flex items-center gap-2 p-2 rounded-full bg-gray-50 ">
                                    <SearchIcon strokeWidth={1} size={20} />
                                    <input type="search" placeholder="Raqamlar bo‘yicha qidiruv" className=" placeholder:text-xs inline-block bg-transparent focus:outline-none text-sm text-gray-500" />
                                </div>
                                <div className="">
                                    {Array.from({ length: 11 }).map((_, i) => (
                                        <div key={i} className="flex justify-between items-center hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">
                                            <div className="flex gap-1 items-center">
                                                <span>{i + 1}.</span>
                                                <div className="text-sm">{"Ey navbahori orazing subhig'a jonparvar havo"}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-2">
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious href="/" />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="/">1</PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="/">2</PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="/">3</PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationNext href="/" />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>

                                </div>

                            </div>
                            <div className="bg-white rounded-2xl text-center py-2 px-8" >
                                <div className="text-xl font-semibold py-1">{"1-G'azal"}</div>
                                <div>
                                    <p className="text-sm leading-7">
                                        {`Ey navbahori orazing subhig'a jonparvar havo, Andin gulu bulbul topib yuz barg birla ming navo. To'bi-yu shohi sidradur ko'yung giyohi, negakim Ushshoq ashku ohidin har dam topar su-yu havo. Zahri firoqingdin qayu oshiqki bo'ldi talxkom,No'shi visoling yetmasa Iso anga topmas davo. Chun qoziy ul-hojot sen da'voi mahring qilg'ali,Dard-u firoq anduhidin kelturmisham ikki guvo. Qilmay qabul ijodning imkoni yo'q, so'ngra yanaMaqbulini rad aylamak lutfungdin o'lg'aymu ravoZohid, ko'ngulning xilvatin matlub g'ayridin orit Sen sayr qilsang qil kerak ko'nglungga bo'lsa inzivo. Desang Navoiy jon aro mahbub bo'lg'ay jilvagarAvval ko'ngul ko'zgusidin mahv ayla naqshi mosivo.`.split(" ").map((item, i) => (
                                            <HoverCard>
                                                <HoverCardTrigger>
                                                    <span key={i} className="text-sm hover:bg-yellow-300 px-1 duration-300 py-1 rounded-full cursor-pointer">{item} </span>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="p-2 px-4 w-fit">
                                                    <div>
                                                        <p className="text-xs">Semantik izoh:</p>
                                                        <span>{item}</span> - <span>{i} {item}</span>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>


                                        ))}
                                    </p>
                                    <div className="flex justify-between items-center gap-2 pt-2">
                                        <div className="p-1.5 border rounded-full cursor-pointer">
                                            <MoveLeftIcon className="w-4 h-4" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="px-2 py-1 border rounded-full cursor-pointer">{"Batafsil"}</div>
                                            <div className="px-2 py-1 border rounded-full cursor-pointer">{"Nasriy bayoni"}</div>
                                        </div>
                                        <div className="p-1.5 border rounded-full cursor-pointer">
                                            <MoveRightIcon className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Devonlar