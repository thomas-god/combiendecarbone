import { Result } from "neverthrow";
import { FoodAdvices, FoodGHGQuantity, FoodRegime } from "../models/Food";
import { NewFoodRegimePort } from "./NewFoodRegimePort";

export enum FoodModuleErrors {
  NO_VALUES_COMPUTED = "No values computed yet",
  CANT_COMPUTE_VALUES = "Can't compute values",
}

export interface FoodModulePort {
  readonly regime: Result<FoodRegime, FoodModuleErrors>;
  readonly ghgQuantity: FoodGHGQuantity;
  readonly advices: FoodAdvices;

  updateRegime(newFoodRegime: NewFoodRegimePort): Result<null, FoodModuleErrors>;
}
