import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Roles } from "src/config/guard/role.decorator";
import { UserRole } from "./role";
import { UserService } from "./user.service";
import { IsEmail } from "class-validator";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Get()
    async getUserById(@Query('id') id?: string, @Query('email') email?: string) {
        return id ? this.userService.findById(id) : this.userService.findByEmail(email);
    }

    @Get()
    async getUserByEmail(@Query('email') email: string) {
        return this.userService.findByEmail(email);
    }

    @Post()
    async createUser(@Body() createUserDTO: CreateUserDTO) {
        return this.userService.createUser(createUserDTO);
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
        return this.userService.updateUser(id, updateUserDTO);
    }
}