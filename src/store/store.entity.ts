import { Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "stores" })
export class Store {

    @PrimaryGeneratedColumn("uuid")
    id: string;
   
    @Column({ length: 90 })    
    name: string;

    @Column()
    is_matrix: boolean

    @ManyToOne(() => Store, store => store.id)
    matrix: Store

    @Column({ default: true })
    active: boolean;
}

