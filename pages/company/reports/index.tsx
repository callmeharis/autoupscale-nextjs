import React, { ReactElement, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {
  Button,
  Carousel,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from 'react-bootstrap';
import { useEffectAsync } from '../../../utils/react';
import Multiselect from 'multiselect-react-dropdown';
import VehichleApi from '../../api/vehicle';
import ReportsApi from '../../api/reports';
import CustomerApi from '../../api/customer';
import DataTable from '../../../components/dataTable/viewDataTable';
import FullLayout from '../../../components/layouts/company/full-layout';
import BaseSelect from '../../../components/forms/base-select';
import BaseInput from '../../../components/forms/base-input';
import { ReportsEntity } from '../../../models/admin/reports/reports.entity';
import { VehicleEntity } from '../../../models/admin/vehicle/vehicle.entity';
import { UserEntity } from '../../../models/user/user.entity';
import { GetVehiclesDropdownOptions } from '../../../types/vehicle/get-vehicles-dropdown-options.type';
import ShowFormattedDate from '@/components/date-formatter';
import { globalAjaxExceptionHandler } from '@/utils/ajax';
import { ReportDataEntity } from '@/models/admin/reports/report-data.entity';
import { SystemSettingDto } from '@/models/setting/system-setting.dto';
import SettingApi from '@/pages/api/setting';
import { EmptyData } from '@/components/empty-data';
import CompanyPermissions from '@/permissions/company.permission';
import { PermissionType } from '@/types/permissions.type';
import { useAuth } from '@/hooks/use-auth';
import vehicle from '../vehicle';
import { GetVehiclesOptions } from '@/types/vehicle/get-vehicles-options.type';
export default function Reports() {
  const [dropDownData, setDropDownData] =
    useState<GetVehiclesDropdownOptions>();
  const [reports, setReports] = useState<ReportsEntity>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [vehicles, setVehicles] = useState<VehicleEntity[]>();
  const [customers, setCustomers] = useState<UserEntity[]>([]);
  const [systemSettingDropDownData, setSystemSettingDropDownData] =
    useState<SystemSettingDto>();
  const [showModal, setShowModal] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState({
    frontImage: '',
    backImage: '',
  });
  const { user, hasPermission } = useAuth();
  const [can, setCan] = useState<PermissionType>(null);
  useEffect(() => {
    setCan({
      filter: hasPermission(CompanyPermissions.report.filter),
      export: hasPermission(CompanyPermissions.report.export),
      earning: hasPermission(CompanyPermissions.report.earning),
    });
  }, [user]);
  const handleLicenseImageClick = (frontImage: string, backImage: string) => {
    setSelectedLicense({ frontImage, backImage });
    setShowModal(true);
  };

  const reportsApi = new ReportsApi();
  const vehichleApi = new VehichleApi();
  const customerApi = new CustomerApi();
  const settingApi = new SettingApi();

  useEffectAsync(async () => {
    try {
      const v_data = await vehichleApi.list();
      setVehicles(v_data);

      const dropdownData = await vehichleApi.getVehichleDropDownData({
        vehicle_type_id: 1,
      } as GetVehiclesOptions);
      setDropDownData(dropdownData);

      const data = await reportsApi.list();
      setReports(data);

      const system_settings_data = await settingApi.system.list();
      setSystemSettingDropDownData(system_settings_data);
    } catch (error) { }
  }, []);

  async function getInvestorVehicles(investor_id: number) {
    try {
      const v_data = await vehichleApi.list({
        user_id: investor_id,
      });

      setVehicles(v_data);
    } catch (error) {
      console.log(
        '🚀 ~ file: index.tsx:86 ~ getInvestorVehicles ~ error:',
        error
      );
    }
  }

  const form = useFormik({
    initialValues: new ReportDataEntity(),
    validationSchema: ReportDataEntity.reportsFiltersYupSchema(),
    onSubmit: async values => {
      const data = await reportsApi.download(values);

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'filename.csv');
      document.body.appendChild(link);
      link.click();
    },
  });
  useEffectAsync(async () => {
    try {
      if (!form.values.vehicle_id) {
        delete form?.values.vehicle_id
      }
      const data = await reportsApi.list(form?.values);
      setReports(data);
      if (data) setIsLoading(false);
    } catch (error) {
      globalAjaxExceptionHandler(error, {
        formik: form,
        defaultMessage: '',
        toast,
      });
    }
  }, [form.values]);
  console.log(form?.values)
  return (
    <>
      <div>
        {can?.filter && (
          <div className='mx-5'>
            <Form onSubmit={form.handleSubmit}>
              <Row className='my-4'>
                <Col lg={2}>
                  <BaseSelect
                    label='Owner'
                    name='owner_id'
                    placeholder='Choose One'
                    options={dropDownData?.investors?.map(type => ({
                      value: type?.id,
                      label: `${type?.first_name} ${type?.last_name}`,
                    }))}
                    onChange={async event => {
                      form.handleChange(event);
                      await getInvestorVehicles(Number(event.target.value));
                    }}
                    formik={form}
                  />
                </Col>
                <Col lg={4}>
                  <label className='tracking-wide text-sm mb-2 block text-gray-400'>
                    Vehicle
                  </label>
                  <Multiselect
                    disable={!form?.values.owner_id}
                    isObject={false}
                    onKeyPressFn={function noRefCheck() { }}
                    onSearch={function noRefCheck() { }}
                    onSelect={event => {
                      const selectedIds = event.map(name_and_rego => {
                        const v = vehicles?.find(type => type?.name_and_rego === name_and_rego);
                        return v?.id;
                      });

                      form.setFieldValue('vehicle_id', selectedIds.toString());
                    }}
                    options={vehicles?.map(type => type?.name_and_rego)}
                    onRemove={event => {
                      const selectedIds = event.map(name_and_rego => {
                        const vechicle = vehicles.find(
                          type => type?.name_and_rego === name_and_rego
                        );
                        return vechicle?.id;

                      });
                      console.log(selectedIds, 'vehicleId')
                      form.setFieldValue('vehicle_id', selectedIds.toString());
                      
                    }}
                  />
                </Col>
                {/* <Col lg={2}>
                  <BaseSelect
                    label='Customers'
                    name='customer_id'
                    placeholder='Choose One'
                    options={customers?.map(type => ({
                      value: type?.id,
                      label: `${type?.first_name} ${type?.last_name}`,
                    }))}
                    formik={form}
                  />
                </Col> */}

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
               {can?.export && <Col lg={2} className=' text-right mt-8'>
                  <Button type='submit' className=' btn bg-btn-100'>
                    Export
                  </Button>
                </Col>}
              </Row>
              <Row>
                <Col lg={3}>
                  <label className='tracking-wide text-sm mb-2 block text-gray-400'>
                    Tariff
                  </label>
                  <Multiselect
                    isObject={false}
                    onKeyPressFn={function noRefCheck() { }}
                    onSearch={function noRefCheck() { }}
                    onSelect={event => {
                      const selectedIds = event.map(name => {
                        const tariff = systemSettingDropDownData?.tariffs.find(
                          type => type?.name === name
                        );
                        return tariff?.id;
                      });

                      form.setFieldValue('tariff_id', selectedIds.toString());
                    }}
                    options={systemSettingDropDownData?.tariffs?.map(
                      type => type?.name
                    )}
                    onRemove={event => {
                      const selectedIds = event.map(name => {
                        const tariff = systemSettingDropDownData?.tariffs.find(
                          type => type?.name === name
                        );
                        return tariff?.id;
                      });

                      form.setFieldValue('tariff_id', selectedIds.toString());
                    }}
                  />
                </Col>
              </Row>
            </Form>
          </div>
        )}

        <div className='mx-5'>
         {can?.earning && <div className=' text-lg w-full flex justify-end mb-4 float-right'>
            Total earning: <strong className='ml-2'>{reports?.earning}</strong>
          </div>}
          {
            <DataTable
              data={reports?.stats}
              isLoading={isLoading}
              columns={[
                {
                  name: 'Licence Image',
                  selector: (report: ReportDataEntity) => (
                    <img
                      className='h-full rounded-full cursor-pointer'
                      src={report?.customer?.license?.front_image}
                      alt=''
                      onClick={() =>
                        handleLicenseImageClick(
                          report?.customer?.license?.front_image,
                          report?.customer?.license?.back_image
                        )
                      }
                    />
                  ),
                },
                {
                  name: 'License No',
                  selector: (report: ReportDataEntity) => (
                    <p className='text-xs'>
                      {report?.customer?.license?.licence_no
                        ? report?.customer?.license?.licence_no
                        : 'N/A'}
                    </p>
                  ),
                },
                {
                  name: 'Car Rego',
                  selector: (report: ReportDataEntity) => (
                    <p className='text-xs'>
                      {' '}
                      {report?.vehicle?.rego ? report?.vehicle?.rego : 'N/A'}
                    </p>
                  ),
                },
                {
                  name: 'Vehicle ',
                  selector: (report: ReportDataEntity) => (
                    <p className='text-xs'>
                      {' '}
                      {report?.vehicle?.name ? report?.vehicle?.name : 'N/A'}
                    </p>
                  ),
                },
                {
                  name: 'Status ',
                  selector: (report: ReportDataEntity) => (
                    <p className='text-xs'>
                      {' '}
                      {report?.status_string ? report?.status_string : 'N/A'}
                    </p>
                  ),
                },

                {
                  name: 'Customer',
                  selector: (report: ReportDataEntity) => (
                    <>
                      <p className='text-xs'>
                        {report?.customer?.full_name
                          ? report?.customer?.full_name
                          : 'N/A'}
                      </p>
                    </>
                  ),
                },
                {
                  name: ' Contact',
                  selector: (report: ReportDataEntity) => (
                    <p className='text-xs'>
                      {report?.customer?.phone
                        ? report?.customer?.phone
                        : 'N/A'}
                    </p>
                  ),
                },
                {
                  name: ' Email',
                  selector: (report: ReportDataEntity) => (
                    <p className='text-xs'>
                      {report?.customer?.email
                        ? report?.customer?.email
                        : 'N/A'}
                    </p>
                  ),
                },
                {
                  name: 'Owner ',
                  selector: (report: ReportDataEntity) => (
                    <p className='text-xs'>
                      <>
                        {' '}
                        {report?.investor?.full_name
                          ? report?.investor?.full_name
                          : 'N/A'}
                      </>
                    </p>
                  ),
                },
                {
                  name: 'Start ',
                  selector: (report: ReportDataEntity) => (
                    <p className='text-xs'>
                      {' '}
                      {report?.start_date ? (
                        <ShowFormattedDate date={report?.start_date} hideTime />
                      ) : (
                        'N/A'
                      )}
                    </p>
                  ),
                },
                {
                  name: 'End ',
                  selector: (report: ReportDataEntity) => (
                    <p className='text-xs'>
                      {report?.end_date ? (
                        <ShowFormattedDate date={report?.end_date} hideTime />
                      ) : (
                        'N/A'
                      )}
                    </p>
                  ),
                },
                {
                  name: 'Rent ',
                  selector: (report: ReportDataEntity) => (
                    <p className='text-xs'>
                      {' '}
                      {report?.rent ? report?.rent : 'N/A'} |{' '}
                      {report?.tariff?.name ?? 'N/A'}
                    </p>
                  ),
                },
                {
                  name: 'Duration',
                  selector: (report: ReportDataEntity) => (
                    <p className='text-xs'>
                      {report?.units ? report?.units : '0'}
                    </p>
                  ),
                },
                {
                  name: 'Bond',
                  selector: (report: ReportDataEntity) => (
                    <p className='text-xs'>
                      {report?.bond ? report?.bond : 'N/A'}
                    </p>
                  ),
                },
                // {
                //     name: 'Penalty ',
                //     selector: (report: any) => <h4> {'dsdaas'}</h4>
                // },
                {
                  name: 'Total ',
                  selector: (report: ReportDataEntity) => (
                    <p className='text-xs'>
                      {report?.total ? report?.total : 'N/A'}
                    </p>
                  ),
                },
                {
                  name: 'Notes ',
                  selector: (report: ReportDataEntity) => (
                    <p className='text-xs'>
                      {report?.notes ? report?.notes : 'N/A'}
                    </p>
                  ),
                },
                {
                  name: 'Address ',
                  selector: (report: ReportDataEntity) => (
                    <p className='text-xs'>
                      {report?.customer?.address
                        ? report?.customer?.address
                        : 'N/A'}
                    </p>
                  ),
                },
                {
                  name: 'State',
                  selector: (report: ReportDataEntity) => (
                    <p className='text-xs'>
                      {report?.state_country ? report?.state_country : 'N/A'}
                    </p>
                  ),
                },
              ]}
            />
          }
          <Modal show={showModal} onHide={() => setShowModal(false)} size='lg'>
            <Modal.Header closeButton>
              <Modal.Title>License Images</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Carousel>
                <Carousel.Item>
                  <img
                    className='d-block w-100 h-96'
                    src={selectedLicense.frontImage}
                    alt='Front Image'
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className='d-block w-100 h-96'
                    src={selectedLicense.backImage}
                    alt='Back Image'
                  />
                </Carousel.Item>
              </Carousel>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
}
Reports.getLayout = function getLayout(page: ReactElement) {
  return (
    <FullLayout permission={CompanyPermissions.reservations.index}>{page}</FullLayout>
  );
};
