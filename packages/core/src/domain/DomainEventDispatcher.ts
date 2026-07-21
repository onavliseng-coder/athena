import type { DomainEvent } from "./DomainEvent.js";

type EventHandler<T extends DomainEvent> = (event: T) => void | Promise<void>;

export class DomainEventDispatcher {
  private readonly handlers = new Map<string, EventHandler<any>[]>();

  register<T extends DomainEvent>(
    eventName: string,
    handler: EventHandler<T>,
  ): void {
    const handlers = this.handlers.get(eventName) ?? [];

    handlers.push(handler);

    this.handlers.set(eventName, handlers);
  }

  async dispatch(event: DomainEvent): Promise<void> {
    const handlers = this.handlers.get(event.eventName);

    if (!handlers) {
      return;
    }

    for (const handler of handlers) {
      await handler(event);
    }
  }
}
