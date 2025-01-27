import { formatAssetAmount } from ".";

describe("formatAssetAmount", () => {
  test("formats large numbers correctly", () => {
    expect(formatAssetAmount(123456.789)).toBe("123456.79");
  });
});
