import { Failure, NetworkFailure, NotFoundFailure, ServerFailure, UnexpectedFailure } from "../errors/failures";

export type Result<L, R> = Left<L> | Right<R>;

export class Left<L> {
    readonly value: L;
    readonly isFailure = true;
    readonly isSuccess = false;

    constructor(value: L) {
        this.value = value;
    }

    fold<T>(leftFn: (left: L) => T, _rightFn: (right: never) => T): T {
        return leftFn(this.value);
    }
}

export class Right<R> {
    readonly value: R;
    readonly isFailure = false;
    readonly isSuccess = true;

    constructor(value: R) {
        this.value = value;
    }

    fold<T>(_leftFn: (left: never) => T, rightFn: (right: R) => T): T {
        return rightFn(this.value)
    }
}

export function left<L>(value: L): Left<L> {
  return new Left(value);
}

export function right<R>(value: R): Right<R> {
  return new Right(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function  handleError(error: any): Failure {
    if (error.code === "ERR_NETWORK" || !error.response) {
        return new NetworkFailure();
    }

    if (error.response?.status >= 500) {
        return new ServerFailure();
    }

    if (error.response?.status === 404) {
        return new NotFoundFailure();
    }

    return new UnexpectedFailure(error.message);

}

