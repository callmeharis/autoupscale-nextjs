import BaseApi from './_baseApi';
import { SignUpDto } from './../../models/auth/signup.dto';
import { UserEntity } from '../../models/user/user.entity';
import { LoginDto } from '../../models/auth/login.dto';
import axios, { AxiosRequestConfig } from 'axios';
import { ResetDto } from '../../models/auth/reset.dto';
import { EmailExistanceCheckDto } from '../../models/auth/email-existance-check.dto';
import { VerifyEmailCodeDto } from '@/models/auth/verify-email.dto';
import { UpdatePasswordDto } from '@/models/auth/update-password.dto';

export default class AuthApi extends BaseApi {
  private baseUrl: string = '';

  async login(dto: LoginDto, config?: AxiosRequestConfig): Promise<UserEntity> {
    const {
      data: { data },
    } = await this.post(`${this.baseUrl}/login`, dto, config);
    return data;
  }
  async signUp(
    dto: SignUpDto,
    config?: AxiosRequestConfig
  ): Promise<UserEntity> {
    const {
      data: { data },
    } = await this.post(`${this.baseUrl}/register`, dto, config);
    return data;
  }
  async forgotPassword(dto: ResetDto, config?: AxiosRequestConfig) {
    await this.post(`${this.baseUrl}/forgot-password`, dto);
  }

  async updatePassword(dto: UpdatePasswordDto) {
    await this.put(`${this.baseUrl}/update-password`, dto);
  }
  async resetPassword(dto: ResetDto) {
    await this.post(`${this.baseUrl}/password/reset`, dto);
  }

  async verifyEmail(dto: any, config?: AxiosRequestConfig) {
    await this.post(`${this.baseUrl}/verify-email`, dto, config);
  }

  async verifyEmailCode(dto: VerifyEmailCodeDto, config?: AxiosRequestConfig) {
    await this.post(`${this.baseUrl}/verify-email`, dto, config);
  }

  async sendVerifyEmail(email: string, config?: AxiosRequestConfig) {
    await this.post(
      `${this.baseUrl}/email/verification-notification`,
      { email },
      config
    );
  }
  public = {
    create: async (dto: EmailExistanceCheckDto): Promise<any> => {
      const {
        data: { data },
      } = await this.post(`${this.baseUrl}/email/exist`, dto);

      return data;
    },
  };
}
