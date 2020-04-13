import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany } from "typeorm";
import { Task } from "src/tasks/task.entity";
import { List } from "src/lists/list.entity";

@Entity()
@Unique(["externalUserId"])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    externalUserId: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @OneToMany(type => Task, task => task.user, { eager: true })
    tasks: Task[];

    @OneToMany(type => List, list => list.user, { eager: true })
    lists: List[];
}