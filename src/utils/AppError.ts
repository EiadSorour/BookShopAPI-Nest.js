import { HttpException, HttpStatus } from "@nestjs/common"
import { HttpStatusMessage } from "./HttpStatusMessage";

export function AppError(errorMessage:string , httpStatusMessage: HttpStatusMessage , httpStatusCode: HttpStatus){
    throw new HttpException({
        status: httpStatusMessage,
        data: {message: errorMessage}
    } , httpStatusCode);
}