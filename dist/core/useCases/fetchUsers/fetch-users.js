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
exports.FetchUsersUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const enum_1 = require("@/core/enum");
let FetchUsersUseCase = class FetchUsersUseCase {
    constructor(jsonPlaceHolderIntegration, userRepository) {
        this.jsonPlaceHolderIntegration = jsonPlaceHolderIntegration;
        this.userRepository = userRepository;
    }
    async fetchUsers() {
        const jsonPlaceholderUsers = await this.jsonPlaceHolderIntegration.getUsers();
        const jsonPlaceholderEmails = jsonPlaceholderUsers.map(jsonPlaceholderUser => jsonPlaceholderUser.emailAddress);
        const fetchedIds = [];
        await this.userRepository.transaction(async (trx) => {
            const sourceDatabaseUsers = await this.userRepository.getByEmailsWithSource(jsonPlaceholderEmails, enum_1.UserSources.JsonPlaceholder, trx);
            await Promise.all(jsonPlaceholderUsers.map(async (jsonPlaceholderUser) => {
                const jsonPlaceholderEmail = jsonPlaceholderUser.emailAddress.toLowerCase();
                const sourceDatabaseUser = sourceDatabaseUsers.find(sourceDatabaseUser => sourceDatabaseUser.emailAddress === jsonPlaceholderEmail);
                if (!sourceDatabaseUser) {
                    const createData = {
                        name: jsonPlaceholderUser.name,
                        username: jsonPlaceholderUser.username,
                        emailAddress: jsonPlaceholderEmail,
                        source: enum_1.UserSources.JsonPlaceholder,
                    };
                    fetchedIds.push(await this.userRepository.create(createData, trx));
                }
            }));
        });
        return fetchedIds;
    }
};
FetchUsersUseCase = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('JsonPlaceHolderIntegration')),
    __param(1, tsyringe_1.inject('UserRepository')),
    __metadata("design:paramtypes", [Object, Object])
], FetchUsersUseCase);
exports.FetchUsersUseCase = FetchUsersUseCase;
