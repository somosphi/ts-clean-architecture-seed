# Clean Architecture Boilerplate

[![Coverage Status](https://coveralls.io/repos/github/somosphi/clean-architecture-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/somosphi/clean-architecture-boilerplate?branch=master)

## Stack

- Node JS: **14.17.0**
- TypeScript: **4.3.2**
- Express: **4.17.1**

### Main Packages
- amqplib
- Axios
- Knex.js
- ioredis
- Node Cron (cron)
- Node MySQL 2 (mysql2)
- rimraf
- TSyringe

## Setup
1. Create **.env** file in the root folder using **.env.sample** as an example and replace the content with your project configs/secrets.
2. Install development dependencies:
`npm install`

## Running
1. Start application: `npm run dev` 
2. Application will run at `localhost:3000`

## Testing
1. Run command: `npm run test`
