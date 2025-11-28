import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Response } from 'express';
import { formatError } from './index';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
// 捕获所有异常
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    console.log('==== 全局异常捕获 ====');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // 1. **核心优化：判断异常类型**
    const isHttpException = exception instanceof HttpException;

    // 获取 HTTP 状态码
    const status = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR; // 非 HttpException 统一为 500

    // 2. **获取原始的响应内容/错误消息**
    let errorResponseMessage: string | string[] | object;

    if (isHttpException) {
      // HttpException.getResponse() 可能返回 string | object
      const responseBody = exception.getResponse();
      this.logger.error('Http错误', { data: exception });
      // 检查 NestJS 验证错误返回的数组格式
      if (typeof responseBody === 'object' && responseBody !== null && 'message' in responseBody) {
        errorResponseMessage = (responseBody as { message: string | string[] }).message;
      } else {
        // 否则直接取整个响应体作为消息（通常是字符串）
        errorResponseMessage = responseBody;
      }
    } else {
      // 捕获原生错误 (如 TypeError)，获取其 message 属性
      errorResponseMessage = (exception as Error).message || 'Internal server error';
      // 打印原生错误以便调试
      console.error('--- 捕获到非 HttpException 错误 ---');
      console.error(exception);
      this.logger.error('非Http错误', { data: exception });
      console.error('---------------------------------');
    }

    // 3. **处理并格式化最终的错误消息**
    let finalMessage: any;
    if (Array.isArray(errorResponseMessage)) {
      console.log('=== errorResponseMessage: ', errorResponseMessage);
      // 如果是数组（通常来自 class-validator），取第一个错误信息
      finalMessage = errorResponseMessage;
    } else if (typeof errorResponseMessage === 'string') {
      finalMessage = errorResponseMessage;
    } else {
      finalMessage = JSON.stringify(errorResponseMessage);
    }

    // 4. **格式化错误返回（使用您的业务函数）**
    const errorResponse = formatError({ msg: finalMessage });

    // 6. **发送响应**
    response.status(status).json(errorResponse);
  }
}
