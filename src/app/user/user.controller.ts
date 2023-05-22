import { Body, Controller, DefaultValuePipe, Get, Param, Patch, Post, Query, Req, Version } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Roles } from "src/config/guard/role.decorator";
import { UserService } from "./user.service";
import { IsEmail } from "class-validator";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserRole } from "./entities/role";
import { GetUsersQuey } from "./dto/get-users.dto";

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Roles(UserRole.ADMIN)
    @Get()
    async getUsers(@Query() query: GetUsersQuey) {
        return this.userService.findAll(query.role);
    }

    @Roles(UserRole.ADMIN)
    @Get('/:id')
    async getUserById(@Param('id') id: string) {
        return this.userService.findById(id);
    }

    @Roles(UserRole.ADMIN)
    @Get('/email/:email')
    async getUserByEmail(@Param('email') email: string) {
        return this.userService.findByEmail(email);
    }

    @Roles(UserRole.ADMIN)
    @Get('/username/:username')
    async getByUsername(@Param('username') username: string) {
        return this.userService.findByUsername(username);
    }

    @Roles(UserRole.ADMIN)
    @Post()
    async createUser(@Body() createUserDTO: CreateUserDTO) {
        return this.userService.createUser(createUserDTO);
    }

    @Roles(UserRole.ADMIN)
    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
        return this.userService.updateUser(id, updateUserDTO);
    }
}