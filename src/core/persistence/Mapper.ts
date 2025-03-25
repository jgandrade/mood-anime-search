export abstract class Mapper<DomainModel, PersistenceModel> {
  abstract toPersistence(entity: DomainModel): PersistenceModel;

  abstract toDomain(raw: PersistenceModel): DomainModel;
}
