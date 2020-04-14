import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany, JoinTable, CreateDateColumn, ManyToMany } from "typeorm";
import { Task } from "src/core/entities/task.entity";
import { List } from "src/core/entities/list.entity";
import { ListGroup } from "src/core/entities/list-group.entity";
import { UserListGroup } from "src/core/entities/user-list-group.entity";

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

    @OneToMany(type => UserListGroup, ulg => ulg.user)
    listGroupConnections: UserListGroup[];

    // @Column()
    // defaultListId: number;

    // @Column()
    // defaultListGroupId: number;

    @CreateDateColumn()
    createdAt: Date;
}