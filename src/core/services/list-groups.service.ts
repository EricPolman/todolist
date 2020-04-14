import { Injectable, NotFoundException } from '@nestjs/common';
import { ListGroup } from '../entities/list-group.entity';
import { CreateListGroupDto } from '../dto/list-groups/create-list-group.dto';
import { DeleteListGroupDto } from '../dto/list-groups/delete-list-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListGroupRepository } from '../repositories/list-group.repository';
import { UpdateListGroupDto } from '../dto/list-groups/update-list-group.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ListGroupsService {
    constructor(
        @InjectRepository(ListGroupRepository)
        private listGroupRepository: ListGroupRepository
    ) { }

    getListGroups(user: User): Promise<ListGroup[]> {
        return this.listGroupRepository.getListGroups(user);
    }

    async getListGroupById(id: number, user: User): Promise<ListGroup> {
        const listGroup = await this.listGroupRepository.findOne({ where: { id, userId: user.id } });

        if (!listGroup) {
            throw new NotFoundException(`ListGroup with id '${id}' not found.`);
        }

        return listGroup;
    }

    createListGroup(createListGroupDto: CreateListGroupDto, user: User): Promise<ListGroup> {
        return this.listGroupRepository.createListGroup(createListGroupDto, user);
    }

    deleteListGroup(deleteListGroupDto: DeleteListGroupDto, user: User): Promise<void> {
        return this.listGroupRepository.deleteListGroup(deleteListGroupDto, user);
    }

    async updateListGroup(updateListGroupDto: UpdateListGroupDto, user: User): Promise<ListGroup> {
        const listGroup: ListGroup = await this.getListGroupById(updateListGroupDto.id, user);

        listGroup.name = updateListGroupDto.name ?? listGroup.name;
        await listGroup.save();
        
        return listGroup;
    }
}
