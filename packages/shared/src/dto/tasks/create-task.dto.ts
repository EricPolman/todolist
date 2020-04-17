import { IsNotEmpty, IsDateString, IsEnum, IsOptional, IsString, IsNumberString } from "class-validator";
import { TaskPriority } from "../../enums/task-priority.enum";

export class CreateTaskDto {
    @IsNotEmpty()
    title?: string;
    
    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString()
    dueDate?: Date;
    
    @IsEnum(TaskPriority)
    priority?: TaskPriority;

    @IsOptional()
    @IsNumberString()
    listId?: number;
}