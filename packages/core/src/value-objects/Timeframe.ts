import { Guard } from "../shared/Guard.js";
import { ValueObject } from "../shared/ValueObject.js";

interface TimeframeProps {
  value: string;
}

export class Timeframe extends ValueObject<TimeframeProps> {
  private constructor(props: TimeframeProps) {
    super(props);
  }

  static create(value: string): Timeframe {
    Guard.againstEmptyString(value, "timeframe");

    return new Timeframe({
      value: value.trim().toUpperCase(),
    });
  }

  get value(): string {
    return this.props.value;
  }
}
