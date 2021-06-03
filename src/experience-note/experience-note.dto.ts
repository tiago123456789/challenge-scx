import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, Max, Min } from "class-validator";

export class ExperienceNoteDto {

    @ApiProperty({
        description: 'Deve ser informada a id de um cliente.',
    })
    @IsNotEmpty({ message: "Campo clientId é obrigatório." })
    clientId: string;

    @ApiProperty({
        description: 'Deve ser informada a id de um colaborator.',
    })
    @IsNotEmpty({ message: "Campo collaboratorId é obrigatório." })
    collaboratorId: string;

    @ApiProperty({
        description: 'Deve ser informada a id de um loja aqui. OBS: nesse campo você pode informar id de uma loja matrix ou alguma unidade.',
    })
    @IsNotEmpty({ message: "Campo storeId é obrigatório." })
    storeId: string;

    @ApiProperty({
        default: 0,
        minimum: 0,
        maximum: 10,
        description: 'Deve informa o valor numérico com o valor de 0 a 10',
    })
    @Min(0, { message: "Campo note tem aceita valor de 0 a 10" })
    @Max(10, { message: "Campo note tem aceita valor de 0 a 10" })
    note: Number;

    @ApiProperty({
        description: 'Deve ter no mínimo 5 e no máximo 255 caracteres',
    })
    @Length(5, 255, { message: "Campo comment tem ter no mínimo 5 e no máximo 255 caracteres" })
    comment: String;

}