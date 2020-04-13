import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import { List } from 'src/lists/list.entity';
import { ListRepository } from 'src/lists/list.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
        @InjectRepository(ListRepository)
        private listRepository: ListRepository
    ) { }

    getTasks(getTasksDto: GetTasksDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(getTasksDto, user);
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id, userId: user.id } });

        if (!task) {
            throw new NotFoundException(`Task with id '${id}' not found.`);
        }

        return task;
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    deleteTask(deleteTaskDto: DeleteTaskDto, user: User): Promise<void> {
        return this.taskRepository.deleteTask(deleteTaskDto, user);
    }

    async updateTask(updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
        const task: Task = await this.getTaskById(updateTaskDto.id, user);

        task.title = updateTaskDto.title ?? task.title;
        task.description = updateTaskDto.description ?? task.description;
        task.status = updateTaskDto.status ?? task.status;
        task.dueDate = updateTaskDto.dueDate ?? task.dueDate;
        await task.save();
        
        return task;
    }

    async linkTaskToList(updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
        const task: Task = await this.getTaskById(updateTaskDto.id, user);
        if (!updateTaskDto.listId) {
            // Unlink
            task.list = null;
        } else {
            const list: List = await this.listRepository.findOne({ id: updateTaskDto.listId, userId: user.id });
            if (!list) {
                throw new NotFoundException(`List with id '${updateTaskDto.listId}' not found.`);
            }
            task.list = list;
        }

        await task.save();
        delete task.list;     
        return task;
    }
}
