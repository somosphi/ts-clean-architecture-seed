"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAMQP = void 0;
const logger_1 = require("@/logger");
const validation_1 = require("@/presentation/amqp/middlewares/validation");
const buffer_converter_1 = require("@/shared/helper/buffer-converter");
class BaseAMQP {
    constructor(container) {
        this.container = container;
    }
    startConsumers() {
        this.loadConsumers().forEach((consumer) => {
            const instance = this.container.resolve(consumer);
            this.channel.consume(instance.queue, async (message) => {
                try {
                    if (message) {
                        const messageContent = validation_1.validation(instance.schema)(buffer_converter_1.convertToJson(message.content));
                        await instance.messageHandler(messageContent);
                    }
                }
                catch (error) {
                    instance.onConsumeError(error, this.channel, message);
                }
                finally {
                    if (message)
                        this.channel.ack(message);
                }
            });
            logger_1.logger.info(`RabbitMQ: 'Started queue '${instance.queue}' to consume`);
        });
    }
    reconnect() {
        logger_1.logger.warn(`Trying to connect to rabbitmq on virtual host ${this.config.vhost} in 5 seconds`);
        setTimeout(() => {
            this.start();
        }, 5000);
    }
}
exports.BaseAMQP = BaseAMQP;
