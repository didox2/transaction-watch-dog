const request = require('test/support/request');
const factory = require('test/support/factory');
const { expect } = require('chai');

describe('API :: PUT /api/transactions/:id', () => {
  context('when transaction exists', () => {
    context('when sent data is ok', () => {
      it('updates and returns 202 with the updated transaction', async () => {
        const transaction = await factory.create('transaction', {
          name: 'Transaction'
        });

        const { body } = await request()
          .put(`/api/transactions/${transaction.id}`)
          .send({
            name: 'Updated Transaction'
          })
          .expect(202);

        expect(body.id).to.equal(transaction.id);
        expect(body.name).to.equal('Updated Transaction');
      });
    });

    context('when name is empty', () => {
      it('does update and returns 400 with the validation error', async () => {
        const transaction = await factory.create('transaction', {
          name: 'Transaction'
        });

        const { body } = await request()
          .put(`/api/transactions/${transaction.id}`)
          .send({
            name: ''
          })
          .expect(400);

        expect(body.type).to.equal('ValidationError');
        expect(body.details).to.have.lengthOf(1);
        expect(body.details[0].message).to.equal('"name" is not allowed to be empty');
      });
    });
  });

  context('when transaction does not exist', () => {
    it('returns the not found message and status 404', async () => {
      const { body } = await request()
        .put('/api/transactions/0')
        .send({
          name: 'Updated Transaction'
        })
        .expect(404);

      expect(body.type).to.equal('NotFoundError');
      expect(body.details).to.equal('Transaction with id 0 can\'t be found.');
    });
  });
});
