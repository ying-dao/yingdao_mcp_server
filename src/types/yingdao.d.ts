interface AppListResponse {
  total: number;
  list: Array<{
    id: string;
    name: string;
    ownerUser: string;
    createTime: string;
  }>;
}

interface RobotParamResponse {
  code: number;
  success: boolean;
  msg: string;
  data: {
    inputParams: Array<{
      name: string;
      direction: string;
      type: string;
      value: string;
      description: string;
      kind: string;
    }>;
    outputParams: Array<{
      name: string;
      direction: string;
      type: string;
      value: string;
      description: string;
      kind: string;
    }>;
  };
}

interface FileUploadResponse {
  code: number;
  success: boolean;
  msg: string;
  data: {
    fileKey: string;
  };
}

interface JobStartRequest {
  accountName?: string;
  robotClientGroupUuid?: string;
  robotUuid: string;
  idempotentUuid?: string;
  waitTimeout?: string;
  waitTimeoutSeconds?: number;
  runTimeout?: number;
  priority?: string;
  executeScope?: string;
  params?: Array<{
    name: string;
    value: string;
    type: string;
  }>;
}

interface JobStartResponse {
  code: number;
  success: boolean;
  msg: string;
  data: {
    jobUuid: string;
    idempotentFlag: boolean;
  };
}

interface JobQueryRequest {
  jobUuid: string;
}

interface JobQueryResponse {
  code: number;
  success: boolean;
  msg: string;
  data: {
    jobUuid: string;
    status: string;
    statusName: string;
    remark?: string;
    robotClientUuid?: string;
    robotClientName?: string;
    startTime?: string;
    endTime?: string;
    robotUuid: string;
    robotName: string;
    screenshotUrl?: string;
    robotParams?: {
      inputs?: Array<{
        name: string;
        value: string;
        type: string;
      }>;
      outputs?: Array<{
        name: string;
        value: string;
        type: string;
      }>;
    };
  };
}

interface ClientListRequest {
  status?: string;
  key?: string;
  robotClientGroupUuid?: string;
  page: number;
  size: number;
}

interface ClientListResponse {
  code: number;
  success: boolean;
  msg: string;
  data: Array<{
    robotClientUuid: string;
    robotClientName: string;
    status: string;
    description?: string;
    windowsUserName?: string;
    clientIp?: string;
    machineName?: string;
  }>;
  page: {
    total: number;
    size: number;
    page: number;
    pages: number;
  };
}

interface JobQueryResponse {
  code: number;
  success: boolean;
  msg: string;
  data: {
    jobUuid: string;
    status: string;
    statusName: string;
    remark?: string;
    robotClientUuid?: string;
    robotClientName?: string;
    startTime?: string;
    endTime?: string;
    robotUuid: string;
    robotName: string;
    screenshotUrl?: string;
    robotParams?: {
      inputs?: Array<{
        name: string;
        value: string;
        type: string;
      }>;
      outputs?: Array<{
        name: string;
        value: string;
        type: string;
      }>;
    };
  };
}
