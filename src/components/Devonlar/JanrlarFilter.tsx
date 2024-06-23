import { devonsGetApi } from "@/api/AdminRequest";
import Title from "@/components/Core/Title";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon, ChevronUpIcon, CircleIcon, ScrollTextIcon } from "lucide-react";
import { useEffect, useState } from "react";

const JanrlarFilter = ({ search, devan_id, genre_id, firstFilter, setFirstFilter, firstFilterChild, setFirstFilterChild }) => {
    const [secondsData, setSecondsData] = useState([]);
    const [poetic_artsData, setPoeticArtsData] = useState([]);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["janrlar_filter", search, devan_id.id, firstFilter.id, firstFilterChild.id],
        queryFn: async () => {
            return await devonsGetApi({ search: search == null ? "" : search, devan_id: devan_id.id, genre_id: genre_id.id, second: firstFilter.id == 0 ? "" : firstFilter.id, poetic_art_id: firstFilterChild.id == 0 ? "" : firstFilterChild.id });
        }
    });

    // if (isLoading) return <h1>Loading...</h1>;
    useEffect(() => {
        if (data && data.data && data.data.seconds) {
            setSecondsData(data.data.seconds);
            setPoeticArtsData(data.data.poetic_arts);
        }
    }, [data]);


    useEffect(() => {
        setFirstFilterChild({ id: 0, name: "" })
    }, [firstFilter]);

    if (isError) return <div>Xatolik yuz berdi...</div>;
    return (
        <>
            {/* Desktop */}
            <div className="bg-white h-fit rounded-2xl text-center py-2 px-4 hidden lg:block" >
                <div className="text-xl py-1 pb-2 font-semibold">Janrlar</div>
                <div className=" space-y-2">
                    {genre_id.name == "" ? (
                        <div className="flex h-6 justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">

                        </div>
                    ) : (
                        <div className={`flex justify-between items-center ${firstFilter.id != 0 ? "" : "bg-blue-100"} hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilter({ id: 0, name: "" })}>
                            <div className="flex gap-2 items-center">
                                <ScrollTextIcon strokeWidth={1} className="w-5 h-5" />
                                <div className="text-base">{genre_id?.name}</div>
                            </div>
                            <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">{genre_id?.counts} ta</span>
                        </div>
                    )}
                    {secondsData.map((item: any, i: any) => (
                        <div key={i}>
                            <div className={`flex justify-between items-center ${firstFilter.id == item.id ? "bg-blue-100" : ""} hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilter(item)}>
                                <div className="flex gap-2 items-center">
                                    <ScrollTextIcon strokeWidth={1} className="w-5 h-5" />
                                    <div className="text-sm">{item.name}</div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {i == 4 && (
                                        <>
                                            {firstFilter.id == 5 ? (
                                                <ChevronUpIcon strokeWidth={1} className="w-5 h-5" />
                                            ) : (
                                                <ChevronDownIcon strokeWidth={1} className="w-5 h-5" />
                                            )}
                                        </>
                                    )}
                                    <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">
                                        {item.counts} ta
                                    </span>
                                </div>
                            </div>
                            {4 == i && firstFilter.id == 5 && poetic_artsData.map((itemchild: any, i: any) => (

                                <div key={i} className={`w-[95%] my-1.5 ml-auto flex justify-between items-center ${firstFilterChild.id == itemchild.id ? "bg-blue-100" : ""} hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilterChild(itemchild)}>
                                    <div className="flex gap-2 items-center">
                                        <CircleIcon strokeWidth={3} className="w-3 h-3 text-green-500" />
                                        <div className="text-sm">{itemchild.name}</div>
                                    </div>
                                    <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">{itemchild.counts} ta</span>
                                </div>
                            ))}

                        </div>
                    ))}

                    {/* {isInitialized && Array.from({ length: 4 }).map((_, i) => (
                        <div key={i}>
                            <div className="flex h-6 justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">

                            </div>
                            {i == 3 && Array.from({ length: 4 }).map((_: any, i: any) => (
                                <div key={i} className="w-[80%] h-6 ml-auto flex justify-between items-center my-1.5 bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">
                                </div>
                            ))}

                        </div>
                    ))} */}
                </div>

            </div>

            {/* Mobile */}
            <div className=" rounded-2xl text-start block lg:hidden" >
                <Title title="Janrlar filter" />
                <ScrollArea className="py-2  whitespace-nowrap ">
                    <div className=" flex gap-2 items-center">
                        {genre_id.name == "" ? (
                            <div className="flex h-6 justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">

                            </div>
                        ) : (
                            <div className={`flex justify-between gap-2 items-center ${firstFilter.id != 0 ? "" : "bg-blue-100"} hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilter({ id: 0, name: "" })}>
                                <div className="flex gap-2 items-center">
                                    <ScrollTextIcon strokeWidth={1} className="w-5 h-5" />
                                    <div className="text-base">{genre_id?.name}</div>
                                </div>
                                <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">{genre_id?.counts} ta</span>
                            </div>
                        )}
                        {data?.data?.seconds.map((item: any, i: any) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className={`flex justify-between items-center gap-2 ${firstFilter.id == item.id ? "bg-blue-100" : ""} hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilter(item)}>
                                    <div className="flex gap-2 items-center">
                                        <ScrollTextIcon strokeWidth={1} className="w-5 h-5" />
                                        <div className="text-sm">{item.name}</div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {i == 4 && (
                                            <>
                                                {firstFilter.id == 5 ? (
                                                    <ChevronUpIcon strokeWidth={1} className="w-5 h-5" />
                                                ) : (
                                                    <ChevronDownIcon strokeWidth={1} className="w-5 h-5" />
                                                )}
                                            </>
                                        )}
                                        <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">
                                            {item.counts} ta
                                        </span>
                                    </div>
                                </div>
                                {4 == i && firstFilter.id == 5 && data?.data?.poetic_arts.map((item: any, i: any) => (

                                    <div key={i} className={`w-[80%] space-x-2  ml-auto flex justify-between items-center ${firstFilterChild.id == item.id ? "bg-blue-100" : ""} hover:bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer`} onClick={() => setFirstFilterChild(firstFilterChild.id == 0 && firstFilter.id == 5 ? item : { id: 0, name: "" })}>
                                        <div className="flex gap-2 items-center">
                                            <CircleIcon strokeWidth={1} className="w-3 h-3" />
                                            <div className="text-sm">{item.name}</div>
                                        </div>
                                        <span className="text-[10px] text-green-600 px-2 py-1 rounded-full bg-green-100">{item.counts} ta</span>
                                    </div>
                                ))}

                            </div>
                        ))}

                        {isLoading && Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="flex h-6 w-20 justify-between items-center bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">

                                </div>
                                {i == 3 && Array.from({ length: 4 }).map((item: any, i: any) => (
                                    <div key={i} className="flex h-6 w-16 ml-auto  justify-between items-center my-1.5 bg-blue-100 rounded-full duration-300 py-1 px-2 cursor-pointer">
                                    </div>
                                ))}

                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>

            </div>
        </>
    )
}
export default JanrlarFilter;