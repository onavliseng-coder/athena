import { Guard } from "../shared/Guard.js";
import { ValueObject } from "../shared/ValueObject.js";

interface VolumeProps {
  value: number;
}

export class Volume extends ValueObject<VolumeProps> {
  private constructor(props: VolumeProps) {
    super(props);
  }

  static create(value: number): Volume {
    Guard.againstNegativeNumber(value, "volume");

    return new Volume({ value });
  }

  get value(): number {
    return this.props.value;
  }
}
