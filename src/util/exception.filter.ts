import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { formatError } from './index';
// 捕获所有异常
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
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
      console.error('---------------------------------');
    }

    // 3. **处理并格式化最终的错误消息**
    let finalMessage: string;
    if (Array.isArray(errorResponseMessage)) {
      // 如果是数组（通常来自 class-validator），取第一个错误信息
      finalMessage = errorResponseMessage[0];
    } else if (typeof errorResponseMessage === 'string') {
      finalMessage = errorResponseMessage;
    } else {
      finalMessage = JSON.stringify(errorResponseMessage);
    }

    // 4. **格式化错误返回（使用您的业务函数）**
    const errorResponse = formatError({ msg: finalMessage });

    // 5. **业务逻辑：将 400 错误码转换为 200**
    // ⚠️ 警告：这违反 RESTful 标准，但保留以满足您的业务需求
    const _status = status === HttpStatus.BAD_REQUEST ? HttpStatus.OK : status;

    // 6. **发送响应**
    response.status(_status).json(errorResponse);
  }
}
