const { expect } = require('chai');
const Transaction = require('src/domain/transaction/Transaction');
const SequelizeTransactionMapper = require('src/infra/repository/transaction/SequelizeTransactionMapper');

describe('Infra :: Transaction :: SequelizeTransactionMapper', () => {
  describe('.toEntity', () => {
    it('returns transaction instance with passed attributes', () => {
      const mockedSequelizeTransaction = {
        dataValues: {
          id: 1,
          name: 'The Name'
        }
      };

      const entity = SequelizeTransactionMapper.toEntity(mockedSequelizeTransaction);

      expect(entity).to.be.instanceOf(Transaction);
      expect(entity.id).to.equal(1);
      expect(entity.name).to.equal('The Name');
    });
  });

  describe('.toDatabase', () => {
    it('returns transaction object prepared to be persisted', () => {
      const transaction = new Transaction({
        name: 'Some Transaction'
      });

      const dbTransaction = SequelizeTransactionMapper.toDatabase(transaction);

      expect(dbTransaction.name).to.equal('Some Transaction');
      expect(dbTransaction).to.have.all.keys('name');
    });
  });
});
