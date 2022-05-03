const RuleMapper = require('./SequelizeRuleMapper');

class SequelizeRulesRepository {
  constructor({ RuleModel }) {
    this.RuleModel = RuleModel;
  }

  async getAll(...args) {
    const rules = await this.RuleModel.findAll(...args);

    return rules.map(RuleMapper.toEntity);
  }

  async getById(id) {
    const rule = await this._getById(id);

    return RuleMapper.toEntity(rule);
  }

  async add(rule) {
    const { valid, errors } = rule.validate();

    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const newRule = await this.RuleModel.create(RuleMapper.toDatabase(rule));
    return RuleMapper.toEntity(newRule);
  }

  async remove(id) {
    const rule = await this._getById(id);

    await rule.destroy();
    return;
  }

  async update(id, newData) {
    const rule = await this._getById(id);

    const transaction = await this.RuleModel.sequelize.transaction();

    try {
      const updatedRule = await rule.update(newData, { transaction });
      const ruleEntity = RuleMapper.toEntity(updatedRule);

      const { valid, errors } = ruleEntity.validate();

      if (!valid) {
        const error = new Error('ValidationError');
        error.details = errors;

        throw error;
      }

      await transaction.commit();

      return ruleEntity;
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return await this.RuleModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.RuleModel.findById(id, { rejectOnEmpty: true });
    } catch (error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Rule with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = SequelizeRulesRepository;
