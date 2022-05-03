const Operation = require('src/app/Operation');
const Rule = require('src/domain/rule/Rule');

class CreateRule extends Operation {
  constructor({ rulesRepository }) {
    super();
    this.rulesRepository = rulesRepository;
  }

  async execute(rulesData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    const rule = new Rule(rulesData);

    try {
      const newRule = await this.rulesRepository.add(rule);

      this.emit(SUCCESS, newRule);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateRule.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateRule;
