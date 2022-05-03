const Operation = require('src/app/Operation');

class DeleteRule extends Operation {
  constructor({ rulesRepository }) {
    super();
    this.rulesRepository = rulesRepository;
  }

  async execute(ruleId) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      await this.rulesRepository.remove(ruleId);
      this.emit(SUCCESS);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }

      this.emit(ERROR, error);
    }
  }
}

DeleteRule.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = DeleteRule;
