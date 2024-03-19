import React, { ReactElement, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import FullLayout from '../../../../components/layouts/company/full-layout';
import PageLayout from '../../../../components/layouts/company/page-layout';
import InsuranceTable from '../../../../components/insurance/insurance-table';
import ViewModal from '../../../../components/view-modal';
import Create from '../../../../components/insurance/create';
import InsuranceApi from '@/pages/api/insurance';
import { InsuranceEntity } from '@/models/admin/insurance/insurance.entity';
import { useEffectAsync } from '@/utils/react';
import { globalAjaxExceptionHandler } from '@/utils/ajax';
import EditInsurance from '@/components/insurance/edit';
import CompanyPermissions from '@/permissions/company.permission';
import { PermissionType } from '@/types/permissions.type';
import { useAuth } from '@/hooks/use-auth';

export default function Insurance() {
    const [addInsurance, setAddInsurance] = useState<boolean>(false)
    const insuranceApi = new InsuranceApi();
    const [insurance, setInsurance] = useState<InsuranceEntity[]>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [editInsurance, setEditInsurance] = useState<number>(null)
    const [can, setCan] = useState<PermissionType>(null)
    const { user, hasPermission } = useAuth()
    useEffect(() => {
        setCan({
            create: hasPermission(CompanyPermissions.settings.insurance.create),
            edit: hasPermission(CompanyPermissions.settings.insurance.edit),
        })
    }, [user])
    useEffectAsync(async () => {
        try {
            const data = await insuranceApi.list();
            setInsurance(data)
            console.log(data);

            if (data) setIsLoading(false)
        } catch (error) {
            globalAjaxExceptionHandler(error, {
                defaultMessage: "",
            });
        }



    }, [])
    const handleOnSave = (data: InsuranceEntity) => {
        const findInsurance = insurance.findIndex(g => g.id === data.id);
        if (findInsurance !== -1) {
            const updatedGarage = [
                ...insurance.slice(0, findInsurance),
                data,
                ...insurance.slice(findInsurance + 1)
            ];

            setInsurance(updatedGarage);
        } else {
            setInsurance([data, ...insurance]);
        }

        setEditInsurance(null);
        setAddInsurance(false)
    }

    return (
        <PageLayout title='Insurance' actions={
            can?.create &&
            <Button className="bg-btn-100 mb-3 mr-2" onClick={() => setAddInsurance(true)}>Add Insurance</Button>
        }>

            <div className='px-3'>
                <InsuranceTable insurance={insurance} isLoading={isLoading} setEditInsurance={setEditInsurance} can={can}/>
                <ViewModal
                    show={addInsurance}
                    onCloseClick={() => setAddInsurance(false)}
                    header='Insurance'
                >
                    <Create onSave={handleOnSave} />
                </ViewModal>
                <ViewModal
                    show={Boolean(editInsurance)}
                    onCloseClick={() => setEditInsurance(null)}
                    header='Insurance'
                >

                    <EditInsurance setEditInsurance={setEditInsurance} id={editInsurance} onSave={handleOnSave} />

                </ViewModal>
            </div>
        </PageLayout>
    )
}
Insurance.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout permission={CompanyPermissions.settings.insurance.index}>{page}</FullLayout>;
}