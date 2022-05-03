const { expect } = require('chai');
const UpdateTransaction = require('src/app/transaction/UpdateTransaction');

describe('App :: Transaction :: UpdateTransaction', () => {
  var updateTransaction;

  context('when transaction exists', () => {
    context('when data is valid', () => {
      before(() => {
        const MockTransactionsRepository = {
          update: (id, data) => Promise.resolve(data)
        };

        updateTransaction = new UpdateTransaction({
          transactionsRepository: MockTransactionsRepository
        });
      });

      it('updates the transaction and emits SUCCESS', (done) => {
        const transactionData = { name: 'Updated Transaction' };

        updateTransaction.on(updateTransaction.outputs.SUCCESS, (response) => {
          expect(response.name).to.equal('Updated Transaction');
          done();
        });

        updateTransaction.execute(123, transactionData);
      });
    });

    context('when data is invalid', () => {
      before(() => {
        const MockTransactionsRepository = {
          update: () => Promise.reject(Error('ValidationError'))
        };

        updateTransaction = new UpdateTransaction({
          transactionsRepository: MockTransactionsRepository
        });
      });

      it('emits VALIDATION_ERROR with the error', (done) => {
        const transactionData = { name: 'New Transaction' };

        updateTransaction.on(updateTransaction.outputs.VALIDATION_ERROR, (response) => {
          expect(response.message).to.equal('ValidationError');
          done();
        });

        updateTransaction.execute(321, transactionData);
      });
    });
  });

  context('when the transaction does not exist', () => {
    before(() => {
      const MockTransactionsRepository = {
        update: () => Promise.reject(new Error('NotFoundError'))
      };

      updateTransaction = new UpdateTransaction({
        transactionsRepository: MockTransactionsRepository
      });
    });

    it('emits NOT_FOUND with the error', (done) => {
      const transactionData = { name: 'New Transaction' };

      updateTransaction.on(updateTransaction.outputs.NOT_FOUND, (response) => {
        expect(response.message).to.equal('NotFoundError');
        done();
      });

      updateTransaction.execute(123, transactionData);
    });
  });


  context('when there is an internal error', () => {
    before(() => {
      const MockTransactionsRepository = {
        update: () => Promise.reject(new Error('Some Error'))
      };

      updateTransaction = new UpdateTransaction({
        transactionsRepository: MockTransactionsRepository
      });
    });

    it('emits ERROR with the error', (done) => {
      const transactionData = { name: 'New Transaction' };

      updateTransaction.on(updateTransaction.outputs.ERROR, (response) => {
        expect(response.message).to.equal('Some Error');
        done();
      });

      updateTransaction.execute(321, transactionData);
    });
  });
});
