import { IsNotEmpty, Length, Max, Min } from "class-validator";

export class ExperienceNoteDto {

    @IsNotEmpty({ message: "Campo clientId é obrigatório." })
    clientId: string;

    @IsNotEmpty({ message: "Campo collaboratorId é obrigatório." })
    collaboratorId: string;

    @IsNotEmpty({ message: "Campo storeId é obrigatório." })
    storeId: string;

    @Min(0, { message: "Campo note tem aceita valor de 0 a 10" })
    @Max(10, { message: "Campo note tem aceita valor de 0 a 10" })
    note: Number;

    @Length(5, 255, { message: "Campo comment tem ter no mínimo 5 e no máximo 255 caracteres" })
    comment: String;

}