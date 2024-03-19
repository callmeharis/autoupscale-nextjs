import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Chart } from "react-google-charts";
export interface UserInfoProps {
    className?: string;
    Image?: string;
    id?: number;
    dob?: string;
    first_name?: string;
    last_name?: string;
    created?: string;
} 
export const UserInfo = ({ Image, className, id, dob, first_name, last_name, created }: UserInfoProps) => {
  
    return (
        <>
                <div className="shadow bg-white mb-[30px] rounded-md max-w-7xl mx-auto">
                    <div className="p-[20px]">
                        <Row>
                            <Col lg={2}>
                                <img className='rounded-full w-36 h-36 object-cover object-center border border-gray-300"' src={Image ? Image : "https://www.w3schools.com/howto/img_avatar.png"} alt="" />
                            </Col>

                            <Col lg={4}>
                                <ul className='flex flex-wrap'>
                                    <li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
                                        <p className='mb-2 font-medium text-gray-600'> Id</p>
                                        <p className={`${className} ${'text-base text-gray-800'}`}> {id} </p>
                                    </li>
                                    <li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
                                        <p className='mb-2 font-medium text-gray-600'> First Name</p>
                                        <p className={`${'text-base text-gray-800'}`}> {first_name} </p>
                                    </li>

                                    <li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
                                        <p className='mb-2 font-medium text-gray-600'> Last Name</p>
                                        <p className={`${'text-base text-gray-800'}`}> {last_name} </p>
                                    </li>
                                    <li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
                                        <p className='mb-2 font-medium text-gray-600'> Date of birth</p>
                                        <p className={`${'text-base text-gray-800'}`}> {dob} </p>
                                    </li>
                                    <li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
                                        <p className='mb-2 font-medium text-gray-600'> Created </p>
                                        <p className={`${'text-base text-gray-800'}`}> {created} </p>
                                    </li>



                                </ul>
                            </Col>
                                <Col lg={3}>
                            <div className="h-40 container m-0 p-0">
                            {/* <Chart
                                chartType="PieChart"
                                width="100%"
                                height="400px"
                                data={data}
                                options={options}
                                /> */}
                            </div>
                            
                                </Col>
                                <Col lg={3}>
                                <div>
                                <Button className='bg-btn-100'>
                                    Edit Contact
                                </Button>
                                </div>
                                <div>

                                <Button variant='danger' className='mt-2 text-red-600 hover:text-white'>
                                    Delete Contact
                                </Button>
                                </div>

                                </Col>
                        </Row>
                    </div>
                </div>


        </>
    )
}
