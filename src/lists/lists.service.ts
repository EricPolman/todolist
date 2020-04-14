import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { DeleteListDto } from './dto/delete-list.dto';
import { ListRepository } from './list.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './list.entity';
import { User } from 'src/auth/user.entity';
import { UpdateListDto } from './dto/update-list.dto';
import { ListGroup } from 'src/list-groups/list-group.entity';
import { ListGroupRepository } from 'src/list-groups/list-group.repository';

@Injectable()
export class ListsService {
    constructor(
        @InjectRepository(ListRepository)
        private listRepository: ListRepository,
        @InjectRepository(ListGroupRepository)
        private listGroupRepository: ListGroupRepository
    ) { }

    getLists(user: User): Promise<List[]> {
        return this.listRepository.getLists(user);
    }

    async getListById(id: number, user: User): Promise<List> {
        const list = await this.listRepository.findOne({ where: { id, userId: user.id } });

        if (!list) {
            throw new NotFoundException(`List with id '${id}' not found.`);
        }

        return list;
    }

    createList(createListDto: CreateListDto, user: User): Promise<List> {
        return this.listRepository.createList(createListDto, user);
    }

    deleteList(deleteListDto: DeleteListDto, user: User): Promise<void> {
        return this.listRepository.deleteList(deleteListDto, user);
    }

    async updateList(updateListDto: UpdateListDto, user: User): Promise<List> {
        const list: List = await this.getListById(updateListDto.id, user);

        list.name = updateListDto.name ?? list.name;
        list.description = updateListDto.description ?? list.description;
        await list.save();
        
        return list;
    }

    async linkListToListGroup(updateListDto: UpdateListDto, user: User): Promise<List> {
        const list: List = await this.getListById(updateListDto.id, user);
        if (!updateListDto.listGroupId) {
            // Unlink
            list.listGroup = null;
        } else {
            const listGroup: ListGroup = await this.listGroupRepository.findOne({ id: updateListDto.listGroupId, userId: user.id });
            if (!listGroup) {
                throw new NotFoundException(`List Group with id '${updateListDto.listGroupId}' not found.`);
            }
            list.listGroup = listGroup;
        }

        await list.save();
        delete list.listGroup;
        return list;
    }
}
