import { FaCarSide, FaTachometerAlt } from 'react-icons/fa'
import { ReactElement, useState } from "react";
import { AiOutlineUp, AiFillCar, AiFillCheckCircle } from 'react-icons/ai'
import { FaqAccordion } from "@/components/landingPage/faq-accordion";
import { accordionData } from "@/utils/options/faq";
import FormComponent from "@/components/landingPage/form";
import FullLayout from "@/components/layouts/public/full-layout";
import { useEffectAsync } from '@/utils/react';
import PaymentApi from './api/payment';
import { Calendar2EventFill, Search, WalletFill } from 'react-bootstrap-icons';
import { About } from '@/components/landingPage/about';
import Image from 'next/image';
import HeroSection from "../public/hero-section.png";
import CarIcon from "../public/car-icon.png";
import BaseInput from '@/components/forms/base-input';
import Link from 'next/link';
import Services from '@/components/landingPage/services';
import { Row } from 'react-bootstrap';
import Testomonial from '@/components/landingPage/testomonial';

export default function Home() {
	const paymentApi = new PaymentApi();
	const [open, setOpen] = useState(false);
	const [payments, setPayments] = useState([]);
	const toggle = (index) => {
		if (open === index) {
			return setOpen(null);
		}
		setOpen(index);
	};
	useEffectAsync(async () => {
		try {
			const data = await paymentApi.getPayment();
			setPayments(data)
			console.log(data, 'data==');

		} catch (error) {
		}
	}, [])
	return (
		<>
			<section
				id="hero-section"
				className="flex flex-col justify-end mt-10 scroll-smooth md:scroll-auto "
			>
				<div className="container">
					<div className="md:flex items-center justify-center">
						<div className="hero-content pr-15 text-3xl lg:pr-60">
							<h1 className="text-4xl font-bold">
								What is car rental?
							</h1>
							<p className="lead my-2">
								Daily car rental is a type of rental in which clients pay a fixed price per day. If
								they make a lot of trips, daily car rental will be much more profitable than
								getting a taxi or going for car sharing
							</p>
							<div className="subscribe-form form-control p-0 relative md:flex justify-between items-center border-none !border-0 shadow-md">
								<BaseInput className="outline-none border-none w-full round-md" type="email" placeholder="Enter email address" />
								<button className="absolute h-full border-none py-2 px-2 right-0 bg-custom-btn text-white transition-all duration-300 ease-in-out">Subscribe Now</button>
							</div>
						</div>
						<Image src={HeroSection}
							alt="Car with man"
							className="img-fluid w-50 d-none d-sm-block "
						/>
					</div>
				</div>
			</section>
			<Link href={'/'} className=" to-top flex justify-center items-center fixed right-5 bottom-5 h-10 w-10 text-center rounded-full text-white bg-black transition-colors duration-300 hover:bg-red-600 hover:text-white">
				<AiOutlineUp />
			</Link>
			<div id="services" className="content-section pt-5 flex flex-col items-center">
				<h6 className="text-custom-btn text-lg">SERVICES</h6>
				<h2 className="text-center text-lg font-semibold">
					To successfully run such a business, you need Auto Upscale –  <br /> software for
					managing rental processes, orders and cars
				</h2>
				<Image src={CarIcon} alt="car icon" />
			</div>
			<section className="p-5">
				<div className="container">
					<Row className='text-center g-4'>
						<Services
							image='https://genial-react.envytheme.com/images/car-services1.jpg'
							title='Online payments'
							discription='	Enjoy the benefits of online payments.
						Create deposits, payments, make refunds within several minutes. Make
						money transfers between employees.'
						/>
						<Services
							image='https://genial-react.envytheme.com/images/car-services2.jpg'
							title='Time management'
							discription='Do not waste time maintaining lists
							and tables in Excel. Discover convenient and efficient task planners to reach
							your business goals faster.'
						/>
						<Services
							image='https://genial-react.envytheme.com/images/car-services3.jpg'
							title='Analytics and reporting'
							discription='Receive simple yet detailed
							reports on your business to track its performance. Analyze the number of
							deals by manager, client and vehicle.'
						/>
					</Row>
					<Row className='text-center g-4'>
						<Services
							title='Digital signature'
							discription='Give clients and employees the ability to sign documents remotely, without visiting the office. Make your service more modern and secure'
							image='https://genial-react.envytheme.com/images/car-services4.jpg' />
						<Services
							title='Automation'
							discription='Automate operational tasks and manage orders
							even easier and faster. Set aside time for more important things. Reduce
							errors and thwarted deals'
							image='https://genial-react.envytheme.com/images/car-services5.jpg' />
						<Services
							title='Database'
							discription='Keep all important information in one place – customer
							contact details, vehicles, orders, payments, documents and order history.
							Access data from any device.'
							image='https://genial-react.envytheme.com/images/car-services6.jpg' />
					</Row>
				</div>
			</section>
			<div id="about-section" className="bg-blue-50 py-10">
				<div className="container">
					<div className="content-section flex flex-col items-center">
						<h6 className="text-md text-custom-btn font-semibold">ABOUT</h6>
						<h2 className="text-center text-3xl font-bold my-2">How to optimize your car rental business.</h2>
						<Image src={CarIcon} alt="car icon" />
					</div>
					<div className="row text-center g-4 py-5">
						<About title='Registration in the Auto Upscale system' counter='01' />
						<About title='Setting up and filling in data' counter='02' />
						<About title='The payment system linking' counter='03' />
					</div>
					<div className="row">
						<About title='Adding cars to the system' counter='04' />
						<About title='Getting started with orders' counter='05' />
						<About title='Integration with site API' counter='06' />

					</div>
				</div>
			</div>
			<section
				id="features-section"
				className="text-dark p-5 text-center text-sm-start"
			>
				<div className="container">
					<div className="md:flex items-center justify-between">
						<div className="hero-content">
							<span className="text-custom-btn font-semibold text-md text-xl">Our Features</span>
							<h2 className="text-3xl font-bold w-10/12 my-2">We Provide The Solutions To Grow Your Business</h2>
							<p className="lead mb-4">
								Connecting you to the biggest brands in car rental
							</p>
							<div className="features-box flex justify-between">
								<div className="bg-white h-28 w-52 flex justify-center items-center">
									<div className="box flex flex-col items-center">
										<Calendar2EventFill className="text-4xl text-custom-btn my-1" />
										<h3>Flexible Rental</h3>
									</div>
								</div>
								<div className="bg-white h-28 w-52 flex justify-center items-center">
									<div className="box flex flex-col items-center">
										<Search className="text-4xl text-custom-btn my-1" />
										<h3>No Hidden Fees</h3>
									</div>
								</div>
								<div className="bg-white h-28 w-52 flex justify-center items-center">
									<div className="box flex flex-col items-center">
										<WalletFill className="text-4xl text-custom-btn" />
										<h3>Price Match Guarantee</h3>
									</div>
								</div>
							</div>
						</div>
						<Image
							src={HeroSection}
							alt="Car with man"
							className="img-fluid w-50 d-none d-sm-block"
						/>
					</div>
				</div>
			</section>

			<div id="testimonial-section" className="p-10">
				<div className="container">
					<div className="content-section pt-5 mb-5 flex flex-col justify-center items-center">
						<h6 className="font-semibold text-custom-btn text-lg">TESTIMONIALS</h6>
						<h2 className="font-semibold text-3xl my-2">What our Customers Say</h2>
						<Image src={CarIcon} alt="car icon" />
					</div>
					<div className="row text-center g-4">
						<Testomonial
							profileImage='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3MJuQw6i2Uxwb0RpUClBFbs45uV0DFGMYsKMaDj97eQ&s'
							name='John '
							content='Auto Upscale rental software transformed our business operations. It streamlined our inventory management, simplified the reservation process for customers, and provided detailed analytics to optimize our fleet utilization. It has been a game-changer for our company'
						/>
						<Testomonial
							profileImage='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7HR80sdOhuuVrL58qfz75t-b5MU2AdJCBMs59GDFr&s'
							name=' Smith'
							content='This car rental software has significantly enhanced our customer experience. The seamless online booking system and real-time availability updates have made it effortless for our clients to reserve their desired vehicles, resulting in increased customer satisfaction and repeat business.'
						/>
						<Testomonial
							profileImage='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWiaFjCQwSspPlbLZz8-rV42WFYxzHmpB8wE5ePqi45Q&s'
							name='Exander Zverev'
							content='Your car rental software has revolutionized our business operations. The seamless integration, intuitive interface, and comprehensive features have elevated our customer experience and enabled us to efficiently manage our fleet, resulting in increased profitability'
						/>
					</div>
				</div>
			</div>
			<section id="free-trial-section py-5">
				<div className="container my-5 d-flex flex-column justify-content-center align-items-center">
					<img src="https://genial-react.envytheme.com/images/man-and-women.png" alt="man with woman" />
					<h3 className="text-center w-80 text-3xl font-semibold my-2">
						Start your 30 days free <br /> trials today!
					</h3>
					<p className="text-center py-2">
						Get a head start on experiencing our cutting-edge
						features and exceptional service with our 30 days free trial offer. <br />Sign up today and
						explore the full potential of our software without any cost or commitment
					</p>
					<button className="sign-in-btn text-md font-semibold bg-custom-btn rounded-3xl text-white py-2 px-6">Try it free</button>
				</div>
			</section>
			<section className="py-5" id="partners">
				<div className="container">
					<div className="partners mb-5">
						<h3 className="text-center text-2xl font-semibold">trusted by over 2.5 milions company</h3>
					</div>
					<div className="row text-center g-4">
						<div className="col-md box-col">
							<img src="https://genial-react.envytheme.com/images/software-partner2.png" alt="software partner" />
						</div>
						<div className="col-md box-col">
							<img src="https://genial-react.envytheme.com/images/software-partner3.png" alt="software partner" />
						</div>
						<div className="col-md box-col">
							<img src="https://genial-react.envytheme.com/images/software-partner4.png" alt="software partner" />
						</div>
						<div className="col-md box-col">
							<img src="https://genial-react.envytheme.com/images/software-partner5.png" alt="software partner" />
						</div>
						<div className="col-md box-col">
							<img src="https://genial-react.envytheme.com/images/software-partner6.png" alt="software partner" />
						</div>
						<div className="col-md box-col">
							<img src="https://genial-react.envytheme.com/images/software-partner1.png" alt="software partner" />
						</div>
					</div>
				</div>
			</section>
			<div id="pricing">
				<div className="container">
					<div className="content-section flex flex-col items-center">
						<span className="text-md text-custom-btn font-semibold">PRICE</span>
						<h2 className="text-center text-2xl font-semibold my-1">Auto up Scale Monthly Plans</h2>
						<img src="https://genial-react.envytheme.com/images/car-icon.png" alt="car icon" />
					</div>
					<Row className="flex justify-center text-center g-4 p-5">
						{payments?.map((p) => {
							return (

								<div key={p}
									className="col-lg-3 col-md-4 h-full pt-10 bg-white flex flex-col justify-center items-center py-30  mx-5"

								>
									<div>
										<div className="tacho-icon bg-purple-100 h-20 w-20 rounded-full  flex items-center justify-center text-custom-btn  transition duration-500 m-auto ">
											<FaTachometerAlt
												className="pricing-col-icon text-custom-btn text-5xl bg-purple-100  transition duration-500 "

											/>
										</div>
										<div className="space-y-2 my-2">
										<h3 className="text-xl font-semibold">{p?.plan_name}</h3>
										<h3 className="text-md font-semibold mb-3">{p?.sub_line}</h3>
										</div>
										<ul className="pricing-features">
											{p?.features.map((f) => {
												console.log(f, 'features=======')

												return (

													<>
														<li key={f} className="flex justify-center items-center my-2">
															<AiFillCheckCircle className="checked-icon text-custom-btn mx-2" />
															{f}
														</li>
													</>
												)
											})}
										</ul>

										<div className="price flex flex-col text-purple-200 text-xl font-semibold mb-5">
											{!Boolean(p?.id == '4') && (
												<>
													<div className="flex justify-center text-dark items-center mb-3">
													<span className="text-dark my-2 mx-4">Per Month + Tax</span>
													<span className="text-dark">{Boolean(!!p?.price) ? (p?.price) : ('N/A')}</span><span>$</span>
														

													</div>
												</>
											)}
											<Link href={'#contactForm'} className='rounded-3xl py-1 bg-purple-100  transition duration-500 text-white'>
												<button className="">
													{!Boolean(p?.id == '4') ? 'Select' : 'Contact Support'}
												</button>
											</Link>
										</div>
									</div>



								</div>
							)
						})}
					</Row>
				</div>
			</div>

			<section id="faq-section">
				<div className="container">
					<div className="faq-header-content">
						<h2 className="mx-auto mb-0 text-center font-bold text-2xl">Frequently Asked Question</h2>
						<div className="bar relative w-28 h-1 bg-custom-btn rounded-md my-2 mx-auto"></div>
						<p className="text-center">
							A compilation of commonly asked questions and their concise answers to provide
							quick information and solutions to common queries
						</p>
					</div>
					<section className="main-accordion container my-5">
						{accordionData.map((data, index: any) => {
							const { question, answer } = data;
							return (
								<FaqAccordion
									key={index}
									open={index === open}
									question={question}
									answer={answer}
									toggle={() => toggle(index)}
								/>
							);
						})}
					</section>
				</div>
			</section>

			<section
				id="download-app-section"
				className="bg-light text-dark p-5 text-center text-sm-start"
			>
				<div className="container">
					<div className="d-sm-flex align-items-center justify-content-between">
						<div className="hero-content w-1/2">
							<h3 className="text-2xl font-semibold">Download Our Apps Today</h3>
							<p>
								Stay connected and in control with our feature-rich car
								rental apps. Download them now to easily make reservations, view rental details,
								and receive instant notifications, providing you with a seamless and hassle-free
								rental experience
							</p>
						</div>
						<img
							src="https://genial-react.envytheme.com/images/man-and-women.png"
							alt="Car with man"
							className="img-fluid w-50 d-none d-sm-block "
						/>
					</div>

				</div>
			</section>
			<FormComponent />
		</>
	);
}

Home.getLayout = function getLayout(page: ReactElement) {
	return <FullLayout>{page}</FullLayout>;
};