export class Guard {
  public static againstNullOrUndefined<T>(
    value: T | null | undefined,
    argumentName: string,
  ): void {
    if (value === null || value === undefined) {
      throw new Error(`${argumentName} cannot be null or undefined.`);
    }
  }

  public static againstEmptyString(value: string, argumentName: string): void {
    if (value.trim().length === 0) {
      throw new Error(`${argumentName} cannot be empty.`);
    }
  }

  public static againstNegativeNumber(
    value: number,
    argumentName: string,
  ): void {
    if (value < 0) {
      throw new Error(`${argumentName} cannot be negative.`);
    }
  }
}
