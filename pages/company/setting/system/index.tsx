import React, { ReactElement, useEffect, useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FullLayout from '../../../../components/layouts/company/full-layout';
import BaseSelect from '../../../../components/forms/base-select';
import { globalAjaxExceptionHandler } from '../../../../utils/ajax';
import { GetSystemDropdownOptions } from '../../../../types/system/get-system-dropdown-option.type';
import PageLayout from '../../../../components/layouts/company/page-layout';
import CompanyPermissions from '../../../../permissions/company.permission';
import { SystemSettingDto } from '../../../../models/setting/system-setting.dto';
import SettingApi from '../../../../pages/api/setting';
import { useEffectAsync } from '../../../../utils/react';
import { useAuth } from '@/hooks/use-auth';
import { PermissionType } from '@/types/permissions.type';

export default function System() {
  const [dropDownData, setDropDownData] = useState<GetSystemDropdownOptions>();
  const [settingData, setSettingData] = useState<SystemSettingDto>();
  const settingApi = new SettingApi();
  const { user, hasPermission } = useAuth();
  const [can, setCan] = useState<PermissionType>(null);
  useEffect(() => {
    setCan({
      edit: hasPermission(CompanyPermissions.settings.systemSettings.edit),
    });
  }, [user]);
  const form = useFormik({
    initialValues: new SystemSettingDto(),

    onSubmit: async (values: SystemSettingDto) => {
      const form_data = new FormData();
      const {
        payment_methods_ids,
        tariff_ids,
        vehicle_type_ids,
        ...restValues
      } = values;

      if (vehicle_type_ids) {
        vehicle_type_ids.forEach((vehicle_type_id, i) => {
          form_data?.append(`vehicle_type_ids[${i}]`, vehicle_type_id);
        });
      }

      if (payment_methods_ids) {
        payment_methods_ids.forEach((payment_method_id, i) => {
          form_data?.append(`payment_methods_ids[${i}]`, payment_method_id);
        });
      }

      if (tariff_ids) {
        tariff_ids.forEach((tariff_ids, i) => {
          form_data?.append(`tariff_ids[${i}]`, tariff_ids);
        });
      }
      Object.entries(restValues).map(([key, value]) => {
        form_data.append(key, String(value));
      });
      try {
        const data = await settingApi.system.update(
          form_data as SystemSettingDto
        );
        toast.success('System Setting Updated successfully!');
      } catch (error) {
        globalAjaxExceptionHandler(error, {
          formik: form,
          defaultMessage: 'System Setting Creation Failed',
          toast,
        });
      }
    },
  });
  useEffectAsync(async () => {
    try {
      const data = await settingApi.system.systemDropdown();
      setDropDownData(data);
    } catch (error) {}
    const data = await settingApi.system.list();
    setSettingData(data);

    form.setFieldValue(
      'vehicle_type_ids',
      data?.vehicle_types?.map(type => type?.id)
    );

    form.setFieldValue('tariff_ids', data?.tariff_ids?.map(type => type?.id));

    form.setFieldValue(
      'payment_methods_ids',
      data?.payment_methods?.map(type => type?.id)
    );
  }, []);

  return (
    <PageLayout>
      <div>
        <div className='m-5'>
          <h1 className='text-2xl font-semibold text-gray-800 '>
            System Setting
          </h1>
          <form className='mt-4 grid space-y-4' onSubmit={form?.handleSubmit}>
            <div className='my-4 w-96'>
              <label className='tracking-wide text-sm mb-2 block text-gray-400'>
                Vehicle Types
              </label>
              <Multiselect
                isObject={false}
                onKeyPressFn={function noRefCheck() {}}
                onSearch={function noRefCheck() {}}
                onSelect={event => {
                  const selectedIds = event.map(name => {
                    const vehicleType = dropDownData?.vehicle_types.find(
                      vehicleType => vehicleType?.name === name
                    );
                    return vehicleType?.id;
                  });
                  form.setFieldValue('vehicle_type_ids', selectedIds);
                }}
                options={dropDownData?.vehicle_types?.map(type => type?.name)}
                selectedValues={settingData?.vehicle_types?.map(
                  type => type?.name
                )}
                onRemove={event => {
                  const selectedIds = event.map(name => {
                    const vehicleType = dropDownData?.vehicle_types.find(
                      type => type?.name === name
                    );
                    return vehicleType?.id;
                  });
                  form.setFieldValue('vehicle_type_ids', selectedIds);
                }}
              />
            </div>

            {/* <div className='my-4 w-96'>
                            <label className='tracking-wide text-sm mb-2 block text-gray-400'>Company Tariffs</label>
                            <Multiselect
                                isObject={false}
                                onKeyPressFn={function noRefCheck() { }
                                }
                                onSearch={function noRefCheck() { }}

                                onSelect={
                                    (event) => {
                                        const selectedIds = event.map((name) => {
                                            const tariff = dropDownData?.tariffs.find(
                                                (type) => type?.name === name
                                            );
                                            return tariff?.id;
                                        });
                                        form.setFieldValue(
                                            "tariff_ids", selectedIds
                                        )
                                    }

                                }
                                options={dropDownData?.tariffs?.map((type) => (
                                    type?.name
                                ))}
                                selectedValues={
                                    settingData?.tariffs?.map((type) => (
                                        type?.name
                                    ))
                                }
                                onRemove={(event) => {
                                    const selectedIds = event.map((name) => {
                                        const tariff = dropDownData?.tariffs.find(
                                            (type) => type?.name === name
                                        );
                                        return tariff?.id;
                                    });
                                    form.setFieldValue(
                                        "tariff_ids", selectedIds
                                    )
                                }}
                            />
                        </div> */}

            <div className='my-4 w-96'>
              <label className='tracking-wide text-sm mb-2 block text-gray-400'>
                Payment Methods
              </label>
              <Multiselect
                isObject={false}
                onKeyPressFn={function noRefCheck() {}}
                onSearch={function noRefCheck() {}}
                onSelect={event => {
                  const selectedIds = event.map(name => {
                    const paymentMethod = dropDownData?.payment_methods.find(
                      type => type?.name === name
                    );
                    return paymentMethod?.id;
                  });
                  form.setFieldValue('payment_methods_ids', selectedIds);
                }}
                options={dropDownData?.payment_methods?.map(type => type?.name)}
                selectedValues={settingData?.payment_methods?.map(
                  type => type?.name
                )}
                onRemove={event => {
                  const selectedIds = event.map(name => {
                    const paymentMethod = dropDownData?.payment_methods.find(
                      type => type?.name === name
                    );
                    return paymentMethod?.id;
                  });
                  form.setFieldValue('payment_methods_ids', selectedIds);
                }}
              />
            </div>
            {can?.edit && (
              <div className='text-end'>
                <Button
                  type='submit'
                  className='bg-btn-100'
                  disabled={!!form?.isSubmitting}
                >
                  Submit
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
System.getLayout = function getLayout(page: ReactElement) {
  return (
    <FullLayout permission={CompanyPermissions.settings.systemSettings.view}>
      {page}
    </FullLayout>
  );
};
