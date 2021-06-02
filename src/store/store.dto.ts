import { Length } from "class-validator";

export class StoreDto {

    @Length(2, 90, { message: "Campo name deve ter no mínimo 2 no máximo 90 caracteres" })
    name: string;

    matrixId: string
}