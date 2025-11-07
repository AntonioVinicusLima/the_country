import { HttpClient } from '../../../infrastructure/http/http_client';
import { API_BASE_URL } from '../../../shared/constants/api_constants';
import {PaisModel, PaisModelJson} from '../../models/pais_model'
import { PaisRemoteDataSource } from '../../datasources/remote/pais_remote_data_source';

export class PaisRemoteDataSourceImpl implements PaisRemoteDataSource {
  constructor(private httpClient: HttpClient) {}

  async fetchAllCountries(): Promise<PaisModel[]> {
    // DataSource lança exceções (não usa Result)
    const response = await this.httpClient.get<PaisModelJson[]>(
      `${API_BASE_URL}/paises`
    );
    return PaisModel.fromJsonList(response.data);
  }

  async fetchCountryById(id: string): Promise<PaisModel> {
    // DataSource lança exceções (não usa Result)
    const response = await this.httpClient.get<PaisModelJson>(
      `${API_BASE_URL}/paises/${id}`
    );
    return PaisModel.fromJson(response.data);
  }
}