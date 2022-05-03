const Operation = require('src/app/Operation');

class GetAllRules extends Operation {
  constructor({ rulesRepository }) {
    super();
    this.rulesRepository = rulesRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const rules = await this.rulesRepository.getAll({
        attributes: [
          'id',
          'createdOn',
          'modifiedOn',
          'value',
          'author',
          'comment',
        ],
      });

      this.emit(SUCCESS, rules);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllRules.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllRules;
