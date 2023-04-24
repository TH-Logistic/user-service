import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./entities/user.schema";
import { Model, Types } from "mongoose";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec()
    }

    async findById(id: string): Promise<User | undefined> {
        return this.userModel.findById(new Types.ObjectId(id), {
            password: false,
        }).exec()
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.userModel.findOne({
            email: email,
        }, { password: false }, {}).orFail()
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        const createdUser = (await this.userModel.create(createUserDTO));
        return createdUser;
    }

    async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<User | undefined> {
        const objectId = new Types.ObjectId(id);
        const result = await this.userModel.findByIdAndUpdate(objectId, {
            $set: { ...updateUserDTO },
        }, {
            returnOriginal: false,
            projection: { password: false }
        }).orFail()

        return result;
    }
}