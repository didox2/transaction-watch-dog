const ethers = require('ethers');
const axios = require('axios');

class Watcher {
  constructor({ config, logger }) {
    this.config = config;
    this.logger = logger;
  }

  start() {
    const url = process.env.INFURA_URL;
    const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
    customHttpProvider.getNetwork().then((result) => {
      this.getRules();
      result = JSON.stringify(result);
      this.logger.info('Current network: ' + result);
      this.saveTransaction(result);
    });
    // TODO make a loop for getting latest Ethereum transactions or
    // to subscribe for event when new transactions are coming and
    // based on the rules tha we get from the last set rule we will
    // store the transaction in our database
  }

  async getRules() {
    try {
      return await axios.get('http://localhost:3000/api/rules/1');
    } catch (error) {
      this.logger.info(error.message);
    }
  }

  async saveTransaction(body) {
    try {
      return await axios.post('http://localhost:3000/api/transactions', body);
    } catch (error) {
      this.logger.info(error.message);
    }
  }
}

module.exports = Watcher;
