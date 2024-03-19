import { WithOptionsEnum } from '../../enums/vehicle-options.enum';

export type GetVehiclesOptions = {
  with?: WithOptionsEnum;
  status?: number;
  body_type_id?: number;
  user_id?: number;
  brand_id?: number;
  transmission_id?: number;
  model_id?: number;
  vehicle_type_id?: number;
  search?: string;
  tariff_id?: number;
  in_service?: string;
};

