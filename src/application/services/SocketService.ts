import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { singleton } from "tsyringe";
import { logger } from "../../infrastructure/logging/logger";

@singleton()
export class SocketService {
    private _io: Server | null = null;

    public init(server: HttpServer) {
        this._io = new Server(server, {
            cors: {
                origin: process.env.CLIENT_URL,
                credentials: true
            }
        });

        this._io.on("connection", (socket: Socket) => {
            logger.info(`Client connected: ${socket.id}`);

            socket.on("join_project", (projectId: string) => {
                socket.join(projectId);
                logger.info(`Socket ${socket.id} joined project room: ${projectId}`);
            });

            socket.on("disconnect", () => {
                logger.info(`Client disconnected: ${socket.id}`);
            });
        });
    }

    public emitNewBid(projectId: string, bid: any) {
        if (this._io) {
            this._io.to(projectId).emit("new_bid_received", bid);
        }
    }

    public emitBidUpdate(projectId: string, bid: any) {
        if (this._io) {
            this._io.to(projectId).emit("bid_updated_received", bid);
        }
    }
}
