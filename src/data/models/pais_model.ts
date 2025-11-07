import { PaisEntity } from "../../core/entities/pais_entity";

export class PaisModel {
  readonly id: PaisModelId;
  readonly nome: PaisModelNome;
  readonly area: PaisModelArea;
  readonly localizacao: PaisModelLocalizacao;
  readonly linguas: PaisModelLingua[];
  readonly governo: PaisModelGoverno;
  readonly unidadesMonetarias: PaisModelMoeda[];
  readonly historico: string;

  constructor(
    id: PaisModelId,
    nome: PaisModelNome,
    area: PaisModelArea,
    localizacao: PaisModelLocalizacao,
    linguas: PaisModelLingua[],
    governo: PaisModelGoverno,
    unidadesMonetarias: PaisModelMoeda[],
    historico: string
  ) {
    this.id = id;
    this.nome = nome;
    this.area = area;
    this.localizacao = localizacao;
    this.linguas = linguas;
    this.governo = governo;
    this.unidadesMonetarias = unidadesMonetarias;
    this.historico = historico;
  }

  static fromJson(json: PaisModelJson): PaisModel {
    return new PaisModel(
      json.id,
      json.nome,
      json.area,
      json.localizacao,
      json.linguas,
      json.governo,
      json["unidades-monetarias"],
      json.historico
    );
  }

  static fromJsonList(jsonList: PaisModelJson[]): PaisModel[] {
    return jsonList.map(json => PaisModel.fromJson(json));
  }

  toEntity(): PaisEntity {
    const codigoM49 = this.id.M49;
    const iso2 = this.id["ISO-3166-1-ALPHA-2"];
    const iso3 = this.id["ISO-3166-1-ALPHA-3"];

    const nomeFormatado = {
      pt: this.nome.abreviado,
      en: this.nome["abreviado-EN"],
      es: this.nome["abreviado-ES"],
    };

    const areaTotal = this._parseArea(this.area.total);
    const areaUnidade = this.area.unidade.símbolo;

    const regiao = this.localizacao.regiao.nome;
    const subRegiao = this.localizacao["sub-regiao"]?.nome ?? null;

    const linguas = this.linguas.map(lingua => lingua.nome);

    const capital = this.governo.capital.nome;

    const moeda = this.unidadesMonetarias.length > 0
      ? this.unidadesMonetarias[0].nome
      : "Desconhecida";

    return new PaisEntity(
      codigoM49,
      iso2,
      iso3,
      nomeFormatado,
      { total: areaTotal, unidade: areaUnidade },
      regiao,
      subRegiao,
      linguas,
      capital,
      moeda,
      this.historico
    );
  }

  private _parseArea(areaString: string): number {
    const normalized = areaString.replace(/\./g, '').replace(',', '.');
    return Number(normalized);
  }
}


interface PaisModelId {
  M49: number;
  "ISO-3166-1-ALPHA-2": string;
  "ISO-3166-1-ALPHA-3": string;
}

interface PaisModelNome {
  abreviado: string;
  "abreviado-EN": string;
  "abreviado-ES": string;
}

interface PaisModelArea {
  total: string;
  unidade: {
    nome: string;
    símbolo: string;
    multiplicador: number;
  };
}

interface RegiaoBase {
  id: { M49: number };
  nome: string;
}

interface PaisModelLocalizacao {
  regiao: RegiaoBase;
  "sub-regiao": RegiaoBase | null;
  "regiao-intermediaria": RegiaoBase | null;
}

interface PaisModelLingua {
  id: {
    "ISO-639-1": string;
    "ISO-639-2": string;
  };
  nome: string;
}

interface PaisModelGoverno {
  capital: {
    nome: string;
  };
}

interface PaisModelMoeda {
  id: {
    "ISO-4217-ALPHA": string;
    "ISO-4217-NUMERICO": string;
  };
  nome: string;
}

export interface PaisModelJson {
  id: PaisModelId;
  nome: PaisModelNome;
  area: PaisModelArea;
  localizacao: PaisModelLocalizacao;
  linguas: PaisModelLingua[];
  governo: PaisModelGoverno;
  "unidades-monetarias": PaisModelMoeda[];
  historico: string;
}