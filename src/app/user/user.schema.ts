import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { type } from "os";
import { UserRole } from "./role";
import { Expose } from "class-transformer";
import convertIdFromMongoose from "src/utils/convert-id-from-mongoose";

@Schema({
    versionKey: false
})
export class User {

    @Prop({
        required: true,
    })

    name: string;

    @Prop({
        unique: true
    })
    email: string;

    @Prop({
        required: true
    })
    password: string;

    @Prop({
        required: true,
    })
    role: UserRole;

    @Prop({
        required: true
    })
    avatar: string;

    @Prop({
        required: true
    })
    birthday: number;
}

export const UserSchema = convertIdFromMongoose(
    SchemaFactory.createForClass(User)
); 
