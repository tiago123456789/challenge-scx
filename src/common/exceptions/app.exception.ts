import { CodeException } from "./code.exception";

export class AppException extends Error {

    private code: Number;

    constructor(message: string, code: Number = 500) {
        super(CodeException.getMessageByKey(message));
        this.code = code;
    }

    getCode(): Number {
        return this.code;
    }
}