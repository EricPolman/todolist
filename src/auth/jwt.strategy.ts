import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../core/entities/user.entity';
import { passportJwtSecret } from 'jwks-rsa';
import { JwtPayload } from './jwt-payload.interface';
import { CreateUserDto } from '../core/dto/users/create-user.dto';
import {validate} from "class-validator";
import { AuthService } from '../core/services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            issuer: `${process.env.AUTH_OPENID_ISSUER}`,
            algorithms: ['RS256'],
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: process.env.AUTH_OPENID_JWKS
              }),
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { sub: externalUserId, email, name } = payload;

        let user = await this.authService.getUserByExternalId(externalUserId);
        if (!user) {
            const dto: CreateUserDto = { externalUserId, email, name };
            const errors = await validate(dto);
            if (errors.length > 0) {
                console.log(errors);
                throw new UnauthorizedException();
            }
            user = await this.authService.createUser(dto);
        }

        return user;
    }
}