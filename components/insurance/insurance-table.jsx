import React from 'react'
import DataTable from '../dataTable/viewDataTable'
import ViewModal from '../view-modal'
import EditInsurance from './edit'
import { BiEditAlt } from 'react-icons/bi'
import DeleteButton from '../forms/base-delete'

const InsuranceTable = () => {

    return (
        <>
            <div className="container">
                <div className="">
                    <DataTable
                        columns={[
                            {
                                name: 'Company Logo',
                                selector: () => {
                                    <>
                                        <span><img src="" alt="" /></span>
                                    </>
                                }
                            }, {
                                name: 'Insurance Company Name',
                                selector: () => { 'Example' }
                            }, {
                                name: 'Phone Number',
                                selector: () => { '' }
                            }, {
                                name: 'Email Address',
                                selector: () => { '' }
                            },
                            {
                                name: 'Mailing Address',
                                selector: () => { 'Example' }
                            },
                            {
                                name: 'Actions',
                                selector: () => {
                                    <>
                                        <BiEditAlt onClick={() => onEditClick(insurance?.id)} className="cursor-pointer text-base ml-1 " color="#5236ff" />
                                        <DeleteButton onDelete={() => onDeleteClick(insurance?.id)} className="cursor-pointer text-base ml-1 " color="#5236ff" />

                                    </>
                                }
                            },


                        ]} />
                    <ViewModal
                        show={''}
                        onCloseClick={''}
                        header=' Edit Insurance'
                    >
                        <EditInsurance   />
                    </ViewModal>
                </div>
            </div>
        </>
    )
}

export default InsuranceTable