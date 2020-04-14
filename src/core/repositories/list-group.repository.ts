import { Repository, EntityRepository } from "typeorm";
import { ListGroup } from "../entities/list-group.entity";
import { NotFoundException, Logger } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { DeleteListGroupDto } from "../dto/list-groups/delete-list-group.dto";
import { CreateListGroupDto } from "../dto/list-groups/create-list-group.dto";

@EntityRepository(ListGroup)
export class ListGroupRepository extends Repository<ListGroup> {
    async getListGroups(user: User): Promise<ListGroup[]> {
        return this.find({ userId: user.id });
    }

    async createListGroup(createListGroupDto: CreateListGroupDto, user: User): Promise<ListGroup> {
        const listGroup = new ListGroup();
        listGroup.name = createListGroupDto.name;
        listGroup.user = user;
        await listGroup.save();

        delete listGroup.user;

        return listGroup;
    }

    async deleteListGroup(deleteListGroupDto: DeleteListGroupDto, user: User): Promise<void> {
        const { id } = deleteListGroupDto;
        const result = await this.delete({ id, userId: user.id });
        if (result.affected === 0) {
            throw new NotFoundException(`List group with id '${id}' not found.`);
        }
    }
}