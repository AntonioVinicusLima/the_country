import { HttpClient } from "../../infrastructure/http/http_client";
import { PaisRepository } from "../../core/repositories/pais_repository";
import { PaisEntity } from "../../core/entities/pais_entity";
import { PaisRemoteDataSource } from "../datasources/remote/pais_remote_data_source";
import { PaisModel } from "../models/pais_model";
import { Result, left, right, handleError } from "../../shared/utils/result";
import { Failure } from "../../shared/errors/failures";


export class PaisRemoteRepositoryImpl implements PaisRepository {
    constructor(private remoteDataSource: PaisRemoteDataSource) { }

    async getAllCountries(): Promise<Result<Failure, PaisEntity[]>> {
        try {
            const models: PaisModel[] = await this.remoteDataSource.fetchAllCountries();
            const entities = models.map(model => model.toEntity());
            return right(entities);
        } catch (error) {
            return left(handleError(error))
        }

    }

    async getCountryById(id: string): Promise<Result<Failure, PaisEntity>> {
        try {
            const model: PaisModel = await this.remoteDataSource.fetchCountryById(id);
            const entities = model.toEntity();
            return right(entities)
        } catch (error) {
            return left(handleError(error));
        }
    }

}
