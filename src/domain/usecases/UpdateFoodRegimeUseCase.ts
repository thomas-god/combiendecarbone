import { FoodAdvices, FoodGHGQuantity, FoodRegime } from "../models/Food";
import { err, ok, Result } from "neverthrow";
import {
  IUpdateFoodRegimeCommand,
  IUpdateFoodRegimeErrors,
  IUpdateFoodRegimePort,
} from "../primaryPorts/IUpdateFoodRegimePort";
import { ISaveFoodRegimePort } from "../secondaryPorts/ISaveFoodRegimePort";

export class UpdateFoodRegimeUseCase implements IUpdateFoodRegimePort {
  constructor(private readonly foodRegimeRepository: ISaveFoodRegimePort) {}

  async updateRegime(
    command: IUpdateFoodRegimeCommand
  ): Promise<Result<null, IUpdateFoodRegimeErrors>> {
    const newRegimeRes = FoodRegime.create({
      bio: command.bio,
      local: command.local,
      redMeat: command.redMeat,
      whiteMeat: command.whiteMeat,
    });

    if (newRegimeRes.isErr()) return err(IUpdateFoodRegimeErrors.CANT_COMPUTE_VALUES);

    const ghgQuantityRes = FoodGHGQuantity.create(newRegimeRes.value);
    const foodAdvices = FoodAdvices.create(newRegimeRes.value);

    if (ghgQuantityRes.isOk() && foodAdvices.isOk()) {
      await Promise.all([
        await this.foodRegimeRepository.saveRegime(newRegimeRes.value),
        await this.foodRegimeRepository.saveGHG(ghgQuantityRes.value),
        await this.foodRegimeRepository.saveAdvices(foodAdvices.value),
      ]);
      return ok(null);
    }
    return err(IUpdateFoodRegimeErrors.CANT_COMPUTE_VALUES);
  }
}
