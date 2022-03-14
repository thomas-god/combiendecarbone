import { err, ok, Result } from "neverthrow";
import { FoodRegime, RegimeFrequencies } from "../models/Food";
import { NewFoodRegimeError, UpdateFoodRegimePort } from "../primaryPorts/UpdateFoodRegimePort";

export enum FoodRegimeFormErrors {
  MISSING_VALUE = "Champs requis.",
  INVALID_VALUE = "Valeur invalide",
}

export class FoodRegimeForm implements UpdateFoodRegimePort {
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
    this.validateBio(value);
  }

  private validateBio(value: string) {
    this.validateValue(value)
      .map(() => (this._errors.bio = ""))
      .mapErr((error) => (this._errors.bio = error));
  }

  get local(): string {
    return this._local;
  }
  set local(value: string) {
    this._local = value;
    this.validateLocal(value);
  }

  private validateLocal(value: string) {
    this.validateValue(value)
      .map(() => (this._errors.local = ""))
      .mapErr((error) => (this._errors.local = error));
  }

  get redMeat(): string {
    return this._redMeat;
  }
  set redMeat(value: string) {
    this._redMeat = value;
    this.validateRedMeat(value);
  }

  private validateRedMeat(value: string) {
    this.validateValue(value)
      .map(() => (this._errors.redMeat = ""))
      .mapErr((error) => (this._errors.redMeat = error));
  }

  get whiteMeat(): string {
    return this._whiteMeat;
  }
  set whiteMeat(value: string) {
    this._whiteMeat = value;
    this.validateWhiteMeat(value);
  }

  private validateWhiteMeat(value: string) {
    this.validateValue(value)
      .map(() => (this._errors.whiteMeat = ""))
      .mapErr((error) => (this._errors.whiteMeat = error));
  }

  private validateValue(value: string): Result<null, FoodRegimeFormErrors> {
    if (value === "") return err(FoodRegimeFormErrors.MISSING_VALUE);
    if (!this.frequencyIsValid(value)) return err(FoodRegimeFormErrors.INVALID_VALUE);
    return ok(null);
  }

  get errors() {
    return this._errors;
  }

  validate(): boolean {
    this.validateBio(this._bio);
    this.validateLocal(this._local);
    this.validateRedMeat(this._redMeat);
    this.validateWhiteMeat(this._whiteMeat);
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

  private frequencyIsValid(freq: string): boolean {
    return RegimeFrequencies.includes(freq);
  }

  isEmpty(): boolean {
    return ![this._bio, this.local, this._redMeat, this._whiteMeat].some((value) => value !== "");
  }
}
