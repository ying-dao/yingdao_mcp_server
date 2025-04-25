import axios, { AxiosInstance } from 'axios';

interface TokenResponse {
  data: {
    accessToken: string;
    expiresIn: number;
  };
  code: number;
  success: boolean;
  requestId: string;
}

export class TokenManager {
  private token: string | null = null;
  private tokenExpireTime: number = 0;
  private readonly client: AxiosInstance;
  private readonly baseURL: string = 'https://api.yingdao.com';
  private readonly accessKeyId: string;
  private readonly accessKeySecret: string;

  constructor(accessKeyId: string, accessKeySecret: string) {
    this.accessKeyId = accessKeyId;
    this.accessKeySecret = accessKeySecret;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
    });
  }

  private isTokenExpired(): boolean {
    return Date.now() >= this.tokenExpireTime;
  }

  async getToken(): Promise<string> {
    if (this.token && !this.isTokenExpired()) {
      return this.token;
    }

    try {
      const response = await this.client.get<TokenResponse>('/oapi/token/v2/token/create', {
        params: {
          accessKeyId: this.accessKeyId,
          accessKeySecret: this.accessKeySecret,
        },
      });

      if (!response.data.success || response.data.code !== 200) {
        throw new Error('Failed to get token');
      }

      this.token = response.data.data.accessToken;
      // Convert expiresIn from seconds to milliseconds and subtract 5 minutes as buffer
      this.tokenExpireTime = Date.now() + (response.data.data.expiresIn * 1000) - 300000;

      return this.token;
    } catch (error:any) {
      throw new Error(`Failed to get token: ${error.message}`);
    }
  }
}