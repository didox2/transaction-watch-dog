const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const RulesController = {
  get router() {
    const router = Router();

    router.use(inject('ruleSerializer'));

    router.get('/', inject('getAllRules'), this.index);
    router.get('/:id', inject('getRule'), this.show);
    router.post('/', inject('createRule'), this.create);
    router.put('/:id', inject('updateRule'), this.update);
    router.delete('/:id', inject('deleteRule'), this.delete);

    return router;
  },

  index(req, res, next) {
    const { getAllRules, ruleSerializer } = req;
    const { SUCCESS, ERROR } = getAllRules.outputs;

    getAllRules
      .on(SUCCESS, (rules) => {
        res
          .status(Status.OK)
          .json(rules.map(ruleSerializer.serialize));
      })
      .on(ERROR, next);

    getAllRules.execute();
  },

  show(req, res, next) {
    const { getRule, ruleSerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = getRule.outputs;

    getRule
      .on(SUCCESS, (rule) => {
        res
          .status(Status.OK)
          .json(ruleSerializer.serialize(rule));
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    getRule.execute(Number(req.params.id));
  },

  create(req, res, next) {
    const { createRule, ruleSerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = createRule.outputs;

    createRule
      .on(SUCCESS, (rule) => {
        res
          .status(Status.CREATED)
          .json(ruleSerializer.serialize(rule));
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(ERROR, next);

    createRule.execute(req.body);
  },

  update(req, res, next) {
    const { updateRule, ruleSerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = updateRule.outputs;

    updateRule
      .on(SUCCESS, (rule) => {
        res
          .status(Status.ACCEPTED)
          .json(ruleSerializer.serialize(rule));
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

    updateRule.execute(Number(req.params.id), req.body);
  },

  delete(req, res, next) {
    const { deleteRule } = req;
    const { SUCCESS, ERROR,  NOT_FOUND } = deleteRule.outputs;

    deleteRule
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

    deleteRule.execute(Number(req.params.id));
  }
};

module.exports = RulesController;
