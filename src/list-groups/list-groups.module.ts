import { Module } from '@nestjs/common';
import { ListGroupsController } from './list-groups.controller';
import { ListGroupsService } from '../core/services/list-groups.service';
import { AuthModule } from 'src/auth/auth.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [AuthModule, CoreModule],
  controllers: [ListGroupsController]
})
export class ListGroupsModule {}
