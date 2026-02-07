import { render, screen } from "@testing-library/react";
import Menu from "../pages/Menu";
import { TestWrapper } from "./test-utils";

test("renders menu skeleton loader", () => {
  render(
    <TestWrapper>
      <Menu />
    </TestWrapper>
  );

  // Skeleton loader exists initially
  expect(document.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
});
