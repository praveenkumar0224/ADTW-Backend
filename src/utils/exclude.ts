/**
 * Exclude keys from object
 * @param obj
 * @param keys
 * @returns
 */
const exclude = <Type, Key extends keyof Type>(object: Type, keys: Key[]): Omit<Type, Key> => {
  if (object) {
    for (const key of keys) {
      delete object[key];
    }
    return object;
  }
  return object;
};

export default exclude;
