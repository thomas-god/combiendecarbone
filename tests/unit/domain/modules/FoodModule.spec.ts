import { FoodAdvices, FoodGHGQuantity } from "@/domain/models/Food";
import { FoodModule, FoodModuleErrors } from "@/domain/modules/FoodModule";
import { NewFoodRegime } from "@/domain/usecases/NewFoodRegime";

describe("FoodModule", () => {
  it("should initiate FoodModule", () => {
    const foodModule = new FoodModule();
    expect(foodModule.ghgQuantity.equals(FoodGHGQuantity.createEmpty())).toBeTruthy();
    expect(foodModule.advices.equals(FoodAdvices.createEmpty())).toBeTruthy();
    if (foodModule.regime.isOk()) throw new Error("should error");
    foodModule.regime.mapErr((error) => {
      expect(error).toEqual(FoodModuleErrors.NO_VALUES_COMPUTED);
    });
  });

  it("should update with a new regime", () => {
    const foodModule = new FoodModule();
    const newRegime = new NewFoodRegime();
    newRegime.bio = "Jamais";
    newRegime.local = "1-2 fois par semaine";
    newRegime.redMeat = "1 fois par jour";
    newRegime.whiteMeat = "A tous les repas";

    expect(foodModule.updateRegime(newRegime).isOk()).toBeTruthy();
    expect(foodModule.advices.props.foodAdviceComponents).toStrictEqual([
      {
        name: "EcogesteAlimentation",
        props: { palier: 1 },
      },
    ]);
    expect(foodModule.ghgQuantity.props.totalGHGQuantity).toEqual(3239);
    expect(foodModule.ghgQuantity.props.foodItems).toStrictEqual([
      {
        category: "Alimentation",
        label: "Alimentaire hors viande",
        value: 655,
      },
      {
        category: "Alimentation",
        label: "Viande rouge",
        value: 1856,
      },
      {
        category: "Alimentation",
        label: "Viande blanche",
        value: 728,
      },
    ]);
    expect(foodModule.regime.isOk()).toBeTruthy()
  });
});
