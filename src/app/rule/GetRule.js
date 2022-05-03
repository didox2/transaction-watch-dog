const Operation = require('src/app/Operation');

class GetRule extends Operation {
  constructor({ rulesRepository }) {
    super();
    this.rulesRepository = rulesRepository;
  }

  async execute(ruleId) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const rule = await this.rulesRepository.getById(ruleId);
      this.emit(SUCCESS, rule);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetRule.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetRule;
