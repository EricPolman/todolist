import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './repositories/task.repository';
import { ListRepository } from './repositories/list.repository';
import { ListGroupRepository } from './repositories/list-group.repository';
import { TasksService } from './services/tasks.service';
import { ListsService } from './services/lists.service';
import { ListGroupsService } from './services/list-groups.service';

@Module({
    imports: [TypeOrmModule.forFeature([TaskRepository, ListRepository, ListGroupRepository])],
    providers: [TasksService, ListsService, ListGroupsService],
    exports: [TasksService, ListsService, ListGroupsService]
})
export class CoreModule {}
