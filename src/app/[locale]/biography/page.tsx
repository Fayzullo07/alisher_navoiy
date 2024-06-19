"use client"
import Container from "@/components/Core/Container";
import { biography } from "../../../../data/data";
import { useQuery } from "@tanstack/react-query";
import { biographyGetApi } from "@/api/AdminRequest";

const Biography = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["biography"],
        queryFn: async () => {
            return await biographyGetApi();
        }
    });
    return (
        <div className=" bg-image-flower">
            <div className=" h-[20vh] md:h-[34vh] lg:h-[90vh] relative border" style={{
                backgroundImage: `url(/biography.png)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100vw',
                backgroundPosition: '0% 0%',
                width: '100%',
            }}>
                <div className=" absolute top-0 left-0 w-full h-full bg-black opacity-50 " style={{
                    background: 'linear-gradient(gray, black)',
                }}></div>

                <div className="absolute bottom-5 text-center w-full text-white">
                    <div className="w-[60vw] md:w-[50vw] mx-auto text-start lg:pb-5">
                        <div className="text-sm md:text-2xl lg:text-5xl font-bold">
                            Alisher Navoiy tarjimayi holi,
                            hayoti va ijodi
                        </div>
                        <p className=" text-[10px] md:text-sm lg:text-2xl">
                            1441-yildan 1501-yilgacha hayot kechirgan
                        </p>
                    </div>
                </div>
            </div>
            <Container>
                <div className="py-5">
                    <div
                        className=" whitespace-pre-line text-sm md:text-lg text-justify text-gray-500"
                        style={{ whiteSpace: "pre-line" }}
                        dangerouslySetInnerHTML={{ __html: data?.data?.biography }}
                    />
                </div>
            </Container>
        </div >

    )
}

export default Biography;