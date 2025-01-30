import { formatCurrencyAmount } from ".";

describe("formatCurrencyAmount", () => {
  test("formats large numbers correctly", () => {
    expect(formatCurrencyAmount(500.55555)).toBe("500.56");
  });
});
