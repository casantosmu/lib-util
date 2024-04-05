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

  describe("any method", () => {
    describe("in an empty ArrayLib instance, without a condition", () => {
      test("returns false", () => {
        const arrayLib = new ArrayLib(TypeLib.String, []);

        const result = arrayLib.any();

        expect(result).toBe(false);
      });

      describe("in an ArrayLib instance with elements, without a condition", () => {
        test("returns true", () => {
          const arrayLib = new ArrayLib(TypeLib.String, ["a", "b"]);

          const result = arrayLib.any();

          expect(result).toBe(true);
        });
      });

      describe("in an ArrayLib instance with elements, with a condition that matches some elements", () => {
        test("returns true", () => {
          const arrayLib = new ArrayLib(TypeLib.String, ["a", "b"]);

          const result = arrayLib.any((element) => element === "a");

          expect(result).toBe(true);
        });
      });

      describe("in an ArrayLib instance with elements, with a condition that matches no elements", () => {
        test("returns false", () => {
          const arrayLib = new ArrayLib(TypeLib.String, ["a", "b"]);

          const result = arrayLib.any((element) => element === "c");

          expect(result).toBe(false);
        });
      });
    });
  });

  describe("count method", () => {
    describe("without a condition", () => {
      test("returns the total number of elements", () => {
        const arrayLib = new ArrayLib(TypeLib.String, ["a", "a", "b", "b"]);

        const result = arrayLib.count();

        expect(result).toBe(4);
      });
    });

    describe("with a condition", () => {
      test("returns the number of elements that match the condition", () => {
        const arrayLib = new ArrayLib(TypeLib.String, ["a", "a", "b", "b"]);

        const result = arrayLib.count((element) => element === "a");

        expect(result).toBe(2);
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
    describe("in an ArrayLib instance with elements, without condition", () => {
      test("returns first element", () => {
        const array = new ArrayLib(TypeLib.String, ["a", "b"]);

        const result = array.first();

        expect(result).toBe("a");
      });
    });

    describe("in an ArrayLib instance with TypeString and TypeUndefined where first element it's undefined, without condition", () => {
      test("returns undefined", () => {
        const array = new ArrayLib(TypeLib.String, TypeLib.Undefined, [
          undefined,
          "b",
        ]);

        const result = array.first();

        expect(result).toBe(undefined);
      });
    });

    describe("in an ArrayLib instance with elements, with a condition that matches an element", () => {
      test("returns first matched element", () => {
        const arrayLib = new ArrayLib(TypeLib.String, ["a", "b"]);

        const result = arrayLib.first((element) => element === "b");

        expect(result).toBe("b");
      });
    });

    describe("in an ArrayLib instance with elements, with a condition that matches no elements", () => {
      test("throws an error", () => {
        const arrayLib = new ArrayLib(TypeLib.String, ["a", "b"]);

        const result = (): void => {
          arrayLib.first((element) => element === "c");
        };

        expect(result).toThrow(
          /No element satisfies the condition in predicate/,
        );
      });
    });

    describe("in an empty ArrayLib instance, without a condition", () => {
      test("throws an error", () => {
        const array = new ArrayLib(TypeLib.String, []);

        const result = (): void => {
          array.first();
        };

        expect(result).toThrow(/The ArrayLib is empty/);
      });
    });

    describe("in an empty ArrayLib instance, with a condition", () => {
      test("throws an error", () => {
        const array = new ArrayLib(TypeLib.String, []);

        const result = (): void => {
          array.first((element) => element === "b");
        };

        expect(result).toThrow(/The ArrayLib is empty/);
      });
    });
  });
});
