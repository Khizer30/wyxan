import { createId } from "@paralleldrive/cuid2";

export class PersonEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(props: { id?: string; name: string; createdAt?: Date; updatedAt?: Date }): PersonEntity {
    return new PersonEntity(props.id ?? createId(), props.name.trim(), props.createdAt ?? new Date(), props.updatedAt ?? new Date());
  }
}
