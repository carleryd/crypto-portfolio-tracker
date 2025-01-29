import { formatAssetAmount } from ".";

describe("formatAssetAmount", () => {
  test("formats large numbers correctly", () => {
    expect(formatAssetAmount(500.55555)).toBe("500.56");
  });
});
