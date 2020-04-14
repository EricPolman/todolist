import { Module } from '@nestjs/common';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListRepository } from './list.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ListGroupRepository } from 'src/list-groups/list-group.repository';
import { TasksService } from 'src/tasks/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([ListRepository, ListGroupRepository]), AuthModule],
  controllers: [ListsController],
  providers: [ListsService]
})
export class ListsModule {}
