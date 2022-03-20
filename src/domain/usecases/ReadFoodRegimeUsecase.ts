import { Result } from "neverthrow";
import { FoodRegime } from "../models/Food";
import { IReadFoodRegimePort, IReadFoodRegimePortErrors } from "../primaryPorts/IReadFoodRegimePort";
import { IReadFoodRegimePort as IReadFoodRegimeSecondaryPort} from "../secondaryPorts/IReadFoodRegimePort";

export class ReadFoodRegimeUsecase implements IReadFoodRegimePort {
  constructor(private readonly foodRegimeRepository: IReadFoodRegimeSecondaryPort) {};

  async read(): Promise<Result<FoodRegime, IReadFoodRegimePortErrors>> {
    const foodRegimeRes = await this.foodRegimeRepository.read();
    return foodRegimeRes.mapErr(() => IReadFoodRegimePortErrors.NO_REGIME);
  }
}
