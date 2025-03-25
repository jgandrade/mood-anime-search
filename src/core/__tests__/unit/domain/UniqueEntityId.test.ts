import { UniqueEntityID } from "../../../domain/UniqueEntityID";
import { validate as uuidValidate } from "uuid";

describe("UniqueEntityID", () => {
  it("should create a valid UUID when no id is provided", () => {
    const id = new UniqueEntityID();
    expect(uuidValidate(id.toValue() as string)).toBe(true);
  });

  it("should use provided string id when given", () => {
    const testId = "test-id";
    const id = new UniqueEntityID(testId);
    expect(id.toValue()).toBe(testId);
  });

  it("should use provided numeric id when given", () => {
    const testId = 123;
    const id = new UniqueEntityID(testId);
    expect(id.toValue()).toBe(testId);
  });
});
