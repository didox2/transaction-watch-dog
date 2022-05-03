const {
  createContainer,
  asClass,
  asFunction,
  asValue,
} = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');

const {
  CreateRule,
  GetAllRules,
  GetRule,
  UpdateRule,
  DeleteRule,
} = require('./app/rule');

const {
  CreateTransaction,
  GetAllTransactions,
  GetAllTransactionsWithRule,
  GetTransaction,
  UpdateTransaction,
  DeleteTransaction,
} = require('./app/transaction');

const RuleSerializer = require('./interfaces/http/controller/rule/RuleSerializer');
const TransactionSerializer = require('./interfaces/http/controller/transaction/TransactionSerializer');

const Server = require('./interfaces/http/Server');
const Watcher = require('./interfaces/http/Watcher');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

const logger = require('./infra/logging/logger');

const SequelizeTransactionsRepository = require('./infra/repository/transaction/SequelizeTransactionsRepository');
const SequelizeRulesRepository = require('./infra/repository/rule/SequelizeRuleRepository');

const {
  database,
  Rule: RuleModel,
  Transaction: TransactionModel,
} = require('./infra/database/models');

const container = createContainer();

// System
container.register({
  app: asClass(Application).singleton(),
  server: asClass(Server).singleton(),
  watcher: asClass(Watcher).singleton(),
  router: asFunction(router).singleton(),
  logger: asFunction(logger).singleton(),
  config: asValue(config),
});

// Middlewares
container.register({
  loggerMiddleware: asFunction(loggerMiddleware).singleton(),
  logger: asFunction(logger).singleton(),
  containerMiddleware: asValue(scopePerRequest(container)),
  errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
  swaggerMiddleware: asValue([swaggerMiddleware]),
});

// Repositories
container.register({
  rulesRepository: asClass(SequelizeRulesRepository).singleton(),
  transactionsRepository: asClass(SequelizeTransactionsRepository).singleton(),
});

// Database
container.register({
  database: asValue(database),
  RuleModel: asValue(RuleModel),
  TransactionModel: asValue(TransactionModel),
});

// Operations
container.register({
  // Transactions
  createTransaction: asClass(CreateTransaction),
  getAllTransactions: asClass(GetAllTransactions),
  getAllTransactionsWithRule: asClass(GetAllTransactionsWithRule),
  getTransaction: asClass(GetTransaction),
  updateTransaction: asClass(UpdateTransaction),
  deleteTransaction: asClass(DeleteTransaction),

  //Rules
  createRule: asClass(CreateRule),
  getAllRules: asClass(GetAllRules),
  getRule: asClass(GetRule),
  updateRule: asClass(UpdateRule),
  deleteRule: asClass(DeleteRule),
});

// Serializers
container.register({
  ruleSerializer: asValue(RuleSerializer),
  transactionSerializer: asValue(TransactionSerializer),
});

module.exports = container;
