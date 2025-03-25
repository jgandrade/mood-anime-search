import { Identifier } from "../../../domain/Identifier";

describe("Identifier", () => {
  it("should create an identifier with the given value", () => {
    const id = new Identifier<string>("test-id");
    expect(id.toValue()).toBe("test-id");
  });

  it("should correctly compare equal identifiers", () => {
    const id1 = new Identifier<number>(1);
    const id2 = new Identifier<number>(1);
    expect(id1.equals(id2)).toBe(true);
  });

  it("should correctly compare different identifiers", () => {
    const id1 = new Identifier<number>(1);
    const id2 = new Identifier<number>(2);
    expect(id1.equals(id2)).toBe(false);
  });

  it("should return false when comparing with null/undefined", () => {
    const id = new Identifier<string>("test");
    expect(id.equals(null as any)).toBe(false);
    expect(id.equals(undefined)).toBe(false);
  });

  it("should return false when comparing with different types", () => {
    const id = new Identifier<string>("test");
    const fakeId = { toValue: () => "test" };
    expect(id.equals(fakeId as any)).toBe(false);
  });

  it("should convert to string correctly", () => {
    const id = new Identifier<number>(123);
    expect(id.toString()).toBe("123");
  });
});
