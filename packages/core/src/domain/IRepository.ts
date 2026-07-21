export interface IRepository<TEntity> {
  save(entity: TEntity): Promise<void>;

  delete(entity: TEntity): Promise<void>;
}
