export interface Repository<T> {
  findById(id: string): Promise<T | null>;
  exists(t: T): Promise<boolean>;
  save(t: T): Promise<T>;
}
