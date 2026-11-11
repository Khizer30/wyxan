import { UserEntity } from "@modules/user/domain/user.entity";
import { UserModel } from "@modules/user/infrastructure/user.model";
import { UserResponseDto } from "@repo/dtos/user";

export class UserMapper {
  static toDomain(doc: UserModel): UserEntity {
    return new UserEntity(doc._id, doc.name, doc.email, doc.password, doc.role, doc.createdAt, doc.updatedAt, doc.deletedAt ?? null);
  }

  static toPersistence(entity: UserEntity) {
    return {
      _id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      role: entity.role,
      deletedAt: entity.deletedAt
    };
  }

  static toResponse(entity: UserEntity): UserResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      role: entity.role,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    };
  }
}
