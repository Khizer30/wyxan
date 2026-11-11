import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ collection: "people", timestamps: true })
export class PersonModel {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;

  createdAt: Date;
  updatedAt: Date;
}

export type PersonDocument = HydratedDocument<PersonModel>;
export const PersonSchema = SchemaFactory.createForClass(PersonModel);
