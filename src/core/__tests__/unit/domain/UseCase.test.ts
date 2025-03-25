import { UseCase } from "../../../domain/UseCase";
import { ExampleUseCase } from "../../utils/mocks";

describe("UseCase", () => {
  let useCase: ExampleUseCase;

  beforeEach(() => {
    useCase = new ExampleUseCase();
  });

  it("should execute with request parameter", () => {
    const result = useCase.execute("test");
    expect(result).toBe(4);
  });

  it("should execute without request parameter", () => {
    const result = useCase.execute();
    expect(result).toBe(0);
  });
});
