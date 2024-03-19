import * as yup from "yup";
import { UserEntity } from "../../user/user.entity";
import { VehicleEntity } from "../vehicle/vehicle.entity";
import { ReportDataEntity } from "./report-data.entity";
export class ReportsEntity {
	constructor() { }
	stats: ReportDataEntity[];
	earning: number

	static yupSchema() {
		return yup.object({
			stats: ReportDataEntity.yupSchema()
		});
	
	}
}
