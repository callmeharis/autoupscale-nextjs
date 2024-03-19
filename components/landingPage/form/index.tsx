import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import BaseInput from "@/components/forms/base-input";
import BaseTextArea from "@/components/forms/base-text-area";
import { Button } from "react-bootstrap";
const FormComponent = () => {
    return (
        <>
            <div className="contact-form bg-gray-100 p-4" id="contact">
                <div className="container mb-3">
                    <h2 className="text-center text-3xl font-semibold">Contact Us</h2>
                    <p className="text-center mb-3">
                        Get in touch with us today and discover how our dedicated
                        customer service team can assist you
                    </p>
                    <div className="row align-items center">
                        <div className="col-lg-7 col-md-12 contact-us-first-col bg-white p-5">
                            <form action="" id="contactForm">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group flex flex-col">
                                            <label htmlFor="name" className="text-gray-500 font-semibold my-1">Name</label>
                                            <BaseInput type="text" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group flex flex-col">
                                            <label htmlFor="email" className="text-gray-500 font-semibold my-1">Email</label>
                                            <BaseInput type="email" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group flex flex-col">
                                            <label htmlFor="subject" className="text-gray-500 font-semibold my-1">Subject</label>
                                            <BaseInput type="text" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group flex flex-col">
                                            <label htmlFor="phone" className="text-gray-500 font-semibold my-1">Phone Number</label>
                                            <BaseInput type="text" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group flex flex-col">
                                            <label htmlFor="message" className="text-gray-500 font-semibold my-1">Message</label>
                                            <BaseTextArea
                                                rows={4}
                                            ></BaseTextArea>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 mt-3">
                                        <Button className="bg-btn-100">
                                            Send Meassage</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-4 col-md-12 contact-form-second-col bg-white p-5 ml-10">
                            <div className="contact-info-box">
                                <ul>
                                    <li className="flex items-center my-3">
                                        <FaMapMarkerAlt className="contact-form-icon text-custom-btn" />
                                        <div className="ml-2">
                                            <div>Address</div>
                                            <span className="contact-form-span">
                                                1575, 447 Broadway, 2nd Floor, New York
                                                New York 10013, US
                                            </span>
                                        </div>
                                    </li>
                                    <li className="flex items-center my-3">
                                        <MdEmail className="contact-form-icon text-custom-btn" />
                                        <div className="ml-2">
                                            <div>Email</div>
                                            <span className="contact-form-span">
                                                adnanmumtazmeyo@gmail.com
                                            </span>
                                        </div>
                                    </li>
                                    <li className="flex items-center my-3">
                                        <AiFillPhone className="contact-form-icon text-custom-btn" />
                                        <div className="ml-2">
                                            <div>Phone</div>
                                            <span className="contact-form-span">+923042563063</span>
                                        </div>
                                    </li>
                                    <li className="flex items-center my-3">
                                        <BsGlobe className="contact-form-icon text-custom-btn" />
                                        <div className="ml-2">
                                            <div>Website</div>
                                            <span className="contact-form-span">www.autoupscale.com</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormComponent;
