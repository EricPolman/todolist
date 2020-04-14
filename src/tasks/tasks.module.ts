import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [AuthModule, CoreModule],
  controllers: [TasksController]
})
export class TasksModule {}
