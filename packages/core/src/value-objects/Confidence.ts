import { ValueObject } from "../shared/ValueObject.js";

interface ConfidenceProps {
  value: number;
}

export class Confidence extends ValueObject<ConfidenceProps> {
  private constructor(props: ConfidenceProps) {
    super(props);
  }

  static create(value: number): Confidence {
    if (value < 0 || value > 100) {
      throw new Error("Confidence must be between 0 and 100.");
    }

    return new Confidence({ value });
  }

  get value(): number {
    return this.props.value;
  }
}
