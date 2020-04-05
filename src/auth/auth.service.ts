import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}
    
    async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.register(authCredentialsDto);
    }

    async login(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const username = await this.userRepository.validateCredentials(authCredentialsDto);
        if (!username) {
            throw new UnauthorizedException("invalid credentials");
        }

        const payload = {
            username
        }

        return this.jwtService.sign(payload);
    }
}
