import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidCredentials extends HttpException{

    constructor(message: string, statusCode: HttpStatus) {
        super(message, statusCode);
      }
}