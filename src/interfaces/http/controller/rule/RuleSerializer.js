const RuleSerializer = {
  serialize({ id, uuid, createdOn, modifiedOn, value, author, comment }) {
    return {
      id,
      uuid,
      createdOn,
      modifiedOn,
      value,
      author,
      comment,
    };
  },
};

module.exports = RuleSerializer;
