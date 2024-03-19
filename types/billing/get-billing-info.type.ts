export interface BillingInfo {
  status: boolean;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  name: string;
  stripe_status: string;
  trial_ends_at: null;
  quantity: number;
  created_at: string;
  plan: Plan;
}

export interface Plan {
  id: number;
  plan_name: string;
  sub_line: string;
  price: number;
  features: string[];
  price_id: string;
  vehicles_limit: number;
}
