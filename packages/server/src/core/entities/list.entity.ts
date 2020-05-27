import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "src/core/entities/user.entity";
import { Task } from "src/core/entities/task.entity";
import { ListGroup } from "src/core/entities/list-group.entity";
import { IList } from "shared";

@Entity()
export class List extends BaseEntity implements IList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(type => User, user => user.lists, { eager: false, onDelete: "CASCADE"})
    user: User;

    @Column()
    userId: number;

    @OneToMany(type => Task, task => task.list, { eager: false })
    tasks: Task[];

    @ManyToOne(type => ListGroup, listGroup => listGroup.lists, { eager: false, onDelete: "CASCADE"})
    listGroup: ListGroup;

    @Column({ nullable: true })
    listGroupId: number;
    
    @Column({ default: false })
    showDoneItems: boolean;

    @Column({ default: false })
    createdBySystem: boolean;
}