import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "src/auth/user.entity";
import { List } from "./list.entity";

@Entity()
export class ListGroup extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => User, user => user.lists, { eager: false, onDelete: "CASCADE"})
    user: User;

    @Column()
    userId: number;

    @OneToMany(type => List, list => list.listGroup, { eager: true })
    lists: List[];
}