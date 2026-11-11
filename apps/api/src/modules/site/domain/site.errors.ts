import { AppError } from "@common/app.error";

export class InvalidAddressError extends AppError {
  constructor(details?: Record<string, unknown>) {
    super("INVALID_ADDRESS", "Not a valid address", details, 400);
  }
}

export class SiteAlreadyExistsError extends AppError {
  constructor(details?: Record<string, unknown>) {
    super("SITE_ALREADY_EXISTS", "A site already lives at this address", details, 409);
  }
}

export class SiteNotFoundError extends AppError {
  constructor(details?: Record<string, unknown>) {
    super("SITE_NOT_FOUND", "No such address", details, 404);
  }
}
