export abstract class Failure {
  constructor(public readonly message: string) {}
}

export class ServerFailure extends Failure {
  constructor(message: string = "Erro no servidor") {
    super(message);
  }
}

export class NetworkFailure extends Failure {
  constructor(message: string = "Sem conexão com a internet") {
    super(message);
  }
}

export class NotFoundFailure extends Failure {
  constructor(message: string = "Recurso não encontrado") {
    super(message);
  }
}

export class UnexpectedFailure extends Failure {
  constructor(message: string = "Erro inesperado") {
    super(message);
  }
}
