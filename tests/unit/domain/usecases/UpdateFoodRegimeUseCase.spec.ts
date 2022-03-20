import { FoodAdvices, FoodGHGQuantity, FoodRegime } from "@/domain/models/Food";
import { UpdateFoodRegimeUseCase } from "@/domain/usecases/UpdateFoodRegimeUseCase";

const foodRegimeRepository = {
  saveRegime: jest.fn(),
  saveGHG: jest.fn(),
  saveAdvices: jest.fn(),
};

describe("UpdateFoodRegimeUseCase", () => {
  it("should update with a new regime", async () => {
    const foodModule = new UpdateFoodRegimeUseCase(foodRegimeRepository);
    const newRegime = {
      bio: "Jamais",
      local: "1-2 fois par semaine",
      redMeat: "1 fois par jour",
      whiteMeat: "A tous les repas",
    };

    const updateRegimeRes = await foodModule.updateRegime(newRegime);

    expect(updateRegimeRes.isOk()).toBeTruthy();
    expect(foodRegimeRepository.saveRegime).toBeCalledWith(
      new FoodRegime({
        bio: "Jamais",
        local: "1-2 fois par semaine",
        redMeat: "1 fois par jour",
        whiteMeat: "A tous les repas",
      })
    );
    expect(foodRegimeRepository.saveAdvices).toBeCalledWith(
      new FoodAdvices({
        foodAdviceComponents: [
          {
            name: "EcogesteAlimentation",
            props: { palier: 1 },
          },
        ],
      })
    );

    expect(foodRegimeRepository.saveGHG).toBeCalledWith(
      new FoodGHGQuantity({
        totalGHGQuantity: 3239,
        foodItems: [
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
        ],
      })
    );
  });
});
