import { describe, expect, test } from "vitest";
import { ArrayLib } from "../../src/index.js";

describe("ArrayLib", () => {
  describe("first method", () => {
    describe("in an ArrayLib instance with elements", () => {
      test("returns first element", () => {
        const arrayLib = new ArrayLib(["a", "b"]);

        const result = arrayLib.first();

        expect(result).toBe("a");
      });
    });

    describe("in an empty ArrayLib instance", () => {
      test("throw an error", () => {
        const arrayLib = new ArrayLib([]);

        const result = (): void => {
          arrayLib.first();
        };

        expect(result).toThrowError();
      });
    });
  });
});
