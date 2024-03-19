import { PaymentEntity } from '@/models/admin/payment/payment.entity';
import BaseApi from './_baseApi';
import { SubscribeEntity } from '@/models/admin/payment/subscribe.entity';

export default class PaymentApi extends BaseApi {
  async getPayment() {
    const {
      data: { data },
    } = await this.get(`/plans`);

    return data;
  }

  async subscribe(dto: SubscribeEntity): Promise<SubscribeEntity> {
    const {
      data: { data },
    } = await this.post(`/subscription`, dto);
    return data;
  }

  async getAddOns() {
    const {
      data: { data },
    } = await this.get(`/add-ons`);

    return data;
  }

  async getSubscriptionDetails() {
    const {
      data: { data },
    } = await this.get(`/subscription`);

    return data;
  }

  async getBillingPortalLink() {
    const {
      data: { data },
    } = await this.get(`/subscription/billing-portal`);

    return data;
  }
}
