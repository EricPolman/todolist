import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
  OneToMany,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { Task } from 'src/core/entities/task.entity';
import { List } from 'src/core/entities/list.entity';
import { ListGroup } from 'src/core/entities/list-group.entity';
import { UserListGroup } from 'src/core/entities/user-list-group.entity';
import { IUser } from 'shared';

@Entity()
@Unique(['externalUserId'])
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  externalUserId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(
    type => Task,
    task => task.user,
    { eager: false, onDelete: 'CASCADE' },
  )
  tasks: Task[];

  @OneToMany(
    type => List,
    list => list.user,
    { eager: false, onDelete: 'CASCADE' },
  )
  lists: List[];

  @OneToMany(
    type => UserListGroup,
    ulg => ulg.user,
    { onDelete: 'CASCADE' },
  )
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
