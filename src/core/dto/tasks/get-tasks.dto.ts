import { TaskStatus } from "../../enums/task-status.enum";
import { IsIn, IsOptional, IsNotEmpty, Max, IsPositive, IsNumber, Min } from "class-validator";
import { Transform } from "class-transformer";

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
    @Transform(value => Number(value))
    limit: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Transform(value => Number(value))
    page: number;

    @IsOptional()
    listId: number;
}