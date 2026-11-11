import { BrowseSessionEntity } from "@modules/browse/domain/browseSession.entity";

export abstract class BrowseSessionRepository {
  abstract findByPerson(personId: string): Promise<BrowseSessionEntity | null>;
  abstract save(next: BrowseSessionEntity): Promise<BrowseSessionEntity>;
}
