import { PaisEntity } from "../../core/entities/pais_entity";
import { GetAllPaisesUseCase } from "../../core/usecases/get_all_paises_usecase";
import { GetPaisByIdUseCase } from "../../core/usecases/get_paise_by_id_usecase";
import { Failure } from "../../shared/errors/failures";
import { Result } from "../../shared/utils/result";

export class PaisController {
    constructor(
        private getAllPaisesUseCase: GetAllPaisesUseCase,
        private getPaisByIdUseCase: GetPaisByIdUseCase,
    ) { }

    async loadAllPaises(): Promise<Result<Failure, PaisEntity[]>> {
        return await this.getAllPaisesUseCase.call();
    }

    async loadPaisById(id: string): Promise<Result<Failure, PaisEntity>> {
        return await this.getPaisByIdUseCase.call(id);
    }
}