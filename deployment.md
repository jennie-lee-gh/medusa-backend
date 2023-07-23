# Deployment

## Backend

~~[Read docs](https://docs.medusajs.com/deployments/server/deploying-on-heroku)~~

~~Register a new account at [https://www.heroku.com/](https://www.heroku.com/).~~

> Heroku：Heroku 提供了一个免费的层级，可以让你在没有任何成本的情况下部署和运行你的应用。Heroku 的用户界面非常友好，非开发人员也能够轻松上手。但是，需要注意的是，Heroku 的免费层级有一些限制，例如应用在一定时间内没有活动会进入休眠状态，需要几秒钟的唤醒时间。

Heroku 注册未知原因失败.

[Using Railway](https://docs.medusajs.com/deployments/server/deploying-on-railway)

Register a new account at [https://railway.app/](https://railway.app/). (Available using Github account)

**Free Trial** available.

Dashboard 页面新建 postgres 项目, 完成后在项目页面空白区域右键选择 database, 新增一个 redis.

新建一个 GitHub 链接, 由于是 monorepo 结构, 在 settings 中把 root directory 设置为 `/servers/medusa-service`.

TODO: 删除 docker file

## Setup

### 1. Install Postgres

For Mac:

[https://www.enterprisedb.com/downloads/postgres-postgresql-downloads](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

#### Stack Builder

Select all options except for Database Server and Enterprise.

If the process is not responding, check if the another window is active and click **next**.

> Some of the plugins may fail to install. This is fine. (? maybe not)


### 2. Setup Medusa App

```bash
npx create-medusa-app@latest
```
