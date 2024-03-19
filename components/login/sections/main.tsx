import React from "react";
import Image from "next/image";
import  CarSignup  from '../../../public/Car_signup.png'
export function MainSec({ children }) {
	return (
		<section className="container mx-auto w-10/12">
		<div className="">
			<div
				className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
				<div
					className="shrink-1 mb-12 grow-0 basis-auto hidden md:shrink-0 lg:w-6/12 xl:w-6/12 lg:block xl:block">
				
					<Image src={CarSignup} width={550} height={550} alt="Car Sign Up "/>
				</div>

				<div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
					{children}
				</div>
			</div>
		</div>
	</section>
	);
}
