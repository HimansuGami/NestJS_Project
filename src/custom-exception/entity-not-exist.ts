import { HttpException, HttpStatus } from "@nestjs/common";

export class EntityNotExist extends HttpException{

    constructor(message: string, statusCode: HttpStatus) {
        super(message, statusCode);
      }
}