import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import ExteriorDamage from './exterior-damage'
import { InteriorDamage } from './interior-damage'
import VehichleApi from '@/pages/api/vehicle'
import { useEffectAsync } from '@/utils/react'
import { VehicleDamageEntity } from '@/models/admin/vehicle/vehicle-damage.entity'
import { DamagaeTypeEnum } from '@/enums/damage/damage-type.enum'
import { toast } from 'react-toastify'

export interface VehicleDamageProps {
    vehicleId: number;
}
export interface DiscreteDamages {
    [DamagaeTypeEnum.INTERIOR]: VehicleDamageEntity[],
    [DamagaeTypeEnum.EXTERIOR]: VehicleDamageEntity[],
}

export function VehicleDamage(props: VehicleDamageProps) {

    const vehicleApi = new VehichleApi()

    const [damages, setDamages] = useState<DiscreteDamages>(null)

    const filterAndSetDamages = (data: VehicleDamageEntity[]) => setDamages({
        [DamagaeTypeEnum.INTERIOR]: data?.filter(d => d.type == DamagaeTypeEnum.INTERIOR),
        [DamagaeTypeEnum.EXTERIOR]: data?.filter(d => d.type == DamagaeTypeEnum.EXTERIOR),
    })

    async function getVehiclesDamages() {
        try {
            
            const data = await vehicleApi.getById(props.vehicleId)
            filterAndSetDamages(data.damages)
        } catch (error) {
        }
    }

    useEffectAsync(async () => {
        try {
            
            await getVehiclesDamages()
        } catch (error) {
        }
    }, [props.vehicleId])

    const hanldeDeleteDamage = async (e: VehicleDamageEntity) => {
        try {
            await vehicleApi.deleteVehicleDamage(e.id);
            setDamages({
                ...damages,
                [e.type]: damages[e.type]?.filter(v => v.id != e.id)
            })
            toast.success("Vehicle Damage Removed Successfully")
        } catch (error) {
            toast.error("Vehicle Damage couldn't removed")
        }
    }

    return (
        <>
            <div className='text-blue-500 mt-3 pb-3'>
                <div className="flex space-x-5 items-center">
                    <div className='h-9 w-9 bg-blue-800 rounded-full flex justify-center items-center text-lg text-white'>
                        2
                    </div>
                    <div className='px-0 py-26 w-full text-left text-[22.9px]  font-semi-bold'>
                    Existing Damages
                    </div>
                </div>
            </div>
            <div className="damage-tabs">
                <Tabs
                    defaultActiveKey="exterior"
                    id="uncontrolled-tab-example"
                    className="mb-3 border-0 flex justify-center"

                >
                    <Tab eventKey="exterior" title="Exterior" className='border-0'>
                        <ExteriorDamage
                            onDelete={hanldeDeleteDamage}
                            damages={damages?.[DamagaeTypeEnum.EXTERIOR]}
                            onSave={getVehiclesDamages}
                            vehicleId={props.vehicleId}
                        />
                    </Tab>
                    <Tab eventKey="interior" title="Interior">
                        <InteriorDamage
                            onDelete={hanldeDeleteDamage}
                            damages={damages?.[DamagaeTypeEnum.INTERIOR]}
                            onSave={getVehiclesDamages}
                            vehicleId={props.vehicleId}
                        />
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}
