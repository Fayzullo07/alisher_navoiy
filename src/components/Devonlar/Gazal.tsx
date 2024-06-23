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

const Gazal = ({ id, setGazal_id }) => {

    const { data: dataNextPrev } = useQuery({
        queryKey: ["gazal_next_prev"],
        queryFn: async () => {
            return await devonsGetApi({});
        }
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["genres_id", id],
        queryFn: async () => {
            return await genresGetOneAPI({ id });
        }
    });

    // if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    function getExplanation(searchWord) {
        const result = data.data.word_explanations.find(entry => entry.word === searchWord);
        return result ? result.explanation : 'Kiritilmagan';
    }

    function getNextPrev(number) {
        const result = dataNextPrev.data.main.results.find(entry => entry.number == number);
        setGazal_id(result);

    }
    return (
        <>
            {isLoading && (
                <div className="h-full  bg-white rounded-2xl  flex justify-center items-center">
                    <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                        <svg className="h-10 w-10 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                            <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                            <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="24"></line>
                            <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                            </line>
                            <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="24"></line>
                            <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                            </line>
                            <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="24"></line>
                            <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                            <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                            </line>
                        </svg>
                    </div>
                </div>
            )}
            
            <div className="h-fit bg-white rounded-2xl text-center py-2 pb-4" >
                <div className="text-xl font-semibold py-1 pb-2">{data?.data?.number} - {data?.data?.genre_name}</div>
                <div>
                    {!isLoading && (
                        <ScrollArea className=" h-[380px] md:h-[430px] border md:border-0">
                            <div className="text-sm  leading-7 space-y-1 overflow-auto">
                                {data?.data?.lines.map((item: any, i: any) =>
                                    <div key={i} className={`${i == 2 || i == 3 ? "bg-yellow-200 w-fit mx-auto rounded-full" : ""} `}>
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
                        </ScrollArea>
                    )}
                    <div className="flex justify-between items-center gap-2 p-4 w-full  md:w-[80%] mx-auto">
                        <div className="p-1.5 border rounded-full cursor-pointer hover:scale-110 duration-300" onClick={() => getNextPrev(data?.data?.number > 1 ? data?.data?.number - 1 : 1)}>
                            <MoveLeftIcon className="w-4 h-4" />
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
                        <div className="p-1.5 border rounded-full cursor-pointer hover:scale-110 duration-300" onClick={() => getNextPrev(data?.data?.number + 1)}>
                            <MoveRightIcon className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Gazal;