'use client'
import Image from "next/image";
import Container from "./Core/Container";

const Hero = () => {
    return (
        <div>
            {/* Desktop */}
            <div className={` img-background-horizontal h-[35vh] md:mt-0 mt-10 md:h-screen pt-20`}>
                <Container>
                    <div className=" flex justify-center items-center">
                        <div className="hidden md:block">

                            <div className="flex flex-col justify-between h-full items-center pt-20 absolute bottom-0">
                                <div className="font-bold  text-white font-serif pt-20">
                                    <h1 className="text-9xl">Alisher Navoiy</h1>
                                    <p className=" text-center text-xl">Mualliflik korpusi</p>
                                </div>
                                <div className="flex justify-center items-center w-[50%]">
                                    <Image
                                        src={"/hero_png_1.png"}
                                        width={0}
                                        height={0}
                                        sizes="100vw" style={{ width: '100%', height: 'auto' }}
                                        alt="Image"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>

            </div>

            {/* Mobile */}
            {/* <div className=" block md:hidden relative h-screen w-full overflow-hidden">
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
            </div> */}
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