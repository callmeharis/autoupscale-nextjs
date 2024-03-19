import React, { ReactElement, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffectAsync } from "../../../../utils/react";
import FullLayout from "../../../../components/layouts/company/full-layout";
import ViewModal from "../../../..//components/view-modal";
import { Create } from "../../../..//components/company-setting/manager/create";
import { UserEntity } from "../../../..//models/user/user.entity";
import { ManagerTable } from "../../../..//components/company-setting/manager/table";
import ManagerApi from "../../../..//pages/api/manager";
import PageLayout from "../../../..//components/layouts/company/page-layout";
import CompanyPermissions from "../../../..//permissions/company.permission";
import { Edit } from "@/components/company-setting/manager/edit";
import { PermissionType } from "@/types/permissions.type";
import { useAuth } from "@/hooks/use-auth";



export default function Manager() {
    
    const [addManager, setAddManager] = useState<boolean>(false)
    const [managers, setManagers] = useState<UserEntity[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [editManager, setEditManager] = useState<number>(null)
    const [can, setCan] = useState<PermissionType>(null)
    const managerApi = new ManagerApi();
    const { user, hasPermission } = useAuth()
    useEffect(() => {
        setCan({
            create: hasPermission(CompanyPermissions.settings.manager.create),
            edit: hasPermission(CompanyPermissions.settings.manager.edit),
            delete:hasPermission(CompanyPermissions.settings.manager.delete )
        })
    }, [user])

    useEffectAsync(async () => {
        try {
            const data = await managerApi.list();
            setManagers(data);
            if (data) setIsLoading(false)
        } catch (error) {
        }
    }, []);

    const handleOnSave = (data: UserEntity) => {
        const findManager = managers.findIndex(g => g.id === data.id);
        if (findManager !== -1) {
            const updateManager = [
                ...managers.slice(0, findManager),
                data,
                ...managers.slice(findManager + 1)
            ];

            setManagers(updateManager);
        } else {
            setManagers([data, ...managers]);
        }

        setEditManager(null);
        setAddManager(false)

    }

    const onDeleteClick = async (id: number) => {
        try {
            await managerApi.remove(id);
            setManagers(managers.filter(v => v.id != id))
            toast.success("Manager Removed Successfully")
        } catch (error) {
            toast.error("Manager couldn't removed")
        }
    };

    return (
        <PageLayout title="Managers" actions={
          !!can?.create && <Button className="bg-btn-100 mb-3 " onClick={() => setAddManager(true)}>Create Manager</Button>}
        >
            <ManagerTable manager={managers} onDelete={onDeleteClick} isLoading={isLoading} setEditManager={setEditManager} can={can}/>
            <ViewModal
                show={addManager}
                onCloseClick={() => setAddManager(false)}
                header='Manager'
            >
                <Create onSave={handleOnSave} />
            </ViewModal>
            <ViewModal
                show={Boolean(editManager)}
                onCloseClick={() => setEditManager(null)}
                header='Manager'
            >
                <Edit setEditManager={setEditManager} id={editManager} onSave={handleOnSave} />
            </ViewModal>
        </PageLayout>
    );
}

Manager.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout permission={CompanyPermissions.settings.manager.index}>{page}</FullLayout>;
};

