import { Client } from "../client/client.entity";
import { Collaborator } from "../collaborator/collaborator.entity";
import { Store } from "../store/store.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExperienceNote {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Client, (client) => client.id, { eager: true })
    client: Client;

    @ManyToOne(() => Collaborator, (collaborator) => collaborator.id, { eager: true })
    collaborator: Collaborator;

    @ManyToOne(() => Store, (store) => store.id, { eager: true })
    store: Store;

    @Column("timestamp", { default: () =>  'NOW()' },)
    createdAt: Date;

    @Column()
    note: Number;

    @Column()
    comment: String;

}