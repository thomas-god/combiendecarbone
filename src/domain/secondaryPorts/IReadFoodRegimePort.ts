import { Result } from "neverthrow";
import { FoodRegime } from "../models/Food";

export interface IReadFoodRegimePort {
  read(): Promise<Result<FoodRegime, string>>;
}
