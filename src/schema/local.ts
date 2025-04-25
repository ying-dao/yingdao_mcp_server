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