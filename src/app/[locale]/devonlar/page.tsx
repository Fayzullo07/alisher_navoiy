import Container from "@/components/Core/Container"
import Title from "@/components/Core/Title"
import SliderCard from "@/components/SliderCard"
import SliderItem from "@/components/Slidertem"

const Devonlar = () => {
    return (
        <div className="pb-5 bg-image-flower ">
            <Container>

                <div>
                    <Title title="Devonlar" />
                    <SliderCard />
                </div>

                <div>
                    <Title title="Devon tarkibi" />
                    <SliderItem />
                </div>

                <div className="py-5">
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