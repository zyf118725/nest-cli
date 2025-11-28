import * as chalk from 'chalk'; // 用于颜色化输出
import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

// 定义日志级别颜色
const levelsColors = {
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'blue',
  verbose: 'cyan',
};

// 配置日志输出
function fileConf(level, filename) {
  return {
    level, // 日志类型，此处表示只记录错误日志。
    filename, // 日志名称，占位符 %DATE% 取值为 datePattern 值。
    datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
    zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
    maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
    maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
  };
}

const winstonLogger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.printf((info) => {
      return `${info.timestamp} [${info.level}] : ${info.message} ${Object.keys(info).length ? JSON.stringify(info, null, 2) : ''}`;
    }),
  ),
  defaultMeta: { service: 'log-service' },
  transports: [
    new DailyRotateFile(fileConf('info', 'logs/app/app-%DATE%.log')),
    new DailyRotateFile(fileConf('error', 'logs/errors/error-%DATE%.log')),
    new DailyRotateFile(fileConf('warn', 'logs/warnings/warning-%DATE%.log')),
    // 处理控制台的输出
    new transports.Console({
      format: format.combine(
        format.colorize({
          colors: levelsColors,
        }),
        format.simple(),
        format.printf((info: any) => {
          console.log('info: ', info);
          // 获取 Info Symbols key
          const symbols = Object.getOwnPropertySymbols(info);
          const color = levelsColors[info[symbols[0]]]; // 获取日志级别的颜色
          const chalkColor = chalk[color];
          const message = `${chalkColor('日志 ' + info.timestamp)} ${info.level} ${chalkColor(JSON.stringify(info.message))}`;
          return message;
        }),
      ),
      // level: 'debug',
    }),
  ],
});

export default winstonLogger;
