const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const TransactionsController = {
  get router() {
    const router = Router();

    router.use(inject('transactionSerializer'));

    router.get('/', inject('getAllTransactions'), this.index);
    router.get('/rules', inject('getAllTransactionsWithRules'), this.indexRule);
    router.get('/:id', inject('getTransaction'), this.show);
    router.post('/', inject('createTransaction'), this.create);
    router.put('/:id', inject('updateTransaction'), this.update);
    router.delete('/:id', inject('deleteTransaction'), this.delete);

    return router;
  },

  index(req, res, next) {
    const { getAllTransactions, transactionSerializer } = req;
    const { SUCCESS, ERROR } = getAllTransactions.outputs;

    getAllTransactions
      .on(SUCCESS, (transactions) => {
        res
          .status(Status.OK)
          .json(transactions.map(transactionSerializer.serialize));
      })
      .on(ERROR, next);

    getAllTransactions.execute();
  },

  indexRule(req, res, next) {
    const { getAllTransactionsWithRule, transactionSerializer } = req;
    const { SUCCESS, ERROR } = getAllTransactionsWithRule.outputs;

    getAllTransactionsWithRule
      .on(SUCCESS, (transactions) => {
        res
          .status(Status.OK)
          .json(transactions.map(transactionSerializer.serialize));
      })
      .on(ERROR, next);

    getAllTransactionsWithRule.execute();
  },

  show(req, res, next) {
    const { getTransaction, transactionSerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = getTransaction.outputs;

    getTransaction
      .on(SUCCESS, (transaction) => {
        res
          .status(Status.OK)
          .json(transactionSerializer.serialize(transaction));
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    getTransaction.execute(Number(req.params.id));
  },

  create(req, res, next) {
    const { createTransaction, transactionSerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = createTransaction.outputs;

    createTransaction
      .on(SUCCESS, (transaction) => {
        res
          .status(Status.CREATED)
          .json(transactionSerializer.serialize(transaction));
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(ERROR, next);

    createTransaction.execute(req.body);
  },

  update(req, res, next) {
    const { updateTransaction, transactionSerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = updateTransaction.outputs;

    updateTransaction
      .on(SUCCESS, (transaction) => {
        res
          .status(Status.ACCEPTED)
          .json(transactionSerializer.serialize(transaction));
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    updateTransaction.execute(Number(req.params.id), req.body);
  },

  delete(req, res, next) {
    const { deleteTransaction } = req;
    const { SUCCESS, ERROR,  NOT_FOUND } = deleteTransaction.outputs;

    deleteTransaction
      .on(SUCCESS, () => {
        res.status(Status.ACCEPTED).end();
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    deleteTransaction.execute(Number(req.params.id));
  }
};

module.exports = TransactionsController;
