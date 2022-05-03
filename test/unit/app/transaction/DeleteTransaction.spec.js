const { expect } = require('chai');
const DeleteTransaction = require('src/app/transaction/DeleteTransaction');

describe('App :: Transaction :: DeleteTransaction', () => {
  var deleteTransaction;

  context('when transaction exists', () => {
    before(() => {
      const MockTransactionsRepository = {
        remove: () => Promise.resolve()
      };

      deleteTransaction = new DeleteTransaction({
        transactionsRepository: MockTransactionsRepository
      });
    });

    it('deletes the transaction and emits SUCCESS with no payload', (done) => {
      deleteTransaction.on(deleteTransaction.outputs.SUCCESS, (response) => {
        expect(response).to.be.undefined();
        done();
      });

      deleteTransaction.execute(123);
    });
  });

  context('when the transaction does not exist', () => {
    before(() => {
      const MockTransactionsRepository = {
        remove: () => Promise.reject(new Error('NotFoundError'))
      };

      deleteTransaction = new DeleteTransaction({
        transactionsRepository: MockTransactionsRepository
      });
    });

    it('emits NOT_FOUND with the error', (done) => {
      deleteTransaction.on(deleteTransaction.outputs.NOT_FOUND, (response) => {
        expect(response.message).to.equal('NotFoundError');
        done();
      });

      deleteTransaction.execute(123);
    });
  });


  context('when there is an internal error', () => {
    before(() => {
      const MockTransactionsRepository = {
        remove: () => Promise.reject(new Error('Some Error'))
      };

      deleteTransaction = new DeleteTransaction({
        transactionsRepository: MockTransactionsRepository
      });
    });

    it('emits ERROR with the error', (done) => {
      deleteTransaction.on(deleteTransaction.outputs.ERROR, (response) => {
        expect(response.message).to.equal('Some Error');
        done();
      });

      deleteTransaction.execute(321);
    });
  });
});
