import React, { ReactElement, useState } from 'react'
import FullLayout from "../../../../components/layouts/company/full-layout";
import { Button, Carousel, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import DataTable from '../../../../components/dataTable/viewDataTable';
import VehichleApi from '@/pages/api/vehicle';
import { toast } from "react-toastify";
import { ReportsEntity } from '../../../../models/admin/reports/reports.entity';
import { useEffectAsync } from '@/utils/react';
import BaseSelect from '@/components/forms/base-select';
import BaseInput from '@/components/forms/base-input';
import { UserEntity } from '@/models/user/user.entity';
import { VehicleEntity } from '@/models/admin/vehicle/vehicle.entity';
import { GetVehiclesDropdownOptions } from '@/types/vehicle/get-vehicles-dropdown-options.type';
import ReportsApi from '@/pages/api/reports';
import CustomerApi from '@/pages/api/customer';
import { useFormik } from 'formik';
import ShowFormattedDate from '@/components/date-formatter';
import { globalAjaxExceptionHandler } from '@/utils/ajax';
import { ReportDataEntity } from '@/models/admin/reports/report-data.entity';
import { EmptyData } from '@/components/empty-data';
import CompanyPermissions from '@/permissions/company.permission';
import { GetVehiclesOptions } from '@/types/vehicle/get-vehicles-options.type';
export default function History({ id }) {
    const [reports, setReports] = useState<ReportsEntity>()
    const [dropDownData, setDropDownData] = useState<GetVehiclesDropdownOptions>()
    const [vehicles, setVehicles] = useState<VehicleEntity[]>([])
    const [customers, setCustomers] = useState<UserEntity[]>([])
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedLicense, setSelectedLicense] = useState({ frontImage: '', backImage: '' });

    const handleLicenseImageClick = (frontImage: string, backImage: string) => {
        setSelectedLicense({ frontImage, backImage });
        setShowModal(true);
    };

    const vehichleApi = new VehichleApi()
    const customerApi = new CustomerApi()

    useEffectAsync(async () => {
        try {
            const data = await vehichleApi.getVehichleDropDownData({
                vehicle_type_id: 1,
              } as GetVehiclesOptions);
              setDropDownData(data);
            const v_data = await vehichleApi.list()
            setVehicles(v_data)
            const c_data = await customerApi.list()
            setCustomers(c_data)
        } catch (error) {
        }
    }, []);


    const form = useFormik({
        initialValues: new ReportDataEntity(),
        validationSchema: ReportDataEntity.reportsFiltersYupSchema(),
        onSubmit: async (values) => {

        }
    })

    useEffectAsync(async () => {
        if (id) {
            try {
                const data = await vehichleApi.getHistoryById(id, form.values);
                setReports(data);
                setIsLoading(false)
            } catch (error) {
                globalAjaxExceptionHandler(error, {
                    formik: form,
                    defaultMessage: "Unable to add Damage",
                    toast
                })
            };
        }
    }, [form.values])
    return (
        <>
            <h1 className="px-10 my-6 font-bold text-3xl mx-4">Vehicle History</h1>
            {
                 <>  <Container>
                    <Form onSubmit={form.handleSubmit}>
                        <Row className='my-4 mx-2'>
                            <Col lg={2}>

                                <BaseSelect
                                    label='Owner'
                                    name='owner_id'
                                    placeholder="Choose One"
                                    options={dropDownData?.investors?.map((type) => ({
                                        value: type?.id,
                                        label: `${type?.first_name} ${type?.last_name}`,
                                    }))}
                                    formik={form}
                                />

                            </Col>
                            <Col lg={2}>
                                <BaseSelect
                                    label='Vehicle'
                                    name='vehicle_id'
                                    placeholder="Choose One"
                                    options={vehicles?.map((type) => ({
                                        value: type?.id,
                                        label: type?.name,
                                    }))}
                                    formik={form}
                                />

                            </Col>
                            <Col lg={2}>
                                <BaseSelect
                                    label='Customers'
                                    name='customer_id'
                                    placeholder="Choose One"
                                    options={customers?.map((type) => ({
                                        value: type?.id,
                                        label: `${type?.first_name} ${type?.last_name}`,
                                    }))}
                                    formik={form}
                                />

                            </Col>
                            <Col lg={2}>
                                <BaseInput
                                    label='Start Date'
                                    name='start_date'
                                    type='date'
                                    formik={form}
                                />

                            </Col>
                            <Col lg={2}>
                                <BaseInput
                                    label='End Date'
                                    name='end_date'
                                    type='date'
                                    formik={form}
                                />

                            </Col>
                        </Row>
                    </Form>
                </Container>
                    <div className="mx-5 px-3">
                        <div className=' text-lg w-full flex justify-end mb-4 float-right'>Total earning: <strong className='ml-2'>{reports?.earning}</strong></div>
                        <DataTable
                            data={reports?.stats}
                            isLoading={isLoading}
                            columns={[
                                {
                                    name: 'Licence Image',
                                    selector: (report: ReportDataEntity) => <img
                                        className='h-full rounded-full cursor-pointer'
                                        src={report?.customer?.license?.front_image}
                                        alt=''
                                        onClick={() => handleLicenseImageClick(report?.customer?.license?.front_image, report?.customer?.license?.back_image)}
                                    />
                                },
                                {
                                    name: 'License No',
                                    selector: (report: ReportDataEntity) => <p className='text-xs'>{report?.customer?.license?.licence_no ? report?.customer?.license?.licence_no : "N/A"}</p>
                                },
                                {
                                    name: 'Car Rego',
                                    selector: (report: ReportDataEntity) => <p className='text-xs'> {report?.vehicle?.rego ? report?.vehicle?.rego : "N/A"}</p>
                                },
                                {
                                    name: 'Vehicle ',
                                    selector: (report: ReportDataEntity) => <p className='text-xs'> {report?.vehicle?.name ? report?.vehicle?.name : "N/A"}</p>
                                },
                                {
                                    name: 'Status ',
                                    selector: (report: ReportDataEntity) => <p className='text-xs'> {report?.status_string ? report?.status_string : "N/A"}</p>
                                },

                                {
                                    name: 'Customer',
                                    selector: (report: ReportDataEntity) => <><p className='text-xs'>{report?.customer?.full_name ? report?.customer?.full_name : "N/A"}</p>
                                    </>
                                },
                                {
                                    name: ' Contact',
                                    selector: (report: ReportDataEntity) => <p className='text-xs'>{report?.customer?.phone ? report?.customer?.phone : "N/A"}</p>
                                },
                                {
                                    name: ' Email',
                                    selector: (report: ReportDataEntity) => <p className='text-xs'>{report?.customer?.email ? report?.customer?.email : "N/A"}</p>
                                },
                                {
                                    name: 'Owner ',
                                    selector: (report: ReportDataEntity) => <p className='text-xs'><> {report?.investor?.full_name ? report?.investor?.full_name : "N/A"}</></p>
                                },
                                {
                                    name: 'Start ',
                                    selector: (report: ReportDataEntity) => <p className='text-xs'> {report?.start_date ? <ShowFormattedDate date={report?.start_date} hideTime /> : "N/A"}</p>
                                },
                                {
                                    name: 'End ',
                                    selector: (report: ReportDataEntity) => <p className='text-xs'>{report?.end_date ? <ShowFormattedDate date={report?.end_date} hideTime /> : "N/A"}</p>
                                },
                                {
                                    name: 'Per Day ',
                                    selector: (report: ReportDataEntity) => <p className='text-xs'> {report?.rent ? report?.rent : "N/A"}</p>
                                },
                                {
                                    name: 'Days',
                                    selector: (report: ReportDataEntity) => <p className='text-xs'>{report?.units ? report?.units : "0"}</p>
                                },
                                {
                                    name: 'Bond',
                                    selector: (report: ReportDataEntity) => <p className='text-xs'>{report?.bond ? report?.bond : "N/A"}</p>
                                },
                                // {
                                //     name: 'Penalty ',
                                //     selector: (report: any) => <h4> {'dsdaas'}</h4>
                                // },
                                {
                                    name: 'Total ',
                                    selector: (report: ReportDataEntity) => <p className='text-xs'>{report?.total ? report?.total : "N/A"}</p>
                                },
                                {
                                    name: 'Notes ',
                                    selector: (report: ReportDataEntity) => <p className='text-xs'>{report?.notes ? report?.notes : "N/A"}</p>
                                },
                                // {
                                //     name: 'Address ',
                                //     selector: (report: ReportDataEntity) => <p className='text-xs'>{report?.customer?.address ? report?.customer?.address : "N/A"}</p>
                                // },
                                {
                                    name: 'State',
                                    selector: (report: ReportDataEntity) => <p className='text-xs'>{report?.customer?.state ? report?.customer?.state : "N/A"}</p>
                                },

                            ]}
                        />
                        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title>License Images</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Carousel>
                                    <Carousel.Item>
                                        <img className="d-block w-100 h-96" src={selectedLicense.frontImage} alt="Front Image" />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img className="d-block w-100 h-96" src={selectedLicense.backImage} alt="Back Image" />
                                    </Carousel.Item>
                                </Carousel>
                            </Modal.Body>
                        </Modal>
                    </div>
                </>
            }
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
History.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout>{page}</FullLayout>;
};