import { AppException } from "./app.exception";

export class NotFoundException extends AppException {

    constructor(message: string, code: Number = 404) {
        super(message, code);
    }
}