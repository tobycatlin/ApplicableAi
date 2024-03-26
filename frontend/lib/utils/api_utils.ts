import isBoolean from "lodash/isBoolean";
import isInteger from "lodash/isInteger";
import isString from "lodash/isString";
import isObject from "lodash/isObject";
import isArray from "lodash/isArray";
import isFinite from "lodash/isFinite";

type StringFromType<T> = T extends string
  ? "string" | "json_string"
  : T extends number
  ? "integer" | "float"
  : T extends boolean
  ? "boolean"
  : T extends object
  ? "object"
  : T extends Array<unknown>
  ? "array"
  : never;

type SchemaTypeOrParam<T> =
  | StringFromType<T>
  | {
      type: StringFromType<T>;
      required: false;
    };

export type Schema<T extends object> = {
  [Property in keyof T]: SchemaTypeOrParam<T[Property]>;
};

type ValidatedPayload<T> =
  | {
      valid: true;
      payload: T;
    }
  | {
      valid: false;
      error: string;
    };

// Loop over the validation object and check those values against the payload

// const validation = [
//   {
//     name: "playerIds",
//     type: "object",
//     require: true,
//   },
//   {
//     name: "mode",
//     type: "string",
//     require: true,
//   },
//   {
//     name: "difficulty",
//     type: "integer",
//     require: true,
//   },
//   {
//     name: "epoch",
//     type: "string",
//     require: true,
//   },
// ];
export function validatePayload<T extends object>(
  payload: unknown,
  schema: Schema<T>
): ValidatedPayload<T> {
  if (typeof payload !== "object" || payload === null) {
    return {
      valid: false,
      error: "Payload must be a JSON object",
    };
  }

  const errors = [];

  for (const name in schema) {
    const param = schema[name];

    let type;
    let required: boolean;
    if (typeof param === "string") {
      type = param;
      required = true;
    } else {
      type = param.type;
      required = param.required;
    }

    const value: unknown = payload[name as keyof typeof payload];

    if (!required && value == null) continue;

    let valid = false;
    switch (type) {
      case "object":
        valid = isObject(value);
        break;
      case "boolean":
        valid =
          isBoolean(value) ||
          isInteger(value) ||
          (isString(value) &&
            (value.toLowerCase() == "true" ||
              value.toLowerCase() == "false" ||
              isInteger(+value)));
        break;
      case "integer":
        valid = isInteger(isString(value) ? +value : value);
        // console.log("payload", validator.name, payloadValue, valid);
        break;
      case "float":
        valid = isFinite(isString(value) ? +value : value);
        break;
      case "string":
        valid = isString(value);

        break;
      case "json_string":
        if (isString(value)) {
          try {
            JSON.parse(value);
            valid = true;
          } catch (e) {
            // alert(e); // error in the above string (in this case, yes)!
            valid = false;
          }
        }
        break;
      case "array":
        valid = isArray(value);
        break;
      default:
        console.error("Validator type not known");
        break;
    }

    if (!valid) {
      // errors.push(`${name} is not valid for type ${type}: ${value}`);
      // console.debug(`${name} is not valid for type ${type}: ${value}`);
      // console.debug(payload, schema);
    }
  }

  // console.log(payload);

  if (errors.length === 0) {
    return {
      valid: true,
      /// TODO: Don't do this. Unsafe. Do better
      payload: payload as T,
    };
  } else {
    return {
      valid: false,
      error: errors.join("\n"),
    };
  }
}
