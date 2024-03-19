import React from 'react'
import BaseInput from '../forms/base-input'
import { useFormik } from 'formik'
import { ReservationEntity } from '@/models/admin/reservation.entity'
import { toast } from 'react-toastify'
import { globalAjaxExceptionHandler } from '@/utils/ajax'
import ReservationApi from '@/pages/api/reservation'
import { Button, Form } from 'react-bootstrap'
import { ReservationCustomerTable } from './reservation-customer'
import BaseTextArea from '../forms/base-text-area'

export function SecondStep() {
    const reservationApi = new ReservationApi()
    const form = useFormik({
        initialValues: new ReservationEntity(),
        validationSchema: ReservationEntity.createReservationSchema(),
        onSubmit: async (value) => {
            try {
                await reservationApi.create(value)
                toast.success("Second Step Completed")
            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Reservation Creation Failed",
                    toast,
                });
            }
        }
    })
    return (
        <Form onSubmit={form.handleSubmit}>
            <div className="groups space-x-7">
                <div className="inline-block relative w-52">
                    <BaseInput
                        label='Bond'
                        name='bond'
                        type='number'
                        formik={form}
                    />
                </div>
                <div className="inline-block relative w-52">
                    <BaseInput
                        label='Start reading'
                        name='start_reading'
                        type='number'
                        formik={form}
                    />
                </div>
            </div>

            <div className="groups space-x-7">
                <div className="inline-block relative w-52">
                    <BaseTextArea
                        label='Notes'
                        name='notes'
                        formik={form}
                    />
                </div>
                <div className="inline-block relative w-52">
                    <BaseInput
                        label='Rent (Optional)'
                        name='rent'
                        type='number'
                        append={<>$</>}
                        formik={form}
                    />
                </div>
            </div>
            <div>
                <div className=" space-x-12 mt-3">
                    <div className="secondrow lg:flex">
                        <div className="groups">
                            <div className="groups">
                                <div className="inline-block relative ">
                                    <div className="my-5">
                                        <ReservationCustomerTable />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-right">

                <Button type='submit' className='bg-btn-100'>Submit</Button>
            </div>
        </Form>
    )
}
