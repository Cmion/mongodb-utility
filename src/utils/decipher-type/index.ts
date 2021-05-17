import {
  isArray,
  isBoolean,
  isDate,
  isFunction,
  isNull,
  isNumber,
  isPlainObject,
  isRegExp,
  isString,
  isSymbol,
  isUndefined,
} from 'lodash';

export const decipherType = (value: unknown): string => {
  if (isString(value)) return 'string';
  if (isNull(value)) return 'null';
  if (isUndefined(value)) return 'undefined';
  if (isFunction(value)) return 'function';
  if (isPlainObject(value)) return 'object';
  if (isNumber(value)) return 'number';
  if (isSymbol(value)) return 'symbol';
  if (isBoolean(value)) return 'boolean';
  if (isArray(value)) return 'array';
  if (isDate(value)) return 'date';
  if (isRegExp(value)) return 'regex';
};
