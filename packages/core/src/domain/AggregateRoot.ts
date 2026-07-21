import { Entity } from "../shared/Entity.js";
import type { DomainEvent } from "./DomainEvent.js";

export abstract class AggregateRoot<T> extends Entity<T> {
  private readonly domainEvents: DomainEvent[] = [];

  protected addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public getDomainEvents(): readonly DomainEvent[] {
    return this.domainEvents;
  }

  public clearDomainEvents(): void {
    this.domainEvents.length = 0;
  }
}
