import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './repositories/task.repository';
import { ListRepository } from './repositories/list.repository';
import { ListGroupRepository } from './repositories/list-group.repository';
import { TasksService } from './services/tasks.service';
import { ListsService } from './services/lists.service';
import { ListGroupsService } from './services/list-groups.service';
import { UserListGroupRepository } from './repositories/user-list-group.repository';
import { UserRepository } from './repositories/user.repository';
import { AuthService } from './services/auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        TaskRepository,
        ListRepository,
        ListGroupRepository,
        UserListGroupRepository,
        UserRepository
    ])],
    providers: [TasksService, ListsService, ListGroupsService, AuthService],
    exports: [TasksService, ListsService, ListGroupsService, AuthService]
})
export class CoreModule {}
