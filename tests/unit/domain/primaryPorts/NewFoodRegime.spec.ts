import { FoodRegime } from "@/domain/models/Food";
import { NewFoodRegime } from "@/domain/usecases/NewFoodRegime";

describe("NewFoodRegime primary port", () => {
  it("should not accept invalid value for bio", () => {
    const newRegime = new NewFoodRegime();
    newRegime.bio = "toto";
    expect(newRegime.bio).toBe("");
    expect(newRegime.errors.bio).toBe("Invalid value");
    expect(newRegime.validate()).toBeFalsy();
    expect(newRegime.createRegime().isErr()).toBeTruthy();
  });

  it("should not accept invalid value for local", () => {
    const newRegime = new NewFoodRegime();
    newRegime.local = "toto";
    expect(newRegime.local).toBe("");
    expect(newRegime.errors.local).toBe("Invalid value");
    expect(newRegime.validate()).toBeFalsy();
    expect(newRegime.createRegime().isErr()).toBeTruthy();
  });

  it("should not accept invalid value for redMeat", () => {
    const newRegime = new NewFoodRegime();
    newRegime.redMeat = "toto";
    expect(newRegime.redMeat).toBe("");
    expect(newRegime.errors.redMeat).toBe("Invalid value");
    expect(newRegime.validate()).toBeFalsy();
    expect(newRegime.createRegime().isErr()).toBeTruthy();
  });

  it("should not accept invalid value for whiteMeat", () => {
    const newRegime = new NewFoodRegime();
    newRegime.whiteMeat = "toto";
    expect(newRegime.whiteMeat).toBe("");
    expect(newRegime.errors.whiteMeat).toBe("Invalid value");
    expect(newRegime.validate()).toBeFalsy();
    expect(newRegime.createRegime().isErr()).toBeTruthy();
  });

  it("should not reset error msg if value is corrected after initial error", () => {
    const newRegime = new NewFoodRegime();
    newRegime.whiteMeat = "toto";
    expect(newRegime.whiteMeat).toBe("");
    expect(newRegime.errors.whiteMeat).toBe("Invalid value");
    expect(newRegime.validate()).toBeFalsy();
    expect(newRegime.createRegime().isErr()).toBeTruthy();

    newRegime.whiteMeat = "Jamais";
    expect(newRegime.whiteMeat).toBe("Jamais");
    expect(newRegime.errors.whiteMeat).toBe("");
  });

  it("should not validate with wrong/missing values", () => {
    const newRegime = new NewFoodRegime();
    expect(newRegime.validate()).toBeFalsy();
  });

  it("should validate when good values are supplied", () => {
    const newRegime = new NewFoodRegime();
    newRegime.bio = "Jamais";
    newRegime.local = "1-2 fois par semaine";
    newRegime.redMeat = "1 fois par jour";
    newRegime.whiteMeat = "A tous les repas";

    expect(newRegime.validate()).toBeTruthy();
  });

  it("should create a FoodRegime when good values are supplied", () => {
    const newRegime = new NewFoodRegime();
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
});
