class Application {
  constructor({ server, database, logger, watcher }) {
    this.server = server;
    this.database = database;
    this.logger = logger;
    this.watcher = watcher;

    if (database && database.options.logging) {
      database.options.logging = logger.info.bind(logger);
    }
  }

  async start() {
    if (this.database) {
      await this.database.authenticate();
    }

    await this.server.start();

    await this.watcher.start();
  }
}

module.exports = Application;
