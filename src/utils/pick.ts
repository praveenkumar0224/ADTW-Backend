const pick = (object: any, keys: string[]) =>
  keys.reduce<Record<string, unknown>>((finalObject, key) => {
    if (object && Object.hasOwn(object, key)) {
      finalObject[key] = object[key];
    }

    return finalObject;
  }, {});

export default pick;
