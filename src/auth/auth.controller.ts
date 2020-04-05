import { Controller, Post, Body, ValidationPipe, UseGuards, Req, Get } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {} 

    @Post("/register")
    async register(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ statusCode: number }> {
        await this.authService.register(authCredentialsDto);
        return { statusCode: 201 };
    }

    @Post("/login")
    async login(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ statusCode: number, accessToken: string }> {
        const accessToken = await this.authService.login(authCredentialsDto);
        return { statusCode: 201, accessToken };
    }
}
