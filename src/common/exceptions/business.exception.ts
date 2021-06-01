import { AppException } from "./app.exception";

export class BusinessException extends AppException {

    constructor(message: string, code: Number = 409) {
        super(message, code);
    }
}