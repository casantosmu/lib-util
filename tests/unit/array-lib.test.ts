import { describe, expect, test } from "vitest";
import { ArrayLib } from "../../src/index.js";
import { TypeLib } from "../../src/type-lib.js";

describe("ArrayLib", () => {
  describe("constructor", () => {
    describe("does not receive expected 2 arguments", () => {
      test("throws an error", () => {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        const result = (): void => {
          // @ts-expect-error Expects at least 2 arguments
          new ArrayLib(TypeLib.String);
        };

        expect(result).toThrow(
          /ArrayLib constructor requires at least two arguments/,
        );
      });
    });

    describe("last argument is not an array", () => {
      test("throws an error", () => {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        const result = (): void => {
          // @ts-expect-error Last argument is not an array
          new ArrayLib(TypeLib.String, undefined);
        };

        expect(result).toThrow(
          /The last argument to the ArrayLib constructor must be an array/,
        );
      });
    });

    describe("first arguments does not matches TypeProvider interface", () => {
      test("throws an error", () => {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        const result = (): void => {
          // @ts-expect-error Array type does not match type providers
          new ArrayLib(undefined, ["a"]);
        };

        expect(result).toThrow(/Expected a TypeProvider object/);
      });
    });

    describe("array does not match type providers", () => {
      test("throws an error", () => {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        const result = (): void => {
          // @ts-expect-error Array type does not match type providers
          new ArrayLib(TypeLib.String, [undefined]);
        };

        expect(result).toThrow(
          /undefined does not match any of the provided types/,
        );
      });
    });
  });

  describe("elementAt method", () => {
    describe("with an index where there is an element", () => {
      test("returns the element", () => {
        const array = new ArrayLib(TypeLib.String, ["a", "b"]);

        const result = array.elementAt(1);

        expect(result).toBe("b");
      });
    });

    describe("with a negative index where there is a element counting back from the last item", () => {
      test("returns the element", () => {
        const array = new ArrayLib(TypeLib.String, ["a", "b"]);

        const result = array.elementAt(-1);

        expect(result).toBe("b");
      });
    });

    describe("in an ArrayLib instance with TypeString and TypeUndefined with an index where there is an undefined element", () => {
      test("returns undefined", () => {
        const array = new ArrayLib(TypeLib.String, TypeLib.Undefined, [
          undefined,
          "b",
        ]);

        const result = array.elementAt(0);

        expect(result).toBe(undefined);
      });
    });

    describe("with an index where there is no element", () => {
      test("throws a RangeError", () => {
        const array = new ArrayLib(TypeLib.String, ["a", "b"]);

        const result = (): void => {
          array.elementAt(2);
        };

        expect(result).toThrow(RangeError);
      });
    });
  });

  describe("first method", () => {
    describe("in an ArrayLib instance with elements", () => {
      test("returns first element", () => {
        const array = new ArrayLib(TypeLib.String, ["a", "b"]);

        const result = array.first();

        expect(result).toBe("a");
      });
    });

    describe("in an ArrayLib instance with TypeString and TypeUndefined where first element it's undefined", () => {
      test("returns undefined", () => {
        const array = new ArrayLib(TypeLib.String, TypeLib.Undefined, [
          undefined,
          "b",
        ]);

        const result = array.first();

        expect(result).toBe(undefined);
      });
    });

    describe("in an empty ArrayLib instance", () => {
      test("throws an error", () => {
        const array = new ArrayLib(TypeLib.String, []);

        const result = (): void => {
          array.first();
        };

        expect(result).toThrow(TypeError);
      });
    });
  });
});
