import { Repository, EntityRepository } from "typeorm";
import { UserListGroup } from "../entities/user-list-group.entity";
import { DeleteListGroupDto } from "shared";
import { User } from "src/core/entities/user.entity";
import { UnauthorizedException } from "@nestjs/common";

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