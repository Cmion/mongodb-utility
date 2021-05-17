import { isPlainObject } from 'lodash';
import { decipherType } from '../../utils/decipher-type';

export class BuilderStatics {
  /**
   * Given a series of query operations it returns a object combining all
   * @param args
   * @returns {Object}
   */
  static toObject(...args: Record<string, any>[]): Record<string, any> {
    if (args.length > 0) {
      return args.reduce(
        (acc: Record<string, any>, current: Record<string, any>) => {
          if (!isPlainObject(current)) {
            throw new TypeError(
              `type ${decipherType(current)} cannot be passed to "toObject"`,
            );
          }
          return { ...acc, ...current };
        },
        {},
      );
    }
    return {};
  }

  /**
   * Given a series of query operations it returns a object combining all
   * @param field
   * @param args
   * @returns {Object}
   */
  static toFieldObject(
    field: string,
    ...args: Record<string, any>[]
  ): Record<string, any> {
    if (args.length > 0) {
      return {
        [field]: args.reduce(
          (acc: Record<string, any>, current: Record<string, any>) => {
            if (!isPlainObject(current)) {
              throw new TypeError(
                `type ${decipherType(current)} cannot be passed to "toFieldObject"`,
              );
            }
            return { ...acc, ...current };
          },
          {},
        ),
      };
    }
    return {};
  }
}

export class Builder extends BuilderStatics {
  constructor(protected query: Record<string, any>) {
    super();
  }

  /**
   * Turns the query object to an array
   * @returns
   */
  public toArray(): Record<string, any>[] {
    const keys = Object.keys(this.query);
    return keys.map((key: string) => {
      return { [key]: this.query[key] };
    });
  }

  /**
   * Adds a query from an object
   * @param query
   * @returns
   */
  public fromObject(query: Record<string, any>): Builder {
    if (!isPlainObject(query)) {
      throw new TypeError(
        `${decipherType(query)} cannot be passed to "fromObject"`,
      );
    }
    this.query = Object.assign({}, this.query, query);
    return this;
  }

  /**
   * Returns the query object
   * @returns
   */
  public toObject(): Record<string, any> {
    return this.query;
  }

  /**
   * Converts the query to a JSON
   * @returns
   */
  public toJSON(): string {
    return JSON.stringify(this.query);
  }
}
