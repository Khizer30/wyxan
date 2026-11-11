import { type VisitOutcome, type VisitTransition } from "@modules/visit/domain/visit.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ collection: "visits", timestamps: false })
export class VisitModel {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ type: String, required: true })
  personId: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: String, default: null })
  siteId: string | null;

  @Prop({ type: String, default: null })
  revisionId: string | null;

  @Prop({ type: String, enum: ["found", "missing"], required: true })
  outcome: VisitOutcome;

  @Prop({ type: String, enum: ["typed", "link", "back", "forward", "history", "search"], required: true })
  transition: VisitTransition;

  @Prop({ type: String, default: null })
  fromVisitId: string | null;

  @Prop({ type: Date, required: true })
  visitedAt: Date;
}

export type VisitDocument = HydratedDocument<VisitModel>;
export const VisitSchema = SchemaFactory.createForClass(VisitModel);

VisitSchema.index({ personId: 1, visitedAt: -1 });
VisitSchema.index({ personId: 1, address: 1 });
