import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ collection: "site_revisions", timestamps: { createdAt: true, updatedAt: false } })
export class SiteRevisionModel {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ type: String, required: true })
  siteId: string;

  @Prop({ type: Number, required: true })
  version: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  safeHtml: string;

  @Prop({ required: true })
  text: string;

  createdAt: Date;
}

export type SiteRevisionDocument = HydratedDocument<SiteRevisionModel>;
export const SiteRevisionSchema = SchemaFactory.createForClass(SiteRevisionModel);

SiteRevisionSchema.index({ siteId: 1, version: 1 }, { unique: true });
