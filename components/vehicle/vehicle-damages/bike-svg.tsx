import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { FormSection } from './form-section'
import ViewModal from '@/components/view-modal'
import BaseCarousel from '@/components/forms/base-carousel';
import { DamagaeTypeEnum } from '@/enums/damage/damage-type.enum';

import { VehicleDamageListing } from './vehicle-damage-listing';
import { VehicleDamageEntity } from '@/models/admin/vehicle/vehicle-damage.entity';
export interface ExteriorDamageProps {
    vehicleId: number;
    onSave?: (e: VehicleDamageEntity[]) => void,
    damages: any
    onDelete?: (e: VehicleDamageEntity) => void,
}
const BikeSvg = (props: ExteriorDamageProps) => {

    const [showModal, setShowModal] = useState<string>("")
    useEffect(() => {
        const container = document.getElementById('digram-box');
        if (container) {
            const anchortags = container.querySelectorAll('a');
            anchortags.forEach((anchor) => {
                const anchorId = anchor?.id;
                const matchedDamaged = props?.damages?.find((d: VehicleDamageEntity) => d?.damage_id === anchorId);
                if (matchedDamaged) {
                    anchor.classList.add('special-css-class');
                } else {
                    anchor.classList.remove('special-css-class');
                }
            });
        } else {
            console.log("div not found");
        }
    }, [props.damages]);
    return (
        <>
            <div className="svg-place" id="exterior-svg" style={{ width: '40%' }}>
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px" y="0px" viewBox="0 0 75.5 115.9" enable-background="new 0 0 75.5 115.9" xmlSpace="preserve">

                    <a href="#" id='X110' onClick={() => setShowModal("X110")}>

                        <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M38.4,52.7c1.3-1.8,21.6-2.1,25.9-2.1
s9.7,4.1,9.7,7.5l0,0c0,2.6-5.4,7.4-9.7,7.4s-24.6-0.3-25.9-2.1V52.7z" data-id="X110"></path> </a>



                    <a href="#" id='X00' onClick={() => setShowModal("X00")}>
                        <path className="js_car-part" fill="#636466" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M17.9,58L17.9,58c0.1-0.8,0.2-1.6,0.4-2.4H2.6
c-1.3,0-2.4,1.1-2.4,2.4s1.1,2.4,2.4,2.4l0,0h15.6C18.1,59.6,18,58.8,17.9,58z" data-id="X00">
                        </path></a>
                    <a href="#" id='X20' onClick={() => setShowModal("X20")}>
                        <path className="js_car-part" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M8.1,58c0,0,0.3-2,0.5-3H6.9
c-1.3,0-2.4,1.4-2.4,3s1.1,3,2.4,3l0,0h1.7C8.4,60,8.2,59,8.1,58z" data-id="X20"></path></a>
                    <a href="#" id='X00' onClick={() => setShowModal("X00")}>
                        <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"
                            d="M11.1,94.4
c-5.9,0-10.6,4.7-10.6,10.6c0,5.9,4.7,10.6,10.6,10.6c5.9,0,10.6-4.7,10.6-10.6C21.7,99.2,17,94.4,11.1,94.4z M11.1,113.3
c-4.6,0-8.3-3.7-8.3-8.3c0-4.6,3.7-8.3,8.3-8.3c4.6,0,8.3,3.7,8.3,8.3C19.4,109.6,15.7,113.3,11.1,113.3z" data-id="X00">
                        </path></a>
                    <a href="#" id='X10' onClick={() => setShowModal("X10")}>
                        <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"
                            d="M63.4,94.4
c-5.9,0-10.6,4.7-10.6,10.6c0,5.9,4.7,10.6,10.6,10.6c5.9,0,10.6-4.7,10.6-10.6C74,99.2,69.2,94.4,63.4,94.4z M63.4,113.3
c-4.6,0-8.3-3.7-8.3-8.3c0-4.6,3.7-8.3,8.3-8.3c4.6,0,8.3,3.7,8.3,8.3C71.7,109.6,67.9,113.3,63.4,113.3z" data-id="X10">
                        </path></a>
                    <a href="#" id='X20' onClick={() => setShowModal("X20")}>
                        <path className="js_car-part" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10"
                            d="M10.3,105.5c0.1-2.6,0.3-5.1,0.8-7.7
c-1.8-0.9-3.6-1.7-5.5-2.4c-2-0.5,11.1-4.9,14.5,2.4l-1.6,0.4l-6.9,7.5C11.5,105.7,10.3,107.2,10.3,105.5z" data-id="X20">
                        </path></a>
                    <a href="#" id='X21L' onClick={() => setShowModal("X21L")}>  <polygon className="js_car-part" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" points="16.4,92.2 10.6,104.9 11.7,105.3 
18,92.2 " data-id="X21L"></polygon></a>

                    <a href="#" id='X80' onClick={() => setShowModal("X80")}><path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M44.6,86.6V88c0,0,10.1-0.2,13.2-3
c0.3-0.2,0-0.3,0.2-0.6C54.3,85.1,55.1,85.9,44.6,86.6z" data-id="X80"></path></a>
                    <a href="#" id='X90' onClick={() => setShowModal("X90")}><path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M70.3,78.9c0,0-1.9,1.9-10.4,2.6
c-0.8,0.2-1.1,0.6-1.3,1.3c0,0-0.4-2.8,0.6-3.2S70.3,78.9,70.3,78.9z" data-id="X90"></path></a>
                    <a href="#" id='X17L' onClick={() => setShowModal("X17L")}><path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M70.3,78.9c-2.6,2-9,2.4-10.5,2.6
c-1.3,0.3-1.3,2-2,3.5c-2.3,2.1-9.8,2.9-13.2,3v-1.5L31.3,88c0,0,12.8,4.4,13.3,7.1v6.7c0,0,3.3,2,3.7-1.7c0.2-2.5,0.3-3,0.3-3.1
l11.2-8.3c0,0,0.1-1.1,0.1-1.4c2.3,0,3.9-3.6,6.1-4.3c2.2-0.6,7.3-3.5,7.6-4.6L70.3,78.9z"
                        data-id="X17L"></path></a>
                    <a href="#" id='X60' onClick={() => setShowModal("X60")}><path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M23.5,82.8c2.5-0.5,10-4.1,17.7-1.3
c5.2,2.3,3.5,5.1,3.5,5.1l-13.3,1.5c0,0-4.4-0.9-6-3.3C24.2,83.5,23.5,82.8,23.5,82.8z"
                        data-id="X60">
                    </path></a>
                    <a href="#" id='X0990' onClick={() => setShowModal("X0990")}><path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M52.8,110.3">
                    </path></a>
                    <a href="#" id='X16L' onClick={() => setShowModal("X16L")}><path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10"
                        d="M26.5,111l14.2-0.3l3.9-4.6V95.2
c-0.4-2.5-11.9-6.7-13.2-7.1l0,0c-1.7-0.5-4.4-1-6-3.3c-0.5,0-0.3,2.4-13.7,3.3c2.4-3.6,4.1-7.3,6.4-7.6c2.2-0.4,2.4,0.2,2.4,0.2
s2.1-0.7,2.3-1.7c0.2-1-1.1-1.7-1.1-1.7l-7,4.3l-1.7-1c0,0-5.5,5.6-4.9,10.2h3.5l-0.1,1.4H18l-1,2.3c0,0,6.1,3.8,7.2,16.5L26.5,111" data-id="X16L"></path></a>
                    <a href="#" id='X14L' onClick={() => setShowModal("X14L")}><path className="js_car-part" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M55.7,96.2c-1.3-0.6-2.6-1.2-3.9-1.5L48.5,97
l-0.5,4.3c0,0,11.5,4.4,15.7,4.5c3.5,0.1-3.4-6.1-6-8.3C57.1,97,56.4,96.5,55.7,96.2z M61.2,104.2c-2.5,0-8.5-3-8.5-3V97
c1.3,0.4,2.5,1,3.7,1.6C58.4,99.6,63.7,104.2,61.2,104.2L61.2,104.2z" data-id="X14L"></path></a>
                    <a href="#" id='X50' onClick={() => setShowModal("X50")}><path className="js_car-part" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M13,80.6l1.6,0.9l7-4.3c0,0-1.3-1.6-1.9-1.6
S13,80.6,13,80.6z" data-id="X50"></path></a>
                    <a href="#" id='X13L' onClick={() => setShowModal("X13L")}><path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M59.9,87.3l-0.1,1.4c1.4-0.1,2.6-0.6,3.6-1.5
c0.8-0.8-1.1-1.1-1.1-1.1C61.7,86.8,60.8,87.2,59.9,87.3z" data-id="X13L"></path></a>
                    <a href="#" id='X12L' onClick={() => setShowModal("X12L")}><path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M72.6,79.5c0,0,1.5-0.1,1,1.3
c-1.1,1-2.2,1.9-3.4,2.7h3.4v2.8h-1.1c1.8,2.4,2.8,5.3,2.8,8.2c-2.5-2.8-5.1-8.6-5.1-8.6h-7.9c0.8-1,1.7-1.8,2.7-2.6
C66,83,71.1,81,72.6,79.5z" data-id="X12L"></path></a>
                    <rect x="73.6" y="84.4" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" width="1.7" height="1.6">
                    </rect>
                    <g>
                        <a href="#" id='X20L' onClick={() => setShowModal("X20L")}><polygon className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-linejoin="round" points="18.1,84.1 21.3,83.8 21.3,84.9 
18.1,85.2 " data-id="X20L"></polygon></a>
                        <a href="#" id='X19L' onClick={() => setShowModal("X19L")}> <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-linejoin="round" d="M16.5,84.4c-1.4,0.3-2.7,1-3.7,1.9L11.6,88
c0,0,2.8-0.2,5.6-0.5c-0.4-0.9-0.1-1.9,0.9-2.4V84L16.5,84.4z" data-id="X19L"></path></a>
                    </g>
                    <a href="#" id='X15L' onClick={() => setShowModal("X15L")}> <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-linejoin="round" d="M50.2,105.1c-1,0.8-2,1.5-3,2.2
c-0.9,0.4-1.3,0.3-0.4-0.4c1.1-0.8,2-1.7,2.9-2.7l-1.6-1.2c-1,0.8-3.1,2.6-3.5,3.1c-0.6,0.8-2.3,2.6-2.3,2.6l-1.6,1.9
c0,0,5.7,0.5,8.2-1.6c1.1-0.8,2.1-1.7,2.9-2.7L50.2,105.1z" data-id="X15L"></path></a>
                    <a href="#" id='X18L' onClick={() => setShowModal("X18L")}> <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M8.7,87.1c0.5-1.3,3.7,3.7,1.8,3.7H8.2
C8.2,90.8,7.9,89.5,8.7,87.1z" data-id="X18L"></path></a>
                    <a href="#" id='X00' onClick={() => setShowModal("X00")}> <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" d="M11.1,0.3
C5.2,0.3,0.5,5,0.5,10.9s4.7,10.6,10.6,10.6c5.9,0,10.6-4.8,10.6-10.6C21.7,5,17,0.3,11.1,0.3z M11.1,19.2c-4.6,0-8.3-3.7-8.3-8.3
s3.7-8.3,8.3-8.3c4.6,0,8.3,3.7,8.3,8.3S15.7,19.2,11.1,19.2z" data-id="X00"></path></a>
                    <a href="#" id='X10' onClick={() => setShowModal("X10")}> <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" d="M63.4,0.3
c-5.9,0-10.6,4.7-10.6,10.6s4.7,10.6,10.6,10.6c5.8,0,10.6-4.8,10.6-10.6C74,5,69.3,0.3,63.4,0.3z M63.4,19.2
c-4.6,0-8.3-3.7-8.3-8.3c0-4.6,3.7-8.3,8.3-8.3c4.5,0,8.3,3.7,8.3,8.3S68,19.2,63.4,19.2z"
                        data-id="X10"></path></a>
                    <a href="#" id='X20' onClick={() => setShowModal("X20")}> <path className="js_car-part" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10"
                        d="M11.6,10.2l6.9,7.5l1.6,0.4
C16.7,25.4,3.6,21,5.6,20.5c1.9-0.7,3.7-1.5,5.5-2.4c-0.5-2.6-0.7-5.1-0.8-7.7C10.3,8.7,11.5,10.2,11.6,10.2z" data-id="X20"></path></a>
                    <a href="#" id='X21R' onClick={() => setShowModal("X21R")}> <polygon className="js_car-part" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" points="18,23.7 11.7,10.6 10.6,11 16.4,23.7 
" data-id="X21R"></polygon></a>
                    <a href="#" id='X80' onClick={() => setShowModal("X80")}> <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M58,31.5c-0.2-0.3,0.1-0.4-0.2-0.6
c-3.1-2.8-13.2-3-13.2-3v1.4C55.1,30,54.3,30.8,58,31.5z" data-id="X80"></path></a>
                    <a href="#" id='X90' onClick={() => setShowModal("X90")}> <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M59.2,36.3c-1-0.4-0.6-3.2-0.6-3.2
c0.2,0.7,0.5,1.1,1.3,1.3c8.5,0.7,10.4,2.6,10.4,2.6S60.2,36.7,59.2,36.3z" data-id="X90"></path></a>
                    <a href="#" id='X17R' onClick={() => setShowModal("X17R")}> <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10"
                        d="M73.6,37.5c-0.3-1.1-5.4-4-7.6-4.6
c-2.2-0.7-3.8-4.3-6.1-4.3c0-0.3-0.1-1.4-0.1-1.4l-11.2-8.3c0-0.1-0.1-0.6-0.3-3.1c-0.4-3.7-3.7-1.7-3.7-1.7v6.7
c-0.5,2.7-13.3,7.1-13.3,7.1l13.3,1.5v-1.5c3.4,0.1,10.9,0.9,13.2,3c0.7,1.5,0.7,3.2,2,3.5c1.5,0.2,7.9,0.6,10.5,2.6L73.6,37.5z" data-id="X17R"></path></a>
                    <a href="#" id='X60' onClick={() => setShowModal("X60")}> <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M25.4,31.1c1.6-2.4,6-3.3,6-3.3l13.3,1.5
c0,0,1.7,2.8-3.5,5.1c-7.7,2.8-15.2-0.8-17.7-1.3C23.5,33.1,24.2,32.4,25.4,31.1z" data-id="X60">
                    </path></a>
                    <a href="#" id='X-121B' onClick={() => setShowModal("X-121B")}> <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M52.8,5.6"></path></a>
                    <a href="#" id='X16R' onClick={() => setShowModal("X16R")}> <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10"
                        d="M26.5,4.9h-2.3C23.1,17.6,17,21.4,17,21.4l1,2.3
h-6.5l0.1,1.4H8.1C7.5,29.7,13,35.3,13,35.3l1.7-1l7,4.3c0,0,1.3-0.7,1.1-1.7c-0.2-1-2.3-1.7-2.3-1.7s-0.2,0.6-2.4,0.2
c-2.3-0.3-4-4-6.4-7.6c13.4,0.9,13.2,3.3,13.7,3.3c1.6-2.3,4.3-2.8,6-3.3l0,0c1.3-0.4,12.8-4.6,13.2-7.1V9.8l-3.9-4.6L26.5,4.9" data-id="X16R"></path></a>
                    <a href="#" id='X14R' onClick={() => setShowModal("X14R")}> <path className="js_car-part" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M57.7,18.4c2.6-2.2,9.5-8.4,6-8.3
C59.5,10.2,48,14.6,48,14.6l0.5,4.3l3.3,2.3c1.3-0.3,2.6-0.9,3.9-1.5C56.4,19.4,57.1,18.9,57.7,18.4z M61.2,11.7
c2.5,0-2.8,4.6-4.8,5.6c-1.2,0.6-2.4,1.2-3.7,1.6v-4.2C52.7,14.7,58.7,11.7,61.2,11.7L61.2,11.7z"
                        data-id="X14R"></path></a>
                    <a href="#" id='X50' onClick={() => setShowModal("X50")}> <path className="js_car-part" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M19.7,40.3c0.6,0,1.9-1.6,1.9-1.6l-7-4.3
L13,35.3C13,35.3,19.1,40.3,19.7,40.3z" data-id="X50"></path></a>
                    <a href="#" id='X13R' onClick={() => setShowModal("X13R")}> <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M62.3,29.8c0,0,1.9-0.3,1.1-1.1
c-1-0.9-2.2-1.4-3.6-1.5l0.1,1.4C60.8,28.7,61.7,29.1,62.3,29.8z" data-id="X13R"></path></a>
                    <a href="#" id='X12R' onClick={() => setShowModal("X12R")}> <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10"
                        d="M65,32.6c-1-0.8-1.9-1.6-2.7-2.6h7.9
c0,0,2.6-5.8,5.1-8.6c0,2.9-1,5.8-2.8,8.2h1.1v2.8h-3.4c1.2,0.8,2.3,1.7,3.4,2.7c0.5,1.4-1,1.3-1,1.3C71.1,34.9,66,32.9,65,32.6z" data-id="X12R"></path></a>
                    <rect x="73.6" y="29.9" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" width="1.7" height="1.6">
                    </rect>
                    <g>
                        <a href="#" id='X20R' onClick={() => setShowModal("X20R")}>  <polygon className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-linejoin="round" points="18.1,30.7 21.3,31 21.3,32.1 18.1,31.8 
" data-id="X20R"></polygon></a>
                        <a href="#" id='X19R' onClick={() => setShowModal("X19R")}><path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-linejoin="round" d="M18.1,31.9v-1.1c-1-0.5-1.3-1.5-0.9-2.4
c-2.8-0.3-5.6-0.5-5.6-0.5l1.2,1.7c1,0.9,2.3,1.6,3.7,1.9L18.1,31.9z" data-id="X19R"></path></a>
                    </g>
                    <a href="#" id='X15R' onClick={() => setShowModal("X15R")}><path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-linejoin="round" d="M51.8,9.6c-0.8-1-1.8-1.9-2.9-2.7
c-2.5-2.1-8.2-1.6-8.2-1.6l1.6,1.9c0,0,1.7,1.8,2.3,2.6c0.4,0.5,2.5,2.3,3.5,3.1l1.6-1.2c-0.9-1-1.8-1.9-2.9-2.7
c-0.9-0.7-0.5-0.8,0.4-0.4c1,0.7,2,1.4,3,2.2L51.8,9.6z" data-id="X15R"></path></a>
                    <a href="#" id='X18R' onClick={() => setShowModal("X18R")}><path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M8.2,25.1h2.3c1.9,0-1.3,5-1.8,3.7
C7.9,26.4,8.2,25.1,8.2,25.1z" data-id="X18R"></path></a>
                    <a href="#" id='X60' onClick={() => setShowModal("X60")}><path className="js_car-part" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M24.4,62.2c0.6,0.7,1.5,1.3,2.2,1.7
c1.7,1.1,4.9,0.7,4.9,0.7l8.5-2.4l4.9-1.3v-5.4c0,0-2.2-0.7-4.9-1.5h-0.1c-2.7-0.8-5.8-1.6-7.9-2.1c-1.1-0.2-2.1-0.4-3.2-0.3
c-1.6,0.2-3.6,1.2-4.4,2.1V62.2z" data-id="X60"></path></a>
                    <a href="#" id='X30' onClick={() => setShowModal("X30")}><path className="js_car-part" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M8.1,58c0.8,8.3,5.2,9.1,5.2,9.1
c5.6,1.6,11.1-1.6,11.1-1.6v-15c0,0-5.5-3.2-11.1-1.6C13.3,49,8.9,49.8,8.1,58L8.1,58z"
                        data-id="X30">
                    </path></a>
                    <g>
                        <a href="#" id='X70' onClick={() => setShowModal("X70")}><path className="js_car-part" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M24.4,62.2c1.3,1.2,3.3,2.1,3.8,2.2
c1.3,0.4,2.6,0.4,3.9,0l7.9-2.2c-0.7,0.8-6.6,4.9-7.6,5L23,69.4c-0.7,0.1-1.3-0.1-1.9-0.4l-2.5-1.6c1.7-0.2,3.7-0.8,5.8-1.9
L24.4,62.2l0-8.5v-3.2c-1.8-0.9-3.5-1.6-6-1.9l2.7-1.7c0.6-0.3,1.2-0.5,1.9-0.4l9.4,1.9c1,0.1,7,4.8,7.6,5.5h-0.1l-8.2-2.1
c-1-0.3-2.1-0.3-3.1-0.1c0,0-3.4,1.3-4.1,2v8.5H24.4z" data-id="X70"></path></a>
                    </g>
                    <a href="#" id='X20R' onClick={() => setShowModal("X20R")}><polygon className="js_car-part" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" points="22.2,49.6 24.6,45.8 23.6,45.2 
20.9,49.1 " data-id="X20R"></polygon></a>
                    <a href="#" id='X20L' onClick={() => setShowModal("X20L")}> <polygon className="js_car-part" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" points="22.2,66.4 24.6,70.1 23.6,70.8 
21,66.9 " data-id="X20L"></polygon></a>
                    <a href="#" id='X18L' onClick={() => setShowModal("X18L")}> <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M12.5,61.1c1,1.6,0.8,1.5,3.7,4.3
c0.7,0.2-4.1,1-5.9-3.6C9.5,59.5,11.7,59.6,12.5,61.1z" data-id="X18L"></path></a>
                    <a href="#" id='X18R' onClick={() => setShowModal("X18R")}> <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M10.3,54.3c1.8-4.6,6.6-3.8,5.9-3.6
c-2.9,2.8-2.7,2.8-3.7,4.3C11.7,56.5,9.5,56.6,10.3,54.3z" data-id="X18R"></path></a>
                    <a href="#" id='X40' onClick={() => setShowModal("X40")}><polygon className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10"
                        points="13.7,58 16.8,60.4 16.8,55.4 " data-id="X40"></polygon></a>
                    <a href="#" id='X50' onClick={() => setShowModal("X50")}> <path className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M24.4,50.5l-1.8,0.7c-2.3,0.9-3.8,3.1-3.8,5.6v2.3
c0,2.4,1.4,4.5,3.6,5.5l2,0.9C24.3,65.5,24.4,50.5,24.4,50.5z" data-id="X50"></path></a>
                    <a href="#" id='X100' onClick={() => setShowModal("X100")}>  <circle className="js_car-part" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" cx="29.2" cy="58" r="2.4"
                        data-id="X100"></circle></a>
                    <g>
                        <a href="#" id='X80' onClick={() => setShowModal("X80")}> <path className="js_car-part" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M44.9,55.5v5.4l10.8,1.7
c1.1,0.2,2.1-0.6,2.3-1.7c0-0.1,0-0.2,0-0.3v-4.8c0-1.1-0.9-2-2-2c-0.1,0-0.2,0-0.3,0L44.9,55.5z"
                            data-id="X80"></path></a>
                        <a href="#" id='X90' onClick={() => setShowModal("X90")}> <path className="js_car-part" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M69.6,55.5v5.4l-9.1,1.6
c-1.1,0.2-2.1-0.5-2.3-1.6c0-0.1,0-0.2,0-0.4v-4.7c0-1.1,0.9-2,2-2c0.1,0,0.2,0,0.4,0L69.6,55.5z"
                            data-id="X90"></path></a>
                    </g>
                    <a href="#" id='X120' onClick={() => setShowModal("X120")}> <path className="js_car-part" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" stroke-miterlimit="10" d="M71,53.3c0,0,2.7,1.9,3,4.7
c0.2,1.6-2.9,4.7-2.9,4.4C71.1,60.2,71,53.3,71,53.3z" data-id="X120"></path></a>
                </svg>
                <style>
                    {`  .js_car-part:hover {
fill: blue !important;
}

.js_car-part {

fill: #fff;
}`}
                </style>
            </div>

        </>
    )
}

export default BikeSvg