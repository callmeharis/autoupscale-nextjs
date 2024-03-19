import { useFormik } from 'formik';
import React, {useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import BaseInput from '@/components/forms/base-input'
import { globalAjaxExceptionHandler } from '@/utils/ajax';
import ViolationApi from '@/pages/api/violation';
import { ViolationEntity } from '@/models/admin/violation/violation.entity';
import BaseSelect from '@/components/forms/base-select';
import { useEffectAsync } from '@/utils/react';
import ReservationViolationApi from '@/pages/api/reservation.violation';
import { ReservationViolationEntity } from '@/models/admin/violation/reservation.violation.entity';

export interface CreateReservationViolationProp {
    reservationId  : number;
    onSave : (e:any)=> void
}

export function CreateReservationViolation(props : CreateReservationViolationProp) {

    const violationApi = new ViolationApi();
    const reservationViolationApi = new ReservationViolationApi();

    const [violationDropdown, setViolationDropdownData] = useState<ViolationEntity[]>(null);

    const handleViolationDropDownChange = async ({
        target: { value },
      }: any): Promise<void> => {
        form.setFieldValue("violation_id", value)

        const selectedViolation = violationDropdown.find(item => item.id == value);

    if (selectedViolation) {
      // Extract the default_fine value
      form.setFieldValue("fine_amount", selectedViolation.default_fine);
    }
      };

    useEffectAsync(async () => {
        try {
            const data = await violationApi.list({ is_enabled: 1 });
            setViolationDropdownData(data);
        } catch (error) { }
    }, []);

    const form = useFormik({
        initialValues: new ReservationViolationEntity(),
        validationSchema: ReservationViolationEntity.yupSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                form.setFieldValue('reservation_id', props.reservationId)
                const data = await reservationViolationApi.create(props.reservationId, values as ReservationViolationEntity);
                props?.onSave(data)
                toast.success("Violation added successfully")
            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Violation creation Failed",
                    toast,
                });
            }
        },
    });
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
                        onChange={handleViolationDropDownChange}
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
