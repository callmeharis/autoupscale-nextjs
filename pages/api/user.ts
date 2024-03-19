import { AxiosRequestConfig } from 'axios';
import BaseApi from './_baseApi';
import { UserEntity } from '@/models/user/user.entity';

export default class UserApi extends BaseApi {
  private baseUrl: string = '';

  async me(): Promise<UserEntity> {
    const {
      data: { data },
    } = await this.get(`${this.baseUrl}/me`);
    return data;
  }
}
