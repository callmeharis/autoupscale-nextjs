import { useFormik } from 'formik';
import React, {useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import BaseInput from '@/components/forms/base-input'
import { globalAjaxExceptionHandler } from '@/utils/ajax';
import ViolationApi from '@/pages/api/violation';
import BaseSelect from '@/components/forms/base-select';
import { useEffectAsync } from '@/utils/react';
import ReservationViolationApi from '@/pages/api/reservation.violation';
import { ReservationViolationEntity } from '@/models/admin/violation/reservation.violation.entity';
import { ViolationEntity } from '@/models/admin/violation/violation.entity';

export interface EditReservationViolationProps {
    reservationViolationId  : number;
    onSave?: (e:any)=>void
}

export function EditReservationViolation(props : EditReservationViolationProps) {

    const reservationViolationApi = new ReservationViolationApi();
    const violationApi = new ViolationApi();

    const [violationDropdown, setViolationDropdownData] = useState<ViolationEntity[]>(null);


    const form = useFormik({
        initialValues: new ReservationViolationEntity(),
        validationSchema: ReservationViolationEntity.yupSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                form.setFieldValue('reservation_id', props.reservationViolationId)
                const data = await reservationViolationApi.update(props.reservationViolationId, values as ReservationViolationEntity);
                props?.onSave(data)
                toast.success("Violation update successfully")
            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Violation Update Failed",
                    toast,
                });
            }
        },
    });
    useEffectAsync(async () => {
        const dropdownOptions = await await violationApi.list({is_enabled : 1});
        setViolationDropdownData(dropdownOptions)
        const data = await reservationViolationApi.getById(props?.reservationViolationId)
        console.log(data  , 'data')
        console.log('form values', form.values)
        form.setValues({
            ...form.values,
            ...data,
        })
        form.setFieldValue('violation_id', data?.violation?.id)
        form.setFieldValue('violation_at',  data?.violation_at
        ? new Date(data?.violation_at).toISOString()
        : new Date().toISOString())

    }, [])
    return (
        <>
            <div className={`${!!form?.isSubmitting && 'opacity-20'}`}>
                <form onSubmit={form?.handleSubmit} className='p-6 space-y-4'>
                    <BaseSelect
                        placeholder="Choose One"
                        name="violation_id"
                        label="Violation Type"
                        options={violationDropdown?.map(
                            (type) => ({
                                value: type?.id,
                                label: `${type?.name}`,
                            })
                        )}
                        required
                        formik={form}
                    />
                    <BaseInput
                            label="Violation Date"
                            name="violation_at"
                            type="date"
                            formik={form}
                            // min={new Date().toISOString().split("T")[0]}
                          />
                    <BaseInput label='Fine Amount' type='number' className='w-full ' name='fine_amount' formik={form} required />
                    <BaseInput label='Comment' type='text' className='w-full ' name='comment' formik={form} />
                    <div className="text-end">
                        <Button className='bg-btn-100' type='submit'> Submit </Button>
                    </div>

                </form>


            </div>

        </>
    )
}
