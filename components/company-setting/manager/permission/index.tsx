import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import BaseCheckList from '@/components/forms/base-check-list'
import { BaseLoaderIcon } from '@/components/forms/controls/base-loader-icon'
import { ManagerPermissionDto } from '@/models/admin/company/manager-permission.dto'
import { PermissionEntity } from '@/models/admin/company/permission.entity'
import ManagerApi from '@/pages/api/manager'
import { globalAjaxExceptionHandler } from '@/utils/ajax'
import { useEffectAsync } from '@/utils/react'

export type ManagerPermissions = {
    customer?: PermissionEntity[],
    investor?: PermissionEntity[],
    manager?: PermissionEntity[],
    other?: PermissionEntity[],
    report?: PermissionEntity[],
    reserve?: PermissionEntity[],
    vehicle?: PermissionEntity[],
}

export function Permission({ id, setPermission }) {
    const [dropDownData, setDropDownData] = useState<ManagerPermissions>(null)
    const managerApi = new ManagerApi
    const form = useFormik({
        initialValues: new ManagerPermissionDto(),
        validationSchema: ManagerPermissionDto.yupschema(),
        onSubmit: async (values) => {
            try {
                await managerApi.updatePermission({
                    id: id,
                    permission_ids: [
                        ...values.customer,
                        ...values.investor,
                        ...values.other,
                        ...values.report,
                        ...values.reserve,
                        ...values.vehicle,
                    ]
                } as PermissionEntity)
                setPermission(null)
                toast.success("Permission updated successfully!")
            } catch (error) {
                // console.log(error.message);

                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Permission Updation Failed",
                    toast,
                });

            }
        },

    })
    useEffectAsync(async () => {
        if (!!id) {
            const data: ManagerPermissions = await managerApi.getPermissionById(id)
            form.setValues({
                ...form.values,
                customer: data?.customer?.map(v => v.id),
                investor: data?.investor?.map(v => v.id),
                manager: data?.manager?.map(v => v.id),
                other: data?.other?.map(v => v.id),
                report: data?.report?.map(v => v.id),
                reserve: data?.reserve?.map(v => v.id),
                vehicle: data?.vehicle?.map(v => v.id),
            });
        }
    }, [id])
    useEffectAsync(async () => {
        try {
            const data = await managerApi.getPermission()
            setDropDownData(data)
        } catch (error) {
            console.log("error vehicle", error)
        }
    }, [])

    // useEffect(() => {
    //     console.log("[form.values]", form.values);
    //     console.log("[form.errors]", form.errors);

    // }, [form.values, form.errors])

    return (
        <div className="flex items-center mb-4 space-x-10">
            <form onSubmit={form?.handleSubmit} className='space-y-7'>
                <br />
                <Row className='px-5 flex'>
                    <Col lg='6'>
                        <h1 className='text-xl font-semibold'>Customer </h1>
                        <BaseCheckList
                            name="customer"
                            options={dropDownData?.customer}
                            valueKey="id"
                            labelKey="name"
                            cols={1}
                            formik={form}
                            // onChange={(v) => { console.log("vvv", v.target.value) }}
                            showSelectAll
                        />
                    </Col>
                    <Col lg='6'>
                        <h1 className='text-xl font-semibold'>Owner </h1>
                        <BaseCheckList
                            name="investor"
                            options={dropDownData?.investor}
                            valueKey="id"
                            labelKey="name"
                            cols={1}
                            formik={form}
                            showSelectAll
                        />
                    </Col>
                </Row>

                <Row className='px-5'>
                   <Col lg='6'>
                   <h1 className='text-xl font-semibold'>Report </h1>
                   <BaseCheckList
                        name="report"
                        options={dropDownData?.report}
                        valueKey="id"
                        labelKey="name"
                        cols={1}
                        formik={form}
                        showSelectAll
                    />

                   </Col>
                   <Col lg='6'>
                   <h1 className='text-xl font-semibold'>Vehicle </h1>
                   <BaseCheckList
                        name="vehicle"
                        className="col-6"
                        options={dropDownData?.vehicle}
                        valueKey="id"
                        labelKey="name"
                        cols={1}
                        formik={form}
                        showSelectAll
                    />
                   </Col>
                </Row>

                <Row className='px-5'>

                   <Col lg='6'>
                   <h1 className='text-xl font-semibold'>Reservation </h1>
                   <BaseCheckList

                        name="reserve"
                        options={dropDownData?.reserve}
                        valueKey="id"
                        labelKey="name"
                        cols={1}
                        formik={form}
                        showSelectAll
                    /></Col>
                   <Col lg='6'>
                   <h1 className='text-xl font-semibold'>Other </h1>
                   <BaseCheckList
                        name="other"
                        options={dropDownData?.other}
                        valueKey="id"
                        labelKey="name"
                        cols={1}
                        formik={form}
                        showSelectAll
                    /></Col>

                </Row>

                <div className="flex justify-center">
                    <Button type='submit' disabled={!!form?.isSubmitting} className=' bg-btn-100'>
                        {!!form.isSubmitting ? <BaseLoaderIcon /> : "Update Permission"}
                    </Button>
                </div>
            </form>
            {/* {permissionData?.map((p) => (p.name))} */}
        </div>
    )
}


