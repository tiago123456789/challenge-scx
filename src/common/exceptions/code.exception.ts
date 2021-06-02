
export class CodeException {

    static NOT_FOUND: string = "NOT_FOUND";
    static NOT_FOUND_COLLABORATOR: string = "NOT_FOUND_COLLABORATOR";
    static NOT_FOUND_CLIENT: string = "NOT_FOUND_CLIENT";
    static NOT_FOUND_STORE_MATRIX_OR_UNIT: string = "NOT_FOUND_STORE_MATRIX_OR_UNIT";
    static EMAIL_USED_ANOTHER_CLIENT: string = "EMAIL_USED_ANOTHER_CLIENT";
    static CELLPHONE_USED_ANOTHER_CLIENT: string = "CELLPHONE_USED_ANOTHER_CLIENT";
    static NOT_FOUND_EXPERIENCE_NOTE = "NOT_FOUND_EXPERIENCE_NOTE";


    private static messages: { [key:string]: string} = {
        "NOT_FOUND": "Não foi possível encontrar o registro.",
        "NOT_FOUND_COLLABORATOR": "Não foi possível encontrar o colaborator.",
        "NOT_FOUND_CLIENT": "Não foi possível encontrar o cliente.",
        "EMAIL_USED_ANOTHER_CLIENT": "Email está sendo usado",
        "CELLPHONE_USED_ANOTHER_CLIENT": "Telefone está sendo usado",
        "NOT_FOUND_STORE_MATRIX_OR_UNIT": "Não foi possível encontrar loja matriz ou unidade",
        "NOT_FOUND_EXPERIENCE_NOTE": "Não foi possível encontrar avaliação da experiência"
    }; 

    private constructor() {}

    static getMessageByKey(key: string): string {
        return CodeException.messages[key] || key;
    }
}