import React from 'react';
import { toast } from 'react-toastify';
import { Col, Row } from 'react-bootstrap';
import VehichleApi from '@/pages/api/vehicle';
import { VehicleDamageEntity } from '@/models/admin/vehicle/vehicle-damage.entity';
import BaseCarousel from '@/components/forms/base-carousel';
import DeleteButton from '@/components/forms/base-delete';

export interface VehicleDamageListingProps {
  damages: VehicleDamageEntity[];
  onDelete?: (e: any) => void;
  handleSaveDamageImage?: () => Promise<any>;
}
export function VehicleDamageListing(props: VehicleDamageListingProps) {
  // const vehicleApi = new VehichleApi()

  // const onDeleteClick = async (id: number) => {
  //     try {
  //         await vehicleApi.deleteVehicleDamage(id);
  //         toast.success("Vehicle Removed Successfully")
  //     } catch (error) {
  //         toast.error("Vehicle couldn't removed")
  //     }
  // };

  return (
    <>
      {props?.damages?.map((d, i) => {
        return (
          <Row key={i}>
            <Col lg={6}>
              <div className='flex space-x-4 '>
                <div className='dmage-img cursor-pointer'>
                  <BaseCarousel images={d?.damage_images || []} />
                </div>
                <div className='leading-18 text-gray-400 align-top text-left pb-10 pt-10"'>
                  Vehicle Part
                  <br />
                  <div className='text-gray-800 text-sm'>{d?.title}</div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className='text-gray-400 text-sm'>Condition</div>
              <div className='text-gray-800 text-sm'>{d?.description}</div>
              <DeleteButton
                onDelete={async () => {
                  await props?.onDelete(d);
                  await props?.handleSaveDamageImage();
                }}
              />
            </Col>
          </Row>
        );
      })}
    </>
  );
}
