import { IsNotEmpty, IsDate, IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { TaskPriority } from "../../enums/task-priority.enum";

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;
    
    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsDateString()
    dueDate: Date;
    
    @IsEnum(TaskPriority)
    priority: TaskPriority;
}