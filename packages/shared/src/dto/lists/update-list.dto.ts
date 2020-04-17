import { IsOptional, IsString, IsNumber, IsBoolean } from "class-validator";

export class UpdateListDto {
    id?: number;
    
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    listGroupId?: number;

    @IsOptional()
    @IsBoolean()
    showDoneItems?: boolean;
}