const { expect } = require('chai');
const TransactionSerializer = require('src/interfaces/http/controller/transaction/TransactionSerializer');
const Transaction = require('src/domain/transaction/Transaction');

describe('Interfaces :: HTTP :: Transaction :: TransactionSerializer', () => {
  it('returns id and name', () => {
    const serializedTransaction = TransactionSerializer.serialize({
      id: 123,
      name: 'The Transaction'
    });

    expect(serializedTransaction).to.eql({
      id: 123,
      name: 'The Transaction'
    });
  });

  it('ignores extra attributes', () => {
    const serializedTransaction = TransactionSerializer.serialize({
      id: 321,
      name: 'The Transaction',
      unknown: 'Hello!'
    });

    expect(serializedTransaction).to.eql({
      id: 321,
      name: 'The Transaction'
    });
  });

  it('is able to serialize transaction entity instances', () => {
    const transaction = new Transaction({ id: 1, name: 'Transaction :)' });
    const serializedTransaction = TransactionSerializer.serialize(transaction);

    expect(serializedTransaction).to.eql({
      id: 1,
      name: 'Transaction :)'
    });
  });
});
