"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producer = void 0;
const buffer_converter_1 = require("@/shared/helper/buffer-converter");
class Producer {
    publish(exchange, routingKey, message, additionalParams) {
        try {
            this.channel.publish(exchange || '', routingKey, buffer_converter_1.converter(message), additionalParams);
        }
        catch (err) {
            throw Error(`Error Posting Message to RabbitMQ Server - cause ${err.message}`);
        }
    }
}
exports.Producer = Producer;
