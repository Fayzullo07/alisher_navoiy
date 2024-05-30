'use client'
import Image from "next/image";
import Container from "./Core/Container";


const Hero = () => {
    return (
        <div className={` h-screen img-background-horizontal`}>
            <Container>
                <div className="flex justify-center items-center h-screen">
                    <div className="font-bold text-9xl text-white font-serif">
                        <h1>Alisher</h1>
                        <h1>Navoiy</h1>
                    </div>
                </div>
            </Container>

        </div>
    )
}

export default Hero;