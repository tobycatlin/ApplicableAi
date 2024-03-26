export default function tsvStringToJson(tsvString) {
  const lines = tsvString.split("\n");

  // Extract the headers from the first line
  const headers = lines[0].trim().split("\t");

  const jsonArray = [];

  // Process each line (starting from the second line)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue; // Skip empty lines

    // Split the line into fields
    const fields = line.split("\t");

    // Create a JSON object using the headers and fields
    const jsonObject = {};
    for (let j = 0; j < headers.length; j++) {
      jsonObject[headers[j]] = fields[j];
    }

    // Add the JSON object to the array
    jsonArray.push(jsonObject);
  }

  return jsonArray;
}
