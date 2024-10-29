# 简介
nestjs 的模版
包含 Typeorm + JWt + Swagger + Mysql + docker + redis

# 注意
1. 需要保证mysql可以正常连接才能正常启动
2. 需要保证redis可以正常连接

# 安装依赖
pnpm install

# 运行
npm run start 

# 发布
pnpm build
// 运行打包后的代码
pnpm run start:prod

# API文档地址
本地：http://localhost:5001/doc

# 配置文件
数据库、jwt相关配置在.env中

测试1

# 注意事项
1. token格式为  {Authorization : Bearer eyxxxxx}     
   注意：Bearer+空格+token