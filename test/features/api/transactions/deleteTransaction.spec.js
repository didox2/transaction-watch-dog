const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: DELETE /api/transaction/:id', () => {
  context('when transaction exists', () => {
    it('deletes the transaction and return status 202', async () => {
      const transaction = await factory.create('transaction', {
        name: 'Transaction'
      });

      await request()
        .delete(`/api/transactions/${transaction.id}`)
        .expect(202);
    });
  });

  context('when transaction does not exist', () => {
    it('returns the not found message and status 404', async () => {
      const { body } = await request()
        .delete('/api/transactions/0')
        .send({
          name: 'Updated Transaction'
        })
        .expect(404);

      expect(body.type).to.equal('NotFoundError');
      expect(body.details).to.equal('Transaction with id 0 can\'t be found.');
    });
  });
});
