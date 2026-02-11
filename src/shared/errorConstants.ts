import { HttpStatusCode } from "./httpStatusCode";
import { MESSAGES } from "./messages";

export class AppError extends Error {
    readonly statusCode : HttpStatusCode;
    constructor(message : string, statusCode : HttpStatusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export class ValidationError extends AppError {
  constructor(message : string = MESSAGES.VALIDATION_FAILED){
    super(message, HttpStatusCode.BAD_REQUEST)
  }
}

export class UnauthorizedError extends AppError {
  constructor ( message : string = MESSAGES.AUTH_REQUIRED){
    super(message, HttpStatusCode.UNAUTHORIZED)
  }
}

export class ForbiddenError extends AppError {
  constructor ( message : string= MESSAGES.ACCESS_FORBIDDEN){
    super(message, HttpStatusCode.FORBIDDEN)
  }
}

export class NotFoundError extends AppError {
  constructor( message : string= MESSAGES.RESOURCE_NOT_FOUND) {
    super (message, HttpStatusCode.NOT_FOUND)
  }
}

export class ConflictError extends AppError {
  constructor( message : string = MESSAGES.RESOURCE_ALREADY_EXISTS) {
    super (message, HttpStatusCode.CONFLICT)
  }
}




