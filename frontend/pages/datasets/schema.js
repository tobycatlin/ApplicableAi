import { buildYup } from "schema-to-yup";

export default function Yup() {
  const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "http://example.com/person.schema.json",
    title: "Our Funds",
    description: "A person",
    type: "object",
    properties: {
      region: {
        description: "Region EEA or EFTA",
        type: "string",
        enum: ["EEA", "EFTA"],
        enum_titles: ["EEA", "EFTA"],
      },
      reference_period: {
        description: "Reference period - Year & Quarter",
        type: "string",
      },
      item: {
        description: "Item name",
        type: "string",
      },
      item_code: {
        description: "Item Code",
        type: "string",
      },
      value: {
        description: "Value of fund in GBP",
        type: "number",
      },
      date: {
        description: "Date of extraction (yyyymmdd)",
        type: "date",
      },
      submissions: {
        description: "Count of submissions",
        type: "number",
      },
      //   email: {
      //     type: "string",
      //     format: "email",
      //   },
      //   foobar: {
      //     type: "string",
      //     matches: "(foo|bar)",
      //   },
      //   age: {
      //     description: "Age of person",
      //     type: "number",
      //     exclusiveMinimum: 0,
      //     required: true,
      //   },
      //   characterType: {
      //     enum: ["good", "bad"],
      //     enum_titles: ["Good", "Bad"],
      //     type: "string",
      //     title: "Type of people",
      //     propertyOrder: 3,
      //   },
    },
    required: ["item_code", "value"],
  };

  console.log(JSON.stringify(schema));
  const config = {
    // for error messages...
    errMessages: {
      age: {
        required: "A person must have an age",
      },
      email: {
        required: "You must enter an email address",
        format: "Not a valid email address",
      },
    },
  };
  const data = {
    region: "EEA",
    reference_period: "2018 Q2",
    item: "Total eligible own funds to meet the consolidated group SCR (...)",
    item_code: "R0560",
    value: 784630.04474,
    date: 20230929,
    submissions: 270,
  };

  const yupSchema = buildYup(schema, config);
  yupSchema
    .isValid(data)
    .then((valid) => {
      console.log("valid", valid);
    })
    .catch((error) => {
      console.log(error);
    });

  return <>kk</>;
}
