import { TaskStatus } from "../task-status.enum";
import { IsIn, IsOptional, IsNotEmpty } from "class-validator";

export class GetTasksDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;
}