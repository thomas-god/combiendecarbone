import { Result } from "neverthrow";
import { FoodAdvices, FoodGHGQuantity, FoodRegime } from "../models/Food";

export interface ISaveFoodRegimeErrors {}

export interface ISaveFoodRegimePort {
  saveRegime(newRegime: FoodRegime): Promise<Result<null, ISaveFoodRegimeErrors>>;
  saveGHG(newGHG: FoodGHGQuantity): Promise<Result<null, ISaveFoodRegimeErrors>>;
  saveAdvices(newAdvices: FoodAdvices): Promise<Result<null, ISaveFoodRegimeErrors>>;
}
