export default () => ({
  // 用于配置端口 项目启动端口 环境变量未配置则使用默认设置
  port: parseInt(process.env.PORT, 10) || 5001,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
  },
});
