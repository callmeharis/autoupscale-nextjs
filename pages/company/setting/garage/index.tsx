import React, { ReactElement, useEffect, useState, } from 'react'
import { Button } from 'react-bootstrap';
import FullLayout from '../../../../components/layouts/company/full-layout';
import PageLayout from '../../../../components/layouts/company/page-layout';
import { useEffectAsync } from '../../../../utils/react';
import { globalAjaxExceptionHandler } from '../../../../utils/ajax';
import { GarageEntity } from '../../../../models/admin/garage/garage.entity';
import GarageApi from '../../../../pages/api/garage';
import { Create } from '../../../../components/garage/create';
import ViewModal from '../../../../components/view-modal';
import { GarageTable } from '../../../../components/garage/garage-table';
import { EditGarage } from '../../../../components/garage/edit-garage';
import CompanyPermissions from '@/permissions/company.permission';
import { useAuth } from '@/hooks/use-auth';
import { PermissionType } from '@/types/permissions.type';


export default function Garage() {
    const [addGarage, setAddGarage] = useState<boolean>(false)
    const [editGarage, setEditGarage] = useState<number>(null)
    const garageApi = new GarageApi();
    const [garage, setGarage] = useState<GarageEntity[]>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [can, setCan] = useState<PermissionType>(null)
    const { user, hasPermission } = useAuth()
    useEffect(() => {
        setCan({
            create: hasPermission(CompanyPermissions.settings.garage.create),
            edit: hasPermission(CompanyPermissions.settings.garage.edit),
        })
    }, [user])
    useEffectAsync(async () => {
        try {
            const data = await garageApi.list();
            setGarage(data);
            console.log(data);

            if (data) setIsLoading(false)
        } catch (error) {
            globalAjaxExceptionHandler(error, {
                defaultMessage: "",
            });
        }



    }, [])

    // const handleOnSave = (data: GarageEntity) => {
    //     setGarage([...garage, data])
    //     setAddGarage(false)
    // }                      // Use only when data added from modal!
    const handleOnSave = (data: GarageEntity) => {
        const findGarage = garage.findIndex(g => g.id === data.id);
        if (findGarage !== -1) {
            const updatedGarage = [
                ...garage.slice(0, findGarage), data, ...garage.slice(findGarage + 1)
            ];

            setGarage(updatedGarage);
        } else {
            setGarage([data, ...garage]);
        }
        setEditGarage(null);
        setAddGarage(false)
    }

    return (
        <PageLayout title='Add Garage' actions={
            !!can?.create &&
            <Button className="bg-btn-100 mb-3 " onClick={() => setAddGarage(true)}>Add Garage</Button>
        }>
            <GarageTable garage={garage} isLoading={isLoading} setEditGarage={setEditGarage} can={can} />
            <ViewModal
                show={addGarage}
                onCloseClick={() => setAddGarage(false)}
                header='Garage'
            >
                <Create onSave={handleOnSave} />
            </ViewModal>
            <ViewModal
                show={Boolean(editGarage)}
                onCloseClick={() => setEditGarage(null)}
                header='Garage'
            >
                <EditGarage onSave={handleOnSave} id={editGarage} />
            </ViewModal>
        </PageLayout>
    )
}
Garage.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout permission={CompanyPermissions.settings.garage.index}>{page}</FullLayout>;
};