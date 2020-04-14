import { IsOptional, IsString } from "class-validator";

export class UpdateListGroupDto {
    id: number;
    
    @IsOptional()
    @IsString()
    name?: string;
}