import { describe, expect, test } from "vitest";
import { ArrayLib, Type } from "../../src/index.js";

describe("ArrayLib", () => {
  describe("elementAt method", () => {
    describe("with an index where there is an element", () => {
      test("returns the element", () => {
        const arrayLib = new ArrayLib(["a", "b"], Type.String);

        const result = arrayLib.elementAt(1);

        expect(result).toBe("b");
      });
    });

    describe("with a negative index where there is a element counting back from the last item", () => {
      test("returns the element", () => {
        const arrayLib = new ArrayLib(["a", "b"], Type.String);

        const result = arrayLib.elementAt(-1);

        expect(result).toBe("b");
      });
    });

    describe("in an ArrayLib instance with TypeString and TypeUndefined with an index where there is an undefined element", () => {
      test("returns undefined", () => {
        const arrayLib = new ArrayLib(
          [undefined, "b"],
          Type.String,
          Type.Undefined,
        );

        const result = arrayLib.elementAt(0);

        expect(result).toBe(undefined);
      });
    });

    describe("with an index where there is no element", () => {
      test("throws a RangeError", () => {
        const arrayLib = new ArrayLib(["a", "b"], Type.String);

        const result = (): void => {
          arrayLib.elementAt(2);
        };

        expect(result).toThrow(RangeError);
      });
    });

    describe("with an index where the element has been deleted", () => {
      test("throws a RangeError", () => {
        const arrayLib = new ArrayLib(["a", "b"], Type.String);
        delete arrayLib[0];

        const result = (): void => {
          arrayLib.elementAt(0);
        };

        expect(result).toThrow(RangeError);
      });
    });

    describe("in an ArrayLib instance with TypeUndefined with an index where the element has been deleted", () => {
      test("returns undefined", () => {
        const arrayLib = new ArrayLib([undefined, undefined], Type.Undefined);
        delete arrayLib[0];

        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        const result = arrayLib.elementAt(0);

        expect(result).toBe(undefined);
      });
    });
  });

  describe("first method", () => {
    describe("in an ArrayLib instance with elements", () => {
      test("returns first element", () => {
        const arrayLib = new ArrayLib(["a", "b"], Type.String);

        const result = arrayLib.first();

        expect(result).toBe("a");
      });
    });

    describe("in an ArrayLib instance with TypeString and TypeUndefined where first element it's undefined", () => {
      test("returns undefined", () => {
        const arrayLib = new ArrayLib(
          [undefined, "b"],
          Type.String,
          Type.Undefined,
        );

        const result = arrayLib.first();

        expect(result).toBe(undefined);
      });
    });

    describe("in an ArrayLib instance where first element has been deleted", () => {
      test("returns next element counting from the removed element", () => {
        const arrayLib = new ArrayLib(["a", "b"], Type.String);
        delete arrayLib[0];

        const result = arrayLib.first();

        expect(result).toBe("b");
      });
    });

    describe("in an ArrayLib instance with TypeUndefined where unique element has been deleted", () => {
      test("returns undefined", () => {
        const arrayLib = new ArrayLib([undefined], Type.Undefined);
        delete arrayLib[0];

        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        const result = arrayLib.first();

        expect(result).toBe(undefined);
      });
    });

    describe("in an empty ArrayLib instance", () => {
      test("throw an error", () => {
        const arrayLib = new ArrayLib([], Type.String);

        const result = (): void => {
          arrayLib.first();
        };

        expect(result).toThrowError();
      });
    });
  });
});
