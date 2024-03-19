import React from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { BsFilterRight } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import BaseInput from '../../forms/base-input';
import BaseSelect from '../../forms/base-select';
import { GetVehiclesDropdownOptions } from '../../../types/vehicle/get-vehicles-dropdown-options.type';
import { VehicleModelEntity } from '../../../models/admin/vehicle/vehicle-model.entity';
import { FormikInterface } from '../../../utils/formik';

export interface FilterSearchBarProps {
    form?: FormikInterface<any>;
    dropDownData?: GetVehiclesDropdownOptions;
    vehicleStatusOptions?: any;
    handleBrandChange?: (e: React.ChangeEvent<any>) => void;
    vehicleModels?: VehicleModelEntity[];
    showYear?: boolean;
    title?: string;
}

export function Filter({
    form,
    dropDownData,
    vehicleStatusOptions,
    handleBrandChange,
    vehicleModels,
    showYear,
}: FilterSearchBarProps) {
    return (

        <>

            <div className='flex flex-col md:flex-row items-center justify-center rounded focus:border-blue-400 w-full text-left mt-3'>
                {Boolean(dropDownData) && (
                    <div className='mb-2 md:mb-0 md:mr-4 flex-grow'>
                        <BaseSelect
                            placeholder='Choose One'
                            name='user_id'
                            label='Owner'
                            options={dropDownData?.investors?.map(type => ({
                                value: type?.id,
                                label: `${type?.first_name} ${type?.last_name}`,
                            }))}
                            formik={form}
                        />
                    </div>
                )}
                {Boolean(vehicleStatusOptions) && (
                    <div className='mb-2 md:mb-0 md:mr-4 flex-grow'>
                        <BaseSelect
                            placeholder='Choose One'
                            name='status'
                            label='Status'
                            options={vehicleStatusOptions?.map(type => ({
                                value: type?.id,
                                label: type?.name,
                            }))}
                            formik={form}
                        />
                    </div>
                )}
                {Boolean(dropDownData) && (
                    <div className='mb-2 md:mb-0 md:mr-4 flex-grow'>
                        <BaseSelect
                            placeholder='Choose One'
                            name='brand_id'
                            label='Brand'
                            options={dropDownData?.brands?.map(type => ({
                                value: type?.id,
                                label: type?.name,
                            }))}
                            onChange={handleBrandChange}
                            formik={form}
                        />
                    </div>
                )}
                {Boolean(vehicleModels) && (
                    <div className='mb-2 md:mb-0 md:mr-4 flex-grow'>
                        <BaseSelect
                            placeholder='Choose One'
                            name='model_id'
                            label='Model'
                            options={vehicleModels?.map(type => ({
                                value: type?.id,
                                label: type?.name,
                            }))}
                            formik={form}
                        />
                    </div>
                )}
            </div>
            <div className='flex flex-col md:flex-row items-center rounded focus:border-blue-400 text-left'>
                {Boolean(dropDownData) && (
                    <>
                        <div className='mb-2 md:mb-0 md:mr-4 flex-grow'>
                            <BaseSelect
                                placeholder='Choose One'
                                name='body_type_id'
                                label='Body Type'
                                options={dropDownData?.body_types?.map(type => ({
                                    value: type?.id,
                                    label: type?.name,
                                }))}
                                formik={form}
                            />
                        </div>
                        <div className='mb-2 md:mb-0 md:mr-4 flex-grow'>
                            <BaseSelect
                                placeholder='Choose One'
                                name='transmission_id'
                                label='Transmission'
                                options={dropDownData?.transmission_types?.map(type => ({
                                    value: type?.id,
                                    label: type?.name,
                                }))}
                                formik={form}
                            />
                        </div>
                    </>
                )}
                {Boolean(showYear) && (
                    <div className='mb-2 md:mb-0 md:mr-4 flex-grow'>
                        <BaseInput
                            name='year'
                            label='Year'
                            type='number'
                            placeholder='2023'
                            formik={form}
                        />
                    </div>
                )}
                <div className=' mb-2 md:mb-0 md:mr-4 flex-grow'>
                    <BaseInput
                        name='search'
                        placeholder='search'
                        formik={form}
                    />
                </div>
                <div className='mb-2 flex space-x-2 float-right m-auto'>
                    <Button
                        type='button'
                        onClick={() => form?.handleSubmit()}
                        className='bg-btn-100'
                    >
                        <span className='flex justify-center items-center'>
                            <span>
                                <FaSearch />
                            </span>
                            <span className='ml-2'>Search</span>
                        </span>
                    </Button>
                    <Button
                        onClick={() => form.resetForm()}
                        type='button'
                        className='p-2 px-4 flex items-center justify-center bg-btn-100'
                    >
                        Clear
                    </Button>
                </div>
            </div>
        </>

    );
}
