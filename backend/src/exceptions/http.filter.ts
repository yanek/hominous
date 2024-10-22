import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();

      return response.status(statusCode).json({
        statusCode: statusCode,
        path: request.url,
        message: exception.message,
      });
    }

    return response.status(500).json({
      statusCode: 500,
      path: request.url,
      message: 'Internal Server Error',
    });
  }
}
