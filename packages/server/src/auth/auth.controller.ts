import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '../core/services/auth.service';
import { GetUser } from './get-user.decorator';
import { User } from '../core/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {} 

    @Get("/me")
    @UseGuards(AuthGuard())
    me(@GetUser() user: User): { statusCode: number, user: User } {
        return { statusCode: 200, user };
    }
}
