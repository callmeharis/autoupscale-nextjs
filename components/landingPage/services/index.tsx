import React from 'react'
export interface ServicesProps {
    image?: string,
    title?: string,
    discription?: string
}
export default function Services(props: ServicesProps) {
    return (
        <>
            <div className="col-md box-col relative mb-4">
                <img className="max-w-full" src={props.image} alt="car services" />
                <div className="card relative bottom-30 mx-auto w-85 border-none rounded-none shadow-md">
                    <div className="card-body text-center">
                        <h3 className="card-title mb-3 text-2xl font-semibold">{props.title}</h3>
                        <p className="card-text">
                            {props.discription}
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}
