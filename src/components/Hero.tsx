'use client'
import Image from "next/image";
import Container from "./Core/Container";

const Hero = () => {
    return (
        <div>
            {/* Desktop */}
            <div className={` img-background-horizontal h-[30vh] md:h-screen md:mt-0 mt-10  pt-20 border-2 overflow-hidden`}>
                <Container>
                    <div className=" flex justify-center items-center">
                        <div className="flex flex-col justify-between h-full  items-center pt-20 absolute bottom-0 ">
                            <div className="font-bold text-white font-serif md:pt-20">
                                <h1 className="md:text-9xl text-4xl" data-aos="fade-up" data-aos-delay="100">Alisher Navoiy</h1>
                                <p className=" text-center md:text-xl text-base font-semibold" data-aos="fade-up" data-aos-delay="200">Mualliflik korpusi</p>
                            </div>
                            <div className=" hidden md:flex justify-center items-center w-[50%]" data-aos="fade-up" data-aos-delay="300">
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