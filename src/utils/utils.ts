const fieldSelector = (keys: string[]) => keys.reduce((obj, k) => ({ ...obj, [k]: true }), {});

export default {
  fieldSelector
};
