import { err, ok, Result } from "neverthrow";
import { FoodRegime, RegimeFrequencies } from "../models/Food";
import { NewFoodRegimeError, NewFoodRegimePort } from "../primaryPorts/NewFoodRegimePort";

export class NewFoodRegime implements NewFoodRegimePort {
  private _bio = "";
  private _local = "";
  private _redMeat = "";
  private _whiteMeat = "";
  private _errors = {
    bio: "",
    local: "",
    redMeat: "",
    whiteMeat: "",
  };

  get bio(): string {
    return this._bio;
  }
  set bio(value: string) {
    this._bio = value;
    if (!NewFoodRegime.frequencyIsValid(value)) {
      this._errors.bio = "Invalid value";
      return;
    }
    this._errors.bio = "";
  }

  get local(): string {
    return this._local;
  }
  set local(value: string) {
    this._local = value;
    if (!NewFoodRegime.frequencyIsValid(value)) {
      this._errors.local = "Invalid value";
      return;
    }
    this._errors.local = "";
  }

  get redMeat(): string {
    return this._redMeat;
  }
  set redMeat(value: string) {
    this._redMeat = value;
    if (!NewFoodRegime.frequencyIsValid(value)) {
      this._errors.redMeat = "Invalid value";
      return;
    }
    this._errors.redMeat = "";
  }

  get whiteMeat(): string {
    return this._whiteMeat;
  }
  set whiteMeat(value: string) {
    this._whiteMeat = value;
    if (!NewFoodRegime.frequencyIsValid(value)) {
      this._errors.whiteMeat = "Invalid value";
      return;
    }
    this._errors.whiteMeat = "";
  }

  get errors() {
    return this._errors;
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

  isEmpty(): boolean {
    return ![this._bio, this.local, this._redMeat, this._whiteMeat].some((value) => value !== "");
  }
}
