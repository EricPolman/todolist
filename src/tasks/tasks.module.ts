import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ListRepository } from 'src/lists/list.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]), TypeOrmModule.forFeature([ListRepository]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
