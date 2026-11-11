import { UserRepository } from "@modules/user/domain/user.repository";
import { UserModel, UserSchema } from "@modules/user/infrastructure/user.model";
import { UserMongoRepository } from "@modules/user/infrastructure/userMongo.repository";
import { UserController } from "@modules/user/presentation/user.controller";
import { UserService } from "@modules/user/services/user.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, { provide: UserRepository, useClass: UserMongoRepository }],
  exports: [UserService]
})
export class UserModule {}
