import { AppError } from "@common/app.error";

export class PersonNotFoundError extends AppError {
  constructor(details?: Record<string, unknown>) {
    super("PERSON_NOT_FOUND", "Person not found", details, 404);
  }
}
