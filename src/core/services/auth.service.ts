import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../entities/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/users/create-user.dto';
import { ListGroupsService } from 'src/core/services/list-groups.service';
import { CreateListGroupDto } from 'src/core/dto/list-groups/create-list-group.dto';
import { ListsService } from 'src/core/services/lists.service';
import { CreateListDto } from 'src/core/dto/lists/create-list.dto';
import { TasksService } from 'src/core/services/tasks.service';
import { CreateTaskDto } from 'src/core/dto/tasks/create-task.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private listGroupsService: ListGroupsService,
        private listsService: ListsService,
        private tasksService: TasksService
    ) {}
    
    getUserByExternalId(externalUserId: string): Promise<User> {
        return this.userRepository.findOne({ externalUserId });
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.saveUser(createUserDto);

        const createListGroupDto: CreateListGroupDto = { name: "default" };
        const listGroup = await this.listGroupsService.createListGroup(createListGroupDto, user);
        listGroup.createdBySystem = true;
        await listGroup.save();

        const createListDto: CreateListDto = { name: "default", description: "" };
        const list = await this.listsService.createList(createListDto, user);
        list.createdBySystem = true;

        list.listGroup = listGroup;
        await list.save();

        const createTaskDto: CreateTaskDto = { 
            title: "My first task",
            description: "This is my first task, yay!",
            priority: 3000
        }; 
        const firstTodo = await this.tasksService.createTask(createTaskDto, user);
        firstTodo.list = list;
        await firstTodo.save();

        user.defaultListGroupId = listGroup.id;
        user.defaultListId = list.id;
        await user.save();
        return user;
    }
}
