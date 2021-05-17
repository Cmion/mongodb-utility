import { Builder } from '../builder';

/**
 * Builds the mongoDB comparison queries.
 */
export class ComparisonQuery extends Builder {
  constructor() {
    super({});
  }

  /**
   * $gt selects those documents where the value of the field is greater than (i.e. >) the specified value.
   * ```js
   *      new ComparisonQuery().$gt('qty', 45000)
   *
   * ```
   * See [Documentation](https://docs.mongodb.com/manual/reference/operator/query/gt/)
   * @param field
   * @param value
   */
  public $gt(field: string, value: number): ComparisonQuery {
    this.query[field] = Object.assign({}, this.query[field] ?? {}, {
      $gt: value,
    });
    return this;
  }

  /**
   * $gte selects the documents where the value of the field is greater than or equal to (i.e. >=) a specified value (e.g. value.)
   *
   * ```js
   *      new ComparisonQuery().$gte('qty', 45000)
   *
   * ```
   * See [Documentation](https://docs.mongodb.com/manual/reference/operator/query/gte/)
   * @param field
   * @param value
   */
  public $gte(field: string, value: number): ComparisonQuery {
    this.query[field] = Object.assign({}, this.query[field] ?? {}, {
      $gte: value,
    });
    return this;
  }

  /**
   * $lt selects the documents where the value of the field is less than (i.e. <) the specified value.
   *
   * ```js
   *      new ComparisonQuery().$lt('qty', 45000)
   *
   * ```
   * See [Documentation](https://docs.mongodb.com/manual/reference/operator/query/lt/)
   * @param field
   * @param value
   * @returns
   */
  public $lt(field: string, value: number): ComparisonQuery {
    this.query[field] = Object.assign({}, this.query[field] ?? {}, {
      $lt: value,
    });
    return this;
  }

  /**
   * $lte selects the documents where the value of the field is less than (i.e. <=) the specified value.
   *
   * ```js
   *      new ComparisonQuery().$lte('qty', 45000)
   *
   * ```
   * See [Documentation](https://docs.mongodb.com/manual/reference/operator/query/lte/)
   * @param field
   * @param value
   * @returns
   */
  public $lte(field: string, value: number): ComparisonQuery {
    this.query[field] = Object.assign({}, this.query[field] ?? {}, {
      $lte: value,
    });
    return this;
  }

  /**
   * Specifies equality condition. 
   * The $eq operator matches documents where the value of a field equals the specified value.
   * 
   ```js
        new ComparisonQuery().$eq('qty', 45000)
        { <field>: { $eq: <value> } }

   ```

   See [Documentation](https://docs.mongodb.com/manual/reference/operator/query/eq/)
   * @param field 
   * @param value 
   * @returns 
   */
  public $eq(field: string, value: any): ComparisonQuery {
    this.query[field] = Object.assign({}, this.query[field] ?? {}, {
      $eq: value,
    });
    return this;
  }

  /**
   * $ne selects the documents where the value of the field is not equal to the specified value. 
   * This includes documents that do not contain the field.
   * 
   ```js
        new ComparisonQuery().$ne('qty', 45000)
        { <field>: { $ne: <value> } }

   ```

    See [Documentation](https://docs.mongodb.com/manual/reference/operator/query/ne/)
   * @param field 
   * @param value 
   * @returns 
   */
  public $ne(field: string, value: number | string): ComparisonQuery {
    this.query[field] = Object.assign({}, this.query[field] ?? {}, {
      $ne: value,
    });
    return this;
  }

  /**
   * $nin selects the documents where: the field value is not in the specified array or the field does not exist.
   * @param field
   * @param value
   */
  public $nin(field: string, value: number[] | string[]): ComparisonQuery {
    this.query[field] = Object.assign({}, this.query[field] ?? {}, {
      $nin: value,
    });
    return this;
  }

  /**
   * The $in operator selects the documents where the value of a field equals any value in the specified array.
   *
   * To specify an $in expression, use the following prototype:
   *
   ```js
        db.inventory.find(new ComparisonQuery().$in('qty', [5, 1]) )
        db.inventory.find( { qty: { $in: [ 5, 15 ] } } )
   ```
   * @param field
   * @param value
   * @returns
   */
  public $in(field: string, value: any[] = []): ComparisonQuery {
    this.query[field] = Object.assign({}, this.query[field] ?? {}, {
      $in: value,
    });
    return this;
  }

  // Statics

  /**
   * Specifies equality condition. 
   * The $eq operator matches documents where the value of a field equals the specified value.
   * 
   ```js
        ComparisonQuery.$eq(45000)
        { <field>: { $eq: <value> } }

   ```

   See [Documentation](https://docs.mongodb.com/manual/reference/operator/query/eq/)
   * @param value 
   * @returns 
   */
  static $eq<T extends unknown>(value: T): { $eq: T } {
    return { $eq: value };
  }

  /**
   * $ne selects the documents where the value of the field is not equal to the specified value. 
   * This includes documents that do not contain the field.
   * 
   ```js
        ComparisonQuery().$ne(45000)
        { $ne: <value> } 

   ```

    See [Documentation](https://docs.mongodb.com/manual/reference/operator/query/ne/)
   * @param value 
   * @returns 
   */
  static $ne<T extends unknown>(value: T): { $ne: T } {
    return { $ne: value };
  }
  /**
   * $gt selects those documents where the value of the field is greater than (i.e. >) the specified value.
   *
   * See [Documentation](https://docs.mongodb.com/manual/reference/operator/query/gt/)
   * @param value
   */
  static $gt<T extends number>(value: T): { $gt: T } {
    return { $gt: value };
  }

  /**
   * $gt selects those documents where the value of the field is greater than (i.e. >=) the specified value.
   * ```js
   *      ComparisonQuery().$gte(45000)
   *
   * ```
   * See [Documentation](https://docs.mongodb.com/manual/reference/operator/query/gte/)
   * @param value
   */
  static $gte<T extends number>(value: T): { $gte: T } {
    return { $gte: value };
  }

  /**
   * $lt selects the documents where the value of the field is less than (i.e. < ) the specified value.
   *
   * ```js
   *      ComparisonQuery().$lt(45000)
   *
   * ```
   * See [Documentation](https://docs.mongodb.com/manual/reference/operator/query/lt/)

   * @param value
   * @returns
   */
  static $lt<T extends number>(value: T): { $lt: T } {
    return { $lt: value };
  }

  /**
   * $lte selects the documents where the value of the field is less than (i.e. <=) the specified value.
   *
   * ```js
   *      ComparisonQuery().$lt(45000)
   *
   * ```
   * See [Documentation](https://docs.mongodb.com/manual/reference/operator/query/lte/)
   * @param value
   * @returns
   */
  static $lte<T extends number>(value: T): { $lte: T } {
    return { $lte: value };
  }

  /**
   * Specifies equality condition. 
   * The $eq operator matches documents where the value of a field equals the specified value.
   * 
   ```js
        ComparisonQuery.$eq(45000)
        { <field>: { $eq: <value> } }

   ```

   See [Documentation](https://docs.mongodb.com/manual/reference/operator/query/eq/)
  static $eq(value: any) {
    return { $eq: value };
  }

  /**$nin selects the documents where:

    - the field value is not in the specified array or
    - the field does not exist.

    ```js
        ComparisonQuery.$nin(["appliances", "school"])
    ```
   *
   * @param value
   * @returns
   */
  static $nin<T extends number[] | string[]>(value: T): { $nin: T } {
    return { $nin: value };
  }

  /**
   * The $in operator selects the documents where the value of a field equals any value in the specified array.
   *
   * To specify an $in expression, use the following prototype:
   *
   ```js
        db.inventory.find(ComparisonQuery.toFieldObject('qty', ComparisonQuery.$in([5, 1]), ComparisonQuery.$gt(2)) )
        db.inventory.find( { qty: { $in: [ 5, 15 ] } } )
   ```
   * @param value
   * @returns
   */
  static $in<T extends unknown[]>(value: T): { $in: T } {
    return { $in: value };
  }
}
