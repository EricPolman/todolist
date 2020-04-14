import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ListsModule } from './lists/lists.module';
import { ListGroupsModule } from './list-groups/list-groups.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TasksModule, AuthModule, ListsModule, ListGroupsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
