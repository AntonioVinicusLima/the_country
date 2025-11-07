
export class PaisEntity {
  constructor(
    public readonly codigoM49: number,
    public readonly iso2: string,
    public readonly iso3: string,
    public readonly nome: {
      pt: string;
      en: string;
      es: string;
    },
    public readonly area: {
      total: number;
      unidade: string;
    },
    public readonly regiao: string,
    public readonly subRegiao: string | null,
    public readonly linguas: string[],
    public readonly capital: string,
    public readonly moeda: string,
    public readonly historico: string
  ) {}
}