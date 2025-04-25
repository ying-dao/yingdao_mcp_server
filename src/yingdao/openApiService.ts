import axios from 'axios';
import { AxiosInstance } from 'axios';
import { TokenManager } from './tokenManager.js';
import i18n from '../i18n/index.js';

export class OpenApiService {
  private readonly client: AxiosInstance;
  private readonly baseURL: string = "https://api.yingdao.com/oapi/";
  private readonly tokenManager: TokenManager;

  constructor(accessKeyId: string, accessKeySecret: string) {
    this.tokenManager = new TokenManager(accessKeyId, accessKeySecret);
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
    });

    // Add request interceptor to automatically add token
    this.client.interceptors.request.use(async (config) => {
      const token = await this.tokenManager.getToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  async queryAppList(params: {
    appId?: string;
    size?: number;
    page?: number;
    ownerUserSearchKey?: string;
    appName?: string;
  }): Promise<AppListResponse> {
    try {
      const response = await this.client.post('/app/open/query/list', params);
      return response.data.code === 200
        ? response.data.data
        :  response.data.msg ;
    } catch (error: any) {
      throw new Error(`Failed to fetch app list: ${error.message}`);
    }
  }

  async queryRobotParam(params: {
    robotUuid?: string;
    accurateRobotName?: string;
  }): Promise<RobotParamResponse> {
    try {
      const response = await this.client.post('/robot/v2/queryRobotParam', params);
       return response.data.code === 200
        ? response.data.data
        :  response.data.msg ;
    } catch (error: any) {
      throw new Error(`Failed to fetch robot parameters: ${error.message}`);
    }
  }

  async uploadFile(file: Buffer | string, fileName: string): Promise<FileUploadResponse> {
    // Validate filename length
    if (fileName.length > 100) {
      throw new Error(i18n.t('rpaService.error.fileNameTooLong'));
    }

    // Validate file type
    const allowedExtensions = ['txt', 'csv', 'xlsx'];
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      throw new Error(i18n.t('rpaService.error.unsupportedFileType'));
    }

    // Create FormData and convert file to Blob
    const formData = new FormData();
    const blob = typeof file === 'string' ? new Blob([file]) : new Blob([file]);
    formData.append('file', blob, fileName);

    try {
      const response = await this.client.post('/dispatch/v2/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        maxBodyLength: 10 * 1024 * 1024 // 10MB limit
      });

      if (response.data.code !== 200) {
        throw new Error(response.data.msg || i18n.t('rpaService.error.uploadFailed'));
      }

      return response.data;
    } catch (error: any) {
      throw new Error(`${i18n.t('rpaService.error.uploadFailed')}: ${error.message}`);
    }
  }

  async startJob(params: JobStartRequest): Promise<JobStartResponse> {
    // Validate required parameters
    if (!params.robotUuid) {
      throw new Error(i18n.t('rpaService.error.robotUuidRequired'));
    }

    // Validate mutually exclusive parameters
    if (params.accountName && params.robotClientGroupUuid) {
      throw new Error(i18n.t('rpaService.error.accountNameAndGroupConflict'));
    }

    // Validate timeout range
    if (params.waitTimeoutSeconds) {
      if (params.waitTimeoutSeconds < 60 || params.waitTimeoutSeconds > 950400) {
        throw new Error(i18n.t('rpaService.error.waitTimeoutRange'));
      }
    }

    if (params.runTimeout) {
      if (params.runTimeout < 60 || params.runTimeout > 950400) {
        throw new Error(i18n.t('rpaService.error.runTimeoutRange'));
      }
    }

    // Validate params length
    if (params.params&&params.params && JSON.stringify(params.params).length > 8000) {
      throw new Error(i18n.t('rpaService.error.paramsLengthExceeded'));
    }

    try {
      const response = await this.client.post<JobStartResponse>('/dispatch/v2/job/start', params);
      if (!response.data.success || response.data.code !== 200) {
        throw new Error(response.data.msg || i18n.t('rpaService.error.startJobFailed'));
      }
      return response.data;
    } catch (error: any) {
      throw new Error(`${i18n.t('rpaService.error.startJobFailed')}: ${error.message}`);
    }
  }

  async queryJob(params: JobQueryRequest): Promise<JobQueryResponse> {
    if (!params.jobUuid) {
      throw new Error(i18n.t('rpaService.error.jobUuidRequired'));
    }

    try {
      const response = await this.client.post<JobQueryResponse>('/dispatch/v2/job/query', params);
      if (!response.data.success || response.data.code !== 200) {
        throw new Error(response.data.msg || i18n.t('rpaService.error.queryJobFailed'));
      }
      return response.data;
    } catch (error: any) {
      throw new Error(`${i18n.t('rpaService.error.queryJobFailed')}: ${error.message}`);
    }
  }

  async queryClientList(params: ClientListRequest): Promise<ClientListResponse> {
    // Validate required parameters
    if (!params.page || !params.size) {
      throw new Error(i18n.t('rpaService.error.pageSizeRequired'));
    }

    try {
      const response = await this.client.post<ClientListResponse>('/dispatch/v2/client/list', params);
      if (!response.data.success || response.data.code !== 200) {
        throw new Error(response.data.msg || i18n.t('rpaService.error.queryClientListFailed'));
      }
      return response.data;
    } catch (error: any) {
      throw new Error(`${i18n.t('rpaService.error.queryClientListFailed')}: ${error.message}`);
    }
  }
}