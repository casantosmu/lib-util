import { describe, expect, test } from "vitest";
import { ArrayLib } from "../../src/index.js";

describe("ArrayLib", () => {
  describe("elementAt method", () => {
    describe("with an index where there is an element", () => {
      test("returns the element", () => {
        const arrayLib = new ArrayLib(["a", "b"]);

        const result = arrayLib.elementAt(1);

        expect(result).toBe("b");
      });
    });

    describe("with a negative index where there is a element", () => {
      test("returns the element counting back from the last item", () => {
        const arrayLib = new ArrayLib(["a", "b"]);

        const result = arrayLib.elementAt(-1);

        expect(result).toBe("b");
      });
    });

    describe("with an index where there is no element", () => {
      test("throws a RangeError", () => {
        const arrayLib = new ArrayLib(["a", "b"]);

        const result = (): void => {
          arrayLib.elementAt(2);
        };

        expect(result).toThrow(RangeError);
      });
    });
  });

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
