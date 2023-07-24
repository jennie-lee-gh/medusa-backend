# Deploy Medusa Backend to Digital Ocean

1. Prerequisites for Digital Ocean
    1. 2GB RAM App
    2. Postgres (name=db)
    3. Redis (name=redis)
2. Follow this: https://docs.medusajs.com/deployments/server/deploying-on-digital-ocean
3. Env:

```jsx
DB_USERNAME=medusa_backend_xxxx_user
DB_PASSWORD=xxxx
DB_HOST=db
DB_PORT=5432
DB_DATABASE=medusa_backend_xxxx
REDIS_URL=redis://default:AVNS_5gy6w5xvDj0-xxxx@redis-do-user-14287777-0.b.db.ondigitalocean.com:25061
JWT_SECRET=xxxx
COOKIE_SECRET=xxxx
NPM_CONFIG_PRODUCTION=false
NODE_ENV=production
STORE_CORS=https://xxxx.vercel.app
```

1. For medusa-config.js:
    1. uncomment modules = {
    2. uncomment admin plugin
    3. Change module.exports to
    
    ```
    module.exports = {
      projectConfig: {
        ...projectConfig,
        database_extra: { ssl: { rejectUnauthorized: false } },
      },
      plugins,
      modules,
    };
    ```
    
    d. *// Uncomment the following lines to enable REDIS*
    
    After deployment
    
    - Concole → install medusa-cli and seed data
