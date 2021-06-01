
export class CodeException {

    static NOT_FOUND: string = "NOT_FOUND";
    static NOT_FOUND_COLLABORATOR: string = "NOT_FOUND_COLLABORATOR";
    static NOT_FOUND_CLIENT: string = "NOT_FOUND_CLIENT";
    static EMAIL_USED_ANOTHER_CLIENT: string = "EMAIL_USED_ANOTHER_CLIENT";
    static CELLPHONE_USED_ANOTHER_CLIENT: string = "CELLPHONE_USED_ANOTHER_CLIENT";


    private static messages: { [key:string]: string} = {
        "NOT_FOUND": "Não foi possível encontrar o registro.",
        "NOT_FOUND_COLLABORATOR": "Não foi possível encontrar o colaborator.",
        "NOT_FOUND_CLIENT": "Não foi possível encontrar o cliente.",
        "EMAIL_USED_ANOTHER_CLIENT": "Email está sendo usado",
        "CELLPHONE_USED_ANOTHER_CLIENT": "Telefone está sendo usado"
    }; 

    private constructor() {}

    static getMessageByKey(key: string): string {
        return CodeException.messages[key] || key;
    }
}