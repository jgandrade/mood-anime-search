import { ValueObject } from "../../../domain/ValueObject";
import { faker } from "@faker-js/faker";

class EmailAddress extends ValueObject<{ address: string }> {
  constructor(address: string) {
    super({ address });
  }
}

describe("ValueObject", () => {
  it("should create an immutable value object", () => {
    const randomEmail = faker.internet.email();
    const emailAddress = new EmailAddress(randomEmail);

    expect(Object.isFrozen(emailAddress.props)).toBe(true);
    expect(emailAddress.props.address).toBe(randomEmail);
  });

  it("should consider two value objects with same properties as equal", () => {
    const sharedEmail = faker.internet.email();
    const firstEmail = new EmailAddress(sharedEmail);
    const secondEmail = new EmailAddress(sharedEmail);

    expect(firstEmail.equals(secondEmail)).toBe(true);
  });

  it("should safely handle comparison with null or undefined", () => {
    const emailAddress = new EmailAddress(faker.internet.email());

    expect(emailAddress.equals(null as any)).toBe(false);
    expect(emailAddress.equals(undefined as any)).toBe(false);
  });

  it("should safely handle comparison with invalid value objects", () => {
    const emailAddress = new EmailAddress(faker.internet.email());

    expect(emailAddress.equals({} as any)).toBe(false);
  });

  it("should consider two value objects with different properties as unequal", () => {
    const personalEmail = new EmailAddress(faker.internet.email());
    const workEmail = new EmailAddress(faker.internet.email());

    expect(personalEmail.equals(workEmail)).toBe(false);
  });
});
