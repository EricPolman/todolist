import { Repository, EntityRepository } from "typeorm";
import { ListGroup } from "../entities/list-group.entity";
import { NotFoundException, BadRequestException } from "@nestjs/common";
import { User } from "src/core/entities/user.entity";
import { CreateListGroupDto, DeleteListGroupDto, UpdateListGroupDto } from "shared";

@EntityRepository(ListGroup)
export class ListGroupRepository extends Repository<ListGroup> {
    async getListGroups(user: User): Promise<ListGroup[]> {
        return this.find();
    }

    async createListGroup(createListGroupDto: CreateListGroupDto, user: User): Promise<ListGroup> {
        const listGroup = new ListGroup();
        listGroup.name = createListGroupDto.name;
        await listGroup.save();

        return listGroup;
    }

    async deleteListGroup(deleteListGroupDto: DeleteListGroupDto, user: User): Promise<void> {
        const { id } = deleteListGroupDto;

        const listGroup = await this.findOne({ id });
        if (listGroup.createdBySystem) {
            throw new BadRequestException("System-generated list groups cannot be deleted.");
        }

        const result = await this.delete({ id });
        if (result.affected === 0) {
            throw new NotFoundException(`List group with id '${id}' not found.`);
        }
    }
}