"use client"
import Container from "@/components/Core/Container";
import Title from "@/components/Core/Title";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DevonList from "@/components/Devonlar/DevonList";
import GenreList from "@/components/Devonlar/GenreList";
import JanrlarFilter from "@/components/Devonlar/JanrlarFilter";
import GazalList from "@/components/Devonlar/GazalList";
import Gazal from "@/components/Devonlar/Gazal";

const Devonlar = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('search') ?? "";
    const [genre_id, setGenreId] = useState({ id: "", name: "", counts: 0 });
    const [devan_id, setDevan_id] = useState({ id: "", name: "" });
    const [gazal_id, setGazal_id] = useState({ id: "", name: "" });

    const [current, setCurrent] = useState(1);

    const [auditory_age__in, setAuditory_age__in] = useState("");
    const [text_type_id__in, setText_type_id__in] = useState("");

    // Filter Janrlar
    const [firstFilter, setFirstFilter] = useState({ id: 0, name: "" });
    const [firstFilterChild, setFirstFilterChild] = useState({ id: 0, name: "" });

    useEffect(() => {
        setGazal_id({ id: "", name: "" });
    }, [devan_id, genre_id, search, firstFilter, firstFilterChild]);

    return (
        <div className="pb-5 bg-image-flower min-h-screen">
            <Container>
                {/* Devonlar */}
                <div>
                    <Title title="Devonlar" />
                    <DevonList devan_id={devan_id} setDevan_id={setDevan_id} />
                </div>

                {/* Janrlar */}
                <div>
                    <Title title="Janrlar" />
                    <GenreList
                        search={search}
                        devan_id={devan_id}
                        genre_id={genre_id}
                        setGenreId={setGenreId}
                        firstFilter={firstFilter}
                        auditory_age__in={auditory_age__in}
                        text_type_id__in={text_type_id__in}
                    />
                </div>


                {/* Filter */}
                <div className="py-5">
                    <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-5 gap-3">

                        {/* Filter 1 */}
                        <JanrlarFilter
                            search={search}
                            devan_id={devan_id}
                            genre_id={genre_id}
                            // Filter
                            firstFilter={firstFilter}
                            setFirstFilter={setFirstFilter}
                            firstFilterChild={firstFilterChild}
                            setFirstFilterChild={setFirstFilterChild}
                        />

                        {/* Filter 2 */}
                        <div className=" md:col-span-4 grid grid-cols-1  lg:grid-cols-2  gap-4">
                            {/* Filter 2.2 */}
                            <GazalList
                                search={search}
                                devan_id={devan_id}
                                genre_id={genre_id}
                                gazal_id={gazal_id}
                                setGazal_id={setGazal_id}

                                // Filter
                                firstFilter={firstFilter}
                                firstFilterChild={firstFilterChild}

                                current={current}
                                setCurrent={setCurrent}
                                auditory_age__in={auditory_age__in}
                                setAuditory_age__in={setAuditory_age__in}
                                text_type_id__in={text_type_id__in}
                                setText_type_id__in={setText_type_id__in}
                            />

                            {/* Deteil */}
                            <div className="hidden lg:block">
                                {gazal_id.id && <Gazal
                                    gazal_id={gazal_id}
                                    setGazal_id={setGazal_id}
                                    current={current}
                                    setCurrent={setCurrent}
                                    firstFilter={firstFilter}
                                />}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Devonlar