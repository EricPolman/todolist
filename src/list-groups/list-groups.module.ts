import { Module } from '@nestjs/common';
import { ListGroupsController } from './list-groups.controller';
import { ListGroupsService } from './list-groups.service';
import { ListGroupRepository } from './list-group.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ListGroupRepository]), AuthModule],
  controllers: [ListGroupsController],
  providers: [ListGroupsService]
})
export class ListGroupsModule {}
