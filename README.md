# Transaction Watch Dog

The goal is to monitor the Ethereum blockchain and make the right decision based on a given rule set.

## Description

### Problem:
Design a Ruling system that will monitor and watch all Ethereum transaction that will store and filter data based on predefined dynamic configuration.
* Create an API endpoint that will support basic CRUD operations for the Dynamic Configuration.
    * On restart the previous configuration should be used.
    * ***Bonus*** Hot load the new configuration without the need of restart.
* We want to monitor all Ethereum transactions.
* When we detect a new Transaction that matches any of the Configurations we need to store it in a Database.
* Each Database entry should have a way to identify the Configuration that triggered it.
* We should use a Ethereum Native Node Provider for example _Infura_
* ***Bonus*** Have additional Configuration to parse Transactions with delayed amount of Blocks.
* ***Bonus*** Have a decent logging for tracking purposes.

### What we are looking for
* Use of the proper tools for the proper task
* Clean Code
* Code Architecture/Structure
* Database Segregation
* Other Design Principles

### What can be used:
* JS
* Ethers / Web3
* Infura
* Any other library considered necessary

### Suggested Packages
* Sequelize
* Axios
* Awilix

### Submissions

* Please upload your complete source code to a GitHub repo.
* README should contain information of how to Run the Project

## Getting Started

### Dependencies

* Installed Node on your OS

### Installing

* Clone the repo locally
* Run npm install
* Run npm start

### Executing program

* TODO

## Authors

Contributors names and contact info

Ditmar Vladislavov

## Version History

* 0.1
    * Initial Release