import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from "typeorm";
import { User } from "src/core/entities/user.entity";
import { List } from "./list.entity";
import { UserListGroup } from "./user-list-group.entity";

@Entity()
export class ListGroup extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => List, list => list.listGroup, { eager: true })
    lists: List[];
    
    @OneToMany(type => UserListGroup, ulg => ulg.listGroup)
    userConnections: UserListGroup[];

    @Column({ default: false })
    createdBySystem: boolean;
}