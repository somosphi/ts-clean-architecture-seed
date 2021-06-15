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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonPlaceHolderIntegration = void 0;
const tsyringe_1 = require("tsyringe");
const user_1 = require("@/core/entities/user");
const enum_1 = require("@/core/enum");
const env_1 = require("@/main/env");
let JsonPlaceHolderIntegration = class JsonPlaceHolderIntegration {
    constructor(http) {
        this.http = http;
        http.createInstance({
            baseURL: env_1.env.jsonPlaceholderUrl,
        });
    }
    async getUsers() {
        const result = await this.http.get('/users');
        return result.data.map(item => new user_1.User({
            emailAddress: item.email,
            name: item.name,
            source: enum_1.UserSources.JsonPlaceholder,
            username: item.username,
        }));
    }
};
JsonPlaceHolderIntegration = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('HttpService')),
    __metadata("design:paramtypes", [Object])
], JsonPlaceHolderIntegration);
exports.JsonPlaceHolderIntegration = JsonPlaceHolderIntegration;
