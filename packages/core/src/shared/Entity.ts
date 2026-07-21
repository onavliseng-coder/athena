import { UniqueId } from "./UniqueId.js";

export abstract class Entity<TProps> {
  protected readonly id: UniqueId;
  protected readonly props: Readonly<TProps>;

  protected constructor(props: TProps, id?: UniqueId) {
    this.id = id ?? UniqueId.create();
    this.props = Object.freeze({ ...props });
  }

  public getId(): UniqueId {
    return this.id;
  }

  public get propsValue(): Readonly<TProps> {
    return this.props;
  }

  public equals(entity?: Entity<TProps>): boolean {
    if (!entity) {
      return false;
    }

    return this.id.equals(entity.id);
  }

  public toJSON() {
    return {
      id: this.id.toString(),
      ...this.props,
    };
  }
}
