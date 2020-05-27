import { Injectable, NotFoundException } from '@nestjs/common';
import { ListGroup } from '../entities/list-group.entity';
import { UserListGroup } from '../entities/user-list-group.entity';
import { CreateListGroupDto, DeleteListGroupDto, UpdateListGroupDto } from 'shared';
import { InjectRepository } from '@nestjs/typeorm';
import { ListGroupRepository } from '../repositories/list-group.repository';
import { User } from 'src/core/entities/user.entity';
import { UserListGroupRepository } from '../repositories/user-list-group.repository';

@Injectable()
export class ListGroupsService {
    constructor(
        @InjectRepository(ListGroupRepository)
        private listGroupRepository: ListGroupRepository,
        private userListGroupRepository: UserListGroupRepository
    ) { }

    async getListGroups(user: User): Promise<ListGroup[]> {
        const userListGroups = await this.userListGroupRepository.find({ userId: user.id });
        return userListGroups.map(userListGroup => userListGroup.listGroup);
    }

    async getListGroupById(id: number, user: User): Promise<ListGroup> {
        const listGroup = await this.userListGroupRepository.findOne({ where :{ userId: user.id, listGroupId: id }});

        if (!listGroup) {
            throw new NotFoundException(`ListGroup with id '${id}' not found.`);
        }

        return listGroup.listGroup;
    }

    async createListGroup(createListGroupDto: CreateListGroupDto, user: User): Promise<ListGroup> {
        const listGroup = await this.listGroupRepository.createListGroup(createListGroupDto, user);
        const userListGroup = new UserListGroup();
        userListGroup.userId = user.id;
        userListGroup.listGroupId = listGroup.id;
        await userListGroup.save();

        return listGroup;
    }

    async deleteListGroup(deleteListGroupDto: DeleteListGroupDto, user: User): Promise<void> {
        await this.userListGroupRepository.deleteForListGroup(deleteListGroupDto, user);
        return this.listGroupRepository.deleteListGroup(deleteListGroupDto, user);
    }

    async updateListGroup(updateListGroupDto: UpdateListGroupDto, user: User): Promise<ListGroup> {
        const listGroup: ListGroup = await this.getListGroupById(updateListGroupDto.id, user);

        listGroup.name = updateListGroupDto.name ?? listGroup.name;
        await listGroup.save();
        
        return listGroup;
    }
}
