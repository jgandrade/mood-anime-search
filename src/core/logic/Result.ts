export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  private error: string;
  private _value: T;

  private constructor(isSuccess: boolean, error?: string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        "InvalidOperation: A result cannot be successful and contain an error"
      );
    }
    if (!isSuccess && !error) {
      throw new Error(
        "InvalidOperation: A failing result needs to contain an error message"
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error as string;
    this._value = value as T;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error(
        "Can't get the value of an error result. Use 'error' instead."
      );
    }
    return this._value;
  }

  public getError(): string {
    return this.error;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine<T>(results: Result<T>[]): Result<T[]> {
    const values: T[] = [];

    for (const result of results) {
      if (result.isFailure) return Result.fail<T[]>(result.getError());
      values.push(result.getValue());
    }

    return Result.ok<T[]>(values);
  }
}
