import { Repository, EntityRepository } from "typeorm";
import { User } from "../entities/user.entity";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CreateUserDto } from "shared";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async saveUser(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        const { externalUserId, email, name } = createUserDto;

        user.externalUserId = externalUserId;
        user.email = email;
        user.name = name;

        try {
            await user.save();
            return user;
        } catch (error) {
            switch (error.code) {
                case "23505":
                    throw new ConflictException("username already exists");
                default:
                    throw new InternalServerErrorException();
            }
        }
    }
}