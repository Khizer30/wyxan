import { type Role } from "@modules/user/domain/user.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ collection: "users", timestamps: true })
export class UserModel {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: ["USER", "ADMIN"], default: "USER" })
  role: Role;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<UserModel>;
export const UserSchema = SchemaFactory.createForClass(UserModel);

// Email must be unique among non-deleted users
UserSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { deletedAt: null } });
