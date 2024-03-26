function flattenObject(obj, prefix = "") {
  const flattened = {};
  Object.keys(obj).forEach((key) => {
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      const flatObject = flattenObject(obj[key], prefixedKey);
      Object.keys(flatObject).forEach((subKey) => {
        const flatKey = subKey.substring(subKey.lastIndexOf(".") + 1);
        flattened[flatKey] = flatObject[subKey];
      });
    } else {
      flattened[key] = obj[key];
    }
  });
  return flattened;
}

module.exports = flattenObject;