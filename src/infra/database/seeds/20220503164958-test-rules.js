'use strict';

const dataFaker = require('src/infra/support/dataFaker');

module.exports = {
  async up(queryInterface) {
    const testRules = [];

    for (let i = 0; i < 20; i++) {
      testRules.push({
        uuid: dataFaker.guid({version: 4}),
        value: dataFaker.string({ length: 20 }),
        author: dataFaker.name(),
        comment: dataFaker.string({ length: 20 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert('rules', testRules, {});
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('rules', null, {});
  },
};
