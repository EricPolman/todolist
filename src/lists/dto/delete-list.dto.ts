import { IsNumber } from "class-validator";

export class DeleteListDto {
    @IsNumber()
    id: number;
}