import React from 'react'
export function StatsCard({title , price}) {
    return (
        <div className="bg-white mx-auto max-w-sm shadow rounded-lg overflow-hidden">
            <div className="sm:flex  px-6 py-4">

                <div className=" sm:text-left sm:flex-grow">
                    <div className="mb-2">
                        <p className="text-xl  leading-tight">{title}</p>

                    </div>
                    <div className='text-end'>
                        <div className="text-2xl  rounded-full px-4 py-1   text-purple font-semibold  ">{price}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
