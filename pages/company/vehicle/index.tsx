import { useRouter } from "next/router";
import { Button, Col, Row } from "react-bootstrap";
import React, { ReactElement, useEffect, useState } from "react";
import { useFormik } from "formik";
import VehichleApi from "../../api/vehicle";
import { useEffectAsync } from "../../../utils/react";
import FullLayout from "../../../components/layouts/company/full-layout";
import { VehicleTable } from "../../../components/vehicle";
import { VehicleEntity } from "../../../models/admin/vehicle/vehicle.entity";
import { FilterSearchBar } from "../../../components/vehicle/filter-searchbar";
import { GetVehiclesDropdownOptions } from "../../../types/vehicle/get-vehicles-dropdown-options.type";
import { VehicleModelEntity } from "../../../models/admin/vehicle/vehicle-model.entity";
import { GetVehiclesOptions } from "../../../types/vehicle/get-vehicles-options.type";
import { VehicleStatusOption } from "@/utils/options/vehicle-status-option";
import CompanyRoutes from "@/routes/company.route";
import { EmptyData } from "@/components/empty-data";
import CompanyPermissions from "@/permissions/company.permission";
import { PermissionType } from "@/types/permissions.type";
import { useAuth } from "@/hooks/use-auth";

export default function Vehicle() {
    const router = useRouter()

    const [vehicles, setVehicles] = useState<VehicleEntity[]>([])
    const vehichleApi = new VehichleApi()

    const [dropDownData, setDropDownData] = useState<GetVehiclesDropdownOptions>()
    const [vehicleModels, setVehicleModels] = useState<VehicleModelEntity[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true);
	const { user, hasPermission } = useAuth()
	const [can, setCan] = useState<PermissionType>(null)
	useEffect(() => {
		setCan({
			create: hasPermission(CompanyPermissions.vehicle.create),
			
		})
	}, [user])

    useEffectAsync(async () => {
        try {
            const dropDownData = await vehichleApi.getVehichleDropDownData({
                // vehicle type id = 1 is
                vehicle_type_id: 1,
              } as GetVehiclesOptions);

            setDropDownData(dropDownData)
            const data = await vehichleApi.list()
            setVehicles(data)
            if (data) setIsLoading(false)
        } catch (error) {
        }
    }, [])

    const form = useFormik({
        initialValues: new VehicleEntity(),
        validationSchema: VehicleEntity.vehicleFiltersYupSchema(),
        onSubmit: async (val) => {
            try {
                const data = await vehichleApi.list(val as GetVehiclesOptions)
                setVehicles(data)
                // console.log(form.values , 'sadsadas')
            } catch (error) {
            }
        },
        onReset: async (values) => {
            try {
                const data = await vehichleApi.list(values as GetVehiclesOptions)
                setVehicles(data)

            } catch (error) {
            }
        }


    })

    const handleBrandChange = async (
        { target: { value } }: React.ChangeEvent<HTMLSelectElement>
    ): Promise<void> => {
        form.setFieldValue("brand_id", value)
        try {
            const data = await vehichleApi.getVehichleModels(parseInt(value))
            setVehicleModels(data)
        } catch (error) {
        }
    }
    return (
        <div className="max-w-7xl m-auto">
            <Row className="mb-0 mt-4 mx-5">
                <Col lg={1} className="p-0">
                    <h1 className=" mb-6 font-bold text-3xl">Vehicles</h1>
                </Col>
                <Col className="text-end p-0" lg={11}>
                    <Row>
                    <Col className="flex">
                            <FilterSearchBar
                                handleBrandChange={handleBrandChange}
                                vehicleStatusOptions={VehicleStatusOption}
                                dropDownData={dropDownData}
                                form={form}
                                vehicleModels={vehicleModels}
                            />
                        <Col >
                          {can?.create&&<Button className="ml-2 bg-btn-100 mb-3 w-[153px]" onClick={() => router.push(CompanyRoutes.vehicle.create)}>Create Vehicle</Button>}
                        </Col>
                       
                        </Col>
                    </Row>

                </Col>
            </Row>

                <VehicleTable vehicles={vehicles} isLoading={isLoading} />
        </div>
    );
}

Vehicle.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout permission={CompanyPermissions.vehicle.index}>{page}</FullLayout>;
};
