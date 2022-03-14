import AlimentationForm from "@/ui/components/alimentation/AlimentationForm.vue";
import { renderWithVuetify } from "@/../tests/setup";
import { fireEvent, waitFor } from "@testing-library/vue";
import { FoodRegimeForm, FoodRegimeFormErrors } from "@/domain/usecases/FoodRegimeForm";

const foodModule = {
  updateRegime: jest.fn(),
};

describe("Food form", () => {
  it("should display missing fields error messages when tryign to validate the form", async () => {
    const { getAllByText, getByText } = renderWithVuetify(AlimentationForm, {
      props: { foodModule: foodModule },
    });

    const validateBtn = getByText("Ok");
    fireEvent.click(validateBtn);

    await waitFor(() => {
      const items = getAllByText(FoodRegimeFormErrors.MISSING_VALUE);
      expect(items.length).toEqual(4);
    });
  });

  it("should update the foodModule when regime is complete", async () => {
    const { getByLabelText, getByText } = renderWithVuetify(AlimentationForm, {
      props: { foodModule: foodModule },
    });

    await Promise.all(
      ["Viande rouge", "Viande blanche", "Produits bios", "Produits locaux"].map(async (item) => {
        const itemSelect = getByLabelText(item);
        await fireEvent.update(itemSelect, "Jamais");
      })
    );

    const validateBtn = getByText("Ok");
    fireEvent.click(validateBtn);

    const expectedNewRegime = new FoodRegimeForm();
    expectedNewRegime.bio = "Jamais";
    expectedNewRegime.local = "Jamais";
    expectedNewRegime.whiteMeat = "Jamais";
    expectedNewRegime.redMeat = "Jamais";

    expect(foodModule.updateRegime).toBeCalledWith(expectedNewRegime);
  });
});
