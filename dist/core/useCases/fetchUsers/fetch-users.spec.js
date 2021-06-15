"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
const enum_1 = require("@/core/enum");
const fetch_users_1 = require("./fetch-users");
describe('FetchUsersUseCase', () => {
    describe('#fetchUsers', () => {
        it('should fetch all users when database result is empty', async () => {
            const sourceDatabaseUsers = [];
            const jsonPlaceholderUsers = [
                {
                    name: 'Fulano',
                    username: 'fulano',
                    emailAddress: 'AAA@AAA.com',
                },
            ];
            const placeholderEmails = jsonPlaceholderUsers.map(jsonPlaceholderUser => jsonPlaceholderUser.emailAddress);
            const providers = {
                jsonPlaceholderIntegration: {
                    getUsers: sinon_1.default.fake.resolves(jsonPlaceholderUsers),
                },
                userRepository: {
                    getByEmailsWithSource: sinon_1.default.fake.resolves(sourceDatabaseUsers),
                    create: sinon_1.default.fake.resolves('1'),
                    transaction: sinon_1.default.fake((cb) => cb()),
                },
            };
            const fetchUsersUseCase = new fetch_users_1.FetchUsersUseCase(
            // @ts-ignore
            ...Object.values(providers));
            const fetchedIds = await fetchUsersUseCase.fetchUsers();
            const [fetchUser] = jsonPlaceholderUsers;
            chai_1.expect(fetchedIds).to.be.eql(['1']);
            chai_1.assert(providers.jsonPlaceholderIntegration.getUsers.calledOnce);
            chai_1.assert(providers.userRepository.getByEmailsWithSource(placeholderEmails, enum_1.UserSources.JsonPlaceholder));
            chai_1.assert(providers.userRepository.create.calledOnceWith({
                name: fetchUser.name,
                username: fetchUser.username,
                emailAddress: fetchUser.emailAddress.toLowerCase(),
                source: enum_1.UserSources.JsonPlaceholder,
            }));
        });
    });
});
