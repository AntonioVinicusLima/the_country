import { PaisRepository } from "../repositories/pais_repository";
import { PaisEntity } from "../entities/pais_entity";
import { Failure } from "../../shared/errors/failures";
import { Result } from "../../shared/utils/result";

export class GetPaisByIdUseCase {
  constructor(private paisRepository: PaisRepository) {}

  async call(countryId: string): Promise<Result<Failure, PaisEntity>> {
    return await this.paisRepository.getCountryById(countryId);
  }
}