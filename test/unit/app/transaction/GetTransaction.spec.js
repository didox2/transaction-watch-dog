const { expect } = require('chai');
const GetTransaction = require('src/app/transaction/GetTransaction');

describe('App :: Transaction :: GetTransaction', () => {
  let getTransaction;

  context('when transaction exists', () => {
    beforeEach(() => {
      const MockTransactionsRepository = {
        getById: (transactionId) => Promise.resolve({
          id: transactionId,
          name: 'The Transaction'
        })
      };

      getTransaction = new GetTransaction({
        transactionsRepository: MockTransactionsRepository
      });
    });

    it('emits SUCCESS with the transaction', (done) => {
      getTransaction.on(getTransaction.outputs.SUCCESS, (transaction) => {
        expect(transaction.id).to.equal(123);
        expect(transaction.name).to.equal('The Transaction');
        done();
      });

      getTransaction.execute(123);
    });
  });

  context('when transaction does not exist', () => {
    beforeEach(() => {
      const MockTransactionsRepository = {
        getById: () => Promise.reject({
          details: 'Transaction with id 123 can\'t be found.'
        })
      };

      getTransaction = new GetTransaction({
        transactionsRepository: MockTransactionsRepository
      });
    });

    it('emits NOT_FOUND with the error', (done) => {
      getTransaction.on(getTransaction.outputs.NOT_FOUND, (error) => {
        expect(error.details).to.equal('Transaction with id 123 can\'t be found.');
        done();
      });

      getTransaction.execute(123);
    });
  });
});
