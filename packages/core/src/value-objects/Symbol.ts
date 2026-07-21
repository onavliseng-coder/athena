import { Guard } from "../shared/Guard.js";
import { ValueObject } from "../shared/ValueObject.js";

interface SymbolProps {
  value: string;
}

export class Symbol extends ValueObject<SymbolProps> {
  private constructor(props: SymbolProps) {
    super(props);
  }

  static create(symbol: string): Symbol {
    Guard.againstEmptyString(symbol, "symbol");

    return new Symbol({
      value: symbol.trim().toUpperCase(),
    });
  }

  get value(): string {
    return this.props.value;
  }
}
