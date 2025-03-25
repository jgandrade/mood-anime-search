import { Entity } from "../../../domain/Entity";
import { UniqueEntityID } from "../../../domain/UniqueEntityID";
import { TestEntity } from "../../utils/mocks";

describe("Entity", () => {
  it("should create entity with new ID when not provided", () => {
    const entity = new TestEntity({ value: "test" });
    expect(entity.props.value).toBe("test");
    expect(entity["_id"]).toBeDefined();
  });

  it("should create entity with provided ID", () => {
    const id = new UniqueEntityID();
    const entity = new TestEntity({ value: "test" }, id);
    expect(entity["_id"]).toBe(id);
  });

  describe("equals", () => {
    it("should return true for same entity instance", () => {
      const entity = new TestEntity({ value: "test" });
      expect(entity.equals(entity)).toBe(true);
    });

    it("should return true for different instances with same ID", () => {
      const id = new UniqueEntityID();
      const entity1 = new TestEntity({ value: "test1" }, id);
      const entity2 = new TestEntity({ value: "test2" }, id);
      expect(entity1.equals(entity2)).toBe(true);
    });

    it("should return false for null or undefined", () => {
      const entity = new TestEntity({ value: "test" });
      expect(entity.equals(null as any)).toBe(false);
      expect(entity.equals(undefined)).toBe(false);
    });

    it("should return false for non-entity objects", () => {
      const entity = new TestEntity({ value: "test" });
      expect(entity.equals({} as any)).toBe(false);
    });

    it("should return false for entities with different IDs", () => {
      const entity1 = new TestEntity({ value: "test" });
      const entity2 = new TestEntity({ value: "test" });
      expect(entity1.equals(entity2)).toBe(false);
    });
  });
});
