//evals.ts

import { EvalConfig } from 'mcp-evals';
import { openai } from "@ai-sdk/openai";
import { grade, EvalFunction } from "mcp-evals";

const queryApplistEval: EvalFunction = {
    name: 'queryApplistEval',
    description: 'Evaluates the queryApplist tool',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please retrieve the entire list of apps and show their details.");
        return JSON.parse(result);
    }
};

const runAppEval: EvalFunction = {
    name: 'runApp Evaluation',
    description: 'Evaluates the runApp tool',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please run the RPA app with UUID '12345678' using parameters {\"foo\":\"bar\"}.");
        return JSON.parse(result);
    }
};

const queryRobotParamEval: EvalFunction = {
    name: 'queryRobotParamEval',
    description: 'Evaluates the correctness and reliability of querying robot parameters',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please retrieve the parameters for the robot with UUID 'abc123'.");
        return JSON.parse(result);
    }
};

const uploadFileEval: EvalFunction = {
    name: 'uploadFile Evaluation',
    description: 'Evaluates the uploadFile tool functionality',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please upload a small text file named 'mySample.txt' with the content 'Test content for uploadFile tool'.");
        return JSON.parse(result);
    }
};

const queryRobotParamEval: EvalFunction = {
  name: "queryRobotParam Evaluation",
  description: "Evaluates the functionality of queryRobotParam tool",
  run: async () => {
    const result = await grade(openai("gpt-4"), "What are the parameters for the robot with UUID 1234-5678 and accurate name MyAccurateRobot?");
    return JSON.parse(result);
  }
};

const config: EvalConfig = {
    model: openai("gpt-4"),
    evals: [queryApplistEval, runAppEval, queryRobotParamEval, uploadFileEval, queryRobotParamEval]
};
  
export default config;
  
export const evals = [queryApplistEval, runAppEval, queryRobotParamEval, uploadFileEval, queryRobotParamEval];