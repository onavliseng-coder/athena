import { Guard } from "../shared/Guard.js";
import { ValueObject } from "../shared/ValueObject.js";

interface QuantityProps {
  value: number;
}

export class Quantity extends ValueObject<QuantityProps> {
  private constructor(props: QuantityProps) {
    super(props);
  }

  static create(value: number): Quantity {
    Guard.againstNegativeNumber(value, "quantity");

    return new Quantity({ value });
  }

  get value(): number {
    return this.props.value;
  }
}
