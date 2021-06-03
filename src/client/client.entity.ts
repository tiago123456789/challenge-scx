import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length, Matches } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "clients" })
export class Client {

    @PrimaryGeneratedColumn("uuid")
    id: string;
   
    @ApiProperty({
        description: 'Nome do cliente. Deve ter no mínimo 2 e no máximo 70 caracteres',
    })
    @Column({ length: 70 })    
    @Length(2, 70, { message: "Campo name deve ter no mínimo 2 no máximo 70 caracteres" })
    name: string;

    @ApiProperty()
    @Column({ length: 120 })    
    @IsEmail({}, { message: "Email inválido." })
    email: string;

    @ApiProperty({
        description: "Esse campo aceita valores no seguinte padrão: (99) 99999-9999"
    })
    @Column({ length: 15 })
    @Matches(/^\([0-9]{2}\)\s([0-9]){5}-([0-9]){4}$/, { message: "Campo cellphone inválido. Exemplo válido: (99) 99999-9999"})    
    cellphone: string;

    @ApiProperty({
        description: "Esse campo aceita valores no seguinte padrão: 999.999.999-99"
    })
    @Column({ length: 14 })
    @Matches(/^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$/, { message: "Campo cpf inválido. Exemplo válido: 999.999.999-99"})    
    cpf: string;

    @Column({ default: true })
    active: boolean;

}

