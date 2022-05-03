const TransactionSerializer = {
  serialize({
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
  }) {
    return {
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
    };
  },
};

module.exports = TransactionSerializer;
