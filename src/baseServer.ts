import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import i18n from './i18n/index.js';
import { OpenApiService } from './yingdao/openApiService.js';
import {LocalService} from './yingdao/localService.js';
import { querySchema, robotParamSchema, uploadFileSchema, startJobSchema, queryJobSchema, clientListSchema } from './schema/openApi.js';
import { executeRpaAppSchema, queryRobotParamSchema } from './schema/local.js';
export abstract class BaseServer{
    public readonly server: McpServer;
    protected readonly openApiService?: OpenApiService;
    protected readonly localService?: LocalService;

    constructor() {
        this.server = new McpServer({
            name: 'Yingdao RPA Mcp Server',
            version: '0.0.1',
        },{
        capabilities: {
            logging: {},
            tools: {},
            },
        });        
        if (process.env.RPA_MODEL !== 'local') {
            if(!process.env.ACCESS_KEY_ID || !process.env.ACCESS_KEY_SECRET) {
                throw new Error('Missing ACCESS_KEY_ID or ACCESS_KEY_SECRET environment variables');
            }
            this.openApiService = new OpenApiService(process.env.ACCESS_KEY_ID, process.env.ACCESS_KEY_SECRET);
             this.registerTools();
        } else {
            if(!process.env.SHADOWBOT_PATH || !process.env.USER_FOLDER){
                    throw new Error('Missing SHADOWBOT_PATH or USER_FOLDER environment variables');
                }
            this.localService = new LocalService(process.env.SHADOWBOT_PATH, process.env.USER_FOLDER);
           
            this.registerLocalTools();
        }
        
    }

    abstract start(): Promise<void>;

    registerLocalTools(): void{
        this.server.tool('queryApplist', i18n.t('tool.queryApplist.description'), querySchema, async ({ appId, size, page, ownerUserSearchKey, appName }) => {
            try {
                const result = await this.localService?.queryAppList();
                return { content: [{ type: 'text', text: JSON.stringify(result) }]};
            } catch (error) {
                throw new Error(i18n.t('tool.queryApplist.error'));
            }
        });
        this.server.tool('runApp', i18n.t('tool.runApp.description'), executeRpaAppSchema, async ({ appUuid, appParams }) => {
            try {
                const result = await this.localService?.executeRpaApp(appUuid, appParams);
                return { content: [{ type: 'text', text: JSON.stringify(result) }]};
            } catch (error) {
                throw new Error(i18n.t('tool.runApp.error'));
            }
        });
        this.server.tool('queryRobotParam', i18n.t('tool.uploadFile.description'), queryRobotParamSchema, async ({ robotUuid }) => {
            try {
                const result = await this.localService?.queryRobotParam(robotUuid);
                return { content: [{ type: 'text', text: JSON.stringify(result) }]};
            } catch (error) {
                throw new Error(i18n.t('tool.uploadFile.error'));
            }
        });
    }
    
    registerTools(): void{
        this.server.tool('uploadFile', i18n.t('tool.uploadFile.description'), uploadFileSchema, async ({ file, fileName }) => {
            try {
                const result = await this.openApiService?.uploadFile(file, fileName);
                return { content: [{ type: 'text', text: JSON.stringify(result) }]};
            } catch (error) {
                throw new Error(i18n.t('tool.uploadFile.error'));
            }
        });
        this.server.tool('queryRobotParam', i18n.t('tool.queryRobotParam.description'), robotParamSchema, async ({ robotUuid, accurateRobotName }) => {
            try {
                const result = await this.openApiService?.queryRobotParam({
                    robotUuid,
                    accurateRobotName
                });
                return { content: [{ type: 'text', text: JSON.stringify(result) }]};
            } catch (error) {
                throw new Error(i18n.t('tool.queryRobotParam.error'));
            }
        });
        this.server.tool('queryApplist', i18n.t('tool.queryApplist.description'), querySchema, async ({ appId, size, page, ownerUserSearchKey, appName }) => {
            try {
                const result = await this.openApiService?.queryAppList({
                    appId,
                    size,
                    page,
                    ownerUserSearchKey,
                    appName
                });
                return { content: [{ type: 'text', text: JSON.stringify(result) }]};
            } catch (error) {
                throw new Error(i18n.t('tool.queryApplist.error'));
            }
        });
        this.server.tool('startJob', i18n.t('tool.startJob.description'), startJobSchema, async ({ robotUuid, accountName,params }) => {
            try {
                // Transform params from Record<string, any> to the expected array format
                const transformedParams = params ? Object.entries(params).map(([name, value]) => ({
                    name,
                    value: String(value), // Convert value to string
                    type: 'string' // Default type as string
                })) : undefined;
                
                const result = await this.openApiService?.startJob({
                    robotUuid,
                    accountName,
                    params: transformedParams
                });
                return { content: [{ type: 'text', text: JSON.stringify(result) }]};
            } catch (error) {
                console.error(error);
                throw new Error(i18n.t('tool.startJob.error'));
            }
        });
        this.server.tool('queryJob', i18n.t('tool.queryJob.description'), queryJobSchema, async ({ jobUuid }) => {
            try {
                const result = await this.openApiService?.queryJob({
                    jobUuid
                });
                return { content: [{ type: 'text', text: JSON.stringify(result) }]};
            } catch (error) {
                throw new Error(i18n.t('tool.queryJob.error'));
            }
        });
        this.server.tool('queryClientList', i18n.t('tool.queryClientList.description'), clientListSchema, async ({ status, key, robotClientGroupUuid, page, size }) => {
            try {
                const result = await this.openApiService?.queryClientList({
                    status,
                    key,
                    robotClientGroupUuid,
                    page,
                    size
                });
                return { content: [{ type: 'text', text: JSON.stringify(result) }]};
            } catch (error) {
                throw new Error(i18n.t('tool.queryClientList.error'));
            }
        });
    }

}