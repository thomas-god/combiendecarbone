import { Result } from "neverthrow";
import { FoodRegime } from "../models/Food";

export enum IReadFoodRegimePortErrors {
  NO_REGIME = "No regime found",
}

export interface IReadFoodRegimePort {
  read(): Promise<Result<FoodRegime, IReadFoodRegimePortErrors>>;
}
