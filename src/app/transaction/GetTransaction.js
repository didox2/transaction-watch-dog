const Operation = require('src/app/Operation');

class GetTransaction extends Operation {
  constructor({ transactionsRepository }) {
    super();
    this.transactionsRepository = transactionsRepository;
  }

  async execute(transactionId) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const transaction = await this.transactionsRepository.getById(transactionId);
      this.emit(SUCCESS, transaction);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetTransaction.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetTransaction;
