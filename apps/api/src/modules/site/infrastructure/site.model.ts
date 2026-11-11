import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ collection: "sites", timestamps: true })
export class SiteModel {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: String, required: true })
  authorId: string;

  @Prop({ type: String, default: null })
  currentRevisionId: string | null;

  @Prop({ default: "" })
  title: string;

  @Prop({ default: "" })
  text: string;

  createdAt: Date;
  updatedAt: Date;
}

export type SiteDocument = HydratedDocument<SiteModel>;
export const SiteSchema = SchemaFactory.createForClass(SiteModel);

SiteSchema.index({ address: 1 }, { unique: true });
SiteSchema.index({ authorId: 1 });
SiteSchema.index({ title: "text", text: "text" }, { name: "site_search", weights: { title: 10, text: 1 }, default_language: "english" });
