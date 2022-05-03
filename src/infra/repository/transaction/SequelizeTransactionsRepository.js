const TransactionMapper = require('./SequelizeTransactionMapper');

class SequelizeTransactionsRepository {
  constructor({ TransactionModel, RuleModel }) {
    this.TransactionModel = TransactionModel;
    this.RuleModel = RuleModel;
  }

  async getAll(...args) {
    const transactions = await this.TransactionModel.findAll(...args);
    
    return transactions.map(TransactionMapper.toEntity);
  }

  async getAllTransactionsWithRule() {
    const transactions = await this.TransactionModel.findAll({
      include:[{
        model: this.RuleModel,
        required:true
      }]
    });
    
    return transactions.map(TransactionMapper.toTransactionRule);
  }

  async getById(id) {
    const transaction = await this._getById(id);

    return TransactionMapper.toEntity(transaction);
  }

  async add(transaction) {
    const { valid, errors } = transaction.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const newTransaction = await this.TransactionModel.create(TransactionMapper.toDatabase(transaction));
    return TransactionMapper.toEntity(newTransaction);
  }

  async remove(id) {
    const transaction = await this._getById(id);

    await transaction.destroy();
    return;
  }

  async update(id, newData) {
    const transaction = await this._getById(id);

    const transactionProcess = await this.TransactionModel.sequelize.transaction();

    try {
      const updatedTransaction = await transaction.update(newData, { transactionProcess });
      const transactionEntity = TransactionMapper.toEntity(updatedTransaction);

      const { valid, errors } = transactionEntity.validate();

      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;

        throw error;
      }

      await transactionProcess.commit();

      return transactionEntity;
    } catch(error) {
      await transactionProcess.rollback();

      throw error;
    }
  }

  async count() {
    return await this.TransactionModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.TransactionModel.findById(id, { rejectOnEmpty: true });
    } catch(error) {
      if(error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Transaction with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = SequelizeTransactionsRepository;
