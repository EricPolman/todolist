import { Controller, Logger, Get, Post, Delete, Patch, ParseIntPipe, Param, Body, UseGuards, Query } from '@nestjs/common';
import { ListsService } from './lists.service';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { List } from './list.entity';
import { CreateListDto } from './dto/create-list.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetTasksDto } from 'src/tasks/dto/get-tasks.dto';
import { Task } from 'src/tasks/task.entity';

@Controller('lists')
@UseGuards(AuthGuard())
export class ListsController {
    private logger = new Logger("ListsController");

    constructor(private listsService: ListsService) { }

    @Get()
    getAll(@GetUser() user: User): Promise<List[]> {
        this.logger.verbose(`User "${user.externalUserId}" retrieving lists.`)
        return this.listsService.getLists(user);
    }

    @Get(":id")
    get(@Param("id", ParseIntPipe) id: number, @GetUser() user: User): Promise<List> {
        return this.listsService.getListById(id, user);
    }

    @Post()
    add(@Body() body: CreateListDto, @GetUser() user: User): Promise<List> {
        this.logger.verbose(`User "${user.name}" creating list with parameters: ${JSON.stringify(body)}`)
        return this.listsService.createList(body, user);
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number,  @GetUser() user: User): Promise<{ statusCode: number }> {
        await this.listsService.deleteList({ id }, user);
        return { statusCode: 200 };
    }

    @Patch(":id/name") 
    updateName(@Param("id", ParseIntPipe) id: number, @GetUser() user: User, @Body("name") name: string ): Promise<List> {
        return this.listsService.updateList({ id, name }, user);
    }

    @Patch(":id/list-group") 
    updateList(@Param("id", ParseIntPipe) id: number, @GetUser() user: User, @Body("listGroupId") listGroupId?: number ): Promise<List> {
        return this.listsService.linkListToListGroup({ id, listGroupId }, user);
    }
}
