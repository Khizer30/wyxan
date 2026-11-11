import { AppError } from "@common/app.error";
import { createId } from "@paralleldrive/cuid2";

export type VisitOutcome = "found" | "missing";
export type VisitTransition = "typed" | "link" | "back" | "forward" | "history" | "search";

export class VisitEntity {
  constructor(
    public readonly id: string,
    public readonly personId: string,
    public readonly address: string,
    public readonly siteId: string | null,
    public readonly revisionId: string | null,
    public readonly outcome: VisitOutcome,
    public readonly transition: VisitTransition,
    public readonly fromVisitId: string | null,
    public readonly visitedAt: Date
  ) {}

  static create(props: {
    id?: string;
    personId: string;
    address: string;
    siteId?: string | null;
    revisionId?: string | null;
    transition: VisitTransition;
    fromVisitId?: string | null;
    visitedAt?: Date;
  }): VisitEntity {
    const siteId = props.siteId ?? null;
    const revisionId = props.revisionId ?? null;

    if ((siteId === null) !== (revisionId === null)) {
      throw new AppError("INVALID_VISIT", "A visit has both a site and a revision, or neither", { siteId, revisionId });
    }

    return new VisitEntity(
      props.id ?? createId(),
      props.personId,
      props.address,
      siteId,
      revisionId,
      siteId === null ? "missing" : "found",
      props.transition,
      props.fromVisitId ?? null,
      props.visitedAt ?? new Date()
    );
  }
}
