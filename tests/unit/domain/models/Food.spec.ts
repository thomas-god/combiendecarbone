import {
  FoodAdvices,
  FoodGHGQuantity,
  FoodRegime,
  FoodRegimeError,
  FoodRegimeProps,
} from "@/domain/models/Food";

const foodRegime = {
  bio: "Jamais",
  local: "Jamais",
  redMeat: "Jamais",
  whiteMeat: "Jamais",
};

describe("FoodRegime valueObject", () => {
  it("should create a FoodRegime when props are ok", () => {
    const regimeRes = FoodRegime.create(foodRegime);
    expect(regimeRes.isOk()).toBeTruthy();
    regimeRes.map((value) => {
      expect(value).toEqual(new FoodRegime(foodRegime as FoodRegimeProps));
    });
  });

  it("should return err for invalid bio value", () => {
    const regimeRes = FoodRegime.create({ ...foodRegime, bio: "toto" });
    expect(regimeRes.isErr()).toBeTruthy();
    regimeRes.mapErr((error) => {
      expect(error).toBe(FoodRegimeError.INVALID_BIO);
    });
  });

  it("should return err for invalid local value", () => {
    const regimeRes = FoodRegime.create({ ...foodRegime, local: "toto" });
    expect(regimeRes.isErr()).toBeTruthy();
    regimeRes.mapErr((error) => {
      expect(error).toBe(FoodRegimeError.INVALID_LOCAL);
    });
  });

  it("should return err for invalid redMeat value", () => {
    const regimeRes = FoodRegime.create({ ...foodRegime, redMeat: "toto" });
    expect(regimeRes.isErr()).toBeTruthy();
    regimeRes.mapErr((error) => {
      expect(error).toBe(FoodRegimeError.INVALID_RED_MEAT);
    });
  });

  it("should return err for invalid whiteMeat value", () => {
    const regimeRes = FoodRegime.create({ ...foodRegime, whiteMeat: "toto" });
    expect(regimeRes.isErr()).toBeTruthy();
    regimeRes.mapErr((error) => {
      expect(error).toBe(FoodRegimeError.INVALID_WHITE_MEAT);
    });
  });
});

describe("FoodGHGQuantity valueObject", () => {
  it("should create a FoodGHGQuantity for a valid regime", () => {
    const regimeRes = FoodRegime.create(foodRegime);
    if (regimeRes.isErr()) throw new Error("should error");
    const ghgQtyRes = FoodGHGQuantity.create(regimeRes.value);
    if (ghgQtyRes.isErr()) throw new Error("should error");
    expect(ghgQtyRes.value).toStrictEqual(
      new FoodGHGQuantity({
        foodItems: [
          {
            category: "Alimentation",
            label: "Alimentaire hors viande",
            value: 655,
          },
          {
            category: "Alimentation",
            label: "Viande rouge",
            value: 0,
          },
          {
            category: "Alimentation",
            label: "Viande blanche",
            value: 0,
          },
        ],
        totalGHGQuantity: 655,
      })
    );
  });

  it("should create an empty ValueObject", () => {
    const ghgQuantity = FoodGHGQuantity.createEmpty();
    expect(ghgQuantity.props.foodItems).toStrictEqual([]);
    expect(ghgQuantity.props.totalGHGQuantity).toBe(0);
  });
});

describe("FoodAdvices valueObject", () => {
  it("Should return an advice for a given regime", () => {
    const regimeRes = FoodRegime.create(foodRegime);
    if (regimeRes.isErr()) throw new Error("should error");
    const foodAdviceRes = FoodAdvices.create(regimeRes.value);
    if (foodAdviceRes.isErr()) throw new Error("should error");
    expect(foodAdviceRes.value).toStrictEqual(
      new FoodAdvices({
        foodAdviceComponents: [{ name: "EcogesteAlimentation", props: { palier: 4 } }],
      })
    );
  });

  it("should create an empty ValueObject", () => {
    const adivces = FoodAdvices.createEmpty();
    expect(adivces.props.foodAdviceComponents).toStrictEqual([]);
  });
});
