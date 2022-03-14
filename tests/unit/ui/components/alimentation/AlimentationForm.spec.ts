import AlimentationForm from "@/ui/components/alimentation/AlimentationForm.vue";
import { renderWithVuetify } from "@/../tests/setup";
import { fireEvent } from "@testing-library/vue";
import { NewFoodRegimeErrors } from "@/domain/usecases/NewFoodRegime";

const foodModule = {
  updateRegime: jest.fn(),
};

describe("Food form", () => {
  it("should display missing fields error messages when tryign to validate the form", () => {
    const { getAllByText, getByText } = renderWithVuetify(AlimentationForm, {
      props: { foodModule: foodModule },
    });

    const validateBtn = getByText("Ok");
    fireEvent.click(validateBtn);

    const items = getAllByText(NewFoodRegimeErrors.MISSING_VALUE);
    expect(items.length).toEqual(4);
  });
});
