import { TypeString } from "./type-string.js";
import { TypeUndefined } from "./type-undefined.js";

export const Type = {
  String: new TypeString(),
  Undefined: new TypeUndefined(),
};
