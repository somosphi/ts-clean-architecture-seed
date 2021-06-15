"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvValidator = void 0;
const class_validator_1 = require("class-validator");
class EnvValidator {
    constructor(props) {
        Object.assign(this, props);
    }
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], EnvValidator.prototype, "httpPort", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], EnvValidator.prototype, "httpBodyLimit", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUrl(),
    __metadata("design:type", String)
], EnvValidator.prototype, "jsonPlaceholderUrl", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], EnvValidator.prototype, "rabbitMQEnabled", void 0);
__decorate([
    class_validator_1.IsEnum(['amqp']),
    __metadata("design:type", String)
], EnvValidator.prototype, "rabbitMQProtocol", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], EnvValidator.prototype, "rabbitMQHost", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], EnvValidator.prototype, "rabbitMQPort", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], EnvValidator.prototype, "rabbitMQUsername", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], EnvValidator.prototype, "rabbitMQPassword", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], EnvValidator.prototype, "rabbitMQVHost", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], EnvValidator.prototype, "redisHost", void 0);
exports.EnvValidator = EnvValidator;
