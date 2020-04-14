import { IsOptional, IsString, MinLength, MaxLength, IsNumber } from "class-validator";

export class CreateListDto {
    @IsString()
    @MinLength(3)
    @MaxLength(32)
    name: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(200)
    description: string;
}