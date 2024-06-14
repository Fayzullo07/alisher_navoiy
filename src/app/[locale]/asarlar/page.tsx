import Title from "@/components/Core/Title";
import { EyeIcon, MoveLeftIcon, SearchIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

const Asarlar = () => {
    const locale = useLocale();
    return (
        <div className="bg-image-flower pt-10 md:pt-0 pb-10 relative">
            <div className=" md:hidden block absolute  top-0 left-0">
                <div className=" w-screen text-center relative">
                    <Link href={`/${locale}/about`} className=" hover:scale-105 duration-300 absolute top-0.5 left-2 md:hidden py-1 px-2 rounded-full cursor-pointer text-gray-500 text-base">
                        <MoveLeftIcon className="w-6 h-6" />
                    </Link>

                    <h2 className="text-xl font-semibold">Asarlar</h2>
                </div>
            </div>

            <div className="w-full lg:w-[75vw] mx-auto px-4">
                <div className=" hidden md:block">

                    <Title title="Asarlar" />
                </div>

                <div className=" hidden md:block">

                    <div className="shadow-lg rounded-lg overflow-hidden px-4 bg-white pt-6 ">
                        <div className="flex items-center gap-2 border p-2 rounded-full mb-5 w-60 ">
                            <SearchIcon strokeWidth={1} size={20} />
                            <input type="search" placeholder="Qidiruv" className=" inline-block bg-transparent focus:outline-none text-sm text-gray-500" />
                        </div>
                        <table className="w-full table-fixed">
                            <thead className=" rounded-full overflow-hidden">
                                <tr className="bg-gray-100 rounded-full overflow-hidden text-sm">
                                    <th className="w-3/4 py-2 px-6 text-left text-gray-600 rounded-tl-full rounded-bl-full">Nomi</th>
                                    <th className="w-1/4 py-2 px-6 text-left text-gray-600">Muallifi</th>
                                    <th className="w-1/4 py-2 px-6 text-left text-gray-600">Sanasi</th>
                                    <th className="w-1/4 py-2 px-6 text-center text-gray-600 rounded-tr-full rounded-br-full">{"Ko‘rish"}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <tr key={i}>
                                        <td className="py-3 px-6 border-b border-gray-200">{`"Xamsa" - "Hayrat ul-abror" dostoni`}</td>
                                        <td className="py-3 px-6 border-b border-gray-200 ">Alisher Navoiy</td>
                                        <td className="py-3 px-6 border-b border-gray-200">1483-yil</td>
                                        <td className="py-3 px-6 border-b border-gray-200">
                                            <EyeIcon strokeWidth={1} size={20} className=" mx-auto" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <div className=" space-y-2">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="p-3 bg-white rounded-2xl space-y-2 border">
                                <div className="pb-2 text-base font-semibold">{`"Xamsa" - "Hayrat ul-abror" dostoni`}</div>
                                <div className="text-sm">
                                    <div><span className="text-gray-400">Muallifi: </span> Alisher Navoiy</div>
                                    <div className="pb-5"><span className="text-gray-400">Yaratilgan vaqti: </span> 1483-yil</div>
                                </div>
                                <button className="bg-blue-50 w-full rounded-lg text-xs md:text-sm py-2 ">Batafsil</button>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </div>

    )
}

export default Asarlar;