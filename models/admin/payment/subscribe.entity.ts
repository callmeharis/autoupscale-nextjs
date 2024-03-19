import * as yup from "yup";
import { PlanEntity } from "../plan.entity";

export class SubscribeEntity {
    constructor() { }

    plan_id?: number;
    name?:string;
    url?: string;
    id?: number;
    stripe_status?: number;
    trial_ends_at?: string;
    quantity?: number;
    created_at?: string;
    subscription_ends_at?: string;
    plan?: PlanEntity;

    static createSubscriptionYupSchema() {
        return yup.object({
            plan_id: yup.number().required('Plan is required').nullable(),
        })

    }
}
