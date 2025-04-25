import { platform } from 'os';
import path from 'path';
import { spawn } from 'child_process';
import { readFileSync,readdirSync, existsSync } from 'fs';
export class LocalService {
    appsPath: string;
    constructor(private  shadowbotPath: string,private readonly userFolder: string) {
        this.appsPath = path.join(this.userFolder, 'apps');
        if (platform() === 'darwin') {
            this.shadowbotPath=path.join(this.shadowbotPath, 'Contents/MacOS/影刀');
        } 
    }
    
    async executeRpaApp(appUuid: string, appParams: any) {
        let argv = `shadowbot:Run?robot-uuid=${appUuid}`;
        spawn(this.shadowbotPath, [argv]);
        return 'success';
    }

    async queryRobotParam(robotUuid?: string): Promise<any> {
         const mainFlowJsonPath=path.join(this.appsPath, 'xbot_robot','.dev','main.flow.json');
        if (!existsSync(mainFlowJsonPath)) {
            const mainFlow = JSON.parse(readFileSync(mainFlowJsonPath, 'utf8'));
            if (mainFlow.parameters) {
                return mainFlow.parameters;
            } else {
                return [];
            }
        }
        return [];
    }

    async queryAppList() {
        const result = [];
        
        try {
            if (!existsSync(this.appsPath)) {
                return [];
            }
            const appFolders = readdirSync(this.appsPath, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory() && dirent.name.endsWith('_Release'))
                .map(dirent => dirent.name);
            for (const folder of appFolders) {
                const packageJsonPath = path.join(this.appsPath, folder, 'xbot_robot', 'package.json');
                if (existsSync(packageJsonPath)) {
                    try {
                        const packageData = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
                        if (packageData.robot_type === 'app' && packageData.name) {
                            result.push({
                                uuid: packageData.uuid || '',
                                name: packageData.name,
                                description: packageData.description || ''
                            });
                        }
                    } catch (err) {
                        console.error(`Error parsing package.json in ${folder}:`, err);
                    }
                }
            }
            
            return result;
        } catch (err) {
            console.error('Error reading apps directory:', err);
            return [];
        }
    }
}
