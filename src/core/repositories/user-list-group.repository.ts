import { Repository, EntityRepository } from "typeorm";
import { ListGroup } from "../entities/list-group.entity";
import { UserListGroup } from "../entities/user-list-group.entity";
import { DeleteListGroupDto } from "../dto/list-groups/delete-list-group.dto";
import { User } from "src/auth/user.entity";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";

@EntityRepository(UserListGroup)
export class UserListGroupRepository extends Repository<UserListGroup> {
    async deleteForListGroup(deleteListGroupDto: DeleteListGroupDto, user: User) {
        const { id } = deleteListGroupDto;
        const listGroupsForUser = await this.find({ userId: user.id, listGroupId: id });
        if (listGroupsForUser.length !== 0) {
            // User has relation to list group, check for admin is TODO
            this.delete({listGroupId: id});
        } else {
            throw new UnauthorizedException(`User '${user.externalUserId}' has no access to list with id '${id}'`);
        }
        listGroupsForUser.forEach(ulg => ulg.remove());
    }
}