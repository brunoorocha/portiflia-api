
export default () => ({
  port: parseInt(process.env.port, 10) || 5000,
  database: {
    host: process.env.MONGODB_HOST
  }
});
