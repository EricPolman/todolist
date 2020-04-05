import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { BadRequestException, ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import * as argon from "argon2";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.password = await this.hashPassword(password);

        try {
            await user.save();
        } catch (error) {
            switch (error.code) {
                case "23505":
                    throw new ConflictException("username already exists");
                default:
                    throw new InternalServerErrorException();
            }
        }
    }
    
    async validateCredentials(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });
        if (user && await user.validatePassword(password)) {
            return username;
        }
        return null;
    }

    private async hashPassword(password: string): Promise<string> {
        try {
            return await argon.hash(password);
        } catch (err) {
            throw new InternalServerErrorException();        
        }
    }
}