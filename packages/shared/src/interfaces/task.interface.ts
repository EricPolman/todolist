import { TaskStatus, TaskPriority } from "../enums";

export interface ITask {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate?: Date;
    priority: TaskPriority;
    userId: number;
    listId: number;
    createdAt: Date;
    updatedAt: Date;
}