import { Guard } from "../shared/Guard.js";
import { ValueObject } from "../shared/ValueObject.js";

interface PriceProps {
  value: number;
}

export class Price extends ValueObject<PriceProps> {
  private constructor(props: PriceProps) {
    super(props);
  }

  static create(value: number): Price {
    Guard.againstNegativeNumber(value, "price");

    return new Price({ value });
  }

  get value(): number {
    return this.props.value;
  }
}
