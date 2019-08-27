# bingo-game-server

![node](https://img.shields.io/badge/node->=10.9.0-green.svg)

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Develop](#develop)
- [Production](#production)
- [API](#api)
- [Documents](#documents)

## Background

This is an API service which provides API for [bingo-game-front](https://github.com/AElfProject/bingo-game-front)

We use [egg](https://github.com/eggjs/egg) to develop API and use [egg-boilerplate-sequelize](https://github.com/eggjs/egg-boilerplate-sequelize) as project template.

You can take them as references. 

## Install

```bash
# install dependencies
npm install
# or
yarn
```

## Develop

### create MySQL database and create tables

Install MySQL on your own computer and create a database named `aelf_bingo`, which is from the `database/config.json` development field

run script below to create tables in database `aelf_bingo`.
```bash
npx sequelize db:migrate
```

We use `sequelize-cli` as database migrating tool.

Here are some useful scripts

```bash
# generate migration file
npx sequelize migration:generate
# migrate up
npx sequelize db:migrate
# migrate up for test database
NODE_ENV=test npx sequelize db:migrate
# migrate down
npx sequelize db:migrate:undo
npx sequelize db:migrate:undo:all
# migrate down for test database
NODE_ENV=test npx sequelize db:migrate:undo
NODE_ENV=test npx sequelize db:migrate:undo:all
```

Run
```bash
npm run dev
```
Port `7851` will be opened and check Api routes in `app/router.js`, `Postman` is an useful tool for testing APIs.

 

## Production
Add MySQL config of your server environment in `database/config.json`,
```json
{
  "production": {
    "username": "root",
    "password": "root",
    "database": "aelf_bingo",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {
      "timestamps": false
    }
  }
}
```
And create database and tables as above in your server environment

```bash
npm start 
```  
will open an egg services

## Api

### /bingo/initCsrfToken

In `production` environment, a security egg plugin need to be enabled to avoid security problem, get `csrfToken` field in cookie and set it as the value of
`x-csrf-token` in request header if this is request is a `POST` request.

### /bingo/topRecords

Get all records in the order of total `DESC`, and the addresses must have played over 2 times.

* http method：`GET`
* request params：`none`
* response params：
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "total": 100,
    "list": [{
      "address": "xxx",
      "total": 1231,
      "times": 12321
    }]
  }
}
```

### /bingo/personalRecords

Get personal records

* http method: `GET`
* request params:

| name | type | required | desc |
| --- | --- | --- | --- |
| address | string | yes | user wallet address |
| pageNum | number | yes | page number start from 1 |
| pageSize | number | yes | size per page |

* response params:
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "total": 100,
    "list": [{
      "time": "2019-08-19 19:31:26",
      "result": -100
    }]
  }
}
```

### /bingo/recordResult

Record results every time

* http method: `POST`
* request params:

| name | type | required | desc |
| --- | --- | --- | --- |
| address | string | yes | user wallet address |
| result | number | yes | game result |

* response params:
```json
{
  "code": 0,
  "msg": "success",
  "data": {}
}
```

### /bingo/register

use registration

* http method: `POST`
* request params:

| name | type | required | desc |
| --- | --- | --- | --- |
| address | string | yes | user wallet address |
| name | string | yes | user name |

* response params:
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "count": 123
  }
}
```

## Documents

[eggjs sequelize document](https://eggjs.org/zh-cn/tutorials/mysql.html)

[egg-sequelize](https://github.com/eggjs/egg-sequelize)

[sequelize](http://docs.sequelizejs.com)

[sequelize-cli and migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html)

[factory-girl](https://github.com/aexmachina/factory-girl)
