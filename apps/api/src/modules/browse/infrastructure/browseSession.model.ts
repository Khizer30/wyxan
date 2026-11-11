import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ _id: false })
export class NavEntryModel {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: String, enum: ["page", "search"], required: true })
  kind: "page" | "search";

  @Prop({ type: String, default: null })
  address: string | null;

  @Prop({ type: String, default: null })
  query: string | null;

  @Prop({ type: String, default: null })
  revisionId: string | null;

  @Prop({ type: String, enum: ["found", "missing", null], default: null })
  outcome: "found" | "missing" | null;

  @Prop({ type: Number, default: 0 })
  scrollY: number;

  @Prop({ type: String, default: null })
  visitId: string | null;
}
export const NavEntrySchema = SchemaFactory.createForClass(NavEntryModel);

@Schema({ collection: "browse_sessions", timestamps: false })
export class BrowseSessionModel {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ type: String, required: true })
  personId: string;

  @Prop({ type: [NavEntrySchema], default: [] })
  entries: NavEntryModel[];

  @Prop({ type: Number, default: -1 })
  cursor: number;

  @Prop({ type: Number, default: 0 })
  version: number;

  @Prop({ type: Date, required: true })
  updatedAt: Date;
}

export type BrowseSessionDocument = HydratedDocument<BrowseSessionModel>;
export const BrowseSessionSchema = SchemaFactory.createForClass(BrowseSessionModel);

BrowseSessionSchema.index({ personId: 1 }, { unique: true });
