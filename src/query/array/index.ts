import { isNumber, isPlainObject } from 'lodash';
import { BuilderStatics } from '../builder';

export class ArrayQuery extends BuilderStatics {
  /**
   * The $all operator selects the documents where the value of a field is an array that contains all the specified elements.
   *
   * ```ts
   * ArrayQuery.$all([ "ssl", "security" ])
   *
   * ```
   * @param value
   * @returns
   */
  static $all(value: any[]) {
    if (!Array.isArray(value)) {
      throw new RangeError(`${typeof value} cannot be passed to $all`);
    }
    return { $all: value };
  }

  /**
   * The $size operator matches any array with the number of elements specified by the argument.
   *
   * ```ts
   * { products: ArrayQuery.$size(4) }
   *
   * ```
   * @param value
   * @returns
   */
  static $size(value: number) {
    if (!isNumber(value)) {
      throw new RangeError(`${typeof value} cannot be passed to $size`);
    }
    return { $size: value };
  }

  /**
   * The $elemMatch operator matches documents that contain an array field with at least one element that matches all the specified query criteria.
   *
   * ```ts
   * ArrayQuery.$elemMatch(new ComparisonQuery().$gte(80).$lt(85).toObject())
   * ArrayQuery.$elemMatch(ArrayQuery.fromFieldObject('product', Comparison.$ne('nylon')))
   *
   * ```
   *
   * @param value
   */
  static $elemMatch(value: Record<string, any>) {
    if (!isPlainObject(value)) {
      throw new RangeError(`${typeof value} cannot be passed to $elemMatch`);
    }
    return { $elemMatch: value };
  }
}
