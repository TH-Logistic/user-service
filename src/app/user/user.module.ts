import { Module, OnModuleInit } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entities/user.schema";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Gender } from "./entities/gender";
import { UserRole } from "./entities/role";

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: User.name,
                    schema: UserSchema
                }
            ]
        ),
        ConfigModule
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }