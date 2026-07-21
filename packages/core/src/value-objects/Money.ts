import { Guard } from "../shared/Guard.js";
import { ValueObject } from "../shared/ValueObject.js";

interface MoneyProps {
  value: number;
}

export class Money extends ValueObject<MoneyProps> {
  private constructor(props: MoneyProps) {
    super(props);
  }

  static create(value: number): Money {
    Guard.againstNegativeNumber(value, "money");

    return new Money({ value });
  }

  get value(): number {
    return this.props.value;
  }
}
