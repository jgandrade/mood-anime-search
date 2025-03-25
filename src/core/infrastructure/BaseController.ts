import type { NextApiResponse } from "next/types";

export interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export class BaseController {
  protected jsonResponse<T>(
    res: NextApiResponse,
    data: T,
    statusCode = 200
  ): void {
    res.status(statusCode).json(data);
  }

  protected successResponse<T>(
    res: NextApiResponse,
    data: T,
    statusCode = 200
  ): void {
    this.jsonResponse(res, { data }, statusCode);
  }

  protected errorResponse(
    res: NextApiResponse,
    message: string,
    statusCode = 400
  ): void {
    this.jsonResponse(res, { message }, statusCode);
  }

  protected validationErrorResponse(
    res: NextApiResponse,
    errors: Record<string, string[]>
  ): void {
    this.jsonResponse(res, { message: "Validation failed", errors }, 422);
  }

  protected notFoundResponse(
    res: NextApiResponse,
    message = "Resource not found"
  ): void {
    this.errorResponse(res, message, 404);
  }

  protected unauthorizedResponse(
    res: NextApiResponse,
    message = "Unauthorized"
  ): void {
    this.errorResponse(res, message, 401);
  }

  protected forbiddenResponse(
    res: NextApiResponse,
    message = "Forbidden"
  ): void {
    this.errorResponse(res, message, 403);
  }

  protected serverErrorResponse(
    res: NextApiResponse,
    message = "Internal server error"
  ): void {
    this.errorResponse(res, message, 500);
  }
}
