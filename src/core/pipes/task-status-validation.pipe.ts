import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common"
import { TaskStatus } from "../enums/task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE
    ];

    transform(value: any, metadata: ArgumentMetadata) {
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`'${value}' is an invalid status.`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        return this.allowedStatuses.indexOf(status) !== -1;
    }
}
