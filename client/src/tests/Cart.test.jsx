import { render, screen } from "@testing-library/react";
import Cart from "../pages/Cart";
import { TestWrapper } from "./test-utils";

test("renders empty cart message", () => {
  render(
    <TestWrapper>
      <Cart />
    </TestWrapper>
  );

  expect(screen.getByText(/cart/i)).toBeInTheDocument();
});
