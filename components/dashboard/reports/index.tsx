import DataTable from '@/components/dataTable/viewDataTable';
import ShowFormattedDate from '@/components/date-formatter';
import { ReportDataEntity } from '@/models/admin/reports/report-data.entity'
import { ReportsEntity } from '@/models/admin/reports/reports.entity';
import ReportsApi from '@/pages/api/reports';
import { globalAjaxExceptionHandler } from '@/utils/ajax';
import { useEffectAsync } from '@/utils/react';
import React, { useState } from 'react'
import { Carousel, Modal } from 'react-bootstrap';
import { toast } from "react-toastify";

export function DashboardReports() {
    const [reports, setReports] = useState<ReportsEntity>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedLicense, setSelectedLicense] = useState({ frontImage: '', backImage: '' });
    const [isLoading, setIsLoading] = useState<boolean>(true);        
    const reportsApi = new ReportsApi();
    useEffectAsync(async () => {
        try {
            const data = await reportsApi.list();
            setReports(data);
            if (data) setIsLoading(false)
        } catch (error) {
            globalAjaxExceptionHandler(error, {
                defaultMessage: "",
                toast,
            });
        }



    }, [])
    const handleLicenseImageClick = (frontImage: string, backImage: string) => {
        setSelectedLicense({ frontImage, backImage });
        setShowModal(true);
    };
    return (
        <>
            <DataTable
                className='h-72 overflow-y-auto'
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
                        name: 'Rent ',
                        selector: (report: ReportDataEntity) => <p className='text-xs'> {report?.rent ? report?.rent : "N/A"} | {report?.tariff?.name ?? "N/A"}</p>
                    },
                    {
                        name: 'Duration',
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
                    {
                        name: 'Address ',
                        selector: (report: ReportDataEntity) => <p className='text-xs'>{report?.customer?.address ? report?.customer?.address : "N/A"}</p>
                    },
                    {
                        name: 'State',
                        selector: (report: ReportDataEntity) => <p className='text-xs'>{report?.state_country ? report?.state_country : "N/A"}</p>
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
        </>
    )
}
