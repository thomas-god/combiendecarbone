import { FoodRegime } from "@/domain/models/Food";
import { FoodRegimeForm, FoodRegimeFormErrors } from "@/domain/usecases/FoodRegimeForm";

const regimeFields: any[] = ["bio", "local", "redMeat", "whiteMeat"];

describe("NewFoodRegime primary port", () => {
  regimeFields.forEach((field) => {
    it(`should display ${field} error msg for invalid value`, () => {
      const newRegime = new FoodRegimeForm();
      (newRegime[field as keyof FoodRegimeForm] as string) = "toto";
      expect(newRegime[field as keyof FoodRegimeForm]).toBe("toto");
      expect(newRegime.errors[field as keyof typeof newRegime.errors]).toBe(
        FoodRegimeFormErrors.INVALID_VALUE
      );
      expect(newRegime.validate()).toBeFalsy();
      expect(newRegime.createRegime().isErr()).toBeTruthy();
    });
  });

  regimeFields.forEach((field) => {
    it(`should display ${field} error msg for empty value, but not a start`, () => {
      const newRegime = new FoodRegimeForm();
      expect(newRegime[field as keyof FoodRegimeForm]).toBe("");
      expect(newRegime.errors.bio).toBe("");

      (newRegime[field as keyof FoodRegimeForm] as string) = "";
      expect(newRegime[field as keyof FoodRegimeForm]).toBe("");
      expect(newRegime.errors[field as keyof typeof newRegime.errors]).toBe(
        FoodRegimeFormErrors.MISSING_VALUE
      );
      expect(newRegime.validate()).toBeFalsy();
      expect(newRegime.createRegime().isErr()).toBeTruthy();
    });
  });

  it("should not validate with wrong/missing values", () => {
    const newRegime = new FoodRegimeForm();
    expect(newRegime.validate()).toBeFalsy();
  });

  it("should validate when good values are supplied", () => {
    const newRegime = new FoodRegimeForm();
    newRegime.bio = "Jamais";
    newRegime.local = "1-2 fois par semaine";
    newRegime.redMeat = "1 fois par jour";
    newRegime.whiteMeat = "A tous les repas";

    expect(newRegime.validate()).toBeTruthy();
  });

  it("should create a FoodRegime when good values are supplied", () => {
    const newRegime = new FoodRegimeForm();
    newRegime.bio = "Jamais";
    newRegime.local = "1-2 fois par semaine";
    newRegime.redMeat = "1 fois par jour";
    newRegime.whiteMeat = "A tous les repas";

    const foodRegimeRes = newRegime.createRegime();
    if (!foodRegimeRes.isOk()) throw new Error("error");
    expect(foodRegimeRes.value).toStrictEqual(
      new FoodRegime({
        bio: "Jamais",
        local: "1-2 fois par semaine",
        redMeat: "1 fois par jour",
        whiteMeat: "A tous les repas",
      })
    );
  });

  it("should have a isEmpty method", () => {
    const newRegime = new FoodRegimeForm();
    expect(newRegime.isEmpty()).toBeTruthy();
    newRegime.bio = "Jamais";
    expect(newRegime.isEmpty()).toBeFalsy();
  });
});
