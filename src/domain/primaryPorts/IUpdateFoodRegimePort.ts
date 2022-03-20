import { Result } from "neverthrow";

export enum IUpdateFoodRegimeErrors {
  NO_VALUES_COMPUTED = "No values computed yet",
  CANT_COMPUTE_VALUES = "Can't compute values",
}

export interface IUpdateFoodRegimeCommand {
  bio: string;
  local: string;
  whiteMeat: string;
  redMeat: string;
}

export interface IUpdateFoodRegimePort {
  updateRegime(command: IUpdateFoodRegimeCommand): Promise<Result<null, IUpdateFoodRegimeErrors>>;
}
