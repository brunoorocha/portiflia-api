
export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 5000,
    secretKey: process.env.APP_SECRET_KEY,
  },

  cloudinary: {
    folder: process.env.CLOUDINARY_FOLDER
  },

  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME
  }
});
