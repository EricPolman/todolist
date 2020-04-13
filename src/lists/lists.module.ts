import { Module } from '@nestjs/common';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListRepository } from './list.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ListRepository]), AuthModule],
  controllers: [ListsController],
  providers: [ListsService]
})
export class ListsModule {}
