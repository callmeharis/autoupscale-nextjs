import { CompanySettingEntity } from "@/models/admin/company/company-setting.entity";
import BaseApi from "./_baseApi";
import { ReservationEntity } from "@/models/admin/reservation.entity";
import { SystemSettingDto } from "@/models/setting/system-setting.dto";
import { GetSystemDropdownOptions } from "@/types/system/get-system-dropdown-option.type";

export default class SettingApi extends BaseApi {
	private companyBaseUrl: string = "rental";
	private systemBaseUrl: string = "system-settings";
	company = {
		update: async (dto: CompanySettingEntity): Promise<CompanySettingEntity> => {
			const { data: { data } } = await this.post(

				`${this.companyBaseUrl}/update`, dto
			);
			return data;
		},
		getById: async (): Promise<CompanySettingEntity> => {
			const {
				data: { data },
			} = await this.get(`${this.companyBaseUrl}/details`);

			return data;
		}
	}
	system = {
		update: async (dto: SystemSettingDto): Promise<SystemSettingDto> => {
			const { data: { data } } = await this.post(
				`${this.systemBaseUrl}`, dto
			);
			return data;
		},
		systemDropdown: async (): Promise<GetSystemDropdownOptions> => {
			const {
				data: { data },
			} = await this.get(`default-system-settings`);

			return data;
		},
		list: async (): Promise<SystemSettingDto> => {
			const {
				data: { data },
			} = await this.get(`${this.systemBaseUrl}`);

			return data;
		}

	}
}


