const Rule = require('src/domain/rule/Rule');

const SequelizeRuleMapper = {
  toEntity({ dataValues }) {
    const { id, uuid, createdOn, modifiedOn, value, author, comment } = dataValues;
    return new Rule({ id, uuid, createdOn, modifiedOn, value, author, comment });
  },

  toDatabase(survivor) {
    const { uuid, createdOn, modifiedOn, value, author, comment } = survivor;

    return { uuid, createdOn, modifiedOn, value, author, comment };
  },
};

module.exports = SequelizeRuleMapper;
