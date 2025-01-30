import { formatFinancial } from ".";

describe("formatCurrencyAmount", () => {
  test("formats large numbers correctly", () => {
    expect(formatFinancial(500.55555)).toBe("500.556");
  });

  test("formats small numbers correctly", () => {
    expect(formatFinancial(0.000000123456789)).toBe("0.00000012346");
  });
});
