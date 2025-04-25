import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Tool descriptions
      'tool.uploadFile.description': 'This interface is used to upload files to the RPA platform.',
      'tool.queryRobotParam.description': 'This interface is used to query RPA robot parameters.',
      'tool.queryApplist.description': 'This interface is used to paginate and get the RPA application list.',
      'tool.startJob.description': 'This interface is used to start an RPA job.',
      'tool.queryJob.description': 'This interface is used to query the status of an RPA job.',
      'tool.queryClientList.description': 'This interface is used to query the list of RPA clients.',
      'tool.runApp.description': 'This interface is used to run an RPA application.',
      
      // Tool errors
      'tool.uploadFile.error': 'Failed to upload file',
      'tool.queryRobotParam.error': 'Failed to query robot parameters',
      'tool.queryApplist.error': 'Failed to get application list',
      'tool.startJob.error': 'Failed to start job',
      'tool.queryJob.error': 'Failed to query job status',
      'tool.queryClientList.error': 'Failed to query client list',
      'tool.runApp.error': 'Failed to run application',
      
      // RpaService validation errors
      'rpaService.error.fileNameTooLong': 'File name length cannot exceed 100 characters',
      'rpaService.error.unsupportedFileType': 'Only txt, csv, xlsx file types are supported',
      'rpaService.error.uploadFailed': 'File upload failed',
      'rpaService.error.robotUuidRequired': 'robotUuid is a required parameter',
      'rpaService.error.accountNameAndGroupConflict': 'accountName and robotClientGroupUuid can only choose one of them',
      'rpaService.error.waitTimeoutRange': 'waitTimeoutSeconds must be between 60 and 950400 seconds',
      'rpaService.error.runTimeoutRange': 'runTimeout must be between 60 and 950400 seconds',
      'rpaService.error.paramsLengthExceeded': 'The total length of params cannot exceed 8000',
      'rpaService.error.startJobFailed': 'Failed to start application',
      'rpaService.error.jobUuidRequired': 'jobUuid is a required parameter',
      'rpaService.error.queryJobFailed': 'Failed to query application execution result',
      'rpaService.error.pageSizeRequired': 'page and size are required parameters',
      'rpaService.error.queryClientListFailed': 'Failed to query robot list',
      
      // Schema descriptions
      'schema.uploadFile.file': 'File content',
      'schema.uploadFile.fileName': 'File name, supports txt, csv, xlsx formats, length not exceeding 100 characters',
      'schema.robotParam.robotUuid': 'RPA application uuid',
      'schema.robotParam.accurateRobotName': 'Exact match of RPA application name',
      'schema.query.appId': 'RPA application ID',
      'schema.query.size': 'Page size',
      'schema.query.sizeRefine': 'Maximum 100 items per page',
      'schema.query.page': 'Page number',
      'schema.query.ownerUserSearchKey': 'Exact match of user account',
      'schema.query.appName': 'Fuzzy match of RPA application name',
      'schema.startJob.robotUuid': 'RPA application uuid, required',
      'schema.startJob.accountName': 'Account name',
      'schema.startJob.robotClientGroupUuid': 'RPA robot group uuid',
      'schema.startJob.waitTimeoutSeconds': 'Wait timeout (seconds)',
      'schema.startJob.waitTimeoutRefine': 'Wait timeout must be between 60 and 950400 seconds',
      'schema.startJob.runTimeout': 'Run timeout (seconds)',
      'schema.startJob.runTimeoutRefine': 'Run timeout must be between 60 and 950400 seconds',
      'schema.startJob.params': 'Run parameters',
      'schema.startJob.paramsRefine': 'Total length of params cannot exceed 8000',
      'schema.queryJob.jobUuid': 'RPA application execution uuid, required',
      'schema.clientList.status': 'Status',
      'schema.clientList.key': 'Keyword',
      'schema.clientList.robotClientGroupUuid': 'RPA robot group uuid',
      'schema.clientList.page': 'Page number',
      'schema.clientList.size': 'Page size',
      'schema.clientList.sizeRefine': 'Maximum 100 items per page'
    }
  },
  zh: {
    translation: {
      // Tool descriptions
      'tool.uploadFile.description': '该接口用于上传文件到RPA平台。',
      'tool.queryRobotParam.description': '该接口用于查询RPA机器人参数。',
      'tool.queryApplist.description': '该接口用于分页获取RPA应用列表。',
      'tool.startJob.description': '该接口用于启动RPA应用JOB。',
      'tool.queryJob.description': '该接口用于查询RPA应用JOB状态。',
      'tool.queryClientList.description': '该接口用于查询RPA机器人列表。',
      'tool.runApp.description': '该接口用于运行RPA应用。',
      
      // Tool errors
      'tool.uploadFile.error': '上传文件失败',
      'tool.queryRobotParam.error': '查询机器人参数失败',
      'tool.queryApplist.error': '获取RPA应用列表失败',
      'tool.startJob.error': '启动RPA应用JOB失败',
      'tool.queryJob.error': '查询RPA应用JOB状态失败',
      'tool.queryClientList.error': '查询RPA机器人列表失败',
      'tool.runApp.error': '运行RPA应用失败',
      
      // RpaService validation errors
      'rpaService.error.fileNameTooLong': '文件名长度不能超过100',
      'rpaService.error.unsupportedFileType': '仅支持txt、csv、xlsx文件类型',
      'rpaService.error.uploadFailed': '文件上传失败',
      'rpaService.error.robotUuidRequired': 'robotUuid是必填参数',
      'rpaService.error.accountNameAndGroupConflict': 'accountName和robotClientGroupUuid只能选择其中一个',
      'rpaService.error.waitTimeoutRange': 'waitTimeoutSeconds必须在60到950400秒之间',
      'rpaService.error.runTimeoutRange': 'runTimeout必须在60到950400秒之间',
      'rpaService.error.paramsLengthExceeded': 'params参数总长度不能超过8000',
      'rpaService.error.startJobFailed': '启动RPA应用JOB失败',
      'rpaService.error.jobUuidRequired': 'jobUuid是必填参数',
      'rpaService.error.queryJobFailed': '查询RPA应用JOB状态失败',
      'rpaService.error.pageSizeRequired': 'page和size是必填参数',
      'rpaService.error.queryClientListFailed': '查询RPA机器人列表失败',
      
      // Schema descriptions
      'schema.uploadFile.file': '文件内容',
      'schema.uploadFile.fileName': '文件名，支持txt、csv、xlsx格式，长度不超过100字符',
      'schema.robotParam.robotUuid': 'RPA应用UUID',
      'schema.robotParam.accurateRobotName': '精确匹配的RPA应用名称',
      'schema.query.appId': 'RPA应用UUID',
      'schema.query.size': '一页大小',
      'schema.query.sizeRefine': '每页最大100条',
      'schema.query.page': '页码',
      'schema.query.ownerUserSearchKey': '用户账号精确匹配',
      'schema.query.appName': 'RPA应用名称模糊匹配',
      'schema.startJob.robotUuid': 'RPA应用uuid，必填',
      'schema.startJob.accountName': '账号名称',
      'schema.startJob.robotClientGroupUuid': 'RPA机器人组uuid',
      'schema.startJob.waitTimeoutSeconds': '等待超时时间（秒）',
      'schema.startJob.waitTimeoutRefine': '等待超时时间必须在60到950400秒之间',
      'schema.startJob.runTimeout': '运行超时时间（秒）',
      'schema.startJob.runTimeoutRefine': '运行超时时间必须在60到950400秒之间',
      'schema.startJob.params': '运行参数',
      'schema.startJob.paramsRefine': 'params参数总长度不能超过8000',
      'schema.queryJob.jobUuid': 'RPA应用运行uuid，必填',
      'schema.clientList.status': '状态',
      'schema.clientList.key': '关键字',
      'schema.clientList.robotClientGroupUuid': 'RPA机器人组uuid',
      'schema.clientList.page': '页码',
      'schema.clientList.size': '一页大小',
      'schema.clientList.sizeRefine': '每页最大100条'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;