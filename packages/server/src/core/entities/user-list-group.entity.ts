import { BaseEntity, Entity, JoinColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { User } from "src/core/entities/user.entity";
import { ListGroup } from "./list-group.entity";

@Entity()
export class UserListGroup extends BaseEntity {
    @PrimaryColumn()
    userId: number;
    
    @PrimaryColumn()
    listGroupId: number;

    @ManyToOne(() => User, user => user.listGroupConnections, { primary: true, eager: true })
    @JoinColumn({ name: "userId" })
    user: User;

    @ManyToOne(() => ListGroup, listGroup => listGroup.userConnections, { primary: true, eager: true })
    @JoinColumn({ name: "listGroupId" })
    listGroup: ListGroup;
}