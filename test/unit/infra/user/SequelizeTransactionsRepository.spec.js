const { expect } = require('chai');
const factory = require('test/support/factory');
const SequelizeTransactionsRepository = require('src/infra/repository/transaction/SequelizeTransactionsRepository');
const Transaction = require('src/domain/transaction/Transaction');
const { Transaction: TransactionModel } = require('src/infra/database/models');

describe('Infra :: Transaction :: SequelizeTransactionsRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new SequelizeTransactionsRepository({ TransactionModel });
  });

  describe('#getAll', () => {
    beforeEach(() => {
      return factory.createMany('transaction', 2, [
        { name: 'Transaction 1' },
        { name: 'Transaction 2' }
      ]);
    });

    it('returns all transactions from the database', async () => {
      const transactions = await repository.getAll();

      expect(transactions).to.have.lengthOf(2);

      expect(transactions[0]).to.be.instanceOf(Transaction);
      expect(transactions[0].name).to.equal('Transaction 1');

      expect(transactions[1]).to.be.instanceOf(Transaction);
      expect(transactions[1].name).to.equal('Transaction 2');
    });
  });

  describe('#getById', () => {
    context('when transaction exists', () => {
      it('returns the transaction', async () => {
        const transaction = await factory.create('transaction', {
          name: 'Transaction'
        });

        const foundTransaction = await repository.getById(transaction.id);

        expect(foundTransaction).to.be.instanceOf(Transaction);
        expect(foundTransaction.id).to.equal(transaction.id);
        expect(foundTransaction.name).to.equal('Transaction');
      });
    });

    context('when the transaction does not exist', () => {
      it('rejects with an error', async () => {
        try {
          await repository.getById(0);
        } catch(error) {
          expect(error.message).to.equal('NotFoundError');
          expect(error.details).to.equal('Transaction with id 0 can\'t be found.');
        }
      });
    });
  });

  describe('#add', () => {
    context('when transaction is valid', () => {
      it('persists the transaction', () => {
        const transaction = new Transaction({
          name: 'The Transaction'
        });

        expect(transaction.validate().valid).to.be.ok();

        return expect(async () => {
          const persistedTransaction = await repository.add(transaction);

          expect(persistedTransaction.id).to.exist;
          expect(persistedTransaction.name).to.equal('The Transaction');
        }).to.alter(() => repository.count(), { by: 1 });
      });
    });

    context('when transaction is invalid', () => {
      it('does not persist the transaction and rejects with an error', () => {
        const transaction = new Transaction();

        expect(transaction.validate().valid).to.not.be.ok();

        return expect(async () => {
          try {
            await repository.add(transaction);
          } catch(error) {
            expect(error.message).to.equal('ValidationError');
            expect(error.details).to.eql([
              { message: '"name" is required', path: 'name' }
            ]);
          }
        }).to.not.alter(() => repository.count());
      });
    });
  });

  describe('#remove', () => {
    context('when the transaction exists', () => {
      it('removes the transaction', async () => {
        const transaction = await factory.create('transaction', {
          name: 'Transaction'
        });

        return expect(async () => {
          return await repository.remove(transaction.id);
        }).to.alter(() => repository.count(), { by: -1 });
      });
    });

    context('when the transaction does not exist', () => {
      it('returns an error', async () => {
        try {
          await repository.remove(0);
        } catch(error) {
          expect(error.message).to.equal('NotFoundError');
          expect(error.details).to.equal('Transaction with id 0 can\'t be found.');
        }
      });
    });
  });

  describe('#update', () => {
    context('when the transaction exists', () => {
      context('when data is valid', () => {
        it('updates and returns the updated transaction', async () => {
          const transaction = await factory.create('transaction', {
            name: 'Transaction'
          });

          return expect(async () => {
            return await repository.update(transaction.id, { name: 'New Transaction' });
          }).to.alter(async () => {
            const dbTransaction = await TransactionModel.findById(transaction.id);
            return dbTransaction.name;
          }, { from: 'Transaction', to: 'New Transaction' });
        });
      });

      context('when data is not valid', () => {
        it('does not update and returns the error', async () => {
          const transaction = await factory.create('transaction', {
            name: 'Transaction'
          });

          return expect(async () => {
            try {
              await repository.update(transaction.id, { name: '' });
            } catch(error) {
              expect(error.message).to.equal('ValidationError');
            }
          }).to.not.alter(async () => {
            const dbTransaction = await TransactionModel.findById(transaction.id);
            return dbTransaction.name;
          });
        });
      });
    });

    context('when the transaction does not exist', () => {
      it('returns an error', async () => {
        try {
          await repository.update(0, { name: 'New Transaction' });
        } catch(error) {
          expect(error.message).to.equal('NotFoundError');
          expect(error.details).to.equal('Transaction with id 0 can\'t be found.');
        }
      });
    });
  });
});
