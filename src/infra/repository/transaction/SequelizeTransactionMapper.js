const Transaction = require('src/domain/transaction/Transaction');
const TransactionRule = require('src/domain/transaction/TransactionRule');

const SequelizeTransactionMapper = {
  toEntity({ dataValues }) {
    const {
      id,
      uuid,
      hash,
      block,
      from,
      to,
      value,
      fee,
      gasPrice,
      time,
      createdAt,
      updatedAt,
      ruleId,
    } = dataValues;

    return new Transaction({
      id,
      uuid,
      hash,
      block,
      from,
      to,
      value,
      fee,
      gasPrice,
      time,
      createdAt,
      updatedAt,
      ruleId,
    });
  },

  toDatabase(survivor) {
    const {
      uuid,
      hash,
      block,
      from,
      to,
      value,
      fee,
      gasPrice,
      time,
      createdAt,
      updatedAt,
      ruleId,
    } = survivor;

    return {
      uuid,
      hash,
      block,
      from,
      to,
      value,
      fee,
      gasPrice,
      time,
      createdAt,
      updatedAt,
      ruleId,
    };
  },

  toTransactionRule({ dataValues }) {
    const { id, hash,  } = dataValues;
    const rule = dataValues.rule;

    return new TransactionRule({
      id,
      hash,
      rule: {
        ruleUUID: rule.uuid,
        ruleValue: rule.value,
      },
    });
  },
};

module.exports = SequelizeTransactionMapper;
