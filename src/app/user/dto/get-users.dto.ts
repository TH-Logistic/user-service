import { IsEnum, IsOptional } from "class-validator";
import { UserRole } from "../entities/role";

export class GetUsersQuey {
    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}