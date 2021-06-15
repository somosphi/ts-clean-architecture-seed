"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpServer = void 0;
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const express_1 = __importStar(require("express"));
const logger_1 = require("@/logger");
const env_1 = require("@/main/env");
const error_handler_1 = require("@/presentation/http/middleware/error-handler");
const controllers_1 = require("@/presentation/http/controllers");
const errors_1 = require("@/presentation/http/errors");
const base_http_1 = require("@/main/modules/http/base-http");
class HttpServer extends base_http_1.BaseHttp {
    constructor(container) {
        super(container);
        this.container = container;
    }
    loadControllers() {
        return [controllers_1.ListUsersByIdController, controllers_1.ListUsersController];
    }
    start() {
        const app = express_1.default();
        const router = express_1.Router({ mergeParams: true });
        const buildedRoutes = this.buildRoutes(router);
        app.set('trust proxy', true);
        app.use(helmet_1.default());
        app.use(cors_1.default());
        app.use(compression_1.default());
        app.use(body_parser_1.default.json({
            limit: env_1.env.httpBodyLimit,
        }));
        router.get(['/info', '/status'], async (req, res, next) => {
            try {
                res.sendStatus(204);
            }
            catch (err) {
                next(err);
            }
        });
        app.use(buildedRoutes);
        app.use('*', (req, res, next) => {
            next(new errors_1.NotFoundError());
        });
        app.use(error_handler_1.errorHandlerMiddleware);
        app.listen(env_1.env.httpPort, () => logger_1.logger.info(`Server running on http://localhost:${env_1.env.httpPort}`));
        this.app = app;
    }
}
exports.HttpServer = HttpServer;
