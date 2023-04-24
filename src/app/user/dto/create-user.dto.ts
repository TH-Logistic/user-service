import { Exclude } from "class-transformer";
import { User } from "../user.schema";
import { UserRole } from "../role";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateUserDTO extends User {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsString()
    avatar: string;

    @IsNumber()
    @IsPositive()
    birthday: number;
}