#!/usr/bin/env node
import { config } from 'dotenv';

config();

import { HttpServer } from './httpServer.js';
import i18n from './i18n/index.js';
import { StdioServer } from './stdioServer.js';
export async function startServer():Promise<void> {
  const isServer = process.argv.includes('--server');
  i18n.language = process.env.LANGUAGE || 'zh';
  if (!process.env.RPA_MODEL) {
    process.env.RPA_MODEL = 'local';
  }
  if (isServer) {
    const server = new HttpServer(); 
    await server.start();
  } else {
    const server = new StdioServer();
    await server.start(); 
  }

} 

if (process.argv[1]) {
  startServer().catch(error => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
  console.log('yingdao-mcp-server started');
}