import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import FullLayout from '../../../../components/layouts/company/full-layout'
import { VehicleEntity } from '../../../../models/admin/vehicle/vehicle.entity'
import VehichleApi from '../../../api/vehicle'
import { useEffectAsync } from '../../../../utils/react'
import ViewCard from '@/components/view-card'
import ViewDetails from '@/components/view-details'
import BaseCarousel from '@/components/forms/base-carousel'
import DonutChart from '@/components/forms/base-chart'
import { VehicleHistory } from '@/components/vehicle/history'
import DeleteButton from '@/components/forms/base-delete'
import { toast } from 'react-toastify'
import CompanyRoutes from '@/routes/company.route'
import { formatOdometer } from '@/utils/common'
import { VehicleDamage } from '@/components/vehicle/vehicle-damages'
import { GiAutoRepair } from 'react-icons/gi'
import { BiPlus } from 'react-icons/bi'
import { RxCross2 } from "react-icons/rx";
import CompanyPermissions from '@/permissions/company.permission'

export interface ViewVehicleDetailProps {
    vehicleData: VehicleEntity,
}

export default function ViewVehicleDetail({ id, hideActions }) {

    const router = useRouter()
    const vehichleApi = new VehichleApi()

    const [vehicleData, setVehicleData] = useState<VehicleEntity>()
    const [showDamage, setShowDamage] = useState<boolean>(false)

    useEffectAsync(async () => {
        if (id) {
            try {
                const data = await vehichleApi.getById(id)
                setVehicleData(data)
            } catch (error) {
            }
        }
    }, [id])

    const onDeleteClick = async (id: number) => {
        const vehicleApi = new VehichleApi();
        try {
            await vehicleApi.remove(id);
            setVehicleData(vehicleData)
            router.push(CompanyRoutes.vehicle.index)
            toast.success("Vehicle Removed Successfully")
        } catch (error) {
            toast.error("Vehicle couldn't removed")
        }
    };

    const onEditClick = (id: number) => {
        router.push(CompanyRoutes.vehicle.edit.replace('[vehicleId]', `${id}`))
    }
    const images = vehicleData?.media || [];
    return (
        <>
            <div className="shadow bg-white mb-[30px] rounded-md max-w-7xl mx-auto">
                <div className="p-[20px]">
                    <Row>
                        <Col lg={2}>
                            <BaseCarousel images={images} />
                        </Col>
                        <Col lg={5}>
                            <ul className='flex flex-wrap'>
                                <li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
                                    <p className='mb-2 font-medium text-gray-600'> Id</p>
                                    <p className='text-base text-gray-800 font-bold'> {vehicleData?.id} </p>
                                </li>

                                <li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
                                    <p className='mb-2 font-medium text-gray-600'> Brand </p>
                                    <p className={`${'text-base text-gray-800'}`}>{` ${vehicleData?.brand?.name} ${vehicleData?.model?.name} `}</p>
                                </li>

                                <li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
                                    <p className='mb-2 font-medium text-gray-600'> Owner </p>
                                    <p className={`${'text-base text-gray-800'}`}>{`${vehicleData?.investor?.first_name} ${vehicleData?.investor?.last_name}`} </p>
                                </li>


                                <li className='flex-shrink-0 w-1/3 max-w-1/3  pr-2'>
                                    <p className='mb-2 font-medium text-gray-600'> Status</p>
                                    <p className={`${'text-base text-gray-800'}`}> {<>
                                        {Boolean((vehicleData?.status) == 0) && <button className="px-2 bg-red-500 rounded-3xl text-white">{vehicleData?.status_string}</button>}
                                        {Boolean((vehicleData?.status) == 1) && <button className="px-2 bg-green-500 rounded-3xl text-white">{vehicleData?.status_string}</button>}
                                        {Boolean((vehicleData?.status) == 2) && <button className="px-2 bg-blue-500 rounded-3xl text-white">{vehicleData?.status_string}</button>}
                                    </>} </p>
                                </li>
                                <li className='flex-shrink-0 w-1/3 max-w-1/3  pr-2'>
                                    <p className='mb-2 font-medium text-gray-600'> Group </p>
                                    <p className={`${'bg-gray-400 text-white text-xs rounded-md px-2 py-1  mb-6 inline-block font-normal whitespace-nowrap'}`}>
                                        {vehicleData?.group ? vehicleData?.group?.name : "N/A"}

                                    </p>
                                </li>

                                <li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
                                    <p className='mb-2 font-medium text-gray-600'>Damage Count</p>
                                    <p className={`${'text-base text-gray-800'}`}>{
                                        vehicleData?.damages.length} </p>
                                </li>
                                <li className='flex-shrink-0 w-1/3 max-w-1/3  pr-2'>
                                    <p className='mb-2 font-medium text-gray-600'> Car Rego </p>
                                    <p className={`${'text-base  rounded-md text-gray-800'}`}>{
                                        vehicleData?.rego ? vehicleData?.rego : "N/A"} </p>
                                </li>
                                <li className='flex-shrink-0 w-1/3 max-w-1/3 mb-3 pr-2'>
                                    <p className='mb-2 font-medium text-gray-600'>Total Earned Rent </p>
                                    <p className={`${'text-base text-gray-800'}`}> {vehicleData?.total_earning ? vehicleData?.total_earning : "N/A"} </p>
                                </li>


                            </ul>
                        </Col>
                        <Col lg={2}>
                            <div className="h-40 container m-0 p-0">

                            </div>

                        </Col>
                        {!hideActions ? (<Col lg={3}>

                            <div>
                                <Button onClick={() => onEditClick(vehicleData?.id)} className='bg-btn-100'>
                                    Edit Vehicle
                                </Button>
                            </div>
                            <div>

                                <DeleteButton onDelete={() => onDeleteClick(vehicleData?.id)} tittle='Delete' className='flex items-center btn btn-outline-danger px-4 mt-2 hover:text-white' />
                            </div>
                            <div>
                                <Button onClick={() => router.push(CompanyRoutes.reservations.create)} className='my-2 bg-btn-100'>
                                    Add Reservation
                                </Button>
                            </div>
                            <div className='flex items-center'>
                                {/* <div className='border-green-500 border-5  text-green-500 inline-flex items-center p-2 leading-5 text-xl font-medium justify-center '>
                                    <GiAutoRepair className='mr-1'/> Damage
                                </div> */}

                                <div>

                                    {!showDamage &&
                                        <div onClick={() => { setShowDamage(true) }} className='' >
                                            <Button className='bg-btn-100 '>
                                                <span className='flex items-center'><span className='px-2'>Add Damage</span> <span><BiPlus className='border-gray-400' /></span></span> 
                                            </Button>
                                        </div>}
                                    {showDamage &&
                                        <div onClick={() => { setShowDamage(false) }} className=''>
                                            <Button className='bg-btn-100 '>
                                            <span className='flex items-center'><span className='px-2'>Add Damage</span> <span><RxCross2 className='border-gray-400' /></span></span>   
                                            </Button>

                                        </div>}
                                </div>


                            </div>

                            </Col>) : null }
                    </Row>
                </div>
            </div >

            {showDamage && <ViewCard>
                <div className='transition duration-2000'>
                    <VehicleDamage vehicleId={vehicleData?.id} />
                </div>
            </ViewCard>
            }
            <ViewCard>
                <ViewDetails
                    title='Information Details'
                    default={"N/A"}
                    objArray={[
                        {
                            "Name": vehicleData?.model?.name ? vehicleData?.model?.name : "N/A",
                            "Color": vehicleData?.color ?? "N/A",
                            "Transmission": vehicleData?.transmission?.name ? vehicleData?.transmission?.name : "N/A",
                            "Fuel Type": vehicleData?.fuel_type?.name ? vehicleData?.fuel_type?.name : "N/A",
                            "Body Type ": vehicleData?.body_type?.name ? vehicleData?.body_type?.name : "N/A",
                            "Brands ": vehicleData?.brand?.name ? vehicleData?.brand?.name : "N/A",
                            "Air Bags": vehicleData?.air_bags ? vehicleData?.air_bags : "N/A",
                        },
                        {
                            "Year": vehicleData?.year,
                            "VIN": vehicleData?.vin,
                            " Car Rego": vehicleData?.rego,
                            "Engine": vehicleData?.engine_type?.name ? vehicleData?.engine_type?.name : "N/A",
                        }
                    ]}
                />
            </ViewCard>

            <ViewCard>
                <Col>
                    <ViewDetails
                        title='Status & Metrics'
                        default={"N/A"}
                        obj={{
                            "status": vehicleData?.status_string,
                            "Fuel Level": vehicleData?.fuel_level,
                            "Group": vehicleData?.group?.name,
                            "Volume Tank": vehicleData?.volume_tank,
                            "Number Of Seat": vehicleData?.number_of_seat,
                            "Number Of Door": vehicleData?.number_of_door,
                        }}
                    />
                </Col>
            </ViewCard>
            <ViewCard>
                <Col>
                    <ViewDetails
                        title='Additional info'
                        default={"N/A"}
                        obj={{
                            "Odometer": formatOdometer(vehicleData?.odometer),
                            "Company": vehicleData?.rental?.name,
                            "Rental": vehicleData?.rental?.name,
                            "Damage": vehicleData?.damages_count,
                        }}
                    />
                </Col>
            </ViewCard>
            <ViewCard>
                <Col lg={7} className='mt-4'>
                    <div className=' pb-10'>
                        <span className="text-xl font-bold ">  Features </span>
                        <ul className='columns-2 px-10  py-3' style={{ listStyle: "inside" }}>
                            {vehicleData?.features?.map((v, i) => (

                                <li key={i} className=' py-3'>
                                    {v?.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Col>


            </ViewCard>

            <ViewCard>
                <h1 className=' font-medium text-gray-800 text-lg'>
                    History
                </h1>
                <VehicleHistory id={id} />
            </ViewCard >
        </>
    )
}
export async function getServerSideProps(context) {
    try {
        const id = context.params?.id;
        if (!!!id)
            return { notFound: true }

        return {
            props: { id }
        }
    } catch (error) {
        console.error("Exception is here:", error);
        return { props: { id: 0 } }
    }
}
ViewVehicleDetail.getLayout = function getLayout(page: ReactElement) {
    return (<FullLayout permission={CompanyPermissions.vehicle.view}>{page}</FullLayout>)
}

