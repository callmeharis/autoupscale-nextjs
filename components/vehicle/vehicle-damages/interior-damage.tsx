import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FormSection } from './form-section'
import ViewModal from '@/components/view-modal'
import { DamagaeTypeEnum } from '@/enums/damage/damage-type.enum';
import { VehicleDamageEntity } from '@/models/admin/vehicle/vehicle-damage.entity';
import { VehicleDamageListing } from './vehicle-damage-listing';
export interface InteriorDamageProps {
    vehicleId?: number;
    damages: VehicleDamageEntity[];
    onSave?: (e: any) => void,
    onDelete?: (e: any) => void,
}
export function InteriorDamage(props: InteriorDamageProps) {

    const [showModal, setShowModal] = useState<string>("")

    useEffect(() => {
        const digramBox = document.getElementById('digrams-box');

        if (digramBox) {
            const anchortags = digramBox.querySelectorAll('a');

            anchortags.forEach((anchor) => {
                const anchorId = anchor.id;
                const matchedDamaged = props.damages?.find((d: VehicleDamageEntity) => d?.damage_id === anchorId);
                if (matchedDamaged) {
                    anchor.classList.add('special-css-class');
                } else {
                    anchor.classList.remove('special-css-class');
                }
            });
        } else {
            // console.log("div not found");
        }
    }, [props.damages]);

    return (
        <>
            <Row>
                <Col lg={5}>

                    <div className="flex justify-around">
                        <div className="text-gray-700 text-md font-bold mb-3">
                            Add New Damage Here
                        </div>
                        <div className="border-green-500 border-4 p-1 m-auto text-center">
                            <span className='text-[30px] font-bold text-green-500 mb-0'>
                                {props?.damages?.length}
                            </span>
                            <div className='text-green-500'> Damages</div>
                        </div>
                    </div>
                    <div>
                        <div className="digram-box" id="digrams-box">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="231.8px" height="474.8px"
                                viewBox="0 0 231.8 474.8" enable-background="new 0 0 231.8 474.8" xmlSpace="preserve">
                                <a href="#" id='AI60' onClick={() => setShowModal("AI60")}>
                                    <path className="color2 js_car-part" d="M128.2,305.6l-27,0.2l-10.5,31.9v8.3c0,0,2.1,6.5,8.8,6.9c6.7,0.4,29.2,0.2,29.2,0.2s8.3-1.5,8.4-7.7

c0.2-6.2,0.2-7.8,0.2-7.8L128.2,305.6z"></path>
                                </a>
                                <a href="#" id='AI5L' onClick={() => setShowModal("AI5L")}>
                                    <path className="color2 js_car-part" d="M46.9,352.9l32.7,0.3l0.3,5.3l18.7-0.2l1.1-0.9l-0.1-4.6c0,0-7.5,0-8.7-7.9l-0.1-5.8l-0.2-0.5

c0.2,0,0.3,0,0.3,0l8.8-27.3c0,0-3.4,0.1-5.9-0.6c-2.5-0.7-6.3-3.5-9.2-3.9c-1.6-0.2-3.7-0.1-5.3,0l-0.7-1.8L45.4,305l-1,1.3

l-7.9-1.1c0,0-4.3-0.1-5.6-2.1c0,0-5.1,2.8-12.3,0.8l-2,0.8c0,0-6.8,4.1-6.5,11.3s2.9,32.9,2.9,32.9s1.8,7.8,10.5,8s23.2,0,23.2,0

L46.9,352.9z"></path></a>
                                <a href="#" id='AI5R' onClick={() => setShowModal("AI5R")}>



                                    <path className="color2 js_car-part" d="M181.1,352.9l-32.7,0.3l-0.3,5.3l-18.7-0.2l-1.1-0.9l0.1-4.6c0,0,7.5,0,8.7-7.9l0.1-5.8l-8.5-29.3

c0,0,3.3,0.3,5.8-0.4c2.5-0.7,9.2-4.6,10.8-4.4l4-0.1l33.1,0.1l1,1.3l7.9-1.1c0,0,4.3-0.1,5.6-2.1c0,0,5.8,2.3,12.3,0.8l2,0.8

c0,0,6.8,4.1,6.5,11.3s-2.9,32.9-2.9,32.9s-1.8,7.8-10.5,8s-23.2,0-23.2,0L181.1,352.9z"></path></a>
                                <a href="#" id="AI4L" onClick={() => setShowModal("AI4L")}>
                                    <path className="color1 js_car-part" d="M99,311.4l2.2-5.7L97,252.4l-12.5-1l-1.1,0.4l-1.1-1.6l-41.5-0.3c0,0-5.5,2-7.3,4.7c0,0-6.2-2.5-12.3,5.8

c-6.2,8.3-9.8,12-9.5,22.7c0.3,10.7,2.3,16.5,2.3,16.5l3.8,4.3c0,0,7.2,2,12.5-0.5c0,0,2.7,1.8,4.8,2c2.2,0.2,8.8,0.7,8.8,0.7

l0.8-0.8l33.7-0.3l0.5,1.8c0,0,0.7-0.3,4.2-0.5c3.5-0.2,5,2.5,8.2,3.7C94.5,311.1,99,311.4,99,311.4z"></path>
                                </a>
                                <a href="#" id="AI4R" onClick={() => setShowModal("AI4R")}>
                                    <path className="color1 js_car-part" d="M129,309.7l-1.2-4.2l3.4-53.4l13.2-0.3l1.7-1.6l40.8-0.3c0,0,5.5,2,7.3,4.7c0,0,6.2-2.5,12.3,5.8

c6.2,8.3,9.8,12,9.5,22.7c-0.3,10.7-2.3,16.5-2.3,16.5l-3.8,4.3c0,0-7.8,1.6-13.1-0.9c0,0-2,2.3-4.2,2.4c-2.2,0.2-8.8,0.7-8.8,0.7

l-0.8-0.8l-33.7-0.3c0,0-1,0.4-4.5,0.3c-3.5-0.2-5.4,2.5-8.6,3.7C133.1,310,129,309.7,129,309.7z"></path> </a>
                                <a href="#" id="AI50" onClick={() => setShowModal("AI50")} >
                                    <polygon className="color1 js_car-part"
                                        points="131.3,252.1 129.5,250.9 98.5,250.8 97,252.4 101.2,305.8 128.2,305.6 "></polygon>
                                </a>
                                <a href="#" data-id="AI80" onClick={() => setShowModal("AI80")}>   <path className="color2 js_car-part" d="M200.4,373.4H28.7l-4.6,69.9c0,0,6.8,30.4,46.3,31.1s89.7,0,89.7,0s43.9-4.4,43.9-34.9

C203.9,413.6,200.4,373.4,200.4,373.4z"></path></a>
                                <a href="#" id="AI1R" onClick={() => setShowModal("AI1R")}>
                                    <path className="color1 js_car-part" d="M144.2,183c6.3,5.5,11.9,3.8,11.9,3.8c1.3,1.5,5.3,1.6,5.3,1.6s32.9-0.4,38.1,0c5.2,0.3,3.7-1.6,8.6-0.9

c4.9,0.7,7.7-2.4,8.6-3.4c0.2-0.2,0.6-0.4,1-0.6c0,0,0,0,0,0c0,0,5.7-12.9,2.1-35.7c-3.6-22.9-11.2-22.1-16.1-22.4

c-4.9-0.3-47.8,0.3-47.8,0.3s-10-0.4-13.5,21.8c-3.4,22.3,2.2,35.4,2.2,35.4S144.4,183,144.2,183z"></path>
                                </a>

                                <a href="#" id="AI2R" onClick={() => setShowModal("AI2R")}>  <path className="color2 js_car-part" d="M199.9,233c0,0,18.2,1.3,20.3-9.7c2.5-12.9,3-29.7,3-29.7s0.4-6.1-5.5-9.9l-2.1,1.3c0,0-4.4,3.1-6.2,2.9

c-1.8-0.2-4.2-0.6-4.2-0.6s-3.8,1.2-12.7,0.9c-8.9-0.3-32.2,0.3-32.2,0.3l-4.3-1.7c0,0-3.8,1.6-7.7-1c-1.4-1-2.8-1.9-3.9-2.8

c-0.4,0.1-6.5,2.2-5.9,15.2c0.6,13.5,3.6,27.9,4.5,29c0.9,1,4.6,6,20.3,5.7L199.9,233z"></path></a>

                                <a href="#" id="AI00" onClick={() => setShowModal("AI00")}><path className="color2 js_car-part"
                                    d="M152.3,11.7c0,0-15.3-13-36.9-11.6S78.9,11.4,78.9,11.4l11,12.9h51.7L152.3,11.7z"></path></a>
                                <a href="#" id="AI20" onClick={() => setShowModal("AI20")}><path className="color2 js_car-part" d="M155.6,92.5c0,0-11.6,1.3-14.2,20.2C138.9,131.7,133,232,133,232s0.3,4.1-8,4.1s-17.5,0-17.5,0

s-6.7,0-6.7-4.9c0-6.9-3.9-97.2-10-125.1c0,0-4.1-12-14.2-13.6H155.6z"></path></a>
                                <a href="#" id="AI0L" onClick={() => setShowModal("AI0L")}><path className="color2 js_car-part"
                                    d="M76.9,11.7L88,25.1c0,0-0.9,55.4-10.5,64l-3.3,1.8l-68.3-3L0,35.9C0,35.9,37.7,17.1,76.9,11.7z"></path></a>
                                <a href="#" id="AI0R" onClick={() => setShowModal("AI0R")}><path className="color2 js_car-part"
                                    d="M154.2,12l-11,13.2c0,0,0.9,55.5,10.6,64.1l3.4,1.8l68.7-3l5.9-52C231.8,36.2,193.6,17.3,154.2,12z">
                                </path></a>
                                <a href="#" id="AI10" onClick={() => setShowModal("AI10")}><path className="color2 js_car-part"
                                    d="M141.6,26.1l-51.5,0c0,0-1.1,61.8-12,64.7h76.2C154.2,90.8,142.8,91.1,141.6,26.1z"></path></a>
                                <a href="#" id="AI6R" onClick={() => setShowModal("AI6R")}><path className="color1 js_car-part"
                                    d="M180.9,353.1v5c0,0,0.7,6.3-5.9,6.3s-22.4,0-22.4,0s-4.4-0.9-4.4-6s0-5.6,0-5.6S180.9,353.2,180.9,353.1z">
                                </path></a>
                                <a href="#" id="AI6L" onClick={() => setShowModal("AI6L")}><path className="color1 js_car-part"
                                    d="M80,353.1v5c0,0,0.7,6.3-5.9,6.3s-22.7,0-22.7,0s-4.5-0.9-4.5-6s0-5.6,0-5.6S80,353.2,80,353.1z"></path></a>
                                <a href="#" id="AI70" onClick={() => setShowModal("AI5L")}><path className="color1 js_car-part" d="M128.7,353.1v4.7c0,0,0.6,5.9-5.2,5.9c-5.8,0-20,0-20,0s-4-0.8-4-5.6c0-4.8,0-5.2,0-5.2

S128.7,353.2,128.7,353.1z"></path></a>
                                <a href="#" id="AI3R" onClick={() => setShowModal("AI3R")}><path className="color1 js_car-part" d="M199.2,233.8l1.8-9.1c0,0,0.1-7.5-8.4-7.5c-6.9,0-24.1,0-24.1,0s-7,0.8-6.1,7.7c0.8,6.1,1.7,8.4,1.7,8.4

s0.9,3.2,5.9,3.2s23.1,0,23.4,0C193.8,236.5,198.4,236.4,199.2,233.8z"></path></a>
                                <g className="inactive">
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M203.7,429.5c0,0-19.1,29.3-48,29.3s-80.9,0-80.9,0s-38.2-3.1-49.6-28.2"></path>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M217.4,183.4c-6.8,6.9-11.4,3.7-11.4,3.7c-0.8,0.7-3.5,1.2-3.5,1.2s-36.5,0.1-41.2,0.1s-5.3-1.6-5.3-1.6

c-5.7,2.5-11.6-3.9-11.6-3.9"></path>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M206,187.1c0,0,8.1-8.2,6.5-26.3s-2.8-23.9-10-35.1"></path>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M211.6,187.6c0,0,6.3,1.9,6,12c-0.3,10-4.8,19.8-7.6,22.1c-2.4,1.9-3.3,2.4-8.4,2.4c0,0,0-7.2-7.8-7.5c-7.8-0.3-25.1,0-25.1,0

s-7-0.3-7,7.6c0,0-6.4,3.1-12.7-7.3c-6.3-10.5-5.2-21.2,0.9-30"></path>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M201.9,126c0,0-7.3,38.3-4.9,62.5c0,0,0.7,9.3,4,16c3.3,6.7,8.1,14.9,1.5,18.8"></path>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M157,187.1c0,0-8.1-8.2-6.5-26.3s2.8-23.9,10-35.1"></path>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M161.1,126c0,0,7.3,38.3,4.9,62.5c0,0-0.7,9.3-4,16c-3.3,6.7-8.1,14.9-1.5,18.8"></path>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="198" y1="153" x2="164.9" y2="153"></line>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="198" y1="197.7" x2="164.9" y2="197.7"></line>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="201.6" y1="224" x2="199.9" y2="233"></line>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M161.7,224.2"></path>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="161.7" y1="224.2" x2="163.3" y2="232.9"></line>
                                </g>
                                <a href="#" data-id="AI1L" onClick={() => setShowModal("AI1L")}> <path className="color1 js_car-part" d="M16.7,183c6.3,5.5,11.9,3.8,11.9,3.8c1.3,1.5,5.3,1.6,5.3,1.6s32.9-0.4,38.1,0c5.2,0.3,3.7-1.6,8.6-0.9

c4.9,0.7,7.7-2.4,8.6-3.4c0.2-0.2,0.6-0.4,1-0.6c0,0,0,0,0,0c0,0,5.7-12.9,2.1-35.7c-3.6-22.9-11.2-22.1-16.1-22.4

c-4.9-0.3-47.8,0.3-47.8,0.3s-10-0.4-13.5,21.8c-3.4,22.3,2.2,35.4,2.2,35.4S16.9,183,16.7,183z"></path></a>
                                <a href="#" data-id="AI2L" onClick={() => setShowModal("AI2L")}> <path className="color2 js_car-part" d="M72.5,233c0,0,18.2,1.3,20.3-9.7c2.5-12.9,3-29.7,3-29.7s0.4-6.1-5.5-9.9l-2.1,1.3c0,0-4.4,3.1-6.2,2.9

c-1.8-0.2-4.2-0.6-4.2-0.6s-3.8,1.2-12.7,0.9c-8.9-0.3-32.2,0.3-32.2,0.3l-4.3-1.7c0,0-3.8,1.6-7.7-1c-1.4-1-2.8-1.9-3.9-2.8

c-0.4,0.1-6.5,2.2-5.9,15.2c0.6,13.5,3.6,27.9,4.5,29c0.9,1,4.6,6,20.3,5.7L72.5,233z"></path></a>
                                <a href="#" data-id="AI3L" onClick={() => setShowModal("AI3L")}> <path className="color1 js_car-part" d="M71.7,233.8l1.8-9.1c0,0,0.1-7.5-8.4-7.5c-6.9,0-24.1,0-24.1,0s-7,0.8-6.1,7.7c0.8,6.1,1.7,8.4,1.7,8.4

s0.9,3.2,5.9,3.2s23.1,0,23.4,0S71,236.4,71.7,233.8z"></path></a>
                                <g className="inactive">
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10"
                                        d="

M90,183.4c-6.8,6.9-11.4,3.7-11.4,3.7c-0.8,0.7-3.5,1.2-3.5,1.2s-36.5,0.1-41.2,0.1s-5.3-1.6-5.3-1.6c-5.7,2.5-11.6-3.9-11.6-3.9"></path>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M78.5,187.1c0,0,8.1-8.2,6.5-26.3s-2.8-23.9-10-35.1"></path>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M84.1,187.6c0,0,6.3,1.9,6,12c-0.3,10-4.8,19.8-7.6,22.1c-2.4,1.9-3.3,2.4-8.4,2.4c0,0,0-7.2-7.8-7.5c-7.8-0.3-25.1,0-25.1,0

s-7-0.3-7,7.6c0,0-6.4,3.1-12.7-7.3c-6.3-10.5-5.2-21.2,0.9-30"></path>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M74.4,126c0,0-7.3,38.3-4.9,62.5c0,0,0.7,9.3,4,16c3.3,6.7,8.1,14.9,1.5,18.8"></path>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M29.5,187.1c0,0-8.1-8.2-6.5-26.3s2.8-23.9,10-35.1"></path>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M33.6,126c0,0,7.3,38.3,4.9,62.5c0,0-0.7,9.3-4,16c-3.3,6.7-8.1,14.9-1.5,18.8"></path>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="70.5" y1="153" x2="37.5" y2="153"></line>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="70.5" y1="197.7" x2="37.5" y2="197.7"></line>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="74.1" y1="224" x2="72.5" y2="233"></line>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M34.2,224.2"></path>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="34.2" y1="224.2" x2="35.8" y2="232.9"></line>
                                </g>
                                <a href="#" id="AI30" onClick={() => setShowModal("AI30")}>
                                    <path className="color2 js_car-part" d="M84.3,114.8c0-10-15.2-18.1-33.9-18.1s-33.9,8.1-33.9,18.1s15.2,18.1,33.9,18.1S84.3,124.8,84.3,114.8z

M24.2,115.5c0-7.3,11.8-13.1,26.3-13.1s26.3,5.9,26.3,13.1c0,7.3-11.8,13.1-26.3,13.1S24.2,122.7,24.2,115.5z"></path>
                                </a>
                                <a href="#" id="AI40" onClick={() => setShowModal("AI40")}>
                                    <ellipse className="color1 js_car-part" cx="50.4" cy="114.8" rx="14.8" ry="8.3"></ellipse>
                                </a>

                                <g className="inactive">
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M152.3,364.3c0,0,21.4,0,24.8,0c4.7,0,4.1-7.4,4.1-7.4s18,0.4,24.8,0c6.8-0.4,8.9-7.8,8.9-7.8s3-25.6,2.8-34

c-0.1-8.4-7.8-11.1-7.8-11.1c1.3-0.7,3.5-3.7,4.3-5.2c0.7-1.5,3-15.2,2.4-21.3c-0.6-6.1-9.6-17.3-13.7-21

c-4.1-3.7-8.4-2.2-8.4-2.2c-3-3.7-7.4-4.3-7.4-4.3l-40.8,0.1l-1.8,1.8h-13.6l-1-1h-13.1h-5.3H98.2l-1,1H83.6l-1.8-1.8l-40.8-0.1

c0,0-4.4,0.6-7.4,4.3c0,0-4.3-1.5-8.4,2.2c-4.1,3.7-13.1,14.9-13.7,21c-0.6,6.1,1.6,19.8,2.4,21.3c0.7,1.5,3,4.4,4.3,5.2

c0,0-7.7,2.7-7.8,11.1c-0.1,8.4,2.8,34,2.8,34s2.1,7.4,8.9,7.8c6.8,0.4,24.8,0,24.8,0s-0.6,7.4,4.1,7.4c3.4,0,24.8,0,24.8,0

s4-0.3,4-5.9h19.5c0,0,1.6,5.2,6.2,5.2c1.8,0,4,0,5.9,0c2.9,0,5.3,0,5.3,0c1.9,0,4.1,0,5.9,0c4.6,0,6.2-5.2,6.2-5.2h19.5

C148.3,364,152.3,364.3,152.3,364.3z"></path>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10"
                                        d="

M83.9,252.5l-5.5,52.7l11.1,31.3l0.9,1.9v7.4c0,0-1.5,7.2-11.8,7.2s-30.4,0-30.4,0s-9.7,1-12.8-5.9v-9.3l9.3-32.7l-10.9-50.8"></path>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="77.8" y1="305.1" x2="44.7" y2="305.1"></line>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="83.3" y1="319.4" x2="41.4" y2="319.4"></line>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M33.2,254.7c0,0-6.5,8-6.9,23.3c-0.4,15.4,1.9,26.7,8.6,27.2l9.5,0.9"></path>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M31.3,303.6c0,0-10.8,5.5-10.6,17c0.1,11.5,5,30.6,17.4,30.6"></path>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10"
                                        d="

M143.7,252.5l5.5,52.7l-11.1,31.3l-0.9,1.9v7.4c0,0,1.5,7.2,11.8,7.2s30.4,0,30.4,0s9.7,1,12.8-5.9v-9.3l-9.3-32.7l10.9-50.8"></path>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="182.8" y1="305.1" x2="149.7" y2="305.1"></line>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="144.3" y1="319.4" x2="186.2" y2="319.4"></line>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M194.3,254.7c0,0,6.5,8,6.9,23.3c0.4,15.4-1.9,26.7-8.6,27.2l-9.5,0.9"></path>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M196.3,303.6c0,0,10.8,5.5,10.6,17c-0.1,11.5-5,30.6-17.4,30.6"></path>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M97.2,252l4,53.5L90.8,338v7.8c0,0,1.8,7.2,9.2,7.2c7.4,0,28.5,0,28.5,0s8.7-1.5,8.7-7.2c0-5.8,0.3-6.6,0.3-6.6l-9.6-32.7

l3.4-54.1"></path>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="127.4" y1="306" x2="101.8" y2="306"></line>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="131.3" y1="319.1" x2="97.5" y2="319.1"></line>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M149.2,305.2c0,0-3.4-1.5-9,1.8c-5.6,3.3-10.5,2.8-10.5,2.8"></path>
                                    <path fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" d="

M79.5,306.7c0,0,3.4-1.5,9,1.8c5.6,3.3,10.5,2.8,10.5,2.8"></path>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="79.6" y1="353.2" x2="79.6" y2="357.8"></line>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="99.4" y1="353.2" x2="99.4" y2="357.8"></line>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="128.3" y1="353.2" x2="128.3" y2="357.8"></line>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="46.8" y1="353.2" x2="46.8" y2="358"></line>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="148" y1="353.2" x2="148" y2="357.8"></line>
                                    <line fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-miterlimit="10" x1="181.2" y1="353.2" x2="181.2" y2="358"></line>
                                </g>
                            </svg>
                        











                        </div>
                        <style>
                            {`  .js_car-part:hover {
            fill: blue;
        }
        .special-css-class .js_car-part{
            fill:red ;
        }
        
        `

                            }
                        </style>
                    </div>

                    <ViewModal
                        show={Boolean(showModal)}
                        onCloseClick={() => setShowModal(null)}
                    >
                        <FormSection
                            type={DamagaeTypeEnum.INTERIOR}
                            onSave={props.onSave}
                            vehicleId={props.vehicleId}
                            showModal={showModal}
                            setShowModal={setShowModal}
                        />
                    </ViewModal>
                </Col>
                <Col lg={7}>
                    <VehicleDamageListing onDelete={props.onDelete} damages={props.damages} />
                </Col>
            </Row>


        </>
    )
}
