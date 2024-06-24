'use client'
import Image from "next/image";
import Container from "./Core/Container";

const Hero = () => {
    return (
        <div className={` h-screen img-background-horizontal`}>
            <Container>
                <div className="flex justify-center items-center h-screen">
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
            </Container>

        </div>
    )
}

export default Hero;