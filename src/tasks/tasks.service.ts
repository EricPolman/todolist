import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
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
        await task.save();
        
        return task;
    }
}
