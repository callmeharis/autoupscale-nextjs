import { PaymentEntity } from "@/models/admin/payment/payment.entity";
import BaseApi from "./_baseApi";
import { SubscribeEntity } from "@/models/admin/payment/subscribe.entity";

export default class NotificationApi extends BaseApi {

    async list() {
        const { data: { data } } = await this.get(`/notifications`);

        return data;
    } ;

    async markAllRead() {
        const { data: { data } } = await this.post(`/notifications/mark-read`, []);

        return data;
    } ;
}
