const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: GET /api/transactions/:id', () => {
  context('when transaction exists', () => {
    it('returns the transaction and status 200', async () => {
      const transaction = await factory.create('transaction', {
        name: 'The Transaction'
      });

      const { body } = await request()
        .get(`/api/transactions/${transaction.id}`)
        .expect(200);

      expect(body.id).to.equal(transaction.id);
      expect(body.name).to.equal('The Transaction');
    });
  });

  context('when transaction does not exist', () => {
    it('returns a not found error and status 404', async () => {
      const { body } = await request()
        .get('/api/transactions/0')
        .expect(404);

      expect(body.type).to.equal('NotFoundError');
      expect(body.details).to.equal('Transaction with id 0 can\'t be found.');
    });
  });
});
