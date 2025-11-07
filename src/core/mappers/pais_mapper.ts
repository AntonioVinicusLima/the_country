import { PaisEntity } from "../entities/pais_entity";
import { PaisModel } from "../../data/models/pais_model";

export class PaisMapper {
  static toEntity(model: PaisModel): PaisEntity {
    return new PaisEntity(
      model.id.M49,
      model.id["ISO-3166-1-ALPHA-2"],
      model.id["ISO-3166-1-ALPHA-3"],
      {
        pt: model.nome.abreviado,
        en: model.nome["abreviado-EN"],
        es: model.nome["abreviado-ES"],
      },
      {
        total: Number(model.area.total),
        unidade: model.area.unidade.símbolo,
      },
      model.localizacao.regiao.nome,
      model.localizacao["sub-regiao"]?.nome ?? null,
      model.linguas.map((l) => l.nome),
      model.governo.capital.nome,
      model["unidades-monetarias"][0]?.nome ?? "Desconhecida",
      model.historico
    );
  }
}
