export const table = function (tableName: string) {
  return function (constructor: Function) {
    constructor.prototype.tableName = tableName;
  };
};
