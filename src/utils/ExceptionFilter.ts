import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const exceptionResponse = exception.getResponse() as any;
        const exceptionStatusMessage = exceptionResponse.status;

        if(exceptionStatusMessage === "fail"){
            return response.status(status).json({status: "fail", data: exceptionResponse.data});
        }
        return response.status(status).json({status: "error", message: exception.message});
    }
}