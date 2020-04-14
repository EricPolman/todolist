import { Controller, Logger, Get, Post, Delete, Patch, ParseIntPipe, Param, Body, UseGuards, Query } from '@nestjs/common';
import { ListsService } from '../core/services/lists.service';
import { User } from 'src/core/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { List } from '../core/entities/list.entity';
import { CreateListDto } from '../core/dto/lists/create-list.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetTasksDto } from 'src/core/dto/tasks/get-tasks.dto';
import { Task } from 'src/core/entities/task.entity';
import { TasksService } from 'src/core/services/tasks.service';

@Controller('lists')
@UseGuards(AuthGuard())
export class ListsController {
    private logger = new Logger("ListsController");

    constructor(private listsService: ListsService, private tasksService: TasksService) { }

    @Get()
    getAll(@GetUser() user: User): Promise<List[]> {
        this.logger.verbose(`User "${user.externalUserId}" retrieving lists.`)
        return this.listsService.getLists(user);
    }

    @Get(":id")
    get(@Param("id", ParseIntPipe) id: number, @GetUser() user: User): Promise<List> {
        return this.listsService.getListById(id, user);
    }

    @Get(":id/tasks")
    getTasks(@Param("id", ParseIntPipe) id: number, @Query() getTasksDto: GetTasksDto, @GetUser() user: User): Promise<Task[]> {
        this.logger.verbose(`User '${user.externalUserId}' retrieving tasks for list '${id}'. Filters: ${JSON.stringify(getTasksDto)}`);
        return this.tasksService.getTasks({...getTasksDto, listId: id}, user);
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
