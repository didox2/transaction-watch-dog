const Operation = require('src/app/Operation');

class DeleteTransaction extends Operation {
  constructor({ transactionsRepository }) {
    super();
    this.transactionsRepository = transactionsRepository;
  }

  async execute(transactionId) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      await this.transactionsRepository.remove(transactionId);
      this.emit(SUCCESS);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }

      this.emit(ERROR, error);
    }
  }
}

DeleteTransaction.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = DeleteTransaction;
