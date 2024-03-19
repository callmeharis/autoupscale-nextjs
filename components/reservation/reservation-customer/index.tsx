import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import { BsEye } from "react-icons/bs";
import Create from "../../../pages/company/customer/create";
import CustomerApi from "../../../pages/api/customer";
import { FilterSearchBar } from "../../../components/vehicle/filter-searchbar";
import { useEffectAsync } from "../../../utils/react";
import { VehicleEntity } from "../../../models/admin/vehicle/vehicle.entity";
import DataTable from "../../dataTable/viewDataTable";
import { UserEntity } from "../../../models/user/user.entity";
import { GetCustomersOptions } from "../../../types/customer/get-customers-options.type";
import ViewModal from "../../../components/view-modal";
import ViewCustomerDetail from "../../../pages/company/customer/[id]";
import { FormSection } from "@/components/customer";

export interface ReservationCustomerTableProps {
    handleSelection?: (e: any) => void,
}
export function ReservationCustomerTable({ handleSelection }: ReservationCustomerTableProps) {

    const [customerId, setCustomerId] = useState<number>(null)
    const [showCustomerModal, setShowCustomerModal] = useState<boolean>(false)
    const [customers, setCustomers] = useState<UserEntity[]>([])

    const customerApi = new CustomerApi()

    useEffectAsync(async () => {
        try {
            const v_data = await customerApi.list()
            setCustomers(v_data)
        } catch (error) {
            // console.log(error)
        }
    }, [])

    const form = useFormik({
        initialValues: new VehicleEntity(),
        validationSchema: VehicleEntity.vehicleFiltersYupSchema(),
        onSubmit: async (val) => {
            try {
                const data = await customerApi.list(val as GetCustomersOptions)
                setCustomers(data)
            } catch (error) {
                console.log("error", error)
            }
        },
        onReset: async (value) => {
            try {
                const data = await customerApi.list(value as GetCustomersOptions)
                setCustomers(data)
            } catch (error) {
                console.log("error", error)
            }
        }
    })
    const onSaveComplete = (data: UserEntity) => {
        console.log(data?.id)
        if (data?.id) setShowCustomerModal(false)
    }
    return (
        <div>
            <div className=''>
                {customers.length === 0 ? (<>
                    <div className="mb-3">
                        <div className="text-end">
                            <Button onClick={() => setShowCustomerModal(true)} className="bg-btn-100">
                                Add Customer
                            </Button>
                        </div>
                    </div>

                </>) : null}
                
            </div>
            <div className="flex justify-between my-4">
                        <p className='text-gray-700  pt-3 font-bold mr-5'>Customer</p>

                        <FilterSearchBar form={form} showYear={false} />
                    </div>
            <div className="text-xs">
                <DataTable
                    selectable="single"
                    onSelectionChange={handleSelection}
                    data={customers}
                    itemsPerPage={10}
                    columns={[
                        {
                            name: 'First Name',
                            selector: (c: UserEntity) => c?.first_name
                        },
                        {
                            name: 'Last Name',
                            selector: (c: UserEntity) => c?.last_name

                        },
                        {
                            name: 'DOB',
                            selector: (c: UserEntity) => c?.dob
                        },
                        {
                            name: 'Email',
                            selector: (c: UserEntity) => c?.email
                        },
                        {
                            name: 'Phone',
                            selector: (c: UserEntity) => c?.phone
                        },
                        {
                            name: 'Zip Code',
                            selector: (c: UserEntity) => c?.zip_code
                        },
                        {
                            name: 'View ',
                            selector: (c: UserEntity) => (
                                <div className="flex text-purple-600 text-[24px]" onClick={() => setCustomerId(c?.id)}>
                                    <BsEye className="mx-1 text-green-500 " />
                                </div>
                            )
                        }
                    ]}

                />
            </div>
            <ViewModal
                size="xl"
                show={Boolean(customerId)}
                onCloseClick={() => setCustomerId(null)}
            >
                <ViewCustomerDetail hideActions={true} id={customerId} />
            </ViewModal>
            <ViewModal
                size="xl"
                show={showCustomerModal}
                onCloseClick={() => setShowCustomerModal(false)}
            >
                <FormSection onSave={onSaveComplete} />
            </ViewModal>


        </div >
    );
}
