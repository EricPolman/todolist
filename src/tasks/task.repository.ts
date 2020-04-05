import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { DeleteTaskDto } from "./dto/delete-task.dto";
import { NotFoundException, Logger } from "@nestjs/common";
import { GetTasksDto } from "./dto/get-tasks.dto";
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(getTasksDto: GetTasksDto, user: User): Promise<Task[]> {
        const { search, status } = getTasksDto;
        const query = this.createQueryBuilder('task');

        query.where("task.userId = :userId", { userId: user.id });
        
        if (search) {
            query.andWhere("(task.title LIKE :search OR task.description LIKE :search)", { search: `%${search}%` });
        }

        if (status) {
            query.andWhere("task.status = :status", { status });
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const task = new Task();
        task.title = createTaskDto.title;
        task.description = createTaskDto.description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();

        delete task.user;

        return task;
    }

    async deleteTask(deleteTaskDto: DeleteTaskDto, user: User): Promise<void> {
        const { id } = deleteTaskDto;
        const result = await this.delete({ id, userId: user.id });
        if (result.affected === 0) {
            throw new NotFoundException(`Task with id '${id}' not found.`);
        }
    }
}