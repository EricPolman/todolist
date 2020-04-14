import { TaskStatus } from "../../enums/task-status.enum";
import { IsOptional, IsDateString, IsString, IsEnum, IsNumber } from "class-validator";
import { TaskPriority } from "../../enums/task-priority.enum";

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
    @IsNumber()
    listId?: number;

    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;
}