import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "../enums/task-status.enum";
import { User } from "src/core/entities/user.entity";
import { TaskPriority } from "../enums/task-priority.enum";
import { List } from "src/core/entities/list.entity";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @Column({ nullable: true })
    dueDate: Date;

    @Column()
    priority: TaskPriority;

    @ManyToOne(type => User, user => user.tasks, { eager: false, onDelete: "CASCADE" })
    user: User;

    @Column()
    userId: number;

    @ManyToOne(type => List, list => list.tasks, { eager: false, onDelete: "CASCADE" })
    list: List;

    @Column({ nullable: true })
    listId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}