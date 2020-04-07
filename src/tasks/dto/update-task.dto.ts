import { TaskStatus } from "../task-status.enum";
import { IsOptional, IsDateString, IsString, IsEnum } from "class-validator";
import { TaskPriority } from "../task-priority.enum";

export class UpdateTaskDto {
    id: number;
    
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString()
    dueDate?: Date;

    @IsOptional()
    status?: TaskStatus;

    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;
}