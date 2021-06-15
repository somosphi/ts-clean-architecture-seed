"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = void 0;
const axios_1 = __importDefault(require("axios"));
const tsyringe_1 = require("tsyringe");
let HttpService = class HttpService {
    get(url, config) {
        return this.instance.get(url, this.loadConfigs(config));
    }
    post(url, data, config) {
        return this.instance.post(url, data, this.loadConfigs(config));
    }
    delete(url, config) {
        return this.instance.delete(url, this.loadConfigs(config));
    }
    patch(url, data, config) {
        return this.instance.patch(url, data, this.loadConfigs(config));
    }
    createInstance(config) {
        this.instance = axios_1.default.create({
            ...this.loadConfigs(config),
        });
    }
    loadConfigs(config) {
        if (!config) {
            return {};
        }
        const { baseURL, data, headers, method, params, timeout, url } = config;
        const castedMethod = method;
        return {
            url,
            method: castedMethod,
            baseURL,
            headers,
            params,
            data,
            timeout,
        };
    }
};
HttpService = __decorate([
    tsyringe_1.injectable()
], HttpService);
exports.HttpService = HttpService;
