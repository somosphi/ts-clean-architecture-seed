"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
class Repository {
    transactionable(trx) {
        if (trx) {
            return this.table.transacting(trx);
        }
        return this.table;
    }
    get table() {
        return this.database(this.tableName);
    }
    get transaction() {
        return this.database.transaction.bind(this.database);
    }
    async create(data, trx) {
        const [createdId] = await this.transactionable(trx).insert(data);
        return createdId.toString();
    }
    async all(trx) {
        return this.transactionable(trx);
    }
    async getById(id, trx) {
        return this.transactionable(trx)
            .where('id', id)
            .first();
    }
    async deleteById(id, trx) {
        const result = await this.transactionable(trx)
            .where('id', id)
            .delete();
        return result > 0;
    }
    async updateById(id, data, trx) {
        const result = await this.transactionable(trx)
            .where('id', id)
            .update(data);
        return result > 0;
    }
}
exports.Repository = Repository;
