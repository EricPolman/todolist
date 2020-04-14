import { Module } from '@nestjs/common';
import { ListsController } from './lists.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [AuthModule, CoreModule],
  controllers: [ListsController]
})
export class ListsModule {}
