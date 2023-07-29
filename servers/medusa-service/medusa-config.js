const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-store";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const BACKEND_URL = process.env.BACKEND_URL || "localhost:9000"
const ADMIN_URL = process.env.ADMIN_URL || "localhost:7000"
const STORE_URL = process.env.STORE_URL || "localhost:8000"
 
const GoogleClientId = process.env.GOOGLE_CLIENT_ID || ""
const GoogleClientSecret = process.env.GOOGLE_CLIENT_SECRET || ""

const FacebookClientId = process.env.FACEBOOK_CLIENT_ID || ""
const FacebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET || ""

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  // To enable the admin plugin, uncomment the following lines and run `yarn add @medusajs/admin`
  {
     resolve: "@medusajs/admin",
     /** @type {import('@medusajs/admin').PluginOptions} */
     options: {
       autoRebuild: true,
     },
  },
  {
    resolve: "medusa-plugin-auth",
    /** @type {import('medusa-plugin-auth').AuthOptions} */
    options: {
        // strict: "all", // or "none" or "store" or "admin"
        google: {
            clientID: GoogleClientId,
            clientSecret: GoogleClientSecret,
 
            admin: {
                callbackUrl:`${BACKEND_URL}/admin/auth/google/cb`,
                failureRedirect: `${ADMIN_URL}/login`,
 
				// The success redirect can be overriden from the client by adding a query param `?redirectTo=your_url` to the auth url
				// This query param will have the priority over this configuration
                successRedirect: `${ADMIN_URL}/`,
 
                // authPath: '/admin/auth/google',
                // authCallbackPath: '/admin/auth/google/cb',
                // expiresIn: 24 * 60 * 60 * 1000,
                // verifyCallback: (container, req, accessToken, refreshToken, profile, strict) => {
                //    // implement your custom verify callback here if you need it
                // }
            },
 
            store: {
                callbackUrl:`${BACKEND_URL}/store/auth/google/cb`,
                failureRedirect: `${STORE_URL}/login`,
 
				// The success redirect can be overriden from the client by adding a query param `?redirectTo=your_url` to the auth url
				// This query param will have the priority over this configuration
                successRedirect: `${STORE_URL}/`,
 
                // authPath: '/store/auth/google',
                // authCallbackPath: '/store/auth/google/cb',
                // expiresIn: 24 * 60 * 60 * 1000,
                // verifyCallback: (container, req, accessToken, refreshToken, profile, strict) => {
                //    // implement your custom verify callback here if you need it
                // }
            }
        },
        facebook: {
          clientID: FacebookClientId,
          clientSecret: FacebookClientSecret,

          admin: {
              callbackUrl:`${BACKEND_URL}/admin/auth/facebook/cb`,
              failureRedirect: `${ADMIN_URL}/login`,

      // The success redirect can be overriden from the client by adding a query param `?redirectTo=your_url` to the auth url
      // This query param will have the priority over this configuration
              successRedirect: `${ADMIN_URL}/`,

              // authPath: '/admin/auth/facebook',
              // authCallbackPath: '/admin/auth/facebook/cb',
              // expiresIn: 24 * 60 * 60 * 1000,
              // verifyCallback: (container, req, accessToken, refreshToken, profile, strict) => {
              //    // implement your custom verify callback here if you need it
              // }
          },

          store: {
              callbackUrl:`${BACKEND_URL}/store/auth/facebook/cb`,
              failureRedirect: `${STORE_URL}/login`,

      // The success redirect can be overriden from the client by adding a query param `?redirectTo=your_url` to the auth url
      // This query param will have the priority over this configuration
              successRedirect: `${STORE_URL}/`,

              // authPath: '/store/auth/facebook',
              // authCallbackPath: '/store/auth/facebook/cb',
              // expiresIn: 24 * 60 * 60 * 1000,
              // verifyCallback: (container, req, accessToken, refreshToken, profile, strict) => {
              //    // implement your custom verify callback here if you need it
              // }
          }
      }
      }
  },
  {
    resolve: `medusa-file-spaces`,
    options: {
        spaces_url: process.env.SPACE_URL,
        bucket: process.env.SPACE_BUCKET,
        endpoint: process.env.SPACE_ENDPOINT,
        access_key_id: process.env.SPACE_ACCESS_KEY_ID,
        secret_access_key: process.env.SPACE_SECRET_ACCESS_KEY,
    },
  },
];

const modules = {
  /*eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },*/
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: process.env.STORE_CORS,
  database_url: process.env.DATABASE_URL,
  admin_cors: process.env.ADMIN_CORS || "*", // If you have a specific admin CORS setting, use it. Otherwise, you can default to '*'.
  // Uncomment the following lines to enable REDIS
  redis_url: process.env.REDIS_URL
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};
