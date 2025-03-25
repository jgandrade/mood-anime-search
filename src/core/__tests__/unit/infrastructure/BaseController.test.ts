import { BaseController } from "../../../infrastructure/BaseController";
import { NextApiResponse } from "next/types";

describe("BaseController", () => {
  let controller: BaseController;
  let mockRes: NextApiResponse;

  beforeEach(() => {
    controller = new BaseController();
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;
  });

  describe("jsonResponse", () => {
    it("should set status and return json data", () => {
      // @ts-ignore - accessing protected method for testing
      controller.jsonResponse(mockRes, { test: "data" }, 200);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ test: "data" });
    });
  });

  describe("successResponse", () => {
    it("should return data with 200 status code by default", () => {
      // @ts-ignore - accessing protected method for testing
      controller.successResponse(mockRes, { test: "data" });

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ data: { test: "data" } });
    });

    it("should use custom status code when provided", () => {
      // @ts-ignore - accessing protected method for testing
      controller.successResponse(mockRes, { test: "data" }, 201);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ data: { test: "data" } });
    });
  });

  describe("errorResponse", () => {
    it("should return error message with 400 status code by default", () => {
      // @ts-ignore - accessing protected method for testing
      controller.errorResponse(mockRes, "Error message");

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Error message" });
    });

    it("should use custom status code when provided", () => {
      // @ts-ignore - accessing protected method for testing
      controller.errorResponse(mockRes, "Error message", 422);

      expect(mockRes.status).toHaveBeenCalledWith(422);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Error message" });
    });
  });

  describe("validationErrorResponse", () => {
    it("should return validation errors with 422 status code", () => {
      const errors = { field: ["Error message"] };

      // @ts-ignore - accessing protected method for testing
      controller.validationErrorResponse(mockRes, errors);

      expect(mockRes.status).toHaveBeenCalledWith(422);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Validation failed",
        errors,
      });
    });
  });

  describe("notFoundResponse", () => {
    it("should return not found message with 404 status code", () => {
      // @ts-ignore - accessing protected method for testing
      controller.notFoundResponse(mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Resource not found",
      });
    });

    it("should use custom message when provided", () => {
      // @ts-ignore - accessing protected method for testing
      controller.notFoundResponse(mockRes, "Custom not found");

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Custom not found",
      });
    });
  });

  describe("unauthorizedResponse", () => {
    it("should return unauthorized message with 401 status code", () => {
      // @ts-ignore - accessing protected method for testing
      controller.unauthorizedResponse(mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Unauthorized" });
    });
  });

  describe("forbiddenResponse", () => {
    it("should return forbidden message with 403 status code", () => {
      // @ts-ignore - accessing protected method for testing
      controller.forbiddenResponse(mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Forbidden" });
    });
  });

  describe("serverErrorResponse", () => {
    it("should return server error message with 500 status code", () => {
      // @ts-ignore - accessing protected method for testing
      controller.serverErrorResponse(mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
});
