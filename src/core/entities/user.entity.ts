import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany, JoinTable, CreateDateColumn, ManyToMany, OneToOne } from "typeorm";
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

    @OneToMany(type => Task, task => task.user, { eager: true, onDelete: "CASCADE" })
    tasks: Task[];

    @OneToMany(type => List, list => list.user, { eager: true, onDelete: "CASCADE"})
    lists: List[];

    @OneToMany(type => UserListGroup, ulg => ulg.user, { onDelete: "CASCADE" })
    listGroupConnections: UserListGroup[];

    @OneToOne(type => List)
    defaultList: List;

    @Column({ nullable: true })
    defaultListId: number;

    @OneToOne(type => ListGroup)
    defaultListGroup: ListGroup;

    @Column({ nullable: true })
    defaultListGroupId: number;

    @CreateDateColumn()
    createdAt: Date;
}