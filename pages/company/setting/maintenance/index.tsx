import React, { ReactElement, useEffect, useState } from 'react'
import FullLayout from "../../../../components/layouts/company/full-layout";
import CompanyPermissions from '../../../../permissions/company.permission';
import PageLayout from '../../../../components/layouts/company/page-layout';
import { Button } from 'react-bootstrap';
import MaintenanceTable from '../../../../components/maintenance/maintenance-table';
import { CreateMaintenance } from '../../../../components/maintenance/create';
import ViewModal from '../../../../components/view-modal';
import MaintenanceApi from '../../../../pages/api/maintenance';
import { useEffectAsync } from '../../../../utils/react';
import { globalAjaxExceptionHandler } from '../../../../utils/ajax';
import { MaintenanceEntity } from '../../../../models/admin/company/maintenance/maintenance.entity';
import { EditMaintenance } from '../../../../components/maintenance/edit';
import { useAuth } from '@/hooks/use-auth';
import { PermissionType } from '@/types/permissions.type';

export default function Maintenance() {
    const [addMaintenance, setAddMaintenance] = useState<boolean>(false)
    const maintenanceApi = new MaintenanceApi();
    const [maintenance, setMaintenance] = useState<MaintenanceEntity[]>(null);
    const [can, setCan] = useState<PermissionType>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [editMaintenance, setEditMaintenance] = useState<number>(null)
    const { user, hasPermission } = useAuth()
    useEffect(() => {
        setCan({
            create: hasPermission(CompanyPermissions.settings.maintenance.create),
            edit: hasPermission(CompanyPermissions.settings.maintenance.edit),
        })
    }, [user])
    useEffectAsync(async () => {
        try {
            const data = await maintenanceApi.list();
            setMaintenance(data);
            console.log(data);

            if (data) setIsLoading(false)
        } catch (error) {
            globalAjaxExceptionHandler(error, {
                defaultMessage: "",
            });
        }



    }, [])
    const handleOnSave = (data: MaintenanceEntity) => {
        const findMaintenance = maintenance.findIndex(g => g.id === data.id);
        if (findMaintenance !== -1) {
            const updatedGarage = [
                ...maintenance.slice(0, findMaintenance),
                data,
                ...maintenance.slice(findMaintenance + 1)
            ];

            setMaintenance(updatedGarage);
        } else {
            setMaintenance([ data , ...maintenance]);
        }

        setEditMaintenance(null);
        setAddMaintenance(false)

    }
    // const handleOnSave = (data: MaintenanceEntity) => {
    //     setMaintenance([...maintenance, data])
    //     setAddMaintenance(false)
    // }
    return (
        <PageLayout title='Maintenance' actions={
           can?.create && <Button className="bg-btn-100 mb-3 " onClick={() => setAddMaintenance(true)}>Add Maintenance</Button>
        }>

            <MaintenanceTable maintenance={maintenance} isLoading={isLoading} setEditMaintenance={setEditMaintenance} can={can}/>
            <ViewModal
                show={addMaintenance}
                onCloseClick={() => setAddMaintenance(false)}
                header='Maintenance'
            >
                <CreateMaintenance onSave={handleOnSave} />
            </ViewModal>
            <ViewModal
                show={Boolean(editMaintenance)}
                onCloseClick={() => setEditMaintenance(null)}
                header='Maintenance'
            >
                <EditMaintenance id={editMaintenance} onSave={handleOnSave} />
            </ViewModal>
        </PageLayout>
    )
}
Maintenance.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout permission={CompanyPermissions.settings.maintenance.index}>{page}</FullLayout>;
};
