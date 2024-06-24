'use client'
import Image from "next/image";
import Container from "./Core/Container";

const Hero = () => {
    return (
        <div>
            {/* Desktop */}
            <div className=" hidden md:block relative h-screen w-full overflow-hidden">
                <Image
                    width={0}
                    height={0}
                    src="/Header-bg.gif" // Rasm manzilini to'g'rilang
                    alt="Full Height Image"
                    className="h-full w-auto object-cover"
                />
                <div className=" absolute top-0 h-screen w-full flex items-center justify-center">
                    <div className="font-bold text-9xl text-white font-serif">
                        <div className="absolute bottom-0 left-60 z-10 flex justify-center items-center">
                            <Image
                                src={"/alisher_navoiy1.png"}
                                width={350}
                                height={0}
                                // className="transition hover:scale-110 duration-300 shadow-xl"
                                // sizes="100vw"
                                style={{ width: '100%', height: 'auto' }} // optional
                                alt="Image"
                            />
                        </div>

                    </div>

                </div>
            </div>

            {/* Mobile */}
            <div className=" block md:hidden relative h-screen w-full overflow-hidden">
                <Image
                    src={"/hero_mobile.png"}
                    width={0}
                    height={0}
                    sizes="100vw" style={{ width: '100%', height: 'auto' }}
                    alt="Image"
                />
                <div className=" absolute top-0 h-screen w-full flex items-center justify-center">
                    <div className="font-bold text-9xl text-white font-serif">
                        <div className="absolute bottom-0 left-60 z-10 flex justify-center items-center">

                        </div>

                    </div>

                </div>
            </div>
        </div>


        // <div className={`  img-background-horizontal relative`}>

        //                 <div className="absolute bottom-0 left-60 z-10 flex justify-center items-center">
        //                     <Image
        //                         src={"/alisher_navoiy1.png"}
        //                         width={300}
        //                         height={0}
        //                         // className="transition hover:scale-110 duration-300 shadow-xl"
        //                         // sizes="100vw"
        //                         style={{ width: '100%', height: 'auto' }} // optional
        //                         alt="Image"
        //                     />
        //                 </div>
        //     <Container>
        //         <div className="flex justify-center items-center h-screen">
        //             <div className="font-bold text-9xl text-white font-serif">

        //             </div>
        //         </div>
        //     </Container>

        // </div>
    )
}

export default Hero;