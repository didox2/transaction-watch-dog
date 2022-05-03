const { expect } = require('chai');
const Transaction = require('src/domain/transaction/Transaction');

describe('Domain :: Transaction', () => {
  describe('#isLegal', () => {
    context('when transaction is younger than 21', () => {
      it('returns false', () => {
        const transaction = new Transaction({ age: 20 });

        expect(transaction.isLegal()).to.be.false();
      });
    });

    context('when transaction is 21 years old', () => {
      it('returns true', () => {
        const transaction = new Transaction({ age: 21 });

        expect(transaction.isLegal()).to.be.true();
      });
    });
  });
});
