const Operation = require('src/app/Operation');

class UpdateRule extends Operation {
  constructor({ rulesRepository }) {
    super();
    this.rulesRepository = rulesRepository;
  }

  async execute(ruleId, ruleData) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.outputs;

    try {
      const rule = await this.rulesRepository.update(ruleId, ruleData);
      this.emit(SUCCESS, rule);
    } catch(error) {
      switch(error.message) {
      case 'ValidationError':
        return this.emit(VALIDATION_ERROR, error);
      case 'NotFoundError':
        return this.emit(NOT_FOUND, error);
      default:
        this.emit(ERROR, error);
      }
    }
  }
}

UpdateRule.setOutputs(['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR']);

module.exports = UpdateRule;
