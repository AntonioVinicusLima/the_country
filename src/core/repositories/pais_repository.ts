import { Failure } from "../../shared/errors/failures";
import { Result } from "../../shared/utils/result";
import { PaisEntity } from "../entities/pais_entity";

export interface PaisRepository {
  getAllCountries(): Promise<Result<Failure, PaisEntity[]>>;

  getCountryById(id: string): Promise<Result<Failure,PaisEntity>>;
}