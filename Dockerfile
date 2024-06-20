FROM node:20-alpine
# 设置工作目录为
WORKDIR /Users/apple/Documents/project/aliyun
COPY package.json pnpm-lock.yaml* ./

# 安装pnpm
RUN npm install -g pnpm

# 复制所有源代码到工作目录
COPY . .
RUN pnpm i
RUN pnpm run build
# 运行Nest.js应用程序
# 终端会一直运行，不会退出，访问接口失败
# RUN npm run start:prod
CMD ["pnpm", "start:prod"]
# 暴漏端口号
EXPOSE 5010