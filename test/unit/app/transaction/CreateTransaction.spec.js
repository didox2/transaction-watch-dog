const { expect } = require('chai');
const CreateTransaction = require('src/app/transaction/CreateTransaction');

describe('App :: Transaction :: CreateTransaction', () => {
  var createTransaction;

  context('when transaction is valid', () => {
    before(() => {
      const MockTransactionsRepository = {
        add: (transaction) => Promise.resolve(transaction)
      };

      createTransaction = new CreateTransaction({
        transactionsRepository: MockTransactionsRepository
      });
    });

    it('creates the transaction and emits SUCCESS', (done) => {
      const transactionData = { name: 'New Transaction' };

      createTransaction.on(createTransaction.outputs.SUCCESS, (response) => {
        expect(response.name).to.equal('New Transaction');
        done();
      });

      createTransaction.execute(transactionData);
    });
  });

  context('when transaction is invalid', () => {
    before(() => {
      const MockTransactionsRepository = {
        add: () => Promise.reject(Error('ValidationError'))
      };

      createTransaction = new CreateTransaction({
        transactionsRepository: MockTransactionsRepository
      });
    });

    it('emits VALIDATION_ERROR with the error', (done) => {
      const transactionData = { name: 'New Transaction' };

      createTransaction.on(createTransaction.outputs.VALIDATION_ERROR, (response) => {
        expect(response.message).to.equal('ValidationError');
        done();
      });

      createTransaction.execute(transactionData);
    });
  });

  context('when there is an internal error', () => {
    before(() => {
      const MockTransactionsRepository = {
        add: () => Promise.reject(new Error('Some Error'))
      };

      createTransaction = new CreateTransaction({
        transactionsRepository: MockTransactionsRepository
      });
    });

    it('emits ERROR with the error', (done) => {
      const transactionData = { name: 'New Transaction' };

      createTransaction.on(createTransaction.outputs.ERROR, (response) => {
        expect(response.message).to.equal('Some Error');
        done();
      });

      createTransaction.execute(transactionData);
    });
  });
});
