import { FoodRegimeForm } from "../usecases/FoodRegimeForm";
import { FoodAdvices, FoodGHGQuantity, FoodRegime } from "../models/Food";
import { err, ok, Result } from "neverthrow";
import { FoodModuleErrors, FoodModulePort } from "../primaryPorts/FoodModulePort";

export class FoodModule implements FoodModulePort {
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

  updateRegime(foodRegimeForm: FoodRegimeForm): Result<null, FoodModuleErrors> {
    const newRegimeRes = foodRegimeForm.createRegime();

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
}
