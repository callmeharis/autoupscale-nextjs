import React from 'react'
export interface Aboutprops {
    counter?: string,
    title?: string,
}
export function About(props: Aboutprops) {
    return (
        <div className="col-md about-col">
            <div className="card border-none shadow-sm hover:shadow transition duration-500 ease-in-out p-20">
                <div className="card-body text-center">
                    <span className="text-custom-btn text-xl font-semibold">.{props.counter}</span>
                    <h3 className="card-title mb-3 font-semibold text-2xl">{props.title}</h3>
                </div>
            </div>
        </div>
    )
}
