import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "collaborators" })
export class Collaborator {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ApiProperty({
        description: 'Deve ter no mínimo 2 e no máximo 70 caracteres',
    })
    @Column({ length: 70 })    
    @Length(2, 70, { message: "Campo name deve ter no mínimo 2 no máximo 70 caracteres" })
    name: string;

    @Column({ default: true })
    active: boolean;
}

