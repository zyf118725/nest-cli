export default () => {
  // console.log('config-env', process.env);
  return {
    port: parseInt(process.env.PORT, 10) || 5001,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10),
      // username: process.env.DATABASE_USERNAME,
      password: process.env.REDIS_PASSWORD,
      database: process.env.REDIS_DB,
      prefix: process.env.REDIS_PREFIX,
    },
    other: process.env.OTHER,
  };
};
