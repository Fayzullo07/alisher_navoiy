import Title from "@/components/Core/Title";
import { EyeIcon, MoveLeftIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

const Tadqiqotlar = () => {
    return (
        <div className="bg-image-flower pt-10 md:pt-0 pb-10 relative">
            <div className=" md:hidden block absolute  top-0 left-0">
                <div className=" w-screen text-center relative">
                    <Link href={`/`} className=" hover:scale-105 duration-300 absolute top-0.5 left-2 md:hidden py-1 px-2 rounded-full cursor-pointer text-gray-500 text-base">
                        <MoveLeftIcon className="w-6 h-6" />
                    </Link>

                    <h2 className="text-xl font-semibold">Ilmiy tadqiqotlar</h2>
                </div>
            </div>

            <div className="w-full lg:w-[85vw] mx-auto px-4">
                <div className=" hidden md:block">

                    <Title title="Ilmiy tadqiqotlar" />
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
                                        <td className="py-3 px-6 border-b border-gray-200 text-sm">{`Alisher Navoiy mualliflik korpusida g‘azallar tahlili, maqollar va iboralarning tadqiqi`}</td>
                                        <td className="py-3 px-6 border-b border-gray-200 text-sm">Abjalova Manzura</td>
                                        <td className="py-3 px-6 border-b border-gray-200 text-sm">06.09.2021</td>
                                        <td className="py-3 px-6 border-b border-gray-200 text-sm">
                                            <EyeIcon strokeWidth={1} size={20} className=" mx-auto" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="block md:hidden">
                    <div className=" space-y-4">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="py-4 px-3 bg-white rounded-2xl space-y-2 border">
                                <div className="pb-2 text-base font-semibold">{`Alisher Navoiy mualliflik korpusida
g‘azallar tahlili, maqollar va iboralarning
tadqiqi`}</div>
                                <div className="text-sm">
                                    <div><span className="text-blue-300">Muallifi: </span> Abjalova Manzura</div>
                                    <div className="pb-5"><span className="text-blue-300">Yaratilgan vaqti: </span>  06.09.2021</div>
                                </div>
                                <button className="bg-blue-100 text-gray-500 w-full font-semibold rounded-full text-sm md:text-sm py-2.5 ">{"Ko‘rish"}</button>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </div>

    )
}

export default Tadqiqotlar;