const Operation = require('src/app/Operation');
const Transaction = require('src/domain/transaction/Transaction');

class CreateTransaction extends Operation {
  constructor({ transactionsRepository }) {
    super();
    this.transactionsRepository = transactionsRepository;
  }

  async execute(transactionData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    const transaction = new Transaction(transactionData);

    try {
      const newTransaction = await this.transactionsRepository.add(transaction);

      this.emit(SUCCESS, newTransaction);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateTransaction.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateTransaction;
