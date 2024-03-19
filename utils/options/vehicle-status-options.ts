import { VehicleStatusOptionType } from "@/types/vehicle/status-options.type";
export const ReservationStatus: VehicleStatusOptionType[] = [
    {
        id: 0,
        name: 'booked',
    },
    {
        id: 1,
        name: 'in-progress',
    },
    {
        id: 2,
        name: 'completed',
    },
    {
        id: 3,
        name: 'cancelled',
    },
]