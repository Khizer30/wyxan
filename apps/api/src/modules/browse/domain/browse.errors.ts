import { AppError } from "@common/app.error";

export class StaleSessionError extends AppError {
  constructor(details?: Record<string, unknown>) {
    super("STALE_SESSION", "Navigation state changed; try again", details, 409);
  }
}
