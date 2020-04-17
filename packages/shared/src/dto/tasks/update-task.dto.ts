import { TaskStatus } from "../../enums";
import { IsOptional, IsDateString, IsString, IsEnum, IsNumber } from "class-validator";
import { TaskPriority } from "../../enums";

export class UpdateTaskDto {
    id: number = -1;
    
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