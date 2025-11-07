// infrastructure/di/injector.ts
import { HttpClient, HttpClientImpl } from "../http/http_client";
import { PaisRemoteDataSource } from "../../data/datasources/remote/pais_remote_data_source";
import { PaisRepository } from "../../core/repositories/pais_repository";
import { GetAllPaisesUseCase } from "../../core/usecases/get_all_paises_usecase";
import { GetPaisByIdUseCase } from "../../core/usecases/get_paise_by_id_usecase";
import { PaisRemoteDataSourceImpl } from "../../data/datasources_impl/remote/pais_remote_data_source_impl";
import { PaisRemoteRepositoryImpl } from "../../data/repositories/pais_repository_impl";
import { PaisController } from "../../presentation/controllers/pais_controller";

export class Injector {
  private static instance: Injector;

  private httpClient: HttpClient;
  private paisRemoteDataSource: PaisRemoteDataSource;
  private paisRepository: PaisRepository;
  private _getAllCountriesUseCase: GetAllPaisesUseCase;
  private _getCountryByIdUseCase: GetPaisByIdUseCase;
  private _paisController: PaisController;

  private constructor() {
    // HttpClient
    this.httpClient = new HttpClientImpl();

    // DataSource
    this.paisRemoteDataSource = new PaisRemoteDataSourceImpl(
      this.httpClient
    );

    // Repository
    this.paisRepository = new PaisRemoteRepositoryImpl(
      this.paisRemoteDataSource
    );

    // UseCases
    this._getAllCountriesUseCase = new GetAllPaisesUseCase(
      this.paisRepository
    );

    this._getCountryByIdUseCase = new GetPaisByIdUseCase(
      this.paisRepository
    );

    // Controller
    this._paisController = new PaisController(
      this._getAllCountriesUseCase,
      this._getCountryByIdUseCase
    );
  }

  static getInstance(): Injector {
    if (!Injector.instance) {
      Injector.instance = new Injector();
    }
    return Injector.instance;
  }

  get getAllCountriesUseCase(): GetAllPaisesUseCase {
    return this._getAllCountriesUseCase;
  }

  get getCountryByIdUseCase(): GetPaisByIdUseCase {
    return this._getCountryByIdUseCase;
  }

  get paisController(): PaisController {
    return this._paisController;
  }
}

// Singleton instance exportada
export const injector = Injector.getInstance();