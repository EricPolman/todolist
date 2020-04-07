import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { passportJwtSecret } from 'jwks-rsa';
import * as config from 'config';
import { JwtPayload } from './jwt-payload.interface';
import { CreateUserDto } from './dto/create-user.dto';
import {validate} from "class-validator";
const jwksRsa = require('jwks-rsa');


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
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
        console.log("payload", payload);
        const { sub: externalUserId, email, name } = payload;

        let user = await this.userRepository.findOne({ externalUserId });
        if (!user) {
            const dto: CreateUserDto = { externalUserId, email, name };
            const errors = await validate(dto);
            if (errors.length > 0) {
                console.log(errors);
                throw new UnauthorizedException();
            }
            user = await this.userRepository.createUser(dto);
        }

        return user;
    }
}