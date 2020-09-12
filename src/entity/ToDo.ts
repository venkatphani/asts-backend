import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ToDo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    dueDate: Date;

}

export default ToDo;
