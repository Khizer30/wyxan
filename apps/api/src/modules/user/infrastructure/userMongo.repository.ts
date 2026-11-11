import { UserEntity } from "@modules/user/domain/user.entity";
import { UserRepository } from "@modules/user/domain/user.repository";
import { UserMapper } from "@modules/user/infrastructure/user.mapper";
import { UserModel } from "@modules/user/infrastructure/user.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserMongoRepository extends UserRepository {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {
    super();
  }

  async findById(id: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findOne({ _id: id, deletedAt: null }).lean();
    return doc ? UserMapper.toDomain(doc) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findOne({ email, deletedAt: null }).lean();
    return doc ? UserMapper.toDomain(doc) : null;
  }

  async create(entity: UserEntity): Promise<UserEntity> {
    const doc = await this.userModel.create(UserMapper.toPersistence(entity));
    return UserMapper.toDomain(doc.toObject());
  }

  async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    const doc = await this.userModel.findOneAndUpdate({ _id: id, deletedAt: null }, { $set: data }, { new: true }).lean();
    if (!doc) {
      throw new Error(`User ${id} not found`);
    }
    return UserMapper.toDomain(doc);
  }

  async softDelete(id: string): Promise<void> {
    await this.userModel.updateOne({ _id: id }, { $set: { deletedAt: new Date() } });
  }
}
