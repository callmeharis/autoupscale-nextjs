import Image from 'next/image'
import React from 'react'
import Emptydata from "../../public/Emptydata.jpg";
import { Button } from 'react-bootstrap';
import Link from 'next/link';
export interface EmptyDataProps {
    title: string
    buttonTitle?: string
    buttonRoute?: string
}
export function EmptyData(props: EmptyDataProps) {
    return (
        <p>
            {/* <Image src={EmptyData} alt="" />  */}
            <div className="text-center flex">
                <Image src={Emptydata} alt='' className='m-auto' width={217} height={300} />
            </div>
            <p className='text-sm text-gray-500 text-center'>{props.title}</p>
            {
                Boolean(props.buttonRoute) ? <Link className='flex justify-center items-center my-3 m-auto' href={props.buttonRoute}>
                    <Button className=' bg-btn-100 '> {props.buttonTitle}</Button>
                </Link> : null
            }
        </p>
    )
}
