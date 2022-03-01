import { Result } from "neverthrow";
import { FoodRegime } from "../models/Food";

export enum NewFoodRegimeError {
  INPUTS_NOT_VALID = "Inputs are not valid",
}

export interface NewFoodRegimePort {
  bio: string;
  local: string;
  redMeat: string;
  whiteMeat: string;
  errors: Record<"bio" | "local" | "redMeat" | "whiteMeat", string>;

  validate(): boolean;
  createRegime(): Result<FoodRegime, NewFoodRegimeError>;
}
