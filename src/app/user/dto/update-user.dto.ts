import { PartialType } from "@nestjs/swagger";
import { CreateUserDTO } from "./create-user.dto";
import { IsNotEmpty, IsString } from "class-validator";
export class UpdateUserDTO extends PartialType(CreateUserDTO) {

}