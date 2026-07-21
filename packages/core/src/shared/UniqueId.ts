import { randomUUID } from "node:crypto";

export class UniqueId {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  static create(): UniqueId {
    return new UniqueId();
  }

  static from(value: string): UniqueId {
    return new UniqueId(value);
  }

  equals(other: UniqueId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  toJSON(): string {
    return this.value;
  }

  valueOf(): string {
    return this.value;
  }
}
