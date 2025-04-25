import { z } from "zod";
import i18n from '../i18n/index.js';

// Schema for executeRpaApp method
export const executeRpaAppSchema = {
    appUuid: z.string().describe(i18n.t('schema.local.executeRpaApp.appUuid')),
    appParams: z.any().describe(i18n.t('schema.local.executeRpaApp.appParams'))
} as const;

// Schema for queryRobotParam method
export const queryRobotParamSchema = {
    robotUuid: z.string().optional().describe(i18n.t('schema.local.queryRobotParam.robotUuid'))
} as const;

// Schema for queryAppList method - no parameters needed
export const queryAppListSchema = {} as const;

// Response types for better type safety
export const AppInfoSchema = z.object({
    uuid: z.string(),
    name: z.string(),
    description: z.string().optional()
});

export type AppInfo = z.infer<typeof AppInfoSchema>;

// Export all schemas
export const localSchemas = {
    executeRpaApp: executeRpaAppSchema,
    queryRobotParam: queryRobotParamSchema,
    queryAppList: queryAppListSchema
};

export const uploadFileSchema = {
    file: z.any().describe(i18n.t('schema.uploadFile.file')),
    fileName: z.string().max(100).describe(i18n.t('schema.uploadFile.fileName'))
} as const;

export const robotParamSchema = {
    robotUuid: z.string().optional().describe(i18n.t('schema.robotParam.robotUuid')),
    accurateRobotName: z.string().optional().describe(i18n.t('schema.robotParam.accurateRobotName'))
} as const;

export const querySchema = {
    appId: z.string().optional().describe(i18n.t('schema.query.appId')),
    size: z.string()
    .optional()
    .default('30')
    .transform(Number)
    .refine(n => n <= 100, i18n.t('schema.query.sizeRefine'))
    .describe(i18n.t('schema.query.size')),
    page: z.string()
    .optional()
    .default('1')
    .transform(Number)
    .describe(i18n.t('schema.query.page')),
    ownerUserSearchKey: z.string().optional().describe(i18n.t('schema.query.ownerUserSearchKey')),
    appName: z.string().optional().describe(i18n.t('schema.query.appName'))
} as const;

export const startJobSchema = {
    robotUuid: z.string().describe(i18n.t('schema.startJob.robotUuid')),
    accountName: z.string().optional().describe(i18n.t('schema.startJob.accountName')),
    robotClientGroupUuid: z.string().optional().describe(i18n.t('schema.startJob.robotClientGroupUuid')),
    waitTimeoutSeconds: z.number()
        .optional()
        .refine(n => !n || (n >= 60 && n <= 950400), i18n.t('schema.startJob.waitTimeoutRefine'))
        .describe(i18n.t('schema.startJob.waitTimeoutSeconds')),
    runTimeout: z.number()
        .optional()
        .refine(n => !n || (n >= 60 && n <= 950400), i18n.t('schema.startJob.runTimeoutRefine'))
        .describe(i18n.t('schema.startJob.runTimeout')),
    params: z.record(z.any()).optional()
        .refine(obj => JSON.stringify(obj).length <= 8000, i18n.t('schema.startJob.paramsRefine'))
        .describe(i18n.t('schema.startJob.params'))
} as const;

export const queryJobSchema = {
    jobUuid: z.string().describe(i18n.t('schema.queryJob.jobUuid'))
} as const;

export const clientListSchema = {
    status: z.string().optional().describe(i18n.t('schema.clientList.status')),
    key: z.string().optional().describe(i18n.t('schema.clientList.key')),
    robotClientGroupUuid: z.string().optional().describe(i18n.t('schema.clientList.robotClientGroupUuid')),
    page: z.string()
        .default('1')
        .transform(Number)
        .describe(i18n.t('schema.clientList.page')),
    size: z.string()
        .default('30')
        .transform(Number)
        .refine(n => n <= 100, i18n.t('schema.clientList.sizeRefine'))
        .describe(i18n.t('schema.clientList.size'))
} as const;