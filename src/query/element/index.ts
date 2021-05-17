import { Builder } from '../builder';

export class ElementQuery extends Builder {
  constructor() {
    super({});
  }
  /**
   * $type selects documents where the value of the field is an instance of the specified BSON type(s). Querying by data type is useful when dealing with highly unstructured data where data types are not predictable.
   * @param field
   * @param value
   * @returns
   */
  public $type(field: string, value: number | string) {
    const query = { [field]: { $type: value } };
    this.query = Object.assign({}, this.query, query);
    return this;
  }

  /**
   * When <boolean> is true, $exists matches the documents that contain the field, including documents where the field value is null. If <boolean> is false, the query returns only the documents that do not contain the field. [1]

    MongoDB $exists does not correspond to SQL operator exists. For SQL exists, refer to the $in operator.

    ```js

        new ElementQuery().$exists('sales', true)
    ```
   * @param value
   * @returns
   */
  public $exists(field: string, value: boolean) {
    const query = { [field]: { $exists: value } };
    this.query = Object.assign({}, this.query, query);
    return this;
  }

  /**
   * When <boolean> is true, $exists matches the documents that contain the field, including documents where the field value is null. If <boolean> is false, the query returns only the documents that do not contain the field. [1]

    MongoDB $exists does not correspond to SQL operator exists. For SQL exists, refer to the $in operator.

    ```js

        ElementQuery.$exists(true)
    ```
   * @param value
   * @returns
   */
  static $exists(value: boolean) {
    return { $exists: value };
  }

  /**
   * $type selects documents where the value of the field is an instance of the specified BSON type(s).
   * Querying by data type is useful when dealing with highly unstructured data where data types are not predictable.
   * @param value
   * @returns
   */
  static $type(value: number | string) {
    return { $type: value };
  }
}
