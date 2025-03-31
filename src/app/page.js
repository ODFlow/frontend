import MapPage from "./map/map"
import dynamic from "next/dynamic"


const FinlandMap = dynamic(() => import("../components/FinlandMap"), {
    ssr: false,
})

export default function Home() {


    return (
        <MapPage/>
    );
}
