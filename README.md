# Transaction watch dog

Ruling system that monitors the Ethereum blockchain and make the right decision based on a given rule set

## Quick start

1. Clone the repository with `git clone --depth=1 https://github.com/didox2/transaction-watch-dog`
2. Setup the .env file with your variables.
3. Install the dependencies with npm
4. Create the development and test databases you have setup on `config/database.js`
5. Add tools to create and update db `npm install --save -g pgtools sequelize-cli`
6. Create db running `createdbjs transaction-watch-dog --user=[db_username] --password=[db_password]`
7. Run the database migrations with `npm run sequelize db:migrate`
8. Add some seed data to the development database with `npm run sequelize db:seed:all`
9. Run the application in development mode with `npm run dev`
10. Access `http://localhost:3000/api/transactions` or `http://localhost:3000/api/rules`

## Scripts

- `dev`: Run the application in development mode
- `start` Run the application in production mode (prefer not to do that in development) 
- `test`: Run the test suite
- `test:unit`: Run only the unit tests
- `test:features`: Run only the features tests
- `coverage`: Run only the unit tests and generate code coverage for them, the output will be on `coverage` folder
- `lint`: Lint the codebase
- `sequelize`: Alias to the [Sequelize CLI](https://github.com/sequelize/cli)
- `console`: Open the built-in console, you can access the DI container through the `container` variable once it's open, the console is promise-friendly.

## Tech

- [Node v7.6+](http://nodejs.org/)
- [Express](https://npmjs.com/package/express)
- [Sequelize](https://www.npmjs.com/package/sequelize)
- [Awilix](https://www.npmjs.com/package/awilix)
- [Structure](https://www.npmjs.com/package/structure)
- [HTTP Status](https://www.npmjs.com/package/http-status)
- [Log4js](https://www.npmjs.com/package/log4js)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Express Status Monitor](https://www.npmjs.com/package/express-status-monitor)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [PM2](https://www.npmjs.com/package/pm2)
- [Mocha](https://www.npmjs.com/package/mocha)
- [Chai](https://www.npmjs.com/package/chai)
- [FactoryGirl](https://www.npmjs.com/package/factory-girl)
- [Istanbul](https://www.npmjs.com/package/istanbul) + [NYC](https://www.npmjs.com/package/nyc)
- [ESLint](https://www.npmjs.com/package/eslint)
- [Axios](https://www.npmjs.com/package/axios)
