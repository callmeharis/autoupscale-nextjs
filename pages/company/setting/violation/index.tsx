import React, { ReactElement, useEffect, useState, } from 'react'
import { Button } from 'react-bootstrap';
import FullLayout from '../../../../components/layouts/company/full-layout';
import PageLayout from '../../../../components/layouts/company/page-layout';
import { useEffectAsync } from '../../../../utils/react';
import { globalAjaxExceptionHandler } from '../../../../utils/ajax';
import ViewModal from '../../../../components/view-modal';
import { EditGarage } from '../../../../components/garage/edit-garage';
import CompanyPermissions from '@/permissions/company.permission';
import { useAuth } from '@/hooks/use-auth';
import { PermissionType } from '@/types/permissions.type';
import { CreateViolationModal } from '@/components/violation/create';
import { EditViolationModal } from '@/components/violation/edit-violation';
import ViolationApi from '@/pages/api/violation';
import { ViolationEntity } from '@/models/admin/violation/violation.entity';
import { ViolationTable } from '@/components/violation/violation-table';
import Reservation from '../../reservations';
import { toast } from 'react-toastify';


export default function Violation() {
    const [addViolation, setAddViolation] = useState<boolean>(false)
    const [editViolation, setEditViolation] = useState<number>(null)
    const violationApi = new ViolationApi();
    const [violation, setViolation] = useState<ViolationEntity[]>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [can, setCan] = useState<PermissionType>(null)
    const { user, hasPermission } = useAuth()
    useEffect(() => {
        setCan({
            create: hasPermission(CompanyPermissions.settings.violation.create),
            edit: hasPermission(CompanyPermissions.settings.violation.edit),
            delete: hasPermission(CompanyPermissions.settings.violation.delete),
        })
    }, [user])
    useEffectAsync(async () => {
        try {
            const data = await violationApi.list();
            setViolation(data);

            if (data) setIsLoading(false)
        } catch (error) {
            globalAjaxExceptionHandler(error, {
                defaultMessage: "",
            });
        }



    }, [])

                       // Use only when data added from modal!
    const handleOnSave = (data: ViolationEntity) => {
        const findViolation = violation.findIndex(v => v.id === data.id);
        if (findViolation !== -1) {
            const updatedViolation = [
                ...violation.slice(0, findViolation), data, ...violation.slice(findViolation + 1)
            ];

            setViolation(updatedViolation);
        } else {
            setViolation([data, ...violation]);
        }
        setEditViolation(null);
        setAddViolation(false)
    }
    const onDeleteClick = async (id: number) => {
		const violationApi = new ViolationApi();
		try {
			await violationApi.remove(id);
            setViolation(violation.filter(v => v.id != id))
			toast.success("Violation Removed Successfully")
		} catch (error) {
            console.log(error);
			toast.error("Violation couldn't be removed")
		}
	};
    return (
        <PageLayout title='Violations' actions={
            !!can?.create &&
            <Button className="bg-btn-100 mb-3 " onClick={() => setAddViolation(true)}>Add Violation</Button>
        }>
            <ViolationTable violation={violation} isLoading={isLoading} setEditViolation={setEditViolation} can={can} onDeleteClick={onDeleteClick}/>
        <ViewModal
                show={addViolation}
                onCloseClick={() => setAddViolation(false)}
                header='Violation'
            >
                <CreateViolationModal onSave={handleOnSave} />
            </ViewModal>
            <ViewModal
                show={Boolean(editViolation)}
                onCloseClick={() => setEditViolation(null)}
                header='Edit Violation'
            >
                <EditViolationModal onSave={handleOnSave} id={editViolation} />
            </ViewModal>
        </PageLayout>
    )
}
Violation.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout permission={CompanyPermissions.settings.violation.index}>{page}</FullLayout>;
};