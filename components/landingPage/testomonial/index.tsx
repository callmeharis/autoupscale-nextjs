import React from 'react'
export interface TestomonialProps {
    profileImage?: string
    content?: string
    name?: string
    className?: string
}
export default function Testomonial(props: TestomonialProps) {
    return (
        <>
            <div className={`col-md box-col ${props.className}`} >
                <img src={props.profileImage} alt="client2" className="h-32 w-32 m-auto rounded-full object-cover" />
                <div className="client-card ">
                    <div className="card-body text-center">
                        <p className="card-text">
                            {props.content}
                        </p>
                        <h3 className="text-2xl font-semibold">{props.name}</h3>

                    </div>
                </div>
            </div>

        </>
    )
}
