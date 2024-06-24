import { devonsGetApi, genresGetOneAPI } from "@/api/AdminRequest";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import Modal from "@/components/Core/Modal";
import Loading from "../Core/Loading";

const Gazal = ({ gazal_id, setGazal_id, current, setCurrent, firstFilter }) => {

    const { data: dataNextPrev } = useQuery({
        queryKey: ["gazal_next_prev", current],
        queryFn: async () => {
            return await devonsGetApi({ page: current });
        }
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["genres_id", gazal_id.id, setGazal_id],
        queryFn: async () => {
            return await genresGetOneAPI({ id: gazal_id.id });
        }
    });


    // if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    function getExplanation(searchWord) {
        searchWord = searchWord.replace(/[.,?!"]/g, '');
        const result = data.data.word_explanations.find(entry => entry.word === searchWord);
        return result ? result.explanation : 'Kiritilmagan';
    }

    function getNextPrev(number) {
        const result = dataNextPrev.data.main.results.find(entry => entry.number == number);
        setGazal_id(result);

    }
    return (
        <>
            {/* G'azallar */}
            {firstFilter.id == 0 && (
                <div className="h-fit bg-white rounded-2xl text-center py-2 " >
                    <div className="text-xl font-semibold py-1 pb-2">{data?.data?.genre_detail_number} - {data?.data?.genre_name}</div>
                    <div>
                        <ScrollArea className="h-[400px] md:h-[420px]">
                            {isLoading && <Loading />}
                            {!isLoading && (
                                <div className="text-sm  leading-7 space-y-1 overflow-auto">
                                    {data?.data?.lines.map((item: any, i: any) =>
                                        <div key={i}>
                                            {item.text.split(" ").map((item_in: any, i: any) => (
                                                <HoverCard key={i} >
                                                    <HoverCardTrigger>
                                                        <span className="text-xs md:text-sm hover:bg-yellow-300 px-[1px] md:px-0.5  duration-300 py-1 rounded-full cursor-pointer">{item_in}</span>
                                                    </HoverCardTrigger>
                                                    <HoverCardContent className="p-2 px-4 w-fit">
                                                        <div>
                                                            <p className="text-xs">Semantik izoh:</p>
                                                            <span>{getExplanation(item_in)}</span>
                                                        </div>
                                                    </HoverCardContent>
                                                </HoverCard>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </ScrollArea>
                        <div className="flex justify-between items-center gap-2 p-4 w-full  md:w-[80%] mx-auto">
                            <div>
                                {data?.data?.genre_detail_number - ((current - 1) * 10) != 1 && (
                                    <div className="p-1.5 border rounded-full cursor-pointer hover:scale-110 duration-300" onClick={() => getNextPrev(data?.data?.genre_detail_number > 1 ? data?.data?.genre_detail_number - 1 : 1)}>
                                        <MoveLeftIcon className="w-4 h-4" />
                                    </div>
                                )}
                            </div>
                            {!isLoading && (

                                <div className="flex items-center gap-2 ">
                                    <Modal title="Metama’lumot" button={
                                        <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{"Batafsil"}</div>
                                    } >

                                        {Object.entries(data?.data?.metadata).map(([key, value]) => (
                                            <div key={key}>
                                                {/* Desktop */}
                                                <div className="hidden md:block">

                                                    <div className="grid grid-cols-2 gap-2 items-center border-b py-1 text-black">
                                                        <div className="text-start">{key}</div>
                                                        <div className="text-end">{value.toString()}</div>
                                                    </div>
                                                </div>
                                                {/* Mobile */}
                                                <div className="block md:hidden">
                                                    <div className=" text-start text-black mb-1 ">
                                                        <span className="text-gray-400">{key}:</span> {value.toString()}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Modal>
                                    <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{"Nasriy bayoni"}</div>
                                </div>
                            )}
                            {isLoading && (
                                <div className="flex items-center gap-2 ">
                                    <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{"Batafsil"}</div>
                                    <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{"Nasriy bayoni"}</div>
                                </div>
                            )}
                            <div>
                                {data?.data?.genre_detail_number < current * 10 && data?.data?.genre_detail_number != dataNextPrev?.data?.main?.count && (
                                    <div className="p-1.5 border rounded-full cursor-pointer hover:scale-110 duration-300" onClick={() => getNextPrev(data?.data?.genre_detail_number + 1)}>
                                        <MoveRightIcon className="w-4 h-4" />
                                    </div>
                                )}
                                {isLoading && (
                                    <div className="p-1.5 border rounded-full cursor-pointer hover:scale-110 duration-300">
                                        <MoveRightIcon className="w-4 h-4" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Ibora and Maqol and She'riy San'at */}
            {firstFilter.id == 3 || firstFilter.id == 4 || firstFilter.id == 5 && (
                <div className="h-fit bg-white rounded-2xl text-center py-2 " >
                    <div className="text-xl font-semibold py-1 pb-2">{data?.data?.genre_detail_number} - {data?.data?.genre_name}</div>
                    <div>
                        <ScrollArea className="h-[400px] md:h-[420px]">
                            {isLoading && <Loading />}
                            {!isLoading && (
                                <div className="text-sm  leading-7 space-y-1 overflow-auto">
                                    {data?.data?.lines.map((item: any, i: any) =>
                                        <div key={i} className={`${i + 1 == gazal_id.byte * 2 || i + 1 == gazal_id.byte * 2 - 1 ? "bg-yellow-200 w-fit mx-auto rounded-full" : ""} `}>
                                            {item.text.split(" ").map((item_in: any, i: any) => (
                                                <HoverCard key={i} >
                                                    <HoverCardTrigger>
                                                        <span className="text-xs md:text-sm hover:bg-yellow-300 px-[1px] md:px-0.5  duration-300 py-1 rounded-full cursor-pointer">{item_in}</span>
                                                    </HoverCardTrigger>
                                                    <HoverCardContent className="p-2 px-4 w-fit">
                                                        <div>
                                                            <p className="text-xs">Semantik izoh:</p>
                                                            <span>{getExplanation(item_in)}</span>
                                                        </div>
                                                    </HoverCardContent>
                                                </HoverCard>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </ScrollArea>
                        <div className="flex justify-between items-center gap-2 p-4 w-full  md:w-[80%] mx-auto">
                            <div>
                                {data?.data?.genre_detail_number - ((current - 1) * 10) != 1 && (
                                    <div className="p-1.5 border rounded-full cursor-pointer hover:scale-110 duration-300" onClick={() => getNextPrev(data?.data?.genre_detail_number > 1 ? data?.data?.genre_detail_number - 1 : 1)}>
                                        <MoveLeftIcon className="w-4 h-4" />
                                    </div>
                                )}
                            </div>
                            {!isLoading && (

                                <div className="flex items-center gap-2 ">
                                    <Modal title="Metama’lumot" button={
                                        <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{"Batafsil"}</div>
                                    } >

                                        {Object.entries(data?.data?.metadata).map(([key, value]) => (
                                            <div key={key}>
                                                {/* Desktop */}
                                                <div className="hidden md:block">

                                                    <div className="grid grid-cols-2 gap-2 items-center border-b py-1 text-black">
                                                        <div className="text-start">{key}</div>
                                                        <div className="text-end">{value.toString()}</div>
                                                    </div>
                                                </div>
                                                {/* Mobile */}
                                                <div className="block md:hidden">
                                                    <div className=" text-start text-black mb-1 ">
                                                        <span className="text-gray-400">{key}:</span> {value.toString()}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Modal>
                                    <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{"Nasriy bayoni"}</div>
                                </div>
                            )}
                            {isLoading && (
                                <div className="flex items-center gap-2 ">
                                    <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{"Batafsil"}</div>
                                    <div className="px-3 py-1 hover:scale-110 duration-300 border rounded-full cursor-pointer">{"Nasriy bayoni"}</div>
                                </div>
                            )}
                            <div>
                                {data?.data?.genre_detail_number < current * 10 && data?.data?.genre_detail_number != dataNextPrev?.data?.main?.count && (
                                    <div className="p-1.5 border rounded-full cursor-pointer hover:scale-110 duration-300" onClick={() => getNextPrev(data?.data?.genre_detail_number + 1)}>
                                        <MoveRightIcon className="w-4 h-4" />
                                    </div>
                                )}
                                {isLoading && (
                                    <div className="p-1.5 border rounded-full cursor-pointer hover:scale-110 duration-300">
                                        <MoveRightIcon className="w-4 h-4" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Gazal;