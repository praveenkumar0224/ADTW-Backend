const fieldSelector = (keys: string[]) =>
  keys.reduce((obj, k) => ({ ...obj, [k]: true }), {});

const filterColumns = (columns: Array<{ column_name: string }>) => {
  const columnsToRemove = ["is_active", "createdAt", "deletedAt", "updatedAt"];

  return columns
    .filter((column) => !columnsToRemove.includes(column.column_name))
    .map((column) => column.column_name);
};

export default {
  fieldSelector,
  filterColumns,
};
