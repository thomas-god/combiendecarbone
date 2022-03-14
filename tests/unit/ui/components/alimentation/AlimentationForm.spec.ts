import AlimentationForm from "@/ui/components/alimentation/AlimentationForm.vue";
import { renderWithVuetify } from "@/../tests/setup";
import { fireEvent, waitFor } from "@testing-library/vue";
import { NewFoodRegimeErrors } from "@/domain/usecases/NewFoodRegime";

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
      const items = getAllByText(NewFoodRegimeErrors.MISSING_VALUE);
      expect(items.length).toEqual(4);
    });
  });
});
