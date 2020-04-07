import { Controller, Get, Delete, Post, Patch, Body, Param, Query, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GetTasksDto } from './dto/get-tasks.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger("TasksController");

    constructor(private tasksService: TasksService) { }

    @Get()
    getAll(@Query() getTasksDto: GetTasksDto, @GetUser() user: User): Promise<Task[]> {
        this.logger.verbose(`User "${user.externalUserId}" retrieving tasks. Filters: ${JSON.stringify(getTasksDto)}`)
        return this.tasksService.getTasks(getTasksDto, user);
    }

    @Get(":id")
    get(@Param("id", ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    add(@Body() body: CreateTaskDto, @GetUser() user: User): Promise<Task> {
        this.logger.verbose(`User "${user.name}" creating task with parameters: ${JSON.stringify(body)}`)
        return this.tasksService.createTask(body, user);
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number,  @GetUser() user: User): Promise<{ statusCode: number }> {
        await this.tasksService.deleteTask({ id }, user);
        return { statusCode: 200 };
    }

    @Patch(":id/status") 
    updateStatus(@Param("id", ParseIntPipe) id: number, @GetUser() user: User, @Body("status", TaskStatusValidationPipe) status?: TaskStatus ): Promise<Task> {
        return this.tasksService.updateTask({ id, status }, user);
    }
}
