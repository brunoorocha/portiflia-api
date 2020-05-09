
export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 5000,
    wspPort: parseInt(process.env.APP_WS_PORT, 10) || 5001,
    secretKey: process.env.APP_SECRET_KEY,
  },

  cloudinary: {
    folder: process.env.CLOUDINARY_FOLDER
  },

  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
    ssl: process.env.DB_SSL
  },

  facebook: {
    appID: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET
  },

  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL
  }
});
