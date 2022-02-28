import { NewFoodRegime } from "../usecases/NewFoodRegime";
import { FoodAdvices, FoodGHGQuantity, FoodRegime } from "../models/Food";
import { err, ok, Result } from "neverthrow";

export enum FoodModuleErrors {
  NO_VALUES_COMPUTED = "No values computed yet",
  CANT_COMPUTE_VALUES = "Can't compute values",
}

export class FoodModule {
  private _currentRegime?: FoodRegime = undefined;
  private _ghg: FoodGHGQuantity = FoodGHGQuantity.createEmpty();
  private _advices: FoodAdvices = FoodAdvices.createEmpty();

  get regime(): Result<FoodRegime, FoodModuleErrors> {
    if (this._currentRegime === undefined) return err(FoodModuleErrors.NO_VALUES_COMPUTED);
    return ok(this._currentRegime);
  }
  get ghgQuantity(): FoodGHGQuantity {
    return this._ghg;
  }
  get advices(): FoodAdvices {
    return this._advices;
  }

  updateRegime(newFoodRegime: NewFoodRegime): Result<null, FoodModuleErrors> {
    const newRegimeRes = newFoodRegime.createRegime();

    if (newRegimeRes.isErr()) return err(FoodModuleErrors.CANT_COMPUTE_VALUES);

    const ghgQuantityRes = FoodGHGQuantity.create(newRegimeRes.value);
    const foodAdvices = FoodAdvices.create(newRegimeRes.value);

    if (ghgQuantityRes.isOk() && foodAdvices.isOk()) {
      this._currentRegime = newRegimeRes.value;
      this._ghg = ghgQuantityRes.value;
      this._advices = foodAdvices.value;
      return ok(null);
    }
    return err(FoodModuleErrors.CANT_COMPUTE_VALUES);
  }

  private reset() {
    this._currentRegime = undefined;
    this._ghg = FoodGHGQuantity.createEmpty();
    this._advices = FoodAdvices.createEmpty();
  }
}
