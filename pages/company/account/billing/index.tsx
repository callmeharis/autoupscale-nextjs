import DataTable from '@/components/dataTable/viewDataTable';
import BaseCheckList from '@/components/forms/base-check-list';
import BaseInput from '@/components/forms/base-input';
import FullLayout from '@/components/layouts/company/full-layout';
import React, { ReactElement } from 'react'
import { Col, Row } from 'react-bootstrap';


export default function AccountSetting() {
    return (


        <div className="max-w-7xl m-auto my-5">
            <Row className="my-4 mx-5">
                <Col lg={10} className="p-0">
                    <h1 className=" mb-6 font-bold text-3xl">Account Billing</h1>
                </Col>

            </Row>
            <div className="box  mx-5" >
                <div className="tarrif-palne">
                    <h1 className='no-underline text-base text-gray-700 font-medium p-6  '>
                        Tarrif Plan
                    </h1>
                    <div className="mx-5 block w-8/12 rounded-md border border-gray-500 px-6 py-3">
                        <h5 className='font-semibold text-2xl text-purple-700 mb-3'>
                            Beginner
                        </h5>
                        <div className='mb-4 flex items-center justify-between '>
                            <div className='text-gray-500 font-semibold'>
                                Count of vehicles
                            </div>
                            <div className='mx-3 text-xl font-semibold text-right inline-block leading-4 '>
                                8 <span className='text-xs text-gray-700 inline-block align-top rounded-sm bg-gray-100 whitespace-no-wrap border-1 px-1 '>25 €</span>
                            </div>
                        </div>
                        <div className='pb-4 flex items-center justify-between border-b'>
                            <div className='text-gray-500 font-semibold'>
                                Count of vehicles
                            </div>
                            <div className='mx-3 text-xl font-semibold text-right inline-block leading-4 '>
                                0
                                <span className='ml-2 text-xs text-gray-700 inline-block align-top rounded-sm bg-gray-100 whitespace-no-wrap border-1 px-1 '>1.5 € / tracker + sim card</span>
                            </div>

                        </div>
                        <div className="d-flex justify-between ">
                            <h5 className='font-semibold text-xl text-purple-700  my-3'>
                                Total:
                            </h5>
                            <h5 className='font-semibold text-xl mx-3 text-purple-700  my-3'>
                                25 € / month
                            </h5>
                        </div>

                    </div>
                </div>
                <div className="billing-period mt-4">
                    <h1 className='no-underline text-base text-gray-700 font-medium p-6  '>
                        Billing Period
                    </h1>
                    <div className='mx-5 block w-8/12'>
                        <input type="radio" id="monthly" name="billing_period" value="monthly" />
                        <label htmlFor="monthly">
                            <span className='font-bold text-lg mx-3'>Billed monthly</span>
                        </label>
                        <br />
                        <span className='text-sm mx-4 text-gray-500'>Access to RentSyst account <b>25 €</b> per month (300 € per year).</span>

                        <br />
                        <br />
                        <input type="radio" id="yearly" name="billing_period" value="yearly" />
                        <label htmlFor="yearly">
                            <span className='font-bold text-lg mx-3'>Billed yearly</span>
                        </label>
                        <br />
                        <span className='text-sm mx-4 text-gray-500'>Access to RentSyst account <b>270 €</b> per year (You all save 10 % compared with mounthly billing).</span>
                    </div>
                </div>
                <div className="payment mt-4">
                    <h1 className='no-underline text-base text-gray-700 font-medium p-6  '>
                        Payment method
                    </h1>
                    <div className="mx-5 flex space-x-5">
                        <BaseInput placeholder='Card Number' label='Card Number' className='w-52' />
                        <BaseInput placeholder='Exp Date' label='Exp Date' type='date' className='w-52' />
                        <BaseInput placeholder='CVC' label='CVC' className='w-52' />
                    </div>
                </div>
                <div className="mt-5 billing-history">
                    <h1 className='no-underline text-base text-gray-700 font-medium p-6  '>
                        Billing History
                    </h1>
                    <div className="mx-5">
                        <DataTable
                            columns={[
                                {
                                    name: 'Invoice number',
                                    selector: () => { 'Example' }
                                }, {
                                    name: 'Type',
                                    selector: () => { 'Example' }
                                }, {
                                    name: 'Date',
                                    selector: () => { 'Example' }
                                }, {
                                    name: 'Description',
                                    selector: () => { 'Example' }
                                },
                                {
                                    name: 'Price',
                                    selector: () => { 'Example' }
                                },
                                {
                                    name: 'Status',
                                    selector: () => { 'Example' }
                                },
                                {
                                    name: 'Actions',
                                    selector: () => { 'Example' }
                                },


                            ]} />
                    </div>

                </div>

            </div>

        </div>
    )
}

AccountSetting.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout >{page}</FullLayout>;
};
