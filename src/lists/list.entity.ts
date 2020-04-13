import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "src/auth/user.entity";
import { Task } from "src/tasks/task.entity";

@Entity()
export class List extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(type => User, user => user.lists, { eager: false })
    user: User;

    @Column()
    userId: number;

    @OneToMany(type => Task, task => task.list, { eager: true })
    tasks: Task[];
}