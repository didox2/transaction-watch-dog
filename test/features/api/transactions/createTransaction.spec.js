const request = require('test/support/request');
const { expect } = require('chai');

describe('API :: POST /api/transactions', () => {
  context('when sent data is ok', () => {
    it('creates and returns 201 and the new transaction', async () => {
      const { body } = await request()
        .post('/api/transactions')
        .send({
          name: 'New Transaction'
        })
        .expect(201);

      expect(body.id).to.exist;
      expect(body.name).to.equal('New Transaction');
      expect(body).to.have.all.keys('id', 'name');
    });
  });

  context('when name is missing', () => {
    it('does not create and returns 400 with the validation error', async () => {
      const { body } = await request()
        .post('/api/transactions')
        .expect(400);

      expect(body.type).to.equal('ValidationError');
      expect(body.details).to.have.lengthOf(1);
      expect(body.details[0].message).to.equal('"name" is required');
    });
  });
});
