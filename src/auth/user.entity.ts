import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany } from "typeorm";
import * as argon from "argon2";
import { InternalServerErrorException } from "@nestjs/common";
import { Task } from "src/tasks/task.entity";

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
}