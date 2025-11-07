import { PaisRepository } from "../repositories/pais_repository";
import { PaisEntity } from "../entities/pais_entity";
import { Result } from "../../shared/utils/result";
import { Failure } from "../../shared/errors/failures";

export class GetAllPaisesUseCase {
  constructor(private countryRepository: PaisRepository) { }

  async call(): Promise<Result<Failure, PaisEntity[]>> {
    return await this.countryRepository.getAllCountries()
  }
}
