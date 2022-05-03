const { expect } = require('chai');
const GetAllTransactions = require('src/app/transaction/GetAllTransactions');

describe('App :: Transaction :: GetAllTransactions', () => {
  var getAllTransactions;

  context('when query is successful', () => {
    before(() => {
      const MockTransactionsRepository = {
        getAll: () => Promise.resolve('Imagine all the transactions...')
      };

      getAllTransactions = new GetAllTransactions({
        transactionsRepository: MockTransactionsRepository
      });
    });

    it('emits SUCCESS with all the transactions', (done) => {
      getAllTransactions.on(getAllTransactions.outputs.SUCCESS, (response) => {
        expect(response).to.equal('Imagine all the transactions...');
        done();
      });

      getAllTransactions.execute();
    });
  });

  context('when there is an internal error', () => {
    before(() => {
      const MockTransactionsRepository = {
        getAll: () => Promise.reject(new Error('Failed'))
      };

      getAllTransactions = new GetAllTransactions({
        transactionsRepository: MockTransactionsRepository
      });
    });

    it('emits ERROR with the error', (done) => {
      getAllTransactions.on(getAllTransactions.outputs.ERROR, (response) => {
        expect(response.message).to.equal('Failed');

        done();
      });

      getAllTransactions.execute();
    });
  });
});
