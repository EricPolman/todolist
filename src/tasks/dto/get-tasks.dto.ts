import { TaskStatus } from "../task-status.enum";
import { IsIn, IsOptional, IsNotEmpty, IsNumber, Max, IsPositive } from "class-validator";

export class GetTasksDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Max(200)
    limit: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    page: number;
}