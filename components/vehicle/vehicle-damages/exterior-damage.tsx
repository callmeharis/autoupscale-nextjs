import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { FormSection } from './form-section';
import ViewModal from '@/components/view-modal';
import BaseCarousel from '@/components/forms/base-carousel';
import { DamagaeTypeEnum } from '@/enums/damage/damage-type.enum';
import domtoimage from 'dom-to-image-more';
import { VehicleDamageListing } from './vehicle-damage-listing';
import { VehicleDamageEntity } from '@/models/admin/vehicle/vehicle-damage.entity';
import VehichleApi from '@/pages/api/vehicle';
export interface ExteriorDamageProps {
  vehicleId: number;
  onSave?: (e: VehicleDamageEntity[]) => void;
  damages: any;
  onDelete?: (e: VehicleDamageEntity) => Promise<void>;
}
export default function ExteriorDamage(props: ExteriorDamageProps) {
  const [showModal, setShowModal] = useState<string>('');
  useEffect(() => {
    const container = document.getElementById('digram-box');
    if (container) {
      const anchortags = container.querySelectorAll('a');
      anchortags.forEach(anchor => {
        const anchorId = anchor?.id;
        const matchedDamaged = props?.damages?.find(
          (d: VehicleDamageEntity) => d?.damage_id === anchorId
        );
        if (anchorId === showModal) {
          anchor.classList.add('special-css-class');
        } else if (matchedDamaged) {
          anchor.classList.add('special-css-class');
        } else {
          anchor.classList.remove('special-css-class');
        }
      });
    }
  }, [props.damages, showModal]);

  const onSaveDamageImage = async () => {
    const dataUrl = await domtoimage.toJpeg(
      document.getElementById('digram-box'),
      { quality: 0.95, bgcolor: '#fff' }
    );

    const file = convertDataUriToBlob(dataUrl);
    const formData = new FormData();
    formData.append('state_image', file, 'image.jpg');
    formData.append('id', `${props.vehicleId}`);
    const vehichleApi = new VehichleApi();
    return vehichleApi.uploadDamageImage(formData);
  };

  function convertDataUriToBlob(dataURI: string) {
    const dataUriParts = dataURI.split(',');
    const byteString = Buffer.from(dataUriParts[1], 'base64').toString(
      'binary'
    );
    const mimeString = dataUriParts[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  return (
    <Row>
      <Col lg={5}>
        <div className='flex justify-around'>
          <div className='text-gray-700 text-md font-bold mb-3'>
            Add New Damage Here
          </div>
          <div className='border-green-500 border-4 p-1 m-auto text-center'>
            <span className='text-[30px] font-bold text-green-500 mb-0'>
              {props?.damages?.length}
            </span>
            <div className='text-green-500'> Damages</div>
          </div>
        </div>
        <div>
          <div id='digram-box' className='digram-box'>
            <svg
              version='1.1'
              id='Layer_1'
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              width='100%'
              height='100%'
              viewBox='0 0 400 300'
              className='myClass'
              xmlSpace='preserve'
            >
              <g>
                <path
                  className='st0'
                  d='M296.13,112.08c0,0,20.27-6.97,36.39-7.61l10.38,1.31h19.88c0,0,1.29-0.64,1.5,1.17v8.75
		c0,0-0.43,1.91-1.71,1.88c-1.29-0.04-4.62,0.04-4.62,0.04'
                ></path>
                <path
                  className='st0'
                  d='M297.03,188.23c0,0,20.27,6.97,36.39,7.61l10.38-1.31h19.88c0,0,1.29,0.64,1.5-1.17v-8.75
		c0,0-0.43-1.91-1.71-1.88c-1.29,0.04-4.62-0.04-4.62-0.04'
                ></path>
              </g>
              <g>
                <a
                  id='FRONT_BUMPER'
                  onClick={() => setShowModal('FRONT_BUMPER')}
                >
                  <path
                    id='FRONT_BUMPER'
                    className='st8 maplink'
                    d='M56.14,189.5v-80h1v-2.67h-1.9c-15.67,1.83-14.17,10.67-14.17,10.67l-0.04,65    c1.87,10.33,15.52,10.81,16.77,10.83v-3.83H56.14z'
                  ></path>
                </a>

                <a
                  id='FRONT_NUMBER_PLATE'
                  onClick={() => setShowModal('FRONT_NUMBER_PLATE')}
                >
                  <path
                    id='FRONT_NUMBER_PLATE'
                    className='st2 maplink'
                    d='M51.08,162.38h-4.9c-0.42,0-0.76-0.34-0.76-0.76v-23.38c0-0.42,0.34-0.76,0.76-0.76h4.9    c0.42,0,0.76,0.34,0.76,0.76v23.38C51.84,162.03,51.5,162.38,51.08,162.38z'
                  ></path>
                </a>

                <a
                  id='FRONT_NEAR_SIDE_HEADLAMP'
                  onClick={() => setShowModal('FRONT_NEAR_SIDE_HEADLAMP')}
                >
                  <path
                    id='FRONT_NEAR_SIDE_HEADLAMP'
                    className='st3 maplink'
                    d='M56.28,189.5h1.67v3.83c0.06,0,0.1,0,0.1,0c2.41,0.92,7.02,1.42,7.73,1.49v-1.49h0.83l0.04-22.84H56.28V189.5    z'
                  ></path>
                </a>

                <a id='FRONT_GRILL' onClick={() => setShowModal('FRONT_GRILL')}>
                  <polygon
                    id='FRONT_GRILL'
                    className='st3 linea maplink'
                    points='56.28,129.64 56.28,170.49 66.65,170.49 66.73,129.64   '
                  ></polygon>
                </a>

                <a
                  id='FRONT_OFF_SIDE_HEADLAMP'
                  onClick={() => setShowModal('FRONT_OFF_SIDE_HEADLAMP')}
                >
                  <path
                    id='FRONT_OFF_SIDE_HEADLAMP'
                    className='st3 maplink'
                    d='M66.78,106.83h-1v-1.33c-0.65,0.03-4.61,0.24-8.4,1.33h-0.1v2.67h-1v20.13h10.46L66.78,106.83z'
                  ></path>
                </a>

                <g>
                  <path
                    className='st4'
                    d='M64.83,183.54c0,2-1.62,3.62-3.62,3.62c-2,0-3.62-1.62-3.62-3.62s1.62-3.62,3.62-3.62     C63.21,179.93,64.83,181.54,64.83,183.54z'
                  ></path>
                  <path
                    className='st4'
                    d='M58.19,191.67c0.11-0.48-0.02-0.56,0.13-1.13c0.37-1.37,1.38-2.39,2.89-2.39c2,0,3.62,1.62,3.62,3.62     c0,0.61-0.17,1.18-0.44,1.69c-1.45-0.11-3.53-0.43-6.18-1.13C58.18,192.14,58.14,191.86,58.19,191.67z'
                  ></path>
                  <circle
                    className='st4'
                    cx='61.21'
                    cy='175.31'
                    r='3.62'
                  ></circle>
                </g>

                <g>
                  <path
                    className='st4'
                    d='M64.83,116.59c0-2-1.62-3.62-3.62-3.62c-2,0-3.62,1.62-3.62,3.62s1.62,3.62,3.62,3.62     C63.21,120.2,64.83,118.58,64.83,116.59z'
                  ></path>
                  <path
                    className='st4'
                    d='M58.19,108.46c0.11,0.48-0.02,0.56,0.13,1.13c0.37,1.37,1.38,2.39,2.89,2.39c2,0,3.62-1.62,3.62-3.62     c0-0.61-0.17-1.18-0.44-1.69c-1.45,0.11-3.53,0.43-6.18,1.13C58.18,107.99,58.14,108.27,58.19,108.46z'
                  ></path>
                  <path
                    className='st4'
                    d='M64.83,124.82c0-2-1.62-3.62-3.62-3.62c-2,0-3.62,1.62-3.62,3.62s1.62,3.62,3.62,3.62     C63.21,128.43,64.83,126.82,64.83,124.82z'
                  ></path>
                </g>

                <g>
                  <line
                    className='st4'
                    x1='58.43'
                    y1='130.14'
                    x2='58.43'
                    y2='170.01'
                  ></line>
                  <line
                    className='st4'
                    x1='60.46'
                    y1='130.14'
                    x2='60.46'
                    y2='170.01'
                  ></line>
                  <line
                    className='st4'
                    x1='62.5'
                    y1='130.14'
                    x2='62.5'
                    y2='170.01'
                  ></line>
                  <line
                    className='st4'
                    x1='64.07'
                    y1='130.14'
                    x2='64.07'
                    y2='170.01'
                  ></line>
                </g>

                <a id='FRONT_PANEL' onClick={() => setShowModal('FRONT_PANEL')}>
                  <path
                    id='FRONT_PANEL'
                    className='st8 maplink'
                    d='M74.85,187.33v-74.17c-1.31-6.79-5.26-7.79-7.4-7.81c-0.8,0-1.33,0.14-1.33,0.14s-0.04,0-0.1,0v1.33h1    l-0.17,86.5h-0.83v1.49c0.06,0.01,0.1,0.01,0.1,0.01h1.9C73.35,193.5,74.85,187.33,74.85,187.33z'
                  ></path>
                </a>
              </g>

              <g>
                <path
                  className='st0'
                  d='M102.79,111.97c0,0-20.27-6.97-36.39-7.61l-10.38,1.31H36.14c0,0-1.29-0.64-1.5,1.17v8.75
		c0,0,0.43,1.91,1.71,1.88c1.29-0.04,4.62,0.04,4.62,0.04'
                ></path>
                <path
                  className='st0'
                  d='M101.88,188.12c0,0-20.27,6.97-36.39,7.61l-10.38-1.31H35.24c0,0-1.29,0.64-1.5-1.17v-8.75
		c0,0,0.43-1.91,1.71-1.88c1.29,0.04,4.62-0.04,4.62-0.04'
                ></path>
              </g>
              <text
                transform='matrix(1 0 0 1 186.0109 21.897)'
                className='st6 st7'
              >
                OFF SIDE
              </text>
              <text
                transform='matrix(0 -1 1 0 28.5222 162.375)'
                className='st6 st7'
              >
                FRONT
              </text>
              <text
                transform='matrix(1 0 0 1 179.9365 282.1082)'
                className='st6 st7'
              >
                NEAR SIDE
              </text>
              <text
                transform='matrix(0 -1 1 0 376.6293 159.4824)'
                className='st6 st7'
              >
                REAR
              </text>
              <path
                className='st8'
                d='M101.05,187.18c-0.02-0.01-0.04-0.03-0.06-0.04C101.01,187.15,101.03,187.17,101.05,187.18z'
              ></path>
              <g>
                <path
                  className='st4'
                  d='M346.43,173.54c0.24,3.05,2.65,3.94,2.65,3.94l5.06-0.18v-7.72l-3.86-0.06
			C346.51,169.69,346.43,173.54,346.43,173.54z'
                ></path>

                <path
                  className='st4'
                  d='M346.43,126.09c0.24,3.05,2.65,3.94,2.65,3.94l5.06-0.18v-7.72l-3.86-0.06
			C346.51,122.24,346.43,126.09,346.43,126.09z'
                ></path>

                <a id='REAR_BUMPER' onClick={() => setShowModal('REAR_BUMPER')}>
                  <path
                    id='REAR_BUMPER'
                    className='st8 maplink'
                    d='M355.86,116.8c-1.71-10.2-9-11.76-9-11.76l-4.64-0.07c-2.12,5.83-2.86,13.37-2.86,13.37v66.02
			c0.39,4.49,2.57,8.05,4.22,10.15l3.28-0.05c0,0,7.29-1.57,9-11.76v-5.46l-1.71,0.06v0v0l-5.06,0.18c0,0-2.41-0.88-2.65-3.94
			c0,0,0.08-3.86,3.86-4.02l3.86,0.06l0,0l0,0l1.37,0.02l0.35-19.53v-0.66l-0.35-19.53l-5.22,0.08c-3.78-0.16-3.86-4.02-3.86-4.02
			c0.24-3.05,2.65-3.94,2.65-3.94l5.06,0.18v0v0l1.71,0.06V116.8z'
                  ></path>
                </a>

                <a id='REAR_PANEL' onClick={() => setShowModal('REAR_PANEL')}>
                  <path
                    id='REAR_PANEL'
                    className='st8 maplink'
                    d='M320.93,185.04l1.13-0.68v-1.74h10.77c0,0,3.86,1.13,4.34,3.22v8.76l6.15-0.09
			c-1.65-2.1-3.83-5.66-4.22-10.15v-66.02c0,0,0.74-7.54,2.86-13.37l-2.05-0.03l-2.74-0.04v10.34c-0.64,1.88-4.93,2.37-4.93,2.37
			l-10.07-0.07v-2.1l-1.23-0.2v-9.4c-0.41,0.23-0.78,0.49-1.13,0.76c-0.07,0.05-0.13,0.1-0.2,0.15c-0.14,0.12-0.28,0.24-0.42,0.36
			c-0.06,0.06-0.12,0.11-0.18,0.17c-0.13,0.12-0.26,0.25-0.38,0.38c-0.05,0.05-0.09,0.1-0.13,0.15c-0.42,0.45-0.78,0.91-1.09,1.36
			c-0.02,0.03-0.04,0.05-0.05,0.08c-0.09,0.13-0.17,0.27-0.26,0.4c-0.03,0.05-0.06,0.09-0.08,0.14c-0.07,0.12-0.15,0.24-0.21,0.36
			c-0.02,0.04-0.05,0.08-0.07,0.12c-0.21,0.37-0.37,0.71-0.49,0.98c-0.01,0.03-0.03,0.07-0.04,0.1c-0.03,0.07-0.06,0.13-0.08,0.19
			c-0.02,0.04-0.03,0.08-0.05,0.12c-0.02,0.04-0.03,0.09-0.05,0.12c-0.01,0.04-0.03,0.07-0.04,0.1c-0.01,0.02-0.02,0.04-0.02,0.06
			c-0.01,0.02-0.02,0.05-0.02,0.05v37.59v0.36v37.59c0,0,0.01,0.03,0.02,0.05c0,0.01,0.01,0.04,0.02,0.06
			c0.01,0.03,0.02,0.06,0.04,0.1c0.01,0.04,0.03,0.08,0.05,0.12c0.01,0.04,0.03,0.08,0.05,0.12c0.02,0.06,0.05,0.12,0.08,0.19
			c0.01,0.03,0.03,0.07,0.04,0.1c0.12,0.27,0.28,0.61,0.49,0.98c0.02,0.04,0.04,0.08,0.07,0.12c0.07,0.12,0.14,0.24,0.21,0.36
			c0.03,0.04,0.06,0.09,0.08,0.13c0.08,0.13,0.17,0.26,0.26,0.4c0.02,0.03,0.04,0.05,0.05,0.08c0.3,0.44,0.67,0.9,1.09,1.36
			c0.04,0.05,0.09,0.1,0.13,0.15c0.12,0.13,0.25,0.25,0.38,0.38c0.06,0.06,0.12,0.11,0.18,0.17c0.13,0.12,0.27,0.24,0.42,0.36
			c0.06,0.05,0.13,0.1,0.2,0.15c0.35,0.27,0.72,0.53,1.13,0.76V185.04z'
                  ></path>
                </a>

                <a
                  id='REAR_NUMBER_PLATE'
                  onClick={() => setShowModal('REAR_NUMBER_PLATE')}
                >
                  <path
                    id='REAR_NUMBER_PLATE'
                    className='st2 maplink'
                    d='M328.86,162.38h-4.9c-0.42,0-0.76-0.34-0.76-0.76v-23.38c0-0.42,0.34-0.76,0.76-0.76h4.9
			c0.42,0,0.76,0.34,0.76,0.76v23.38C329.62,162.03,329.28,162.38,328.86,162.38z'
                  ></path>
                </a>
                <g>
                  <a
                    id='REAR_OFF_SIDE_LIGHT'
                    onClick={() => setShowModal('REAR_OFF_SIDE_LIGHT')}
                  >
                    <path
                      id='REAR_OFF_SIDE_LIGHT'
                      className='st8 maplink'
                      d='M320.51,115.24l1.23,0.2v2.1l10.07,0.07c0,0,4.29-0.49,4.93-2.37V104.9l-13.07-0.19
				c-0.35,0.06-0.68,0.14-1,0.23c-0.12,0.03-0.23,0.07-0.35,0.11c-0.19,0.06-0.38,0.13-0.56,0.2c-0.14,0.05-0.28,0.11-0.41,0.17
				c-0.14,0.06-0.28,0.13-0.41,0.2c-0.14,0.07-0.29,0.14-0.43,0.22V115.24z'
                    ></path>
                    <circle
                      className='st4'
                      cx='332.39'
                      cy='110.38'
                      r='2.97'
                    ></circle>
                    <path
                      className='st4'
                      d='M328.46,111.82c0,1.64-1.33,2.97-2.97,2.97c-1.64,0-2.97-1.33-2.97-2.97c0-1.64,1.33-2.97,2.97-2.97
					C327.12,108.85,328.46,110.18,328.46,111.82z'
                    ></path>
                  </a>
                </g>
                <g>
                  <a
                    id='REAR_OFF_SIDE_LIGHT'
                    onClick={() => setShowModal('REAR_OFF_SIDE_LIGHT')}
                  >
                    <path
                      id='REAR_NEAR_SIDE_LIGHT'
                      className='st8 maplink'
                      d='M336.74,185.84c-0.48-2.09-4.34-3.22-4.34-3.22h-10.77v1.74l-1.13,0.68v8.62c0.14,0.08,0.28,0.15,0.43,0.22
				c0.13,0.07,0.27,0.14,0.41,0.2c0.13,0.06,0.27,0.12,0.41,0.17c0.18,0.07,0.37,0.14,0.56,0.2c0.12,0.04,0.23,0.08,0.35,0.11
				c0.32,0.09,0.65,0.17,1,0.23l13.07-0.19V185.84z'
                    ></path>
                    <path
                      className='st4'
                      d='M335.35,189.23c0,1.7-1.37,3.07-3.07,3.07s-3.07-1.37-3.07-3.07c0-1.7,1.37-3.07,3.07-3.07
					S335.35,187.54,335.35,189.23z'
                    ></path>
                    <path
                      className='st4'
                      d='M328.23,188.16c0,1.7-1.37,3.07-3.07,3.07c-1.7,0-3.07-1.37-3.07-3.07c0-1.7,1.37-3.07,3.07-3.07
					C326.85,185.09,328.23,186.47,328.23,188.16z'
                    ></path>
                  </a>
                </g>

                <a
                  id='REAR_NEAR_SIDE_EXHAUST'
                  onClick={() => setShowModal('REAR_NEAR_SIDE_EXHAUST')}
                >
                  <path
                    id='REAR_NEAR_SIDE_EXHAUST'
                    className='st5 maplink'
                    d='M353.21,173.62c0,1.55-1.25,2.8-2.8,2.8s-2.8-1.25-2.8-2.8s1.25-2.8,2.8-2.8S353.21,172.07,353.21,173.62z'
                  ></path>
                </a>

                <a
                  id='REAR_OFF_SIDE_EXHAUST'
                  onClick={() => setShowModal('REAR_OFF_SIDE_EXHAUST')}
                >
                  <path
                    id='REAR_OFF_SIDE_EXHAUST'
                    className='st5 maplink'
                    d='M353.21,126.05c0,1.55-1.25,2.8-2.8,2.8s-2.8-1.25-2.8-2.8c0-1.55,1.25-2.8,2.8-2.8
			S353.21,124.51,353.21,126.05z'
                  ></path>
                </a>
              </g>
              <g>
                <a
                  id='NEAR_SIDE_REAR_PANEL'
                  onClick={() => setShowModal('NEAR_SIDE_REAR_PANEL')}
                >
                  <path
                    id='NEAR_SIDE_REAR_PANEL'
                    className='st8 maplink'
                    d='M277.58,223.11l-25.01,1.37v14.4c1.2-0.47,1.98-0.66,1.98-0.66l6.43-0.21c12.43,1.93,15.21,12.64,15.21,12.64
		l-0.04-0.74l26.73-0.52v-7.3H291.4c0,0-1.79-2.63-2.14-5.46v-8.68h1.5V226l9.24-0.21c-0.97-1.57-1.97-2.82-2.65-3.6l-7.45-0.15
		l-12.32-13.5v10.82V223.11z'
                  ></path>
                </a>

                <a
                  id='NEAR_SIDE_FRONT_PANEL'
                  onClick={() => setShowModal('NEAR_SIDE_FRONT_PANEL')}
                >
                  <path
                    id='NEAR_SIDE_FRONT_PANEL'
                    className='st8 maplink'
                    d='M152.54,230.98l-39.02,0.37c-3.74,0.63-7.08,1.16-9.49,1.54l-0.59,8.03c-0.88,4.42-10.13,6.03-10.13,6.03
		h-7.21v3.48h27.21c3.43-9.75,14.04-11.68,14.04-11.68h7.82c11.57,2.25,13.82,14.3,13.82,14.3v10.66h3.54v-4.07V230.98z'
                  ></path>
                </a>
                <path
                  className='st8'
                  d='M106.37,263.43c-0.39-0.02-0.8-0.05-1.21-0.08C105.57,263.38,105.98,263.41,106.37,263.43z'
                ></path>
                <path
                  className='st8'
                  d='M100.09,233.49c0,0,0.01,0,0.01,0C100.1,233.49,100.09,233.49,100.09,233.49z'
                ></path>
                <path
                  className='st8'
                  d='M283.3,208.47c0.09,0.08,0.18,0.16,0.27,0.24C283.49,208.62,283.39,208.55,283.3,208.47z'
                ></path>
                <path
                  className='st8'
                  d='M296.53,221.29c0,0,0.33,0.33,0.82,0.9C296.85,221.61,296.53,221.29,296.53,221.29z'
                ></path>
                <path
                  className='st8'
                  d='M104.89,263.33c-0.4-0.03-0.8-0.06-1.21-0.09C104.09,263.27,104.49,263.3,104.89,263.33z'
                ></path>
                <path
                  className='st8'
                  d='M300,225.79c0.12,0.2,0.25,0.41,0.37,0.63C300.25,226.2,300.13,225.99,300,225.79z'
                ></path>
                <path
                  className='st8'
                  d='M107.6,263.5c-0.36-0.02-0.74-0.04-1.13-0.07C106.86,263.46,107.23,263.48,107.6,263.5z'
                ></path>
                <path
                  className='st8'
                  d='M301.06,227.69c0.09,0.18,0.17,0.35,0.26,0.54C301.23,228.05,301.15,227.87,301.06,227.69z'
                ></path>
                <path
                  className='st8'
                  d='M97.66,262.59c-0.39-0.06-0.77-0.12-1.14-0.18C96.88,262.48,97.27,262.54,97.66,262.59z'
                ></path>
                <path
                  className='st8'
                  d='M300.54,226.71c0.1,0.18,0.2,0.37,0.3,0.56C300.74,227.08,300.64,226.89,300.54,226.71z'
                ></path>
                <path
                  className='st8'
                  d='M100.55,262.96c-0.42-0.04-0.83-0.09-1.24-0.14C99.72,262.86,100.14,262.91,100.55,262.96z'
                ></path>
                <path
                  className='st8'
                  d='M103.39,263.22c-0.42-0.03-0.84-0.07-1.26-0.11C102.55,263.15,102.97,263.18,103.39,263.22z'
                ></path>
                <path
                  className='st8'
                  d='M100.2,233.47c0.04-0.01,0.09-0.01,0.14-0.02C100.29,233.46,100.24,233.47,100.2,233.47z'
                ></path>
                <path
                  className='st8'
                  d='M301.55,228.74c0.07,0.17,0.15,0.34,0.22,0.52C301.69,229.08,301.62,228.91,301.55,228.74z'
                ></path>
                <path
                  className='st8'
                  d='M282.41,207.73c0.11,0.08,0.23,0.17,0.34,0.26C282.64,207.9,282.52,207.82,282.41,207.73z'
                ></path>
                <path
                  className='st8'
                  d='M94.22,261.91c-0.27-0.08-0.52-0.16-0.75-0.24C93.69,261.75,93.95,261.83,94.22,261.91z'
                ></path>
                <path
                  className='st8'
                  d='M99.06,262.78c-0.4-0.05-0.79-0.1-1.17-0.16C98.27,262.68,98.66,262.73,99.06,262.78z'
                ></path>
                <path
                  className='st8'
                  d='M101.94,263.09c-0.4-0.04-0.81-0.08-1.21-0.12C101.13,263.02,101.54,263.06,101.94,263.09z'
                ></path>
                <polygon
                  className='st8'
                  points='277.26,263.71 277.26,263.71 276.47,254.11 	'
                ></polygon>
                <path
                  className='st8'
                  d='M112.47,263.71c0,0-0.02,0-0.05,0C112.45,263.71,112.47,263.71,112.47,263.71z'
                ></path>
                <path
                  className='st8'
                  d='M110.09,263.63c1.03,0.04,1.79,0.07,2.15,0.08c-0.14,0-0.33-0.01-0.58-0.02
		C111.25,263.67,110.72,263.65,110.09,263.63z'
                ></path>
                <path
                  className='st8'
                  d='M112.4,263.71c-0.03,0-0.08,0-0.14,0C112.33,263.71,112.37,263.71,112.4,263.71z'
                ></path>
                <path
                  className='st8'
                  d='M95.28,262.17c-0.32-0.07-0.62-0.14-0.9-0.22C94.66,262.03,94.96,262.1,95.28,262.17z'
                ></path>
                <path
                  className='st8'
                  d='M90.24,260.23c1.39,1.02,2.52,1.13,2.52,1.13c0.17,0.1,0.38,0.19,0.61,0.27c-0.23-0.09-0.44-0.18-0.61-0.27
		C92.76,261.36,91.63,261.25,90.24,260.23z'
                ></path>
                <path
                  className='st8'
                  d='M87.52,257.06c-0.35-0.62-0.68-1.32-0.98-2.13C86.84,255.74,87.18,256.44,87.52,257.06z'
                ></path>
                <path
                  className='st8'
                  d='M108.84,263.57c-0.34-0.02-0.69-0.04-1.06-0.06C108.15,263.53,108.5,263.55,108.84,263.57z'
                ></path>
                <path
                  className='st8'
                  d='M96.43,262.4c-0.35-0.06-0.69-0.13-1.01-0.19C95.75,262.27,96.08,262.34,96.43,262.4z'
                ></path>
                <path
                  className='st8'
                  d='M109.97,263.62c-0.3-0.01-0.62-0.03-0.95-0.04C109.35,263.59,109.67,263.61,109.97,263.62z'
                ></path>

                <a
                  id='NEAR_SIDE_DRIVER_DOOR'
                  onClick={() => setShowModal('NEAR_SIDE_DRIVER_DOOR')}
                >
                  <polygon
                    id='NEAR_SIDE_DRIVER_DOOR'
                    className='st8 maplink'
                    points='203.93,230.07 152.54,230.98 152.54,259.64 203.93,259.64 204.99,229.22 	'
                  ></polygon>
                </a>

                <a
                  id='NEAR_SIDE_DRIVER_WINDOW'
                  onClick={() => setShowModal('NEAR_SIDE_DRIVER_WINDOW')}
                >
                  <path
                    id='NEAR_SIDE_DRIVER_WINDOW'
                    className='st8 maplink'
                    d='M205.27,226.28l2.98-19.99h-11.4c-27.77,4.9-39.73,18.1-42.2,21.2l1.32,0.66L205.27,226.28z'
                  ></path>
                </a>

                <a
                  id='NEAR_SIDE_PASSENGER_DOOR'
                  onClick={() => setShowModal('NEAR_SIDE_PASSENGER_DOOR')}
                >
                  <path
                    id='NEAR_SIDE_PASSENGER_DOOR'
                    className='st8 maplink'
                    d='M203.93,259.64h30.42c2.05-12.14,15.23-30.76,15.73-31.47l-45.08,1.04L203.93,259.64z'
                  ></path>
                </a>

                <a
                  id='NEAR_SIDE_SIDE_WINDOW'
                  onClick={() => setShowModal('NEAR_SIDE_SIDE_WINDOW')}
                >
                  <path
                    id='NEAR_SIDE_SIDE_WINDOW'
                    className='st8 maplink'
                    d='M265.26,207.57l-18.86-1.29h-7.44l0.8,1.29l10.33,17.02l1.27-0.05l26.22-1.43v-3.75l-5.46-7.93
		C270.62,208.43,265.26,207.57,265.26,207.57z'
                  ></path>
                </a>

                <path
                  className='st5'
                  d='M94.38,261.96c-0.05-0.01-0.11-0.03-0.16-0.04C94.27,261.93,94.33,261.94,94.38,261.96z'
                ></path>
                <path
                  className='st5'
                  d='M93.47,261.67c-0.04-0.01-0.07-0.03-0.1-0.04C93.4,261.64,93.43,261.66,93.47,261.67z'
                ></path>
                <path
                  className='st5'
                  d='M95.43,262.2c-0.05-0.01-0.1-0.02-0.15-0.03C95.33,262.18,95.38,262.19,95.43,262.2z'
                ></path>
                <path
                  className='st5'
                  d='M96.52,262.41c-0.03-0.01-0.06-0.01-0.09-0.02C96.46,262.4,96.49,262.41,96.52,262.41z'
                ></path>
                <path
                  className='st5'
                  d='M97.89,262.63c-0.08-0.01-0.15-0.02-0.23-0.03C97.73,262.61,97.81,262.62,97.89,262.63z'
                ></path>
                <path
                  className='st5'
                  d='M102.13,263.11c-0.06-0.01-0.12-0.01-0.19-0.02C102,263.1,102.07,263.1,102.13,263.11z'
                ></path>
                <path
                  className='st5'
                  d='M107.78,263.51c-0.06,0-0.12-0.01-0.19-0.01C107.66,263.51,107.72,263.51,107.78,263.51z'
                ></path>
                <path
                  className='st5'
                  d='M106.47,263.44c-0.03,0-0.07,0-0.1-0.01C106.4,263.43,106.43,263.43,106.47,263.44z'
                ></path>
                <path
                  className='st5'
                  d='M109.02,263.58c-0.06,0-0.12-0.01-0.17-0.01C108.9,263.57,108.96,263.57,109.02,263.58z'
                ></path>
                <path
                  className='st5'
                  d='M99.32,262.82c-0.09-0.01-0.17-0.02-0.26-0.03C99.14,262.79,99.23,262.8,99.32,262.82z'
                ></path>
                <path
                  className='st5'
                  d='M110.09,263.63c-0.04,0-0.08,0-0.12-0.01C110.01,263.62,110.05,263.62,110.09,263.63z'
                ></path>
                <path
                  className='st5'
                  d='M105.16,263.35c-0.09-0.01-0.18-0.01-0.27-0.02C104.98,263.34,105.07,263.34,105.16,263.35z'
                ></path>
                <path
                  className='st5'
                  d='M100.73,262.97c-0.06-0.01-0.12-0.01-0.18-0.02C100.61,262.96,100.67,262.97,100.73,262.97z'
                ></path>
                <path
                  className='st5'
                  d='M103.68,263.24c-0.1-0.01-0.19-0.02-0.29-0.02C103.49,263.23,103.59,263.23,103.68,263.24z'
                ></path>

                <a
                  id='NEAR_SIDE_FRONT_BUMPER'
                  onClick={() => setShowModal('NEAR_SIDE_FRONT_BUMPER')}
                >
                  <path
                    id='NEAR_SIDE_FRONT_BUMPER'
                    className='st8 maplink'
                    d='M86.12,253.64c0.13,0.46,0.28,0.88,0.43,1.29c0.3,0.81,0.63,1.51,0.98,2.13c0.87,1.54,1.85,2.54,2.72,3.17
		c1.39,1.02,2.52,1.13,2.52,1.13c0.17,0.1,0.38,0.19,0.61,0.27c0.04,0.01,0.07,0.03,0.1,0.04c0.23,0.08,0.48,0.16,0.75,0.24
		c0.05,0.01,0.11,0.03,0.16,0.04c0.28,0.08,0.58,0.15,0.9,0.22c0.05,0.01,0.1,0.02,0.15,0.03c0.32,0.07,0.65,0.13,1.01,0.19
		c0.03,0.01,0.06,0.01,0.09,0.02c0.36,0.06,0.75,0.12,1.14,0.18c0.08,0.01,0.15,0.02,0.23,0.03c0.38,0.05,0.77,0.11,1.17,0.16
		c0.09,0.01,0.17,0.02,0.26,0.03c0.41,0.05,0.82,0.1,1.24,0.14c0.06,0.01,0.12,0.01,0.18,0.02c0.4,0.04,0.8,0.08,1.21,0.12
		c0.06,0.01,0.12,0.01,0.19,0.02c0.42,0.04,0.84,0.07,1.26,0.11c0.1,0.01,0.19,0.02,0.29,0.02c0.41,0.03,0.81,0.06,1.21,0.09
		c0.09,0.01,0.18,0.01,0.27,0.02c0.41,0.03,0.82,0.06,1.21,0.08c0.03,0,0.07,0,0.1,0.01c0.39,0.02,0.76,0.05,1.13,0.07
		c0.06,0,0.12,0.01,0.19,0.01c0.37,0.02,0.72,0.04,1.06,0.06c0.06,0,0.12,0.01,0.17,0.01c0.33,0.02,0.65,0.03,0.95,0.04
		c0.04,0,0.08,0,0.12,0.01c0.63,0.03,1.17,0.05,1.57,0.06l1.68-13.26H86.12V253.64z'
                  ></path>
                </a>

                <path
                  className='st5'
                  d='M112.27,263.71c-0.01,0-0.02,0-0.03,0C112.25,263.71,112.26,263.71,112.27,263.71z'
                ></path>
                <path
                  className='st5'
                  d='M112.42,263.71c0,0-0.01,0-0.02,0C112.41,263.71,112.41,263.71,112.42,263.71z'
                ></path>
                <path
                  className='st8'
                  d='M112.23,263.71c0.01,0,0.02,0,0.03,0c0.06,0,0.1,0,0.14,0c0,0,0.01,0,0.02,0c0.03,0,0.05,0,0.05,0l0.86-13.29
		l-1.68,13.26C111.9,263.7,112.1,263.7,112.23,263.71z'
                ></path>
                <path
                  className='st5'
                  d='M301.08,256.66c-0.26,0.2-0.56,0.42-0.88,0.65C300.53,257.09,300.82,256.87,301.08,256.66z'
                ></path>
                <path
                  className='st5'
                  d='M299.68,257.66c-0.36,0.24-0.77,0.48-1.21,0.73C298.91,258.14,299.32,257.89,299.68,257.66z'
                ></path>
                <path
                  className='st5'
                  d='M277.26,263.71c7.07-0.52,12.31-1.71,16.14-3.07C289.57,262,284.33,263.2,277.26,263.71L277.26,263.71z'
                ></path>
                <path
                  className='st5'
                  d='M296.22,259.52c-0.56,0.25-1.17,0.51-1.82,0.76C295.06,260.03,295.66,259.77,296.22,259.52z'
                ></path>
                <path
                  className='st5'
                  d='M297.79,258.76c-0.48,0.25-1,0.51-1.56,0.76C296.79,259.26,297.31,259.01,297.79,258.76z'
                ></path>
                <polygon
                  className='st5'
                  points='276.19,250.64 276.19,250.64 276.47,254.11 276.19,250.64 	'
                ></polygon>

                <a
                  id='NEAR_SIDE_REAR_BUMPER'
                  onClick={() => setShowModal('NEAR_SIDE_REAR_BUMPER')}
                >
                  <path
                    id='NEAR_SIDE_REAR_BUMPER'
                    className='st8 maplink'
                    d='M276.19,250.64L276.19,250.64l0.28,3.47l0.79,9.61c7.07-0.52,12.31-1.71,16.14-3.07
		c0.35-0.12,0.68-0.25,1.01-0.37c0.65-0.25,1.26-0.5,1.82-0.76s1.08-0.51,1.56-0.76c0.24-0.13,0.47-0.25,0.69-0.37
		c0.44-0.25,0.84-0.49,1.21-0.73c0.18-0.12,0.36-0.23,0.52-0.35c0.33-0.23,0.62-0.44,0.88-0.65c1.31-1.02,1.8-1.74,1.8-1.74v-5.55
		l-26.73,0.52L276.19,250.64z'
                  ></path>
                </a>
                <path
                  className='st5'
                  d='M282.75,207.99c0.19,0.15,0.37,0.31,0.55,0.47C283.12,208.3,282.94,208.14,282.75,207.99z'
                ></path>
                <path
                  className='st5'
                  d='M283.57,208.71c0.26,0.25,0.51,0.51,0.74,0.79C284.08,209.22,283.83,208.96,283.57,208.71z'
                ></path>
                <polygon
                  className='st5'
                  points='297.36,222.19 297.35,222.18 297.36,222.19 	'
                ></polygon>

                <a
                  id='NEAR_SIDE_REAR_WINDOW'
                  onClick={() => setShowModal('NEAR_SIDE_REAR_WINDOW')}
                >
                  <path
                    id='NEAR_SIDE_REAR_WINDOW'
                    className='st8 maplink'
                    d='M289.9,222.04l7.45,0.15c0,0,0,0-0.01-0.01c-0.49-0.57-0.82-0.9-0.82-0.9l-12.22-11.79
		c-0.23-0.28-0.48-0.54-0.74-0.79c-0.09-0.08-0.18-0.16-0.27-0.24c-0.18-0.16-0.36-0.32-0.55-0.47c-0.11-0.09-0.23-0.17-0.34-0.26
		c-0.18-0.13-0.36-0.26-0.55-0.39c-0.12-0.08-0.25-0.16-0.38-0.24c-0.19-0.12-0.38-0.23-0.57-0.34c-0.13-0.07-0.26-0.15-0.39-0.22
		c-0.2-0.1-0.4-0.2-0.6-0.3c-0.13-0.06-0.26-0.13-0.38-0.18c-0.22-0.1-0.44-0.19-0.65-0.28c-0.11-0.05-0.22-0.1-0.34-0.14
		c-0.32-0.13-0.65-0.25-0.97-0.36v3.25L289.9,222.04z'
                  ></path>
                </a>
                <path
                  className='st5'
                  d='M93.42,235.18c-2.76,1.42-4.51,3.5-5.6,5.4C88.91,238.68,90.66,236.6,93.42,235.18z'
                ></path>
                <path
                  className='st5'
                  d='M86.45,243.72c0.07-0.24,0.16-0.5,0.26-0.77C86.61,243.23,86.52,243.49,86.45,243.72z'
                ></path>
                <path
                  className='st5'
                  d='M93.42,235.18c0.5-0.26,1.04-0.49,1.61-0.7C94.46,234.68,93.92,234.92,93.42,235.18z'
                ></path>
                <path
                  className='st5'
                  d='M95.03,234.47c0.57-0.21,1.18-0.39,1.83-0.54C96.21,234.08,95.6,234.27,95.03,234.47z'
                ></path>
                <path
                  className='st5'
                  d='M87.29,241.58c0.16-0.33,0.33-0.66,0.53-1.01C87.62,240.92,87.45,241.25,87.29,241.58z'
                ></path>
                <path
                  className='st5'
                  d='M100.1,233.49c0.03,0,0.06-0.01,0.1-0.01C100.17,233.48,100.13,233.49,100.1,233.49z'
                ></path>
                <path
                  className='st5'
                  d='M86.88,242.52c0.12-0.3,0.26-0.61,0.41-0.94C87.13,241.91,87,242.22,86.88,242.52z'
                ></path>
                <path
                  className='st5'
                  d='M100.02,233.5c0,0,0.03,0,0.07-0.01C100.05,233.5,100.02,233.5,100.02,233.5z'
                ></path>
                <path
                  className='st5'
                  d='M104.03,232.89c-1.82,0.28-3.12,0.48-3.69,0.57C100.91,233.37,102.21,233.17,104.03,232.89L104.03,232.89z'
                ></path>
                <path
                  className='st5'
                  d='M300.84,227.27c0.07,0.14,0.15,0.28,0.22,0.42C300.99,227.55,300.92,227.41,300.84,227.27z'
                ></path>
                <polygon
                  className='st5'
                  points='300,225.79 300,225.79 300,225.79 	'
                ></polygon>
                <path
                  className='st5'
                  d='M300.37,226.41c0.06,0.1,0.11,0.19,0.17,0.29C300.48,226.61,300.43,226.51,300.37,226.41z'
                ></path>
                <path
                  className='st5'
                  d='M301.32,228.23c0.08,0.17,0.16,0.34,0.23,0.51C301.47,228.57,301.4,228.4,301.32,228.23z'
                ></path>
                <path
                  className='st8'
                  d='M204.99,229.22l0.05-1.4l0.23-1.54l-49.3,1.86l-1.32-0.66c-0.34,0.42-0.5,0.66-0.5,0.66l-1.61,2.84l51.39-0.91
		L204.99,229.22z'
                ></path>

                <a
                  id='NEAR_SIDE_PASSENGER_WINDOW'
                  onClick={() => setShowModal('NEAR_SIDE_PASSENGER_WINDOW')}
                >
                  <polygon
                    id='NEAR_SIDE_PASSENGER_WINDOW'
                    className='st8 maplink'
                    points='250.08,224.59 239.76,207.57 238.96,206.29 208.26,206.29 205.27,226.28 	'
                  ></polygon>
                </a>
                <path
                  className='st8'
                  d='M205.27,226.28l-0.23,1.54l-0.05,1.4l45.08-1.04c0.01-0.01,1.02-0.03,1.02-0.03l-1-3.54l-0.01-0.02
		L205.27,226.28z'
                ></path>
                <polygon
                  className='st8'
                  points='250.1,224.61 251.35,224.54 250.08,224.59 	'
                ></polygon>

                <a
                  id='NEAR_SIDE_FRONT_HEADLAMP'
                  onClick={() => setShowModal('NEAR_SIDE_FRONT_HEADLAMP')}
                >
                  <g id='NEAR_SIDE_FRONT_HEADLAMP'>
                    <path
                      className='st8 maplink'
                      d='M103.45,240.92l0.59-8.03c-1.82,0.28-3.12,0.48-3.69,0.57c-0.06,0.01-0.1,0.02-0.14,0.02
			c-0.04,0.01-0.07,0.01-0.1,0.01c-0.01,0-0.01,0-0.01,0c-0.04,0.01-0.07,0.01-0.07,0.01c-1.15,0.06-2.2,0.21-3.17,0.43
			c-0.65,0.15-1.25,0.33-1.83,0.54c-0.57,0.21-1.11,0.44-1.61,0.7c-2.76,1.42-4.51,3.5-5.6,5.4c-0.2,0.34-0.37,0.68-0.53,1.01
			s-0.29,0.64-0.41,0.94c-0.06,0.15-0.12,0.29-0.17,0.43c-0.1,0.28-0.19,0.54-0.26,0.77c-0.25,0.82-0.33,1.35-0.33,1.35v1.88h7.21
			C93.32,246.95,102.56,245.34,103.45,240.92z'
                    ></path>
                    <path
                      className='st4'
                      d='M98.76,241.07c0,2.08-1.32,3.77-2.94,3.77s-2.94-1.69-2.94-3.77s1.32-3.77,2.94-3.77
			S98.76,238.99,98.76,241.07z'
                    ></path>
                  </g>
                </a>

                <a
                  id='NEAR_SIDE_REAR_HEADLAMP'
                  onClick={() => setShowModal('NEAR_SIDE_REAR_HEADLAMP')}
                >
                  <g id='NEAR_SIDE_REAR_HEADLAMP'>
                    <path
                      className='st8 maplink'
                      d='M302.74,232.63c-0.02-0.13-0.05-0.26-0.08-0.4c-0.05-0.26-0.1-0.51-0.17-0.77c-0.04-0.16-0.09-0.31-0.13-0.47
			c-0.06-0.22-0.13-0.44-0.2-0.66c-0.06-0.17-0.12-0.33-0.18-0.5c-0.07-0.2-0.14-0.39-0.22-0.58c-0.07-0.17-0.14-0.35-0.22-0.52
			c-0.07-0.17-0.15-0.34-0.23-0.51c-0.08-0.18-0.17-0.36-0.26-0.54c-0.07-0.14-0.14-0.28-0.22-0.42c-0.1-0.19-0.2-0.38-0.3-0.56
			c-0.06-0.1-0.11-0.2-0.17-0.29c-0.12-0.21-0.25-0.42-0.37-0.63l0,0l-9.24,0.21v1.93h-1.5v8.68c0.35,2.84,2.14,5.46,2.14,5.46
			h11.48v-8.25C302.85,233.42,302.8,233.02,302.74,232.63z'
                    ></path>
                    <circle
                      className='st11'
                      cx='295.95'
                      cy='230.98'
                      r='2.84'
                    ></circle>
                    <path
                      className='st11'
                      d='M300.19,237.91c0,1.57-1.27,2.84-2.84,2.84c-1.57,0-2.84-1.27-2.84-2.84s1.27-2.84,2.84-2.84
			C298.92,235.07,300.19,236.34,300.19,237.91z'
                    ></path>
                  </g>
                </a>

                <a
                  id='NEAR_SIDE_FUEL_CAP'
                  onClick={() => setShowModal('NEAR_SIDE_FUEL_CAP')}
                >
                  <path
                    id='NEAR_SIDE_FUEL_CAP'
                    className='st2 maplink'
                    d='M272.12,229.11c0.16,0,1.66,0,1.66,0v-1.29h7.02l1.77,2.41v5.09l-1.77,1.71l-6.43,0.21l-0.38-1.07h-1.88
		V229.11z'
                  ></path>
                </a>

                <a
                  id='NEAR_SIDE_WING_MIRROR'
                  onClick={() => setShowModal('NEAR_SIDE_WING_MIRROR')}
                >
                  <polygon
                    id='NEAR_SIDE_WING_MIRROR'
                    className='st2 maplink'
                    points='149.41,235.46 146.36,235.46 145.47,236.18 145.47,237.22 149.41,237.22 	'
                  ></polygon>
                </a>

                <rect
                  x='193.47'
                  y='237.22'
                  className='st2'
                  width='8.04'
                  height='2.17'
                ></rect>
                <rect
                  x='232.69'
                  y='237.22'
                  className='st2'
                  width='8.04'
                  height='2.17'
                ></rect>
                <g>
                  <a
                    id='NEAR_SIDE_FRONT_TYPE'
                    onClick={() => setShowModal('NEAR_SIDE_FRONT_TYPE')}
                  >
                    <ellipse
                      id='NEAR_SIDE_FRONT_TYPE'
                      transform='matrix(0.9239 -0.3827 0.3827 0.9239 -88.082 69.5987)'
                      className='st8 maplink'
                      cx='130.91'
                      cy='256.21'
                      rx='16.29'
                      ry='16.29'
                    ></ellipse>
                  </a>

                  <a
                    id='NEAR_SIDE_FRONT_WHEEL'
                    onClick={() => setShowModal('NEAR_SIDE_FRONT_WHEEL')}
                  >
                    <circle
                      id='NEAR_SIDE_FRONT_WHEEL'
                      className='st8 maplink'
                      cx='130.61'
                      cy='256.51'
                      r='10.85'
                    ></circle>
                  </a>
                </g>
                <g>
                  <a
                    id='NEAR_SIDE_REAR_TYPE'
                    onClick={() => setShowModal('NEAR_SIDE_REAR_TYPE')}
                  >
                    <ellipse
                      id='NEAR_SIDE_REAR_TYPE'
                      transform='matrix(0.9254 -0.3789 0.3789 0.9254 -77.8215 116.9655)'
                      className='st8 maplink'
                      cx='258.27'
                      cy='256.21'
                      rx='16.29'
                      ry='16.29'
                    ></ellipse>
                  </a>

                  <a
                    id='NEAR_SIDE_REAR_WHEEL'
                    onClick={() => setShowModal('NEAR_SIDE_REAR_WHEEL')}
                  >
                    <circle
                      id='NEAR_SIDE_REAR_WHEEL'
                      className='st8 maplink'
                      cx='257.97'
                      cy='256.51'
                      r='10.85'
                    ></circle>
                  </a>
                </g>
                <polygon
                  className='st12'
                  points='252.57,224.47 277.58,223.11 252.57,224.47 	'
                ></polygon>
                <path
                  className='st12'
                  d='M203.93,259.64h30.42c2.05-12.14,15.23-30.76,15.73-31.47l1.45-0.03l-1.43-3.54l1.26-0.07l1.21-0.07l0,0
		l25.01-1.37v-3.75l-5.46-7.93c-1.5-3-6.86-3.86-6.86-3.86l-18.86-1.29h-7.44h-30.7h-11.4c-27.77,4.9-39.73,18.1-42.2,21.2
		c-0.34,0.42-0.5,0.66-0.5,0.66l-1.61,2.84v28.66H203.93z'
                ></path>

                <a
                  id='NEAR_SIDE_BODY_TRIM'
                  onClick={() => setShowModal('NEAR_SIDE_BODY_TRIM')}
                >
                  <path
                    id='NEAR_SIDE_BODY_TRIM'
                    className='st8 maplink'
                    d='M271.69,203.93h-74.57c-23.36,0.21-51.64,20.14-51.64,20.14c-2.27,2-19.38,5.18-31.94,7.28l39.02-0.37
		l1.61-2.84c0,0,0.16-0.24,0.5-0.66c2.47-3.09,14.43-16.29,42.2-21.2h11.4h30.7h7.44l18.86,1.29c0,0,5.36,0.86,6.86,3.86l5.46,7.93
		v-10.82v-3.25C274.46,204.2,271.69,203.93,271.69,203.93z'
                  ></path>
                </a>

                <a
                  id='NEAR_SIDE_UNDER_TRIM'
                  onClick={() => setShowModal('NEAR_SIDE_UNDER_TRIM')}
                >
                  <path
                    id='NEAR_SIDE_UNDER_TRIM'
                    className='st8 maplink'
                    d='M251.35,224.54l-1.26,0.07l1.43,3.54l-1.45,0.03c-0.5,0.7-13.68,19.33-15.73,31.47h-30.42h-51.39v4.07h88.07
		v-10.07c0.97-9.34,8.34-13.35,11.95-14.77v-14.4L251.35,224.54z'
                  ></path>
                </a>
              </g>
              <g>
                <a
                  id='OFF_SIDE_REAR_PANEL'
                  onClick={() => setShowModal('OFF_SIDE_REAR_PANEL')}
                >
                  <path
                    id='OFF_SIDE_REAR_PANEL'
                    className='st8 maplink'
                    d='M277.58,74.21l-25.01-1.37v-14.4c1.2,0.47,1.98,0.66,1.98,0.66l6.43,0.21c12.43-1.93,15.21-12.64,15.21-12.64
		l-0.04,0.74l26.73,0.52v7.3H291.4c0,0-1.79,2.63-2.14,5.46v8.68h1.5v1.93l9.24,0.21c-0.97,1.57-1.97,2.82-2.65,3.6l-7.45,0.15
		l-12.32,13.5V77.96V74.21z'
                  ></path>
                </a>

                <a
                  id='OFF_SIDE_FRONT_PANEL'
                  onClick={() => setShowModal('OFF_SIDE_FRONT_PANEL')}
                >
                  <path
                    id='OFF_SIDE_FRONT_PANEL'
                    className='st8 maplink'
                    d='M152.54,66.33l-39.02-0.37c-3.74-0.63-7.08-1.16-9.49-1.54l-0.59-8.03c-0.88-4.42-10.13-6.03-10.13-6.03h-7.21
		v-3.48h27.21c3.43,9.75,14.04,11.68,14.04,11.68h7.82c11.57-2.25,13.82-14.3,13.82-14.3V33.6h3.54v4.07V66.33z'
                  ></path>
                </a>

                <path
                  className='st8'
                  d='M106.37,33.88c-0.39,0.02-0.8,0.05-1.21,0.08C105.57,33.94,105.98,33.91,106.37,33.88z'
                ></path>
                <path
                  className='st8'
                  d='M100.09,63.82c0,0,0.01,0,0.01,0C100.1,63.83,100.09,63.83,100.09,63.82z'
                ></path>
                <path
                  className='st8'
                  d='M283.3,88.85c0.09-0.08,0.18-0.16,0.27-0.24C283.49,88.69,283.39,88.77,283.3,88.85z'
                ></path>
                <path
                  className='st8'
                  d='M296.53,76.03c0,0,0.33-0.33,0.82-0.9C296.85,75.7,296.53,76.03,296.53,76.03z'
                ></path>
                <path
                  className='st8'
                  d='M104.89,33.98c-0.4,0.03-0.8,0.06-1.21,0.09C104.09,34.04,104.49,34.01,104.89,33.98z'
                ></path>
                <path
                  className='st8'
                  d='M300,71.53c0.12-0.2,0.25-0.41,0.37-0.63C300.25,71.11,300.13,71.33,300,71.53z'
                ></path>
                <path
                  className='st8'
                  d='M107.6,33.81c-0.36,0.02-0.74,0.04-1.13,0.07C106.86,33.85,107.23,33.83,107.6,33.81z'
                ></path>
                <path
                  className='st8'
                  d='M301.06,69.62c0.09-0.18,0.17-0.35,0.26-0.54C301.23,69.27,301.15,69.45,301.06,69.62z'
                ></path>
                <path
                  className='st8'
                  d='M97.66,34.72c-0.39,0.06-0.77,0.12-1.14,0.18C96.88,34.84,97.27,34.78,97.66,34.72z'
                ></path>
                <path
                  className='st8'
                  d='M300.54,70.61c0.1-0.18,0.2-0.37,0.3-0.56C300.74,70.23,300.64,70.42,300.54,70.61z'
                ></path>
                <path
                  className='st8'
                  d='M100.55,34.36c-0.42,0.04-0.83,0.09-1.24,0.14C99.72,34.45,100.14,34.4,100.55,34.36z'
                ></path>
                <path
                  className='st8'
                  d='M103.39,34.1c-0.42,0.03-0.84,0.07-1.26,0.11C102.55,34.17,102.97,34.13,103.39,34.1z'
                ></path>
                <path
                  className='st8'
                  d='M100.2,63.84c0.04,0.01,0.09,0.01,0.14,0.02C100.29,63.85,100.24,63.85,100.2,63.84z'
                ></path>
                <path
                  className='st8'
                  d='M301.55,68.58c0.07-0.17,0.15-0.34,0.22-0.52C301.69,68.23,301.62,68.41,301.55,68.58z'
                ></path>
                <path
                  className='st8'
                  d='M282.41,89.58c0.11-0.08,0.23-0.17,0.34-0.26C282.64,89.41,282.52,89.5,282.41,89.58z'
                ></path>
                <path
                  className='st8'
                  d='M94.22,35.4c-0.27,0.08-0.52,0.16-0.75,0.24C93.69,35.56,93.95,35.48,94.22,35.4z'
                ></path>
                <path
                  className='st8'
                  d='M99.06,34.53c-0.4,0.05-0.79,0.1-1.17,0.16C98.27,34.63,98.66,34.58,99.06,34.53z'
                ></path>
                <path
                  className='st8'
                  d='M101.94,34.22c-0.4,0.04-0.81,0.08-1.21,0.12C101.13,34.3,101.54,34.26,101.94,34.22z'
                ></path>
                <polygon
                  className='st8'
                  points='277.26,33.6 277.26,33.6 276.47,43.21 	'
                ></polygon>
                <path
                  className='st8'
                  d='M112.47,33.6c0,0-0.02,0-0.05,0C112.45,33.6,112.47,33.6,112.47,33.6z'
                ></path>
                <path
                  className='st8'
                  d='M110.09,33.69c1.03-0.04,1.79-0.07,2.15-0.08c-0.14,0-0.33,0.01-0.58,0.02
		C111.25,33.64,110.72,33.66,110.09,33.69z'
                ></path>
                <path
                  className='st8'
                  d='M112.4,33.6c-0.03,0-0.08,0-0.14,0C112.33,33.61,112.37,33.6,112.4,33.6z'
                ></path>
                <path
                  className='st8'
                  d='M95.28,35.14c-0.32,0.07-0.62,0.14-0.9,0.22C94.66,35.28,94.96,35.21,95.28,35.14z'
                ></path>
                <path
                  className='st8'
                  d='M90.24,37.08c1.39-1.02,2.52-1.13,2.52-1.13c0.17-0.1,0.38-0.19,0.61-0.27c-0.23,0.09-0.44,0.18-0.61,0.27
		C92.76,35.96,91.63,36.07,90.24,37.08z'
                ></path>
                <path
                  className='st8'
                  d='M87.52,40.25c-0.35,0.62-0.68,1.32-0.98,2.13C86.84,41.58,87.18,40.87,87.52,40.25z'
                ></path>
                <path
                  className='st8'
                  d='M108.84,33.75c-0.34,0.02-0.69,0.04-1.06,0.06C108.15,33.78,108.5,33.76,108.84,33.75z'
                ></path>
                <path
                  className='st8'
                  d='M96.43,34.92c-0.35,0.06-0.69,0.13-1.01,0.19C95.75,35.04,96.08,34.98,96.43,34.92z'
                ></path>
                <path
                  className='st8'
                  d='M109.97,33.69c-0.3,0.01-0.62,0.03-0.95,0.04C109.35,33.72,109.67,33.71,109.97,33.69z'
                ></path>
                <a
                  id='OFF_SIDE_DRIVER_DOOR'
                  onClick={() => setShowModal('OFF_SIDE_DRIVER_DOOR')}
                >
                  <polygon
                    id='OFF_SIDE_DRIVER_DOOR'
                    className='st8 maplink'
                    points='203.93,67.24 152.54,66.33 152.54,37.67 203.93,37.67 204.99,68.1 	'
                  ></polygon>
                </a>
                <a
                  id='OFF_SIDE_DRIVER_WINDOW'
                  onClick={() => setShowModal('OFF_SIDE_DRIVER_WINDOW')}
                >
                  <path
                    id='OFF_SIDE_DRIVER_WINDOW'
                    className='st8 maplink'
                    d='M205.27,71.04l2.98,19.99h-11.4c-27.77-4.9-39.73-18.1-42.2-21.2l1.32-0.66L205.27,71.04z'
                  ></path>
                </a>
                <a
                  id='OFF_SIDE_PASSENGER_DOOR'
                  onClick={() => setShowModal('OFF_SIDE_PASSENGER_DOOR')}
                >
                  <path
                    id='OFF_SIDE_PASSENGER_DOOR'
                    className='st8 maplink'
                    d='M203.93,37.67h30.42c2.05,12.14,15.23,30.76,15.73,31.47l-45.08-1.04L203.93,37.67z'
                  ></path>
                </a>
                <a
                  id='OFF_SIDE_SIDE_WINDOW'
                  onClick={() => setShowModal('OFF_SIDE_SIDE_WINDOW')}
                >
                  <path
                    id='OFF_SIDE_SIDE_WINDOW'
                    className='st8 maplink'
                    d='M265.26,89.74l-18.86,1.29h-7.44l0.8-1.29l10.33-17.02l1.27,0.05l26.22,1.43v3.75l-5.46,7.93
		C270.62,88.89,265.26,89.74,265.26,89.74z'
                  ></path>
                </a>
                <path
                  className='st5'
                  d='M94.38,35.36c-0.05,0.01-0.11,0.03-0.16,0.04C94.27,35.39,94.33,35.37,94.38,35.36z'
                ></path>
                <path
                  className='st5'
                  d='M93.47,35.64c-0.04,0.01-0.07,0.03-0.1,0.04C93.4,35.67,93.43,35.66,93.47,35.64z'
                ></path>
                <path
                  className='st5'
                  d='M95.43,35.11c-0.05,0.01-0.1,0.02-0.15,0.03C95.33,35.13,95.38,35.12,95.43,35.11z'
                ></path>
                <path
                  className='st5'
                  d='M96.52,34.9c-0.03,0.01-0.06,0.01-0.09,0.02C96.46,34.91,96.49,34.91,96.52,34.9z'
                ></path>
                <path
                  className='st5'
                  d='M97.89,34.69c-0.08,0.01-0.15,0.02-0.23,0.03C97.73,34.71,97.81,34.7,97.89,34.69z'
                ></path>
                <path
                  className='st5'
                  d='M102.13,34.21c-0.06,0.01-0.12,0.01-0.19,0.02C102,34.22,102.07,34.21,102.13,34.21z'
                ></path>
                <path
                  className='st5'
                  d='M107.78,33.8c-0.06,0-0.12,0.01-0.19,0.01C107.66,33.81,107.72,33.81,107.78,33.8z'
                ></path>
                <path
                  className='st5'
                  d='M106.47,33.88c-0.03,0-0.07,0-0.1,0.01C106.4,33.88,106.43,33.88,106.47,33.88z'
                ></path>
                <path
                  className='st5'
                  d='M109.02,33.74c-0.06,0-0.12,0.01-0.17,0.01C108.9,33.74,108.96,33.74,109.02,33.74z'
                ></path>
                <path
                  className='st5'
                  d='M99.32,34.5c-0.09,0.01-0.17,0.02-0.26,0.03C99.14,34.52,99.23,34.51,99.32,34.5z'
                ></path>
                <path
                  className='st5'
                  d='M110.09,33.69c-0.04,0-0.08,0-0.12,0.01C110.01,33.69,110.05,33.69,110.09,33.69z'
                ></path>
                <path
                  className='st5'
                  d='M105.16,33.96c-0.09,0.01-0.18,0.01-0.27,0.02C104.98,33.98,105.07,33.97,105.16,33.96z'
                ></path>
                <path
                  className='st5'
                  d='M100.73,34.34c-0.06,0.01-0.12,0.01-0.18,0.02C100.61,34.35,100.67,34.35,100.73,34.34z'
                ></path>
                <path
                  className='st5'
                  d='M103.68,34.07c-0.1,0.01-0.19,0.02-0.29,0.02C103.49,34.09,103.59,34.08,103.68,34.07z'
                ></path>

                <a
                  id='OFF_SIDE_FRONT_BUMPER'
                  onClick={() => setShowModal('OFF_SIDE_FRONT_BUMPER')}
                >
                  <path
                    id='OFF_SIDE_FRONT_BUMPER'
                    className='st8 maplink'
                    d='M86.12,43.67c0.13-0.46,0.28-0.88,0.43-1.29c0.3-0.81,0.63-1.51,0.98-2.13c0.87-1.54,1.85-2.54,2.72-3.17
		c1.39-1.02,2.52-1.13,2.52-1.13c0.17-0.1,0.38-0.19,0.61-0.27c0.04-0.01,0.07-0.03,0.1-0.04c0.23-0.08,0.48-0.16,0.75-0.24
		c0.05-0.01,0.11-0.03,0.16-0.04c0.28-0.08,0.58-0.15,0.9-0.22c0.05-0.01,0.1-0.02,0.15-0.03c0.32-0.07,0.65-0.13,1.01-0.19
		c0.03-0.01,0.06-0.01,0.09-0.02c0.36-0.06,0.75-0.12,1.14-0.18c0.08-0.01,0.15-0.02,0.23-0.03c0.38-0.05,0.77-0.11,1.17-0.16
		c0.09-0.01,0.17-0.02,0.26-0.03c0.41-0.05,0.82-0.1,1.24-0.14c0.06-0.01,0.12-0.01,0.18-0.02c0.4-0.04,0.8-0.08,1.21-0.12
		c0.06-0.01,0.12-0.01,0.19-0.02c0.42-0.04,0.84-0.07,1.26-0.11c0.1-0.01,0.19-0.02,0.29-0.02c0.41-0.03,0.81-0.06,1.21-0.09
		c0.09-0.01,0.18-0.01,0.27-0.02c0.41-0.03,0.82-0.06,1.21-0.08c0.03,0,0.07,0,0.1-0.01c0.39-0.02,0.76-0.05,1.13-0.07
		c0.06,0,0.12-0.01,0.19-0.01c0.37-0.02,0.72-0.04,1.06-0.06c0.06,0,0.12-0.01,0.17-0.01c0.33-0.02,0.65-0.03,0.95-0.04
		c0.04,0,0.08,0,0.12-0.01c0.63-0.03,1.17-0.05,1.57-0.06l1.68,13.26H86.12V43.67z'
                  ></path>
                </a>
                <path
                  className='st5'
                  d='M112.27,33.61c-0.01,0-0.02,0-0.03,0C112.25,33.61,112.26,33.61,112.27,33.61z'
                ></path>
                <path
                  className='st5'
                  d='M112.42,33.6c0,0-0.01,0-0.02,0C112.41,33.6,112.41,33.6,112.42,33.6z'
                ></path>
                <path
                  className='st8'
                  d='M112.23,33.61c0.01,0,0.02,0,0.03,0c0.06,0,0.1,0,0.14,0c0,0,0.01,0,0.02,0c0.03,0,0.05,0,0.05,0l0.86,13.29
		l-1.68-13.26C111.9,33.62,112.1,33.61,112.23,33.61z'
                ></path>
                <path
                  className='st5'
                  d='M301.08,40.65c-0.26-0.2-0.56-0.42-0.88-0.65C300.53,40.23,300.82,40.45,301.08,40.65z'
                ></path>
                <path
                  className='st5'
                  d='M299.68,39.66c-0.36-0.24-0.77-0.48-1.21-0.73C298.91,39.18,299.32,39.42,299.68,39.66z'
                ></path>
                <path
                  className='st5'
                  d='M277.26,33.6c7.07,0.52,12.31,1.71,16.14,3.07C289.57,35.32,284.33,34.12,277.26,33.6L277.26,33.6z'
                ></path>
                <path
                  className='st5'
                  d='M296.22,37.8c-0.56-0.25-1.17-0.51-1.82-0.76C295.06,37.29,295.66,37.54,296.22,37.8z'
                ></path>
                <path
                  className='st5'
                  d='M297.79,38.56c-0.48-0.25-1-0.51-1.56-0.76C296.79,38.05,297.31,38.31,297.79,38.56z'
                ></path>
                <polygon
                  className='st5'
                  points='276.19,46.67 276.19,46.67 276.47,43.21 276.19,46.67 	'
                ></polygon>

                <a
                  id='OFF_SIDE_REAR_BUMPER'
                  onClick={() => setShowModal('OFF_SIDE_REAR_BUMPER')}
                >
                  <path
                    id='OFF_SIDE_REAR_BUMPER'
                    className='st8 maplink'
                    d='M276.19,46.67L276.19,46.67l0.28-3.47l0.79-9.61c7.07,0.52,12.31,1.71,16.14,3.07
		c0.35,0.12,0.68,0.25,1.01,0.37c0.65,0.25,1.26,0.5,1.82,0.76s1.08,0.51,1.56,0.76c0.24,0.13,0.47,0.25,0.69,0.37
		c0.44,0.25,0.84,0.49,1.21,0.73c0.18,0.12,0.36,0.23,0.52,0.35c0.33,0.23,0.62,0.44,0.88,0.65c1.31,1.02,1.8,1.74,1.8,1.74v5.55
		l-26.73-0.52L276.19,46.67z'
                  ></path>
                </a>
                <path
                  className='st5'
                  d='M282.75,89.32c0.19-0.15,0.37-0.31,0.55-0.47C283.12,89.01,282.94,89.17,282.75,89.32z'
                ></path>
                <path
                  className='st5'
                  d='M283.57,88.61c0.26-0.25,0.51-0.51,0.74-0.79C284.08,88.09,283.83,88.36,283.57,88.61z'
                ></path>
                <polygon
                  className='st5'
                  points='297.36,75.13 297.35,75.13 297.36,75.13 	'
                ></polygon>

                <a
                  id='OFF_SIDE_REAR_WINDOW'
                  onClick={() => setShowModal('OFF_SIDE_REAR_WINDOW')}
                >
                  <path
                    id='OFF_SIDE_REAR_WINDOW'
                    className='st8 maplink'
                    d='M289.9,75.28l7.45-0.15c0,0,0,0-0.01,0.01c-0.49,0.57-0.82,0.9-0.82,0.9l-12.22,11.79
		c-0.23,0.28-0.48,0.54-0.74,0.79c-0.09,0.08-0.18,0.16-0.27,0.24c-0.18,0.16-0.36,0.32-0.55,0.47c-0.11,0.09-0.23,0.17-0.34,0.26
		c-0.18,0.13-0.36,0.26-0.55,0.39c-0.12,0.08-0.25,0.16-0.38,0.24c-0.19,0.12-0.38,0.23-0.57,0.34c-0.13,0.07-0.26,0.15-0.39,0.22
		c-0.2,0.1-0.4,0.2-0.6,0.3c-0.13,0.06-0.26,0.13-0.38,0.18c-0.22,0.1-0.44,0.19-0.65,0.28c-0.11,0.05-0.22,0.1-0.34,0.14
		c-0.32,0.13-0.65,0.25-0.97,0.36v-3.25L289.9,75.28z'
                  ></path>
                </a>
                <path
                  className='st5'
                  d='M93.42,62.14c-2.76-1.42-4.51-3.5-5.6-5.4C88.91,58.63,90.66,60.72,93.42,62.14z'
                ></path>
                <path
                  className='st5'
                  d='M86.45,53.59c0.07,0.24,0.16,0.5,0.26,0.77C86.61,54.09,86.52,53.83,86.45,53.59z'
                ></path>
                <path
                  className='st5'
                  d='M93.42,62.14c0.5,0.26,1.04,0.49,1.61,0.7C94.46,62.63,93.92,62.4,93.42,62.14z'
                ></path>
                <path
                  className='st5'
                  d='M95.03,62.84c0.57,0.21,1.18,0.39,1.83,0.54C96.21,63.23,95.6,63.05,95.03,62.84z'
                ></path>
                <path
                  className='st5'
                  d='M87.29,55.74c0.16,0.33,0.33,0.66,0.53,1.01C87.62,56.4,87.45,56.06,87.29,55.74z'
                ></path>
                <path
                  className='st5'
                  d='M100.1,63.83c0.03,0,0.06,0.01,0.1,0.01C100.17,63.84,100.13,63.83,100.1,63.83z'
                ></path>
                <path
                  className='st5'
                  d='M86.88,54.8c0.12,0.3,0.26,0.61,0.41,0.94C87.13,55.41,87,55.1,86.88,54.8z'
                ></path>
                <path
                  className='st5'
                  d='M100.02,63.82c0,0,0.03,0,0.07,0.01C100.05,63.82,100.02,63.82,100.02,63.82z'
                ></path>
                <path
                  className='st5'
                  d='M104.03,64.43c-1.82-0.28-3.12-0.48-3.69-0.57C100.91,63.95,102.21,64.15,104.03,64.43L104.03,64.43z'
                ></path>
                <path
                  className='st5'
                  d='M300.84,70.04c0.07-0.14,0.15-0.28,0.22-0.42C300.99,69.77,300.92,69.9,300.84,70.04z'
                ></path>
                <polygon
                  className='st5'
                  points='300,71.53 300,71.53 300,71.53 	'
                ></polygon>
                <path
                  className='st5'
                  d='M300.37,70.9c0.06-0.1,0.11-0.19,0.17-0.29C300.48,70.71,300.43,70.8,300.37,70.9z'
                ></path>
                <path
                  className='st5'
                  d='M301.32,69.09c0.08-0.17,0.16-0.34,0.23-0.51C301.47,68.75,301.4,68.92,301.32,69.09z'
                ></path>
                <path
                  className='st8'
                  d='M204.99,68.1l0.05,1.4l0.23,1.54l-49.3-1.86l-1.32,0.66c-0.34-0.42-0.5-0.66-0.5-0.66l-1.61-2.84l51.39,0.91
		L204.99,68.1z'
                ></path>

                <a
                  id='OFF_SIDE_PASSENGER_WINDOW'
                  onClick={() => setShowModal('OFF_SIDE_PASSENGER_WINDOW')}
                >
                  <polygon
                    id='OFF_SIDE_PASSENGER_WINDOW'
                    className='st8 maplink'
                    points='250.08,72.73 239.76,89.74 238.96,91.03 208.26,91.03 205.27,71.04 	'
                  ></polygon>
                </a>
                <path
                  className='st8'
                  d='M205.27,71.04l-0.23-1.54l-0.05-1.4l45.08,1.04c0.01,0.01,1.02,0.03,1.02,0.03l-1,3.54l-0.01,0.02
		L205.27,71.04z'
                ></path>
                <polygon
                  className='st8'
                  points='250.1,72.71 251.35,72.78 250.08,72.73 	'
                ></polygon>

                <a
                  id='OFF_SIDE_FRONT_HEADLAMP'
                  onClick={() => setShowModal('OFF_SIDE_FRONT_HEADLAMP')}
                >
                  <g id='OFF_SIDE_FRONT_HEADLAMP'>
                    <path
                      className='st8 maplink'
                      d='M103.45,56.4l0.59,8.03c-1.82-0.28-3.12-0.48-3.69-0.57c-0.06-0.01-0.1-0.02-0.14-0.02
			c-0.04-0.01-0.07-0.01-0.1-0.01c-0.01,0-0.01,0-0.01,0c-0.04-0.01-0.07-0.01-0.07-0.01c-1.15-0.06-2.2-0.21-3.17-0.43
			c-0.65-0.15-1.25-0.33-1.83-0.54c-0.57-0.21-1.11-0.44-1.61-0.7c-2.76-1.42-4.51-3.5-5.6-5.4c-0.2-0.34-0.37-0.68-0.53-1.01
			S87,55.1,86.88,54.8c-0.06-0.15-0.12-0.29-0.17-0.43c-0.1-0.28-0.19-0.54-0.26-0.77c-0.25-0.82-0.33-1.35-0.33-1.35v-1.88h7.21
			C93.32,50.37,102.56,51.98,103.45,56.4z'
                    ></path>
                    <path
                      className='st4'
                      d='M98.76,56.25c0-2.08-1.32-3.77-2.94-3.77s-2.94,1.69-2.94,3.77c0,2.08,1.32,3.77,2.94,3.77
			S98.76,58.33,98.76,56.25z'
                    ></path>
                  </g>
                </a>

                <a
                  id='OFF_SIDE_REAR_HEADLAMP'
                  onClick={() => setShowModal('OFF_SIDE_REAR_HEADLAMP')}
                >
                  <g id='OFF_SIDE_REAR_HEADLAMP'>
                    <path
                      className='st8 maplink'
                      d='M302.74,64.69c-0.02,0.13-0.05,0.26-0.08,0.4c-0.05,0.26-0.1,0.51-0.17,0.77c-0.04,0.16-0.09,0.31-0.13,0.47
			c-0.06,0.22-0.13,0.44-0.2,0.66c-0.06,0.17-0.12,0.33-0.18,0.5c-0.07,0.2-0.14,0.39-0.22,0.58c-0.07,0.17-0.14,0.35-0.22,0.52
			c-0.07,0.17-0.15,0.34-0.23,0.51c-0.08,0.18-0.17,0.36-0.26,0.54c-0.07,0.14-0.14,0.28-0.22,0.42c-0.1,0.19-0.2,0.38-0.3,0.56
			c-0.06,0.1-0.11,0.2-0.17,0.29c-0.12,0.21-0.25,0.42-0.37,0.63l0,0l-9.24-0.21v-1.93h-1.5v-8.68c0.35-2.84,2.14-5.46,2.14-5.46
			h11.48v8.25C302.85,63.9,302.8,64.29,302.74,64.69z'
                    ></path>
                    <circle
                      className='st11'
                      cx='295.95'
                      cy='66.33'
                      r='2.84'
                    ></circle>
                    <path
                      className='st11'
                      d='M300.19,59.4c0-1.57-1.27-2.84-2.84-2.84c-1.57,0-2.84,1.27-2.84,2.84s1.27,2.84,2.84,2.84
			C298.92,62.24,300.19,60.97,300.19,59.4z'
                    ></path>
                  </g>
                </a>

                <a
                  id='OFF_SIDE_FUEL_CAP'
                  onClick={() => setShowModal('OFF_SIDE_FUEL_CAP')}
                >
                  <path
                    id='OFF_SIDE_FUEL_CAP'
                    className='st2 maplink'
                    d='M272.12,68.21c0.16,0,1.66,0,1.66,0v1.29h7.02l1.77-2.41v-5.09l-1.77-1.71l-6.43-0.21l-0.38,1.07h-1.88V68.21z
		'
                  ></path>
                </a>

                <a
                  id='OFF_SIDE_WING_MIRROR'
                  onClick={() => setShowModal('OFF_SIDE_WING_MIRROR')}
                >
                  <polygon
                    id='OFF_SIDE_WING_MIRROR'
                    className='st2 maplink'
                    points='149.41,61.86 146.36,61.86 145.47,61.14 145.47,60.09 149.41,60.09 	'
                  ></polygon>
                </a>
                <rect
                  x='193.47'
                  y='57.92'
                  className='st2'
                  width='8.04'
                  height='2.17'
                ></rect>
                <rect
                  x='232.69'
                  y='57.92'
                  className='st2'
                  width='8.04'
                  height='2.17'
                ></rect>
                <g>
                  <a
                    id='OFF_SIDE_FRONT_TYRE'
                    onClick={() => setShowModal('OFF_SIDE_FRONT_TYRE')}
                  >
                    <ellipse
                      id='OFF_SIDE_FRONT_TYRE'
                      transform='matrix(0.3827 -0.9239 0.9239 0.3827 42.8331 146.3183)'
                      className='st8 maplink'
                      cx='130.91'
                      cy='41.11'
                      rx='16.29'
                      ry='16.29'
                    ></ellipse>
                  </a>

                  <a
                    id='OFF_SIDE_FRONT_WHEEL'
                    onClick={() => setShowModal('OFF_SIDE_FRONT_WHEEL')}
                  >
                    <circle
                      id='OFF_SIDE_FRONT_WHEEL'
                      className='st8 maplink'
                      cx='130.61'
                      cy='40.81'
                      r='10.85'
                    ></circle>
                  </a>
                </g>
                <g>
                  <a
                    id='OFF_SIDE_REAR_TYRE'
                    onClick={() => setShowModal('OFF_SIDE_REAR_TYRE')}
                  >
                    <ellipse
                      id='OFF_SIDE_REAR_TYRE'
                      transform='matrix(0.3789 -0.9254 0.9254 0.3789 122.3675 264.5433)'
                      className='st8 maplink'
                      cx='258.27'
                      cy='41.11'
                      rx='16.29'
                      ry='16.29'
                    ></ellipse>
                  </a>

                  <a
                    id='OFF_SIDE_REAR_WHEEL'
                    onClick={() => setShowModal('OFF_SIDE_REAR_WHEEL')}
                  >
                    <circle
                      id='OFF_SIDE_REAR_WHEEL'
                      className='st8 maplink'
                      cx='257.97'
                      cy='40.81'
                      r='10.85'
                    ></circle>
                  </a>
                </g>
                <polygon
                  className='st12'
                  points='252.57,72.84 277.58,74.21 252.57,72.84 	'
                ></polygon>
                <path
                  className='st12'
                  d='M203.93,37.67h30.42c2.05,12.14,15.23,30.76,15.73,31.47l1.45,0.03l-1.43,3.54l1.26,0.07l1.21,0.07l0,0
		l25.01,1.37v3.75l-5.46,7.93c-1.5,3-6.86,3.86-6.86,3.86l-18.86,1.29h-7.44h-30.7h-11.4c-27.77-4.9-39.73-18.1-42.2-21.2
		c-0.34-0.42-0.5-0.66-0.5-0.66l-1.61-2.84V37.67H203.93z'
                ></path>
                <a
                  id='OFF_SIDE_BODY_TRIM'
                  onClick={() => setShowModal('OFF_SIDE_BODY_TRIM')}
                >
                  <path
                    id='OFF_SIDE_BODY_TRIM'
                    className='st8 maplink'
                    d='M271.69,93.39h-74.57c-23.36-0.21-51.64-20.14-51.64-20.14c-2.27-2-19.38-5.18-31.94-7.28l39.02,0.37
		l1.61,2.84c0,0,0.16,0.24,0.5,0.66c2.47,3.09,14.43,16.29,42.2,21.2h11.4h30.7h7.44l18.86-1.29c0,0,5.36-0.86,6.86-3.86l5.46-7.93
		v10.82v3.25C274.46,93.11,271.69,93.39,271.69,93.39z'
                  ></path>
                </a>
                <a
                  id='OFF_SIDE_UNDER_TRIM'
                  onClick={() => setShowModal('OFF_SIDE_UNDER_TRIM')}
                >
                  <path
                    id='OFF_SIDE_UNDER_TRIM'
                    className='st8 maplink'
                    d='M251.35,72.78l-1.26-0.07l1.43-3.54l-1.45-0.03c-0.5-0.7-13.68-19.33-15.73-31.47h-30.42h-51.39V33.6h88.07
		v10.07c0.97,9.34,8.34,13.35,11.95,14.77v14.4L251.35,72.78z'
                  ></path>
                </a>
              </g>
              <g>
                <a
                  id='FRONT_ROOF_PANEL'
                  onClick={() => setShowModal('FRONT_ROOF_PANEL')}
                >
                  <path
                    id='FRONT_ROOF_PANEL'
                    className='st8 maplink'
                    d='M244.58,120.88l-1.94-0.03l-31.35-0.86l-0.04,0l-27.43-1.29c-6.86-2.25-20.23-7.81-20.23-7.81
		c-1.55,0.46-3.52,1.24-5.61,2.53c0,0,10.63,5.07,25.3,8.17c0,0-3.32,29.31,0.54,55.39c0,0-24.44,6.24-25.63,8.18
		c1.3,0.77,2.72,1.44,4.26,2c2.3-0.81,15.82-5.53,22.08-7.39l27.43-1.16l0.04,0l31.35-0.77l1.94-0.03l23.17-0.36l19.42,9.16
		c0.39-0.13,0.77-0.26,1.16-0.41c2.52-0.96,4.96-2.36,6.76-4.37c0.01-0.01,0.02-0.02,0.02-0.03c1.97-2.21,3.18-5.16,2.86-9.11
		l0.05-51.75c0,0,0.52-4.51-10-8.19l-18.98,8.51L244.58,120.88z M279.22,123.57c1.19-2.62,16.01-6.89,16.01-6.89l0.48-0.08
		c2.74,2.34,2.53,4.25,2.53,4.25l-0.05,51.75c0.32,3.95-0.88,6.9-2.86,9.11l0,0.02c0,0-0.02,0.01-0.02,0.01
		c-11.65-1.33-16.08-6.57-16.08-6.57V123.57z'
                  ></path>
                </a>
                <path
                  className='st8'
                  d='M205.67,108.09l48.97,0.05c-9.55-0.45-42.94-1.55-87.75,2.08c0,0-1.1,0.07-2.8,0.54
		c5.66-1.33,41.54-2.67,41.54-2.67L205.67,108.09z'
                ></path>
                <path
                  className='st8'
                  d='M288.67,112.75c-0.6-0.21-1.23-0.42-1.91-0.62c-3.06-0.92-6.9-1.76-11.71-2.43
		C282.59,110.98,288.06,112.57,288.67,112.75z'
                ></path>
                <path
                  className='st8'
                  d='M235.14,189.35l-15.34,0.01C224.76,189.38,229.9,189.38,235.14,189.35z'
                ></path>
                <path
                  className='st8'
                  d='M284.52,187.53c-1.27,0.24-2.94,0.5-5.12,0.75C280.74,188.18,282.55,187.96,284.52,187.53z'
                ></path>
                <path
                  className='st8'
                  d='M143.77,157.26c0.02,0.24,0.05,0.49,0.07,0.73c-0.02-0.2-0.04-0.41-0.06-0.61
		C143.78,157.37,143.78,157.33,143.77,157.26z'
                ></path>
                <path
                  className='st8'
                  d='M146.21,129.39c0.7-2.12,1.56-4.19,2.62-6.15C147.84,125.03,146.95,127.07,146.21,129.39z'
                ></path>
                <path
                  className='st8'
                  d='M144.44,162.34c0.24,1.38,0.55,2.78,0.92,4.19c1.14,4.32,2.94,8.62,5.73,12.3c0.9,1.19,1.91,2.3,3.03,3.34
		c-3.78-4.56-8.94-13.44-10.16-23.12C144.08,160.12,144.24,161.22,144.44,162.34z'
                ></path>
                <path
                  className='st8'
                  d='M166.9,188.4c0,0,11.51,0.42,28.69,0.71c-10.79-0.3-26.55-0.83-31.88-1.51
		C164.73,187.91,165.78,188.19,166.9,188.4z'
                ></path>

                <a
                  id='FRONT_WINDSCREEN'
                  onClick={() => setShowModal('FRONT_WINDSCREEN')}
                >
                  <path
                    id='FRONT_WINDSCREEN'
                    className='st8 maplink'
                    d='M183.82,176.99c-3.86-26.08-0.54-55.39-0.54-55.39c-14.68-3.11-25.3-8.17-25.3-8.17c0,0,0,0,0,0
		c-0.33,0.2-0.64,0.42-0.96,0.63c-2.83,1.93-5.79,4.83-8.19,9.18c-1.06,1.95-1.92,4.03-2.62,6.15c-1.1,3.39-1.88,7.37-2.21,12.06
		c-0.03,0.57-0.07,1.13-0.09,1.7c-0.01,0.21-0.02,0.42-0.03,0.63c0,0,0,0.01,0,0.04c-0.06,0.49-0.76,6.22-0.1,13.44
		c0.01,0.07,0.01,0.12,0.01,0.12c0.02,0.2,0.04,0.41,0.06,0.61c0.04,0.35,0.07,0.7,0.11,1.06c1.22,9.68,6.39,18.56,10.16,23.12
		c1.22,1.12,2.58,2.13,4.08,3.02C159.39,183.23,183.82,176.99,183.82,176.99z'
                  ></path>
                </a>

                <a
                  id='FRONT_OFF_SIDE_PASSENGER_WINDOW'
                  onClick={() =>
                    setShowModal('FRONT_OFF_SIDE_PASSENGER_WINDOW')
                  }
                >
                  <path
                    id='FRONT_OFF_SIDE_PASSENGER_WINDOW'
                    className='st8 maplink'
                    d='M211.29,119.99l31.35,0.86l1.94,0.03l10.34-12.73c-0.09,0-0.19-0.01-0.29-0.01l-48.97-0.05L211.29,119.99z'
                  ></path>
                </a>

                <a
                  id='FRONT_DRIVER_WINDOW'
                  onClick={() => setShowModal('FRONT_DRIVER_WINDOW')}
                >
                  <path
                    id='FRONT_DRIVER_WINDOW'
                    className='st8 maplink'
                    d='M211.25,119.99l0.04,0l-5.62-11.91l-0.05,0c0,0-35.88,1.33-41.54,2.67c-0.16,0.04-0.33,0.09-0.5,0.14
		c0,0,13.38,5.56,20.23,7.81L211.25,119.99z'
                  ></path>
                </a>

                <a
                  id='FRONT_DRIVER_SIDE_WINDOW'
                  onClick={() => setShowModal('FRONT_DRIVER_SIDE_WINDOW')}
                >
                  <path
                    id='FRONT_DRIVER_SIDE_WINDOW'
                    className='st8 maplink'
                    d='M260.75,108.42l-3.32-0.14c0,0-0.87-0.06-2.5-0.13l-10.34,12.73l25.17,0.4l18.98-8.51
		c-0.02-0.01-0.04-0.01-0.06-0.02c-0.61-0.18-6.09-1.77-13.61-3.05C271.02,109.14,266.29,108.69,260.75,108.42z'
                  ></path>
                </a>

                <a
                  id='FRONT_NEAR_SIDE_PASSENGER_WINDOW'
                  onClick={() =>
                    setShowModal('FRONT_NEAR_SIDE_PASSENGER_WINDOW')
                  }
                >
                  <path
                    id='FRONT_NEAR_SIDE_PASSENGER_WINDOW'
                    className='st8 maplink'
                    d='M245.3,177.83l-1.94,0.03l-31.35,0.77l-5.56,10.63c4.25,0.05,8.73,0.08,13.36,0.1l15.34-0.01
		c6.65-0.04,13.47-0.12,20.29-0.26L245.3,177.83z'
                  ></path>
                </a>
                <a
                  id='FRONT_NEAR_SIDE_PASSENGER_WINDOW'
                  onClick={() =>
                    setShowModal('FRONT_NEAR_SIDE_PASSENGER_WINDOW')
                  }
                >
                  <path
                    id='FRONT_PASSENGER_WINDOW'
                    className='st8 maplink'
                    d='M212.01,178.63l-0.04,0l-27.43,1.16c-6.26,1.85-19.78,6.58-22.08,7.39c0.41,0.15,0.83,0.29,1.26,0.42
		c5.33,0.68,21.09,1.22,31.88,1.51c3.41,0.06,7.05,0.11,10.86,0.15L212.01,178.63z'
                  ></path>
                </a>

                <a
                  id='FRONT_PASSENGER_SIDE_WINDOW'
                  onClick={() => setShowModal('FRONT_PASSENGER_SIDE_WINDOW')}
                >
                  <path
                    id='FRONT_PASSENGER_SIDE_WINDOW'
                    className='st8 maplink'
                    d='M245.3,177.83l10.13,11.26c7.29-0.15,14.6-0.38,21.72-0.68c0,0,0.87,0,2.26-0.11
		c2.17-0.25,3.85-0.51,5.12-0.75c1.09-0.23,2.22-0.53,3.36-0.9l-19.42-9.16L245.3,177.83z'
                  ></path>
                </a>
                <path
                  className='st8'
                  d='M91.99,173.48c-1.64-3.98-2.18-7.71-2.31-10.37C89.81,165.77,90.35,169.51,91.99,173.48z'
                ></path>
                <path
                  className='st8'
                  d='M158.18,185.19c0-0.01,0.01-0.01,0.01-0.02c-1.5-0.89-2.86-1.89-4.08-3.02
		C156.17,184.65,157.82,185.85,158.18,185.19z'
                ></path>
                <path
                  className='st8'
                  d='M235.14,189.35l20.22-0.02c0.1,0,0.2,0,0.3,0.01l-0.23-0.25C248.61,189.23,241.79,189.31,235.14,189.35z'
                ></path>
                <path
                  className='st8'
                  d='M206.39,189.37l13.42-0.01c-4.63-0.02-9.1-0.05-13.36-0.1L206.39,189.37z'
                ></path>
                <path
                  className='st8'
                  d='M195.59,189.11c6.19,0.17,10.75,0.26,10.75,0.26h0.05l0.06-0.11C202.64,189.22,199,189.17,195.59,189.11z'
                ></path>
                <path
                  className='st8'
                  d='M162.11,187.3c0.29,0.1,0.84,0.2,1.6,0.3c-0.43-0.13-0.85-0.27-1.26-0.42
		C162.23,187.25,162.11,187.3,162.11,187.3z'
                ></path>
                <path
                  className='st8'
                  d='M287.96,186.66l-0.08-0.04c-1.14,0.38-2.27,0.67-3.36,0.9C287.05,187.05,287.96,186.66,287.96,186.66z'
                ></path>
                <path
                  className='st8'
                  d='M255.43,189.08l0.23,0.25c11.24,0.02,18.79-0.48,23.75-1.05c-1.39,0.11-2.26,0.11-2.26,0.11
		C270.03,188.71,262.72,188.93,255.43,189.08z'
                ></path>
                <path
                  className='st8'
                  d='M143.87,143.78c0.01-0.21,0.02-0.42,0.03-0.63c-0.01,0.22-0.03,0.44-0.04,0.67
		C143.87,143.8,143.87,143.78,143.87,143.78z'
                ></path>
                <path
                  className='st8'
                  d='M146.21,129.39c-0.83,2.52-1.44,5.11-1.87,7.65c-0.14,1.43-0.25,2.92-0.34,4.41
		C144.32,136.76,145.11,132.78,146.21,129.39z'
                ></path>
                <path
                  className='st8'
                  d='M157.02,114.06c-3.56,2.36-6.22,5.56-8.19,9.18C151.22,118.89,154.19,115.99,157.02,114.06z'
                ></path>
                <polygon
                  className='st8'
                  points='157.98,113.43 157.98,113.43 157.98,113.43 	'
                ></polygon>
                <path
                  className='st8'
                  d='M254.94,108.13c-0.1,0-0.2,0-0.3,0.01h0c0.1,0,0.19,0.01,0.29,0.01L254.94,108.13z'
                ></path>
                <path
                  className='st8'
                  d='M163.59,110.9L163.59,110.9c0.17-0.05,0.34-0.1,0.5-0.14C163.89,110.8,163.71,110.85,163.59,110.9z'
                ></path>
                <path
                  className='st8'
                  d='M257.43,108.28l3.32,0.14c5.54,0.27,10.27,0.72,14.31,1.28c-5.9-1-13.06-1.8-20.12-1.58l-0.02,0.02
		C256.56,108.23,257.43,108.28,257.43,108.28z'
                ></path>
                <path
                  className='st8'
                  d='M98.53,115.12c0.79-0.79,1.62-1.52,2.48-2.19C100.15,113.61,99.32,114.33,98.53,115.12z'
                ></path>
                <path
                  className='st8'
                  d='M96.34,180.77c1.18,1.45,2.58,2.86,4.21,4.19C98.92,183.63,97.52,182.22,96.34,180.77z'
                ></path>
                <path
                  className='st8'
                  d='M145.04,165.64c0,0,0.11,0.33,0.32,0.89c-0.37-1.4-0.67-2.8-0.92-4.19
		C144.61,163.73,144.82,164.86,145.04,165.64z'
                ></path>
                <path
                  className='st8'
                  d='M288.73,112.77c0,0-0.02-0.01-0.06-0.02C288.69,112.76,288.71,112.76,288.73,112.77L288.73,112.77z'
                ></path>
                <path
                  className='st8'
                  d='M295.82,181.84l0-0.02c-0.01,0.01-0.02,0.02-0.02,0.03C295.81,181.84,295.82,181.84,295.82,181.84z'
                ></path>

                <a
                  id='FRONT_BONNET'
                  onClick={() => setShowModal('FRONT_BONNET')}
                >
                  <path
                    id='FRONT_BONNET'
                    className='st8 maplink'
                    d='M156.61,185.56c-2-1.5-3.88-4.01-5.52-6.74c-2.79-3.67-4.59-7.98-5.73-12.3c-0.21-0.56-0.32-0.89-0.32-0.89
		c-0.22-0.78-0.42-1.91-0.6-3.29c-0.2-1.12-0.36-2.22-0.48-3.3c-0.04-0.36-0.08-0.71-0.11-1.06c-0.02-0.24-0.05-0.49-0.07-0.73
		c-0.13-1.1-1.11-10.26,0.57-20.22c0.11-1.1,0.23-2.19,0.38-3.22c1.61-11.25,11.89-20.89,11.89-20.89l-19.29-2.71l-33.11,1
		l-0.45-0.21c-0.03,0.02-0.07,0.04-0.1,0.06c-0.28,0.17-0.55,0.36-0.82,0.54c-0.17,0.11-0.33,0.22-0.5,0.33
		c-0.44,0.31-0.87,0.62-1.29,0.95c-0.02,0.01-0.03,0.03-0.05,0.04c-0.86,0.67-1.69,1.4-2.48,2.19c-0.03,0.03-0.06,0.06-0.09,0.09
		c-0.78,0.78-1.52,1.61-2.22,2.51c-0.04,0.05-0.08,0.1-0.12,0.15c-0.32,0.41-0.63,0.83-0.92,1.27c-0.03,0.04-0.06,0.08-0.09,0.13
		c-0.32,0.47-0.62,0.95-0.91,1.45c-0.04,0.07-0.08,0.14-0.12,0.21c-0.25,0.44-0.5,0.89-0.73,1.36c-0.04,0.09-0.09,0.17-0.13,0.26
		c-0.26,0.52-0.5,1.06-0.74,1.61c-0.03,0.08-0.07,0.17-0.1,0.25c-0.2,0.48-0.39,0.98-0.56,1.48c-0.04,0.13-0.09,0.25-0.13,0.38
		c-0.2,0.58-0.38,1.18-0.55,1.79c-0.02,0.08-0.04,0.17-0.06,0.25c-0.15,0.54-0.28,1.1-0.4,1.67c-0.03,0.16-0.07,0.32-0.1,0.48
		c-0.13,0.65-0.25,1.31-0.35,2c-0.01,0.06-0.02,0.12-0.02,0.19c-0.09,0.63-0.16,1.27-0.23,1.93c-0.02,0.19-0.03,0.37-0.05,0.56
		c-0.06,0.73-0.11,1.47-0.14,2.23v21.86c0,0,0,0.02-0.01,0.05c0,0,0,0.01,0,0.01c0,0.03-0.01,0.09-0.02,0.15c0,0.01,0,0.01,0,0.02
		c-0.01,0.07-0.01,0.15-0.02,0.24c0,0,0,0.01,0,0.01c-0.01,0.1-0.02,0.21-0.02,0.34c0,0.01,0,0.03,0,0.04
		c-0.02,0.26-0.03,0.58-0.04,0.95c0,0.01,0,0.02,0,0.03c0,0.19-0.01,0.39,0,0.6c0,0.01,0,0.01,0,0.02c0,0.43,0.01,0.91,0.04,1.44
		c0,0.01,0,0.01,0,0.02c0.14,2.65,0.67,6.39,2.31,10.37c0.99,2.4,2.38,4.89,4.34,7.28c0,0,0.01,0.01,0.01,0.01
		c1.18,1.45,2.58,2.86,4.21,4.19c0.59,0.48,1.21,0.96,1.87,1.42c0.02,0.01,0.04,0.03,0.06,0.04c0.55,0.38,1.13,0.76,1.72,1.12
		c0.18,0.11,0.37,0.22,0.56,0.33c0.3,0.18,0.62,0.35,0.94,0.53l33.55-1L156.61,185.56z'
                  ></path>
                </a>
                <path
                  className='st8'
                  d='M143.87,143.82c0.01-0.22,0.03-0.44,0.04-0.67c0.03-0.57,0.06-1.14,0.09-1.7c0.09-1.5,0.2-2.98,0.34-4.41
		c-1.68,9.97-0.7,19.12-0.57,20.22C143.11,150.04,143.81,144.31,143.87,143.82z'
                ></path>
                <path
                  className='st8'
                  d='M96.33,180.76c-1.95-2.39-3.35-4.88-4.34-7.28C92.98,175.88,94.38,178.37,96.33,180.76z'
                ></path>
                <path
                  className='st8'
                  d='M105.67,188.4l0.03,0c-0.32-0.17-0.63-0.35-0.94-0.53C105.07,188.05,105.36,188.23,105.67,188.4z'
                ></path>
                <path
                  className='st8'
                  d='M103.77,111c-0.03,0.02-0.06,0.04-0.1,0.06C103.7,111.04,103.74,111.02,103.77,111L103.77,111z'
                ></path>
                <path
                  className='st8'
                  d='M102.42,186.38c-0.66-0.46-1.28-0.94-1.87-1.42C101.14,185.44,101.76,185.92,102.42,186.38z'
                ></path>

                <a
                  id='FRONT_REAR_PANEL'
                  onClick={() => setShowModal('FRONT_REAR_PANEL')}
                >
                  <path
                    id='FRONT_REAR_PANEL'
                    className='st8 maplink'
                    d='M297.57,111.58l-10.8,0.55c0.67,0.2,1.3,0.41,1.91,0.62c0.04,0.01,0.06,0.02,0.06,0.02l0,0
		c10.52,3.67,10,8.19,10,8.19l-0.05,51.75c0.32,3.95-0.88,6.9-2.86,9.11l0,0.02c0,0-0.02,0.01-0.02,0.01
		c-1.8,2.01-4.24,3.41-6.76,4.37l9.95,0.54c1.86-1.15,5.21-4.15,6.12-11.21v-50.42C305.11,125.14,307.41,116.12,297.57,111.58z'
                  ></path>
                </a>

                <a
                  id='FRONT_REAR_WINDOW'
                  onClick={() => setShowModal('FRONT_REAR_WINDOW')}
                >
                  <path
                    id='FRONT_REAR_WINDOW'
                    className='st8 maplink'
                    d='M295.31,181.74c0.01,0,0.02,0,0.02-0.01l0-0.02c1.97-2.21,3.18-5.16,2.86-9.11l0.05-51.75
		c0,0,0.21-1.91-2.53-4.25l-0.48,0.08c0,0-14.82,4.27-16.01,6.89v51.61C279.22,175.17,283.65,180.41,295.31,181.74z'
                  ></path>
                </a>
                <g>
                  <ellipse
                    className='st8'
                    cx='173.08'
                    cy='135.02'
                    rx='4.5'
                    ry='9.64'
                  ></ellipse>
                  <path
                    className='st8'
                    d='M173.73,138.96v-1.29h2.25v1.29c0,0-1.45,5.37-3.7,4.26c0,0-1.21-0.72-1.53-3.29c0,0-1.77-8.44,1.37-11.89
			c0,0,2.25-3.46,3.54,2.17l0.32,2.17v0.8l-2.17-0.16l0.08-1.53'
                  ></path>
                  <polyline
                    className='st8'
                    points='173.08,142.49 173.08,139.6 171.72,139.6 171.72,130.84 173.08,130.84 173.08,128.03 		'
                  ></polyline>
                </g>

                <a
                  id='FRONT_DRIVER_BODY_PANEL'
                  onClick={() => setShowModal('FRONT_DRIVER_BODY_PANEL')}
                >
                  <path
                    id='FRONT_DRIVER_BODY_PANEL'
                    className='st8 maplink'
                    d='M293.54,110.17c0,0-18.64-6.31-39.54-5.64l-96.02,0.3v8.59c2.09-1.29,4.05-2.06,5.61-2.53
		c0.12-0.05,0.3-0.1,0.5-0.14c1.71-0.47,2.8-0.54,2.8-0.54c44.81-3.62,78.19-2.52,87.75-2.08h0c0.1,0,0.2,0,0.3-0.01
		c7.06-0.23,14.22,0.58,20.12,1.58c4.81,0.67,8.65,1.51,11.71,2.43l10.8-0.55C296.4,111.04,295.07,110.56,293.54,110.17z'
                  ></path>
                </a>

                <a
                  id='FRONT_DRIVER_PANEL'
                  onClick={() => setShowModal('FRONT_DRIVER_PANEL')}
                >
                  <path
                    id='FRONT_DRIVER_PANEL'
                    className='st8 maplink'
                    d='M133.79,104.91c0,0-17.12-1.93-30.02,6.1l0.45,0.21l33.11-1l19.29,2.71c0,0-10.29,9.64-11.89,20.89
		c-0.15,1.03-0.27,2.12-0.38,3.22c0.43-2.54,1.03-5.12,1.87-7.65c0.75-2.31,1.63-4.36,2.62-6.15c1.97-3.62,4.64-6.83,8.19-9.18
		c0.32-0.21,0.63-0.43,0.96-0.63c0,0,0,0,0,0l0,0v-8.59L133.79,104.91z'
                  ></path>
                </a>

                <a
                  id='FRONT_PASSENGER_PANEL'
                  onClick={() => setShowModal('FRONT_PASSENGER_PANEL')}
                >
                  <path
                    id='FRONT_PASSENGER_PANEL'
                    className='st8 maplink'
                    d='M154.12,182.16c-1.12-1.03-2.13-2.15-3.03-3.34c1.64,2.73,3.52,5.24,5.52,6.74l-17.36,1.84l-33.55,1
		c4.35,2.39,9.84,4.28,16.84,5.31h35.45v-8.35C157.4,185.52,155.91,184.33,154.12,182.16z'
                  ></path>
                </a>

                <a
                  id='FRONT_PASSENGER_BODY_PANEL'
                  onClick={() => setShowModal('FRONT_PASSENGER_BODY_PANEL')}
                >
                  <path
                    id='FRONT_PASSENGER_BODY_PANEL'
                    className='st8 maplink'
                    d='M289.04,186.22c-0.38,0.15-0.77,0.28-1.16,0.41l0.08,0.04c0,0-0.91,0.39-3.43,0.87
		c-1.98,0.43-3.79,0.64-5.12,0.75c-4.96,0.57-12.51,1.07-23.75,1.05c-0.1,0-0.2,0-0.3-0.01l-20.22,0.02
		c-5.24,0.03-10.38,0.03-15.34,0.01l-13.42,0.01h-0.05c0,0-4.56-0.09-10.75-0.26c-17.18-0.29-28.69-0.71-28.69-0.71
		c-1.12-0.21-2.17-0.49-3.18-0.8c-0.76-0.1-1.31-0.2-1.6-0.3c0,0,0.12-0.04,0.34-0.12c-1.54-0.56-2.95-1.23-4.26-2
		c0,0.01-0.01,0.01-0.01,0.02c-0.05,0.08-0.11,0.14-0.2,0.16v8.35h99.88c0,0,32.79-1.26,39.86-6.31c0,0,0.52-0.17,1.27-0.64
		L289.04,186.22z'
                  ></path>
                </a>
              </g>
              <style>
                {`  a {
                                cursor: pointer
                            }

                            .maplink:hover {
                                fill: blue
                            }

                            .maptext {
                                font-family: MyriadPro-Regular;
                                font-size: 6
                            }

                            #tooltip {
                                width: 220px;
                                background-color: #000;
                                color: #fff;
                                text-align: center;
                                border-radius: 6px;
                                padding: 5px 0
                            }

                            #tooltip::after {
                                content: "";
                                position: absolute;
                                top: 50%;
                                right: 100%;
                                margin-top: -5px;
                                border-width: 5px;
                                border-style: solid;
                                border-color: transparent #000 transparent transparent
                            }

                            .textcl {
                                display: none
                            }
                            .myClass{
                                enable-background:"new 0 0 400 300"
                               }
                               .st0 {
                                    fill: none;
                                    stroke: #e0e0df;
                                    stroke-miterlimit: 10;
                                    stroke-dasharray: 1
                                }
                
                                .st1 {
                                    fill: none;
                                    stroke: #000;
                                    stroke-width: .5;
                                    stroke-miterlimit: 10
                                }
                
                                .st2 {
                                    fill: #fff;
                                    stroke: #b7b7b7;
                                    stroke-miterlimit: 10;
                                    stroke-dasharray: 1
                                }
                
                                .st3 {
                                    fill: #fff;
                                    stroke: #000;
                                    stroke-width: .5;
                                    stroke-miterlimit: 10
                                }
                
                                .st4 {
                                    fill: none;
                                    stroke: #c0bfbf;
                                    stroke-miterlimit: 10
                                }
                
                                .st5 {
                                    fill: none;
                                    stroke: #000;
                                    stroke-miterlimit: 10
                                }
                
                                .st6 {
                                    font-family: Arial-BoldMT
                                }
                
                                .st7 {
                                    font-size: 7px
                                }
                
                                .st8 {
                                    fill: #fff;
                                    stroke: #000;
                                    stroke-miterlimit: 10
                                }
                
                                .st9 {
                                    fill: #dbdad9
                                }
                
                                .st10 {
                                    fill: none;
                                    stroke: #4788c8;
                                    stroke-miterlimit: 10
                                }
                
                                .st11 {
                                    fill: none;
                                    stroke: #9e9f9e;
                                    stroke-miterlimit: 10
                                }
                
                                .st12 {
                                    fill: none
                                } 
                                .special-css-class .maplink{
                                    fill:red !important;
                                }
                            `}
              </style>
            </svg>

            <ViewModal
              show={Boolean(showModal)}
              onCloseClick={() => setShowModal(null)}
            >
              <FormSection
                type={DamagaeTypeEnum.EXTERIOR}
                handleSaveDamageImage={onSaveDamageImage}
                onSave={props.onSave}
                vehicleId={props.vehicleId}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </ViewModal>
          </div>
        </div>
      </Col>
      <Col lg={7} className='h-96 overflow-auto'>
        <VehicleDamageListing
          onDelete={props.onDelete}
          damages={props.damages}
        />
      </Col>
    </Row>
  );
}
