import React from 'react'
import { VscGear } from "react-icons/vsc";
export function BaseLoaderIcon() {
    return (
        <>
            <div className="flex text-white items-center justify-center space-x-3">
                <VscGear className='text-md animate-spin'/>
            </div>

        </>
    )
}
