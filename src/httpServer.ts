import express, { Request, Response } from 'express';
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { BaseServer } from './baseServer.js';
import { IncomingMessage, ServerResponse, Server } from "http";

export class HttpServer extends BaseServer {
    private app: express.Application;
    private port: number;
    private transports: { [sessionId: string]: SSEServerTransport } = {};
    constructor() {
        super();
        this.app = express();

        this.port = Number(process.env.SERVER_PORT) || 3000;
    }

    async start(): Promise<void> {
       
        // Configure Express routes
        this.app.use(express.json());
        
        // Mount the MCP server on the Express app
        this.app.post('/messages', async (req: Request, res: Response) => { 
            const sessionId = req.query.sessionId as string;
            if (!this.transports[sessionId]) {
                res.status(400).send(`No transport found for sessionId ${sessionId}`);
                return;
            }
            console.log(`Received message for sessionId ${sessionId}`,req.body,req.method,req.url);
           
            await this.transports[sessionId].handlePostMessage(req, res,req.body);
        });
        this.app.get('/sse', async (req, res) => {
             console.log(`Received`,req.body,req.method,req.url);
            // Set up the SSE transport for the MCP server
            const transport = new SSEServerTransport("/messages", res as unknown as ServerResponse<IncomingMessage>);
            this.transports[transport.sessionId] = transport;
            res.on("close", () => {
                delete this.transports[transport.sessionId];
                 });
            await this.server.connect(transport);
        });

        // Start the HTTP server
        this.app.listen(this.port, () => {
            console.log(`RPA HTTP Server listening on port ${this.port}`);
            console.log(`SSE endpoint available at http://localhost:${this.port}/sse`);
            console.log(`Message endpoint available at http://localhost:${this.port}/messages`);
        });
       
    }
}