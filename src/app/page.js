"use client"

import dynamic from "next/dynamic";

const FinlandMap = dynamic(() => import("../components/finland-map.js"), {
    ssr: false,
})
export default function Home() {


    return (
        <div className="h-screen">
            <FinlandMap />
        </div>
    );
}
