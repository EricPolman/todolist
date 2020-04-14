import { Repository, EntityRepository } from "typeorm";
import { Task } from "../entities/task.entity";
import { TaskStatus } from "../enums/task-status.enum";
import { CreateTaskDto } from "../dto/tasks/create-task.dto";
import { DeleteTaskDto } from "../dto/tasks/delete-task.dto";
import { NotFoundException, Logger } from "@nestjs/common";
import { GetTasksDto } from "../dto/tasks/get-tasks.dto";
import { User } from "src/core/entities/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(getTasksDto: GetTasksDto, user: User): Promise<Task[]> {
        const { search, status, listId, page = 0, limit = 20 } = getTasksDto;
        const query = this.createQueryBuilder('task');

        query.where("task.userId = :userId", { userId: user.id });
        
        if (search) {
            query.andWhere("(task.title LIKE :search OR task.description LIKE :search)", { search: `%${search}%` });
        }

        if (status) {
            query.andWhere("task.status = :status", { status });
        }

        if (listId) {
            query.andWhere("task.listId = :listId", { listId });
        }
        
        query.offset(page * limit);
        query.limit(limit);

        // query.orderBy("task.dueDate", "ASC");
        // query.orderBy("task.priority", "DESC");
        query.orderBy("task.id", "ASC");
        // query.orderBy("task.status", "DESC");

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const task = new Task();
        task.title = createTaskDto.title;
        task.description = createTaskDto.description || "";
        task.dueDate = createTaskDto.dueDate;
        task.status = TaskStatus.OPEN;
        task.priority = createTaskDto.priority;
        task.user = user;
        task.listId = user.defaultListId;
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