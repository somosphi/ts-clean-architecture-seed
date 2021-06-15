"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AMQPServer = void 0;
const amqplib_1 = require("amqplib");
const base_amqp_1 = require("@/main/modules/amqp/base-amqp");
const find_user_by_id_1 = require("@/presentation/amqp/consumers/findUserById/find-user-by-id");
const logger_1 = require("@/logger");
class AMQPServer extends base_amqp_1.BaseAMQP {
    constructor(container, config) {
        super(container);
        this.container = container;
        this.config = config;
    }
    loadConsumers() {
        return [find_user_by_id_1.FindUserByIdConsumer];
    }
    async start() {
        try {
            this.connection = await amqplib_1.connect(this.config);
            this.channel = await this.connection.createChannel();
            logger_1.logger.info(`RabbitMQ: AMQP server started`);
            this.container.register('vHost', { useValue: this.channel });
            logger_1.logger.info(`RabbitMQ connection established on vhost - ${this.config.vhost}`);
            this.startConsumers();
        }
        catch (err) {
            logger_1.logger.error(`Error connecting RabbitMQ to virtual host ${this.config.vhost} : ${err.message}`);
            this.reconnect();
        }
    }
}
exports.AMQPServer = AMQPServer;
