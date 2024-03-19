import React from 'react'
import BaseSelect from '../forms/base-select'
import BaseInput from '../forms/base-input'
import { ReservationVehicleTable } from './reservation-vehicle'
import { useFormik } from 'formik'
import { ReservationEntity } from '@/models/admin/reservation.entity'
import { toast } from 'react-toastify'
import { globalAjaxExceptionHandler } from '@/utils/ajax'
import ReservationApi from '@/pages/api/reservation'
import { Button, Form } from 'react-bootstrap'

export function FirstStep() {
    const reservationApi = new ReservationApi()
    const form = useFormik({
        initialValues: new ReservationEntity(),
        validationSchema: ReservationEntity.createReservationSchema(),
        onSubmit: async (value) => {
            try {
                await reservationApi.create(value)
                toast.success("First Step Completed")
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
            <div className="flex space-x-12 ">
                <div className="secondrow lg:flex">
                    <div className="groups">
                        <div className="inline-block relative w-52">
                            <BaseSelect
                                placeholder="Choose One"
                                options={['hours', 'days']}
                                name="tariff"
                                label="Tarif"
                                formik={form}
                            />
                        </div>
                    </div>
                </div>
                <div className="groups">
                </div>
                <div className="groups">
                    <div className="inline-block relative w-52">
                        <BaseInput
                            label='Start Date'
                            name='start_date'
                            type='date'
                            formik={form}
                        />
                    </div>
                </div>
                <div className="groups">
                    <div className="inline-block relative w-52">
                        <BaseInput
                            label='End Date (optional)'
                            name='end_date'
                            type='date'
                            formik={form}
                        />
                    </div>
                </div>
            </div>
            <div className="secondrow lg:flex">
                <div className="groups">
                    <div className="inline-block relative ">
                        <div className="my-5">
                            <ReservationVehicleTable />
                        </div>
                    </div>
                </div>
            </div>
            <Button>Next</Button>
        </Form>
    )
}
