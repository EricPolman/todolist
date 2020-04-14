import { Repository, EntityRepository } from "typeorm";
import { List } from "../entities/list.entity";
import { NotFoundException, Logger } from "@nestjs/common";
import { User } from "src/core/entities/user.entity";
import { DeleteListDto } from "../dto/lists/delete-list.dto";
import { CreateListDto } from "../dto/lists/create-list.dto";
import { Task } from "src/core/entities/task.entity";

@EntityRepository(List)
export class ListRepository extends Repository<List> {
    async getLists(user: User): Promise<List[]> {
        return this.find({ userId: user.id });
    }

    async createList(createListDto: CreateListDto, user: User): Promise<List> {
        const list = new List();
        list.name = createListDto.name;
        list.description = createListDto.description || "";
        list.user = user;
        list.listGroupId = user.defaultListGroupId;
        await list.save();

        delete list.user;

        return list;
    }

    async deleteList(deleteListDto: DeleteListDto, user: User): Promise<void> {
        const { id } = deleteListDto;
        const result = await this.delete({ id, userId: user.id });
        if (result.affected === 0) {
            throw new NotFoundException(`List with id '${id}' not found.`);
        }
    }
}