import { Result, ok, err } from "neverthrow";
import { ComponentEcogeste, GESItem } from "./Ges";
import { ValueObject } from "./ValueObject";

const BIO_DISCOUNT = 0.0;
const LOCAL_DISCOUNT = 0.0;
const NB_WEEKS = 52;
const MEAL_WITHOUT_MEAT = 0.9;
const MEAL_WITH_RED_MEAT = 6 - 0.9;
const MEAL_WITH_WHITE_MEAT = 1.9 - 0.9;
const CURRENT_CATEGORY = "Alimentation";

type RegimeFrequency = "Jamais" | "1-2 fois par semaine" | "1 fois par jour" | "A tous les repas";

const RegimeFrequencyMap: Record<RegimeFrequency, number> = {
  Jamais: 0,
  "1-2 fois par semaine": 2,
  "1 fois par jour": 7,
  "A tous les repas": 14,
};

export const RegimeFrequencies = Object.keys(RegimeFrequencyMap);

export interface FoodRegimeProps {
  bio: RegimeFrequency;
  local: RegimeFrequency;
  redMeat: RegimeFrequency;
  whiteMeat: RegimeFrequency;
}

export interface CreateFoodRegimeProps {
  bio: string;
  local: string;
  redMeat: string;
  whiteMeat: string;
}

export enum FoodRegimeError {
  INVALID_BIO = "Invalid value for `bio`",
  INVALID_LOCAL = "Invalid value for `local`",
  INVALID_RED_MEAT = "Invalid value for `viande_rouge`",
  INVALID_WHITE_MEAT = "Invalid value for `viande_blanche`",
}

export class FoodRegime extends ValueObject<FoodRegimeProps> {
  constructor(props: FoodRegimeProps) {
    super(props);
  }

  public static create({
    bio = "",
    local = "",
    redMeat = "",
    whiteMeat = "",
  }: CreateFoodRegimeProps): Result<FoodRegime, FoodRegimeError> {
    if (!this.checkFrequency(bio)) return err(FoodRegimeError.INVALID_BIO);
    if (!this.checkFrequency(local)) return err(FoodRegimeError.INVALID_LOCAL);
    if (!this.checkFrequency(redMeat)) return err(FoodRegimeError.INVALID_RED_MEAT);
    if (!this.checkFrequency(whiteMeat)) return err(FoodRegimeError.INVALID_WHITE_MEAT);
    return ok(
      new FoodRegime({
        bio: bio as RegimeFrequency,
        local: local as RegimeFrequency,
        redMeat: redMeat as RegimeFrequency,
        whiteMeat: whiteMeat as RegimeFrequency,
      })
    );
  }

  private static checkFrequency(content: string): boolean {
    return Object.keys(RegimeFrequencyMap).includes(content);
  }
}

export interface FoodGHGQuantityProps {
  foodItems: GESItem[];
  totalGHGQuantity: number;
}

export enum FoodGHGQuantityError {}

export class FoodGHGQuantity extends ValueObject<FoodGHGQuantityProps> {
  constructor(props: FoodGHGQuantityProps) {
    super(props);
  }

  public static create(regime: FoodRegime): Result<FoodGHGQuantity, FoodGHGQuantityError> {
    const bioLocalDiscount = FoodGHGQuantity.computeDiscount(regime);
    const foodItems: GESItem[] = [];

    foodItems.push({
      category: CURRENT_CATEGORY,
      label: "Alimentaire hors viande",
      value: Math.round(
        MEAL_WITHOUT_MEAT * RegimeFrequencyMap["A tous les repas"] * NB_WEEKS * bioLocalDiscount
      ),
    });

    foodItems.push({
      category: CURRENT_CATEGORY,
      label: "Viande rouge",
      value: Math.round(
        MEAL_WITH_RED_MEAT * RegimeFrequencyMap[regime.props.redMeat] * NB_WEEKS * bioLocalDiscount
      ),
    });

    foodItems.push({
      category: CURRENT_CATEGORY,
      label: "Viande blanche",
      value: Math.round(
        MEAL_WITH_WHITE_MEAT *
          RegimeFrequencyMap[regime.props.whiteMeat] *
          NB_WEEKS *
          bioLocalDiscount
      ),
    });

    const totalGHGQuantity = foodItems.reduce((s, c) => s + c.value, 0);

    return ok(
      new FoodGHGQuantity({
        foodItems,
        totalGHGQuantity,
      })
    );
  }

  public static createEmpty(): FoodGHGQuantity {
    return new FoodGHGQuantity({
      foodItems: [],
      totalGHGQuantity: 0
    })
  }

  private static computeDiscount(regime: FoodRegime): number {
    const bioDiscount = BIO_DISCOUNT * RegimeFrequencyMap[regime.props.bio];
    const localDiscount = LOCAL_DISCOUNT * RegimeFrequencyMap[regime.props.local];
    return 1 - bioDiscount + localDiscount;
  }
}

export enum FoodAdvicesRank {
  BASE = 1,
  NO_RED_MEAT_STILL_WHITE_MEAT = 2,
  NO_RED_MEAT_MINIMAL_WHITE_MEAT = 3,
  NO_MEAT = 4,
  NO_MEAT_SOME_LOCAL_BIO = 5,
  NO_MAET_FULL_LOCAL_BIO = 6,
}

export enum FoodAdvicesError {
  COULD_NOT_COMPUTE_ADVICES = "Could not compute a food advice",
}

export interface FoodAdvicesProps {
  foodAdviceComponents: ComponentEcogeste[];
}

export class FoodAdvices extends ValueObject<FoodAdvicesProps> {
  constructor(props: FoodAdvicesProps) {
    super(props);
  }

  public static create(regime: FoodRegime): Result<FoodAdvices, FoodAdvicesError> {
    let foodAdviceRank = -1;
    if (RegimeFrequencyMap[regime.props.redMeat] >= 2) {
      foodAdviceRank = FoodAdvicesRank.BASE;
    }

    if (
      RegimeFrequencyMap[regime.props.redMeat] === 0 &&
      RegimeFrequencyMap[regime.props.whiteMeat] > 2
    ) {
      foodAdviceRank = FoodAdvicesRank.NO_RED_MEAT_STILL_WHITE_MEAT;
    }

    if (
      RegimeFrequencyMap[regime.props.redMeat] === 0 &&
      RegimeFrequencyMap[regime.props.whiteMeat] <= 2
    ) {
      foodAdviceRank = FoodAdvicesRank.NO_RED_MEAT_MINIMAL_WHITE_MEAT;
    }

    if (
      RegimeFrequencyMap[regime.props.redMeat] === 0 &&
      RegimeFrequencyMap[regime.props.whiteMeat] === 0
    ) {
      foodAdviceRank = FoodAdvicesRank.NO_MEAT;
    }

    if (
      RegimeFrequencyMap[regime.props.redMeat] === 0 &&
      RegimeFrequencyMap[regime.props.whiteMeat] === 0 &&
      RegimeFrequencyMap[regime.props.bio] + RegimeFrequencyMap[regime.props.local] > 10
    ) {
      foodAdviceRank = FoodAdvicesRank.NO_MEAT_SOME_LOCAL_BIO;
    }

    if (
      RegimeFrequencyMap[regime.props.redMeat] === 0 &&
      RegimeFrequencyMap[regime.props.whiteMeat] === 0 &&
      RegimeFrequencyMap[regime.props.bio] + RegimeFrequencyMap[regime.props.local] > 20
    ) {
      foodAdviceRank = FoodAdvicesRank.NO_MAET_FULL_LOCAL_BIO;
    }

    if (foodAdviceRank > -1)
      return ok(
        new FoodAdvices({
          foodAdviceComponents: [
            { name: "EcogesteAlimentation", props: { palier: foodAdviceRank } },
          ],
        })
      );

    return err(FoodAdvicesError.COULD_NOT_COMPUTE_ADVICES);
  }

  public static createEmpty(): FoodAdvices {
    return new FoodAdvices({
      foodAdviceComponents: []
    })
  }
}
