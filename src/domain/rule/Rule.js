const { attributes } = require('structure');

const Rule = attributes({
  id: Number,
  uuid: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
  },
  modifiedOn: {
    type: Date,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
})(
  class Rule {
    isLegal() {
      return false;
    }
  }
);

module.exports = Rule;
