import Container from "@/components/Core/Container"
import SliderCard from "@/components/SliderCard"
import SliderItem from "@/components/Slidertem"

const Devonlar = () => {
    return (
        <div className="pt-28 bg-slate-100 min-h-screen h-full">
            <Container>

                <div className="py-5">
                    <div className="text-2xl font-medium pb-5">Devonlar</div>
                    <SliderCard />
                </div>
                <div>
                    <div className="text-2xl font-medium pb-5">Ichki qism</div>

                    <SliderItem />

                </div>
                <div className="py-5 pb-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                        <div className="bg-white h-20 rounded-2xl text-center p-2" >
                            <div>Janrlar</div>
                        </div>
                        <div className=" col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
                            <div className="bg-white rounded-2xl text-center p-2" >
                                <div>{"G'azallar"}</div>
                            </div>
                            <div className="bg-white rounded-2xl text-center p-2" >
                                <div>{"1-G'azal"}</div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Devonlar