import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { BaseResponse } from "../dto/base.response";

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp()
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();

        if (exception instanceof HttpException) {
            const body = {
                success: false,
                message: exception.message,
                data: null,
            }

            response
                .status(exception.getStatus())
                .json(body);
        } else {
            const body = {
                success: false,
                message: "Internal error!",
                data: null,
            }

            response
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json(body);
        }
    }

}