"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function valida(listField) {
  const booleanFields = Object.keys(listField).reduce((acc, field) => {
    acc[field] = Boolean(listField[field]);
    return acc;
  }, {});
  const transformBoolean = Object.keys(booleanFields).map(
    // eslint-disable-next-line prettier/prettier
    (item) => _nullishCoalesce(booleanFields[item] === true, () => ( false)),
  );
  const isTrasnformBooleanTrue = transformBoolean.every((item) => item);
  if (!isTrasnformBooleanTrue) {
    const getNotFillFields = transformBoolean
      .map((item, index) => !item && Object.keys(booleanFields)[index])
      .filter((item) => item);
    return getNotFillFields;
  }
  return null;
} exports.valida = valida;
