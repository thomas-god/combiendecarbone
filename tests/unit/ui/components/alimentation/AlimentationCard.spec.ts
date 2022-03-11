import { render } from "@testing-library/vue";
import AlimentationCard from "@/ui/components/alimentation/AlimentationCard.vue";
import { foodItems } from "@/domain/primaryPorts/FoodModulePort";
import { err, ok } from "neverthrow";

const foodModule = {
  regime: ok({
    props: {
      bio: "Jamais",
      local: "Jamais",
      redMeat: "Jamais",
      whiteMeat: "Jamais",
    },
  }),
  updateRegime: jest.fn(),
};

describe("AlimentationCard component", () => {
  it("should render properly the component when a regime is supplied", () => {
    const { getByText } = render(AlimentationCard, {
      props: { foodItems: foodItems, foodModule: foodModule },
    });

    expect(getByText("Viande rouge: Jamais")).toBeInTheDocument();
    expect(getByText("Viande blanche: Jamais")).toBeInTheDocument();
    expect(getByText("Produits bios: Jamais")).toBeInTheDocument();
    expect(getByText("Produits locaux: Jamais")).toBeInTheDocument();
  });

  it("should render nothing when there is no regime", () => {
    const { queryByText } = render(AlimentationCard, {
      props: { foodItems: foodItems, foodModule: { ...foodModule, regime: err(null) } },
    });

    expect(queryByText("Viande rouge")).not.toBeInTheDocument();
    expect(queryByText("Viande blanche")).not.toBeInTheDocument();
    expect(queryByText("Produits bios")).not.toBeInTheDocument();
    expect(queryByText("Produits locaux")).not.toBeInTheDocument();
  });
});
