import { FoodRegime } from "@/domain/models/Food";
import { IReadFoodRegimePortErrors } from "@/domain/primaryPorts/IReadFoodRegimePort";
import { ReadFoodRegimeUsecase } from "@/domain/usecases/ReadFoodRegimeUsecase";
import { err, ok } from "neverthrow";

const foodRegimeRepository = {
  read: jest.fn(),
};

describe("Read food regime usecase", () => {
  it("should return err if no regime is found", async () => {
    const usecase = new ReadFoodRegimeUsecase(foodRegimeRepository);
    foodRegimeRepository.read.mockResolvedValue(err("toto"));

    const readRes = await usecase.read();
    if (readRes.isOk()) throw new Error("should error");
    expect(readRes.error).toEqual(IReadFoodRegimePortErrors.NO_REGIME);
  });

  it("should return the regime", async () => {
    const usecase = new ReadFoodRegimeUsecase(foodRegimeRepository);
    foodRegimeRepository.read.mockResolvedValue(
      ok(
        new FoodRegime({
          bio: "Jamais",
          local: "1-2 fois par semaine",
          redMeat: "1 fois par jour",
          whiteMeat: "A tous les repas",
        })
      )
    );

    const readRes = await usecase.read();
    if (readRes.isErr()) throw new Error("should not error");
    expect(
      readRes.value.equals(
        new FoodRegime({
          bio: "Jamais",
          local: "1-2 fois par semaine",
          redMeat: "1 fois par jour",
          whiteMeat: "A tous les repas",
        })
      )
    ).toBeTruthy();
  });
});
