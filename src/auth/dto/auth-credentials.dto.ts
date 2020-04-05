import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialsDto {    
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
    { message: "password too weak" })
    password: string;
}