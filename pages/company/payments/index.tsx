import React, { ReactElement, useState } from "react";
import FullLayout from "@/components/layouts/company/full-layout";
import Link from "next/link";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaTachometerAlt } from "react-icons/fa";
import { useEffectAsync } from "@/utils/react";
import PaymentApi from "@/pages/api/payment";
import { Row } from "react-bootstrap";
import { SubscribeEntity } from "@/models/admin/payment/subscribe.entity";
import { useRouter } from "next/router";
import CompanyRoutes from "@/routes/company.route";
export default function Payment() {
	const [payments, setPayments] = useState([]);
	const [addOns, setAddOns] = useState([]);
	const [subscription, setSubscription] = useState<SubscribeEntity>()
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const paymentApi = new PaymentApi();
	const router = useRouter();

	const handleSubscribe = async (plan_id) => {
		if (plan_id == 1 || plan_id == 5) {
			// There will be a separate flow for starter, no payment required in this case.
			router.push(CompanyRoutes.dashboard.index)
		}

		try {
			setIsButtonDisabled(true);
			const data = await paymentApi.subscribe({ plan_id: plan_id });
			setSubscription(data);

			router.push(data.url);

		} catch (error) {
			console.log("error in subscription", error)
			setIsButtonDisabled(false);
		}


	}
	useEffectAsync(async () => {
		try {
			const paymentData = await paymentApi.getPayment();
			setPayments(paymentData)

		} catch (error) {
			console.log("error vehicle", error)
		}
	}, [])
	useEffectAsync(async () => {
		try {
			const addOnsData = await paymentApi.getAddOns();
			setAddOns(addOnsData)

		} catch (error) {
			console.log("error vehicle", error)
		}
	}, [])

	return (
		<div className="">

			<div className="max-w-7xl mx-auto " id="rental-wrapper ">


				<div className="pricing-table-2  py-6 md:py-12">
					<h1 className=" m-6 font-bold text-3xl">Payment Plans</h1>
					<div id="pricing">
						<div className="container">
							<div className="content-section flex flex-col items-center">
								<span className="text-md text-custom-btn font-semibold">PRICE</span>
								<h2 className="text-center text-2xl font-semibold my-1">Auto up Scale Monthly Plans</h2>
								<img src="https://genial-react.envytheme.com/images/car-icon.png" alt="car icon" />
							</div>
							<div className="container mx-auto px-4">

								<div className="pricing-plans lg:flex lg:-mx-4 mt-6 md:mt-12 flex space-x-11">
									{payments?.map((p) => {
										return (

											<div key={p} className="pricing-plan-wrap lg:w-1/3 my-4 md:my-6 border-white ">
												<div className="pricing-plan border-t-4 border-solid bg-[#f6f6f6]   text-center max-w-sm mx-auto rounded-lg hover:border-teal-600 transition-colors duration-300">
													<div className="p-6 md:py-8">
														<h4 className="font-medium leading-tight text-2xl mb-2">{p?.plan_name}</h4>
														<p className="text-gray-600">{p?.sub_line}</p>
													</div>
													<div className="pricing-amount bg-custom-btn text-white p-6 transition-colors duration-300">
														<div className=""><span className="text-3xl font-semibold">£{(p?.price) } /month </span></div>
													</div>
													<div className="p-6">
														<ul className="leading-loose min-h-[352px] h-[352px] overflow-auto ">
															{p?.features.map((f) => {

																return <li key={f}>{f}</li>
															})}

														</ul>
														<div className='mt-6 py-4'>
															<button
																onClick={() => handleSubscribe(p?.id)}
																disabled={isButtonDisabled}
																className={`bg-btn-100 transition-colors duration-300 ${isButtonDisabled ? 'opacity-20 cursor-not-allowed' : ''
																	}`}
															>
															Subscribe
															</button>
														</div>
													</div>
												</div>
											</div>

										)
									})}

								</div>
							</div>
						</div>



						{/* <div className="add_ons">
						<div className="content-section flex flex-col items-center">
								<span className="text-md text-custom-btn font-semibold">Addons</span>
								<h2 className="text-center text-2xl font-semibold my-1">Auto up Scale Addons Plans</h2>
								<img src="https://genial-react.envytheme.com/images/car-icon.png" alt="car icon" />
							</div>
							<Row className="flex justify-center text-center g-4 p-5">
								{addOns?.map((p) => {
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
						</div> */}
					</div>
				</div>
			</div>


		</div>


	);
}
// Payment.getLayout = function getLayout(page: ReactElement) {
// 	return <FullLayout>{page}</FullLayout>;
// };