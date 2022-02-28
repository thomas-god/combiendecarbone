import { FoodAdvices, FoodGHGQuantity } from "@/domain/models/Food";
import { FoodModule, FoodModuleErrors } from "@/domain/modules/FoodModule";

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
});
