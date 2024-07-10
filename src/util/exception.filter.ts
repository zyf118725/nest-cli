import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { formatError } from './index';

// 捕获所有异常
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('==== 全局异常捕获 ====');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    console.log('exception', JSON.parse(JSON.stringify(exception)));

    // 格式化错误返回
    const errorResponse = formatError({
      msg:
        exception instanceof HttpException
          ? // message有字符串和数组(validator)两种格式，此处将数组取第一个数据
            Array.isArray(exception.getResponse()['message'])
            ? exception.getResponse()['message'][0]
            : exception.getResponse()['message']
          : 'Internal server error',
    });

    // 将validator的错误400转化为业务错误
    const _status = status === 400 ? 200 : status;
    console.log('errorResponse: ', errorResponse);
    response.status(_status).json(errorResponse);
  }
}
