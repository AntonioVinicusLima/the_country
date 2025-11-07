import {PaisModel} from '../../models/pais_model'

export interface PaisRemoteDataSource {
  fetchAllCountries(): Promise<PaisModel[]>;
  fetchCountryById(id: string): Promise<PaisModel>;
}
