import { err, ok, Result } from "neverthrow";
import { FoodRegime, RegimeFrequencies } from "../models/Food";
import { NewFoodRegimeError, NewFoodRegimePort } from "../primaryPorts/NewFoodRegimePort";

export class NewFoodRegime implements NewFoodRegimePort {
  private _bio: string = "";
  private _local: string = "";
  private _redMeat: string = "";
  private _whiteMeat: string = "";
  private _errors = {
    bio: "",
    local: "",
    redMeat: "",
    whiteMeat: "",
  };

  get bio(): string {
    return this._bio;
  }
  get local(): string {
    return this._local;
  }
  get redMeat(): string {
    return this._redMeat;
  }
  get whiteMeat(): string {
    return this._whiteMeat;
  }
  get errors() {
    return this._errors;
  }

  set bio(value: string) {
    if (!NewFoodRegime.frequencyIsValid(value)) {
      this._errors.bio = "Invalid value";
      return;
    }
    this._bio = value;
    this._errors.bio = "";
  }

  set local(value: string) {
    if (!NewFoodRegime.frequencyIsValid(value)) {
      this._errors.local = "Invalid value";
      return;
    }
    this._local = value;
    this._errors.local = "";
  }

  set redMeat(value: string) {
    if (!NewFoodRegime.frequencyIsValid(value)) {
      this._errors.redMeat = "Invalid value";
      return;
    }
    this._redMeat = value;
    this._errors.redMeat = "";
  }

  set whiteMeat(value: string) {
    if (!NewFoodRegime.frequencyIsValid(value)) {
      this._errors.whiteMeat = "Invalid value";
      return;
    }
    this._whiteMeat = value;
    this._errors.whiteMeat = "";
  }

  validate(): boolean {
    const newRegimeRes = FoodRegime.create({
      bio: this._bio,
      local: this._local,
      redMeat: this._redMeat,
      whiteMeat: this._whiteMeat,
    });
    if (newRegimeRes.isOk()) return true;
    return false;
  }

  createRegime(): Result<FoodRegime, NewFoodRegimeError> {
    const newRegimeRes = FoodRegime.create({
      bio: this._bio,
      local: this._local,
      redMeat: this._redMeat,
      whiteMeat: this._whiteMeat,
    });
    if (newRegimeRes.isOk()) return ok(newRegimeRes.value);
    return err(NewFoodRegimeError.INPUTS_NOT_VALID);
  }

  private static frequencyIsValid(freq: string): boolean {
    return RegimeFrequencies.includes(freq);
  }
}
