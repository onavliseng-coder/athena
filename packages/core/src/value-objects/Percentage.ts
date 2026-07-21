import { ValueObject } from "../shared/ValueObject.js";

interface PercentageProps {
  value: number;
}

export class Percentage extends ValueObject<PercentageProps> {
  private constructor(props: PercentageProps) {
    super(props);
  }

  static create(value: number): Percentage {
    return new Percentage({ value });
  }

  get value(): number {
    return this.props.value;
  }
}
