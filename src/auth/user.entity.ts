import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany } from "typeorm";
import * as argon from "argon2";
import { InternalServerErrorException } from "@nestjs/common";
import { Task } from "src/tasks/task.entity";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type => Task, task => task.user, { eager: true })
    tasks: Task[];

    async validatePassword(password: string): Promise<boolean> {
        try {
            return argon.verify(this.password, password);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}