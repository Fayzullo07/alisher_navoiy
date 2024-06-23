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

const GazalMobile = ({ item, children, setGazal_id, current, setCurrent }) => {

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
                    id={item}
                    setGazal_id={setGazal_id}
                    current={current}
                    setCurrent={setCurrent}
                />
                <DrawerFooter>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}

export default GazalMobile;