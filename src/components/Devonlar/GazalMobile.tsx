import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { XIcon } from "lucide-react";
import Gazal from "./Gazal";

const GazalMobile = ({ gazal_id, children, setGazal_id, current, firstFilter, genre_detail_number, auditory_age__in, text_type_id__in, search }) => {

    return (
        <Drawer>
            <DrawerTrigger className="w-full">
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className=" absolute right-0 top-0">
                    <DrawerClose>
                        <XIcon />
                    </DrawerClose>
                </DrawerHeader>
                <Gazal
                    gazal_id={gazal_id}
                    setGazal_id={setGazal_id}
                    current={current}
                    firstFilter={firstFilter}
                    genre_detail_number={genre_detail_number}
                    auditory_age__in={auditory_age__in}
                    text_type_id__in={text_type_id__in}
                    search={search}
                />
            </DrawerContent>
        </Drawer>

    )
}

export default GazalMobile;