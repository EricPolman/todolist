import { IsNumber } from "class-validator";

export class DeleteListGroupDto {
    @IsNumber()
    id: number;
}