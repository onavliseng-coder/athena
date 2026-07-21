export class Result<T, E = Error> {
  private constructor(
    private readonly success: boolean,
    private readonly data?: T,
    private readonly error?: E,
  ) {}

  public static ok<T>(data: T): Result<T, never> {
    return new Result<T, never>(true, data);
  }

  public static fail<E>(error: E): Result<never, E> {
    return new Result<never, E>(false, undefined, error);
  }

  public isSuccess(): boolean {
    return this.success;
  }

  public isFailure(): boolean {
    return !this.success;
  }

  public getValue(): T {
    if (!this.success) {
      throw new Error("Cannot get the value of a failed result.");
    }

    return this.data as T;
  }

  public getError(): E {
    if (this.success) {
      throw new Error("Cannot get the error of a successful result.");
    }

    return this.error as E;
  }
}
