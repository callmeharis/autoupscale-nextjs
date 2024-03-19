
import React, { ReactElement, useState } from "react";
import { Button, Carousel, Col, Modal, Row } from 'react-bootstrap';
import { useRouter } from 'next/router'
import FullLayout from "../../../components/layouts/customer/full-layout";
import CustomerApi from '../../../pages/api/customer';
import { useEffectAsync } from '../../../utils/react';
import { UserEntity } from '../../../models/user/user.entity';
import CustomerHistory from "../../../components/customer/history";
import DonutChart from "../../../components/forms/base-chart";
import ShowFormattedDate from "../../../components/date-formatter";
import ViewCard from "../../../components/view-card";
import ViewDetails from "../../../components/view-details";
import CustomerRoutes from "../../../routes/customer.route";

export default function CustomerProfile() {
    const router = useRouter()
    const [customer, setCustomer] = useState<UserEntity>();
    const [showModal, setShowModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleImageClick = () => {
        setShowModal(true);
    };
    const handleModalClose = () => {
        setShowModal(false);
    };
    const handleThumbnailClick = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };

    const customerApi = new CustomerApi()
    useEffectAsync(async () => {
        try {
            const data = await customerApi.self.get();
            setCustomer(data)
        } catch (error) {
        }

    }, []);
    const onEditClick = (id: number) => {
        router.push(CustomerRoutes.profile.edit.replace('[customerId]', `${id}`))
    }
    // const onDeleteClick = async (id: number) => {
    //     const customerApi = new CustomerApi()
    //     try {
    //         await customerApi.remove(id);
    //         setCustomer(customer)
    //         router.push(CompanyRoutes.customer.index)
    //         toast.success("Vehicle Removed Successfully")
    //     } catch (error) {
    //         toast.error("Vehicle couldn't removed")
    //     }
    // };

    return (
        <>
            <div className="shadow bg-white mb-[30px] rounded-md max-w-7xl mx-auto">
                <div className="p-[20px]">
                    <Row>
                        <Col lg={2}>
                            <img className='rounded-full w-36 h-36 object-cover object-center border border-gray-300"' src={
                                Boolean(customer?.file_name) ?
                                    (`${customer?.file_name}`) : ("https://www.w3schools.com/howto/img_avatar.png")
                            } alt="" />
                        </Col>

                        <Col lg={4}>
                            <ul className='flex flex-wrap'>
                                <li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
                                    <p className='mb-2 font-medium text-gray-600'> Id</p>
                                    <p className='text-base text-gray-800 font-bold'> {customer?.id} </p>
                                </li>
                                <li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
                                    <p className='mb-2 font-medium text-gray-600'> First Name</p>
                                    <p className={`${'text-base text-gray-800'}`}> {customer?.first_name ? customer?.first_name : "N/A"} </p>
                                </li>
                                <li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
                                    <p className='mb-2 font-medium text-gray-600'> Last Name</p>
                                    <p className={`${'text-base text-gray-800'}`}> {customer?.last_name ? customer?.last_name : "N/A"} </p>
                                </li>
                                <li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
                                    <p className='mb-2 font-medium text-gray-600'> Date of birth</p>
                                    <p className={`${'text-base text-gray-800'}`}> {customer?.dob ? <ShowFormattedDate date={customer?.dob} hideTime /> : "N/A"} </p>
                                </li>
                                <li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
                                    <p className='mb-2 font-medium text-gray-600'> Created </p>
                                    <p className={`${'text-base text-gray-800'}`}> {customer?.created_at ? <ShowFormattedDate date={customer?.created_at} hideTime /> : "N/A"} </p>
                                </li>
                            </ul>
                        </Col>
                        <Col lg={3}>
                            <div className="h-40 container m-0 p-0">
                                <DonutChart />
                            </div>

                        </Col>
                        <Col lg={3}>
                            <div>
                                <Button onClick={() => onEditClick(customer?.id)} className='bg-btn-100'>
                                    Edit Profile
                                </Button>
                            </div>
                            {/* <div>

                                <DeleteButton onDelete={() => onDeleteClick(customer?.id)} tittle='Delete' className='flex items-center btn btn-outline-danger px-4 mt-2 hover:text-white' />

                            </div> */}

                        </Col>
                    </Row>
                </div>
            </div>
            <ViewCard>
                <Row>
                    <ViewDetails
                        title="Location"
                        default={"N/A"}
                        obj={{
                            "Country": customer?.country,
                            "City": customer?.city,
                            "State": customer?.state,
                            "Address": customer?.address,
                            "Zip Code": customer?.zip_code,

                        }}
                    />
                </Row>
            </ViewCard>
            <ViewCard>
                <Row>
                    <ViewDetails
                        title="Contact Information"
                        default={"N/A"}
                        obj={{
                            "Phone number": customer?.phone,
                            "E-mail": customer?.email,
                            "Whatsapp number":
                                'N/A'

                            ,
                            "Registration Number": customer?.registration_no
                        }}
                    />
                </Row>
            </ViewCard>
            <Row className="max-w-7xl m-auto">
                <Col lg={6} className="pl-0">
                    <ViewCard>
                        <ViewDetails
                            title="License Details"
                            default={"N/A"}
                            obj={{
                                "Type": "DRIVER LICENSE",
                                "License Number": customer?.license?.licence_no,
                                "Issue Date": customer?.license?.issue_date ? customer?.license?.issue_date : 'No issue date',
                                "Expiry Date": customer?.license?.expiry_date ? customer?.license?.expiry_date : 'No expiry date',
                            }}
                        />
                    </ViewCard>
                </Col>
                <Col lg={6} className="pr-0">
                    {/* <ViewCard>
                        <Row className="text-center">
                            <div className="flex justify-between min-h-16 items-center py-3  px-6  border-gray-300"><h3 className=" font-medium text-gray-800 text-lg">License Images </h3></div>
                            <Col lg={3} className="" >
                                <img src={`${customer?.license?.front_image}`} className="w-32 m-auto" alt="dsajk" />
                            </Col>
                            <Col lg={3} className="">

                                <img src={`${customer?.license?.back_image}`} className="w-32 m-auto" alt="dsajk" />
                            </Col>
                        </Row>
                    </ViewCard> */}
                    <ViewCard>
                        <Row className="text-center">
                            <div className="flex justify-between min-h-16 items-center py-3 px-6 border-gray-300">
                                <h3 className="font-medium text-gray-800 text-lg">License Images</h3>
                            </div>
                            <Col lg={3} className="">
                                <img
                                    src={`${customer?.license?.front_image}`}
                                    className="w-32 h-32 m-auto"
                                    alt="Front Image"
                                    onClick={handleImageClick}
                                />
                            </Col>
                            <Col lg={3} className="">
                                <img
                                    src={`${customer?.license?.back_image}`}
                                    className="w-32 h-32 m-auto"
                                    alt="Front Image"
                                    onClick={handleImageClick}
                                />
                            </Col>
                        </Row>
                    </ViewCard>

                    <Modal show={showModal} onHide={handleModalClose} size="lg">
                        <Modal.Body>
                            <Carousel activeIndex={activeIndex} onSelect={handleThumbnailClick} interval={null}>
                                <Carousel.Item>
                                    <img
                                        src={`${customer?.license?.front_image}`}
                                        alt="Front Image"
                                        style={{ width: '100%', height: 'auto', maxHeight: '500px' }}
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        src={`${customer?.license?.back_image}`}
                                        alt="Back Image"
                                        style={{ width: '100%', height: 'auto', maxHeight: '500px' }}
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
            <ViewCard>
                <h1 className=" font-medium text-gray-800 text-lg">History</h1>
                <CustomerHistory id={customer?.id} />

            </ViewCard>

        </>


    )
}

CustomerProfile.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout>{page}</FullLayout>;
};
