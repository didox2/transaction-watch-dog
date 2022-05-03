'use strict';

const dataFaker = require('src/infra/support/dataFaker');

module.exports = {
  async up(queryInterface) {
    const testConfigurations = [];

    for (let i = 0; i < 20; i++) {
      testConfigurations.push({
        uuid: dataFaker.guid({version: 4}),
        hash: dataFaker.string({ length: 20 }),
        block: dataFaker.integer({ min: 1000000000, max: 2000000000 }),
        from: dataFaker.string({ length: 20 }),
        to: dataFaker.string({ length: 20 }),
        value: dataFaker.integer({ min: 1, max: 200 }),
        fee: dataFaker.floating({ min: 0, max: 100 }),
        gasPrice: dataFaker.floating({ min: 0, max: 100 }),
        time: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ruleId: dataFaker.integer({ min: 1, max: 20 }),
      });
    }

    return queryInterface.bulkInsert('configurations', testConfigurations, {});
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('configurations', null, {});
  },
};
