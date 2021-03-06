export function valida(listField) {
  const booleanFields = Object.keys(listField).reduce((acc, field) => {
    acc[field] = Boolean(listField[field]);
    return acc;
  }, {});
  const transformBoolean = Object.keys(booleanFields).map(
    // eslint-disable-next-line prettier/prettier
    (item) => booleanFields[item] === true ?? false,
  );
  const isTrasnformBooleanTrue = transformBoolean.every((item) => item);
  if (!isTrasnformBooleanTrue) {
    const getNotFillFields = transformBoolean
      .map((item, index) => !item && Object.keys(booleanFields)[index])
      .filter((item) => item);
    return getNotFillFields;
  }
  // return Object.entries(listField)
  //   .map(([key, value]) => (!value ? key : undefined))
  //   .filter(Boolean);

  return null;
}
