class QueryBuilder {
  query: Record<string, any> = {};

  /**
   *
   * @param field
   * @param value
   */
  public $gt(field: string, value: number) {
    const query = { [field]: { $gt: value } };
    this.query = Object.assign({}, this.query, query);
    return this;
  }
  /**
   *
   * @param field
   * @param value
   */
  public $gte(field: string, value: number) {
    const query = { [field]: { $gte: value } };
    this.query = Object.assign({}, this.query, query);
    return this;
  }
  public $lt(field: string, value: number) {
    const query = { [field]: { $lt: value } };
    this.query = Object.assign({}, this.query, query);
    return this;
  }
  public $lte(field: string, value: number) {
    const query = { [field]: { $lte: value } };
    this.query = Object.assign({}, this.query, query);
    return this;
  }
  public $eq(field: string, value: any) {
    const query = { [field]: { $eq: value } };
    this.query = Object.assign({}, this.query, query);
    return this;
  }
  public $ne(field: string, value: number | string) {
    const query = { [field]: { $ne: value } };
    this.query = Object.assign({}, this.query, query);
    return this;
  }

  /**
   * Select documents where the value of a field divided by a divisor has the specified remainder (i.e. perform a modulo operation to select documents). 
   * 
   * To specify a $mod expression, use the following syntax:
   ```js
        QueryBuilder.$mod([ 200, 3 ])
        QueryBuilder.$mod([ 200 ])
        { field: { $mod: [ divisor, remainder ] } }
   ```

   The $mod operator errors when passed an array with fewer or more than two elements. 
   [See Not Enough Elements Error](https://docs.mongodb.com/manual/reference/operator/query/mod/#std-label-mod-not-enough-elements) 
   and [Too Many Elements](https://docs.mongodb.com/manual/reference/operator/query/mod/#std-label-mod-too-many-elements) Error for details.


   * @param value 
   * @returns 
   */
  public $mod(field: string, value: number[]) {
    const query = { [field]: { $mod: value } };
    this.query = Object.assign({}, this.query, query);
    return this;
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
   * $nin selects the documents where: the field value is not in the specified array or the field does not exist.
   * @param field
   * @param value
   */
  public $nin(field: string, value: number[] | string[]) {
    const query = { [field]: { $nin: value } };
    this.query = Object.assign({}, this.query, query);
    return this;
  }

  /**
   * Provides regular expression capabilities for pattern matching strings in queries. MongoDB uses Perl compatible regular expressions (i.e. "PCRE" ) version 8.42 with UTF-8 support.

    To use $regex, use one of the following syntaxes:
    ```js
         const query = new QueryBuilder().$regex("continent", /Afr/, 'i');
        { <field>: { $regex: /pattern/, $options: '<options>' } }
        { <field>: { $regex: 'pattern', $options: '<options>' } }
        { <field>: { $regex: /pattern/<options> } }
    ```
   * @param field 
   * @param value 
   * @param options 
   * @returns 
   */
  public $regex(field: string, value: any, options?: string) {
    const query = {
      [field]: Object.assign(
        {},
        { $regex: value?.toString?.() },
        options ? { $options: options } : {},
      ),
    };
    this.query = Object.assign({}, this.query, query);
    return this;
  }

  /**
   * The $in operator selects the documents where the value of a field equals any value in the specified array. 
   * 
   * To specify an $in expression, use the following prototype:
   * 
   ```js
        db.inventory.find(new QueryBuilder().$in('qty', [5, 1]) )
        db.inventory.find( { qty: { $in: [ 5, 15 ] } } )
   ```
   * @param field 
   * @param value 
   * @returns 
   */
  public $in(field: string, value: any[] = []) {
    const query = { [field]: { $in: value } };
    this.query = Object.assign({}, this.query, query);
    return this;
  }

  public toArray(): Record<string, any>[] {
    const keys = Object.keys(this.query);
    return keys.map((key: string) => {
      return { [key]: this.query[key] };
    });
  }

  public fromObject(query: Record<string, any>) {
    this.query = Object.assign({}, this.query, query);
    return this;
  }

  public toObject() {
    return this.query;
  }

  public toJSON() {
    return JSON.stringify(this.query);
  }

  // Logical Operators

  public $not(field: string, value: any[] = []) {
    const query = { [field]: { $not: value } };
    this.query = Object.assign({}, this.query, query);
    return this;
  }

  static $and(expressions: Record<string, any>[]) {
    const query = { $and: expressions };
    return query;
  }

  static $or(expressions: Record<string, any>[]) {
    const query = { $or: expressions };
    return query;
  }
  static $nor(expressions: Record<string, any>[]) {
    const query = { $nor: expressions };
    return query;
  }

  static $not(value: Record<string, any> | RegExp | string | number) {
    return { $not: value };
  }

  /**
   * $text performs a text search on the content of the fields indexed with a text index. 
   * 
   * A $text expression has the following syntax:
   * 
   ```js
        QueryBuilder.$text(QueryBuilder.$search("coffee"), QueryBuilder.$caseSensitive(true))
        {
        $text: {
            $search: <string>,
            $language: <string>,
            $caseSensitive: <boolean>,
            $diacriticSensitive: <boolean>
            }
        }
   ```

   For more information see the [Documentation](https://docs.mongodb.com/manual/reference/operator/query/text/)
   * @param args 
   * @returns 
   */
  static $text(...args: Record<string, any>[]) {
    const queries = {};
    const acceptedFields = [
      '$search',
      '$language',
      '$caseSensitive',
      '$diacriticSensitive',
    ];
    if (args.length > 0) {
      args.forEach((arg) => {
        const field = Object.keys(arg)[0];
        if (acceptedFields.includes(field)) {
          queries[field] = arg[field];
          return;
        }
        throw new RangeError(`${field} cannot be passed to $text`);
      });
      return { $text: queries };
    }

    return {};
  }

  /**
   * A string of terms that MongoDB parses and uses to query the text index.
   * MongoDB performs a logical OR search of the terms unless specified as a phrase.
   * See [Behavior](https://docs.mongodb.com/manual/reference/operator/query/text/#std-label-text-query-operator-behavior) for more information on the field.
   * @param value
   * @returns
   */
  static $search(value: string) {
    return { $search: value };
  }

  /**
   * Optional. The language that determines the list of stop words for the search and the rules for the stemmer and tokenizer. 
   * If not specified, the search uses the default language of the index. 
   * For supported languages, see [Text Search Languages](https://docs.mongodb.com/manual/reference/text-search-languages/#std-label-text-search-languages).

    If you specify a language value of "none", then the text search uses simple tokenization with no list of stop words and no stemming.
   * @param value 
   * @returns 
   */
  static $language(value: string) {
    return { $language: value };
  }

  /**
   * Optional. A boolean flag to enable or disable case sensitive search. 
   * Defaults to false; i.e. the search defers to the case insensitivity of the text index.

    For more information, see [Case Insensitivity](https://docs.mongodb.com/manual/reference/operator/query/text/#std-label-text-operator-case-sensitivity).

    New in version 3.2.
   * @param value 
   * @returns 
   */
  static $caseSensitive(value: boolean) {
    return { $caseSensitive: value };
  }

  /**
   * Optional. A boolean flag to enable or disable diacritic sensitive search against [version 3 text indexes](https://docs.mongodb.com/manual/core/index-text/). 
   * Defaults to false; i.e. the search defers to the diacritic insensitivity of the text index.

    Text searches against earlier versions of the text index are inherently diacritic sensitive and cannot be diacritic insensitive. 
    As such, the $diacriticSensitive option has no effect with earlier versions of the text index.

    For more information, see [Diacritic Insensitivity](https://docs.mongodb.com/manual/reference/operator/query/text/#std-label-text-operator-diacritic-sensitivity).

    New in version 3.2.
   * @param value 
   * @returns 
   */
  static $diacriticSensitive(value: boolean) {
    return { $diacriticSensitive: value };
  }

  // Query and Projection Operators
  static $ne(value: any) {
    return { $ne: value };
  }
  static $gt(value: any) {
    return { $gt: value };
  }
  static $gte(value: any) {
    return { $gte: value };
  }
  static $lt(value: any) {
    return { $lt: value };
  }
  static $lte(value: any) {
    return { $lte: value };
  }
  static $eq(value: any) {
    return { $eq: value };
  }

  /**$nin selects the documents where:

    - the field value is not in the specified array or
    - the field does not exist.

    ```js
        QueryBuilder.$nin(["appliances", "school"])
    ```
   * 
   * @param value 
   * @returns 
   */
  static $nin(value: number[] | string[]) {
    return { $nin: value };
  }

  /**
   * Provides regular expression capabilities for pattern matching strings in queries. MongoDB uses Perl compatible regular expressions (i.e. "PCRE" ) version 8.42 with UTF-8 support.

    To use $regex, use one of the following syntaxes:
    ```js
         const query = QueryBuilder.$regex(/Afr/i,);
        { <field>: { $regex: /pattern/<options> } }
    ```
   * @param field 

   * @returns 
   */
  static $regex(value: any) {
    return { $regex: value?.toString?.() };
  }

  /**
   * The $in operator selects the documents where the value of a field equals any value in the specified array. 
   * 
   * To specify an $in expression, use the following prototype:
   * 
   ```js
        db.inventory.find(QueryBuilder.toFieldObject('qty', QueryBuilder.$in([5, 1]), QueryBuilder.$gt(2)) )
        db.inventory.find( { qty: { $in: [ 5, 15 ] } } )
   ```
   * @param field 
   * @param value 
   * @returns 
   */
  static $in(value: any[] = []) {
    return { $in: value };
  }

  /**
   * When <boolean> is true, $exists matches the documents that contain the field, including documents where the field value is null. If <boolean> is false, the query returns only the documents that do not contain the field. [1]

    MongoDB $exists does not correspond to SQL operator exists. For SQL exists, refer to the $in operator.
   * @param value 
   * @returns 
   */
  static $exists(value: boolean = true) {
    return { $exists: value };
  }

  /**
   * Allows the use of aggregation expressions within the query language.
   $expr has the following syntax:
   ```js
        db.monthlyBudget.find( QueryBuilder.$expr( QueryBuilder.toObject( QueryBuilder.$gt([ "$spent" , "$budget" ] ) ) ) )
        db.monthlyBudget.find( { $expr: { $gt: [ "$spent" , "$budget" ] } } )
        { $expr: { <expression> } }
   ```
    * @summary Behavior
   
    $expr can build query expressions that compare fields from the same document in a $match stage.

    If the $match stage is part of a $lookup stage, $expr can compare fields using let variables.
    $expr only uses indexes on the from collection for equality matches in a $match stage.
    $expr does not support multikey indexes.

   * @param expressions 
   * @returns 
   */
  static $expr(expressions: Record<string, any>) {
    return { $expr: expressions };
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

  /**
   * Select documents where the value of a field divided by a divisor has the specified remainder (i.e. perform a modulo operation to select documents). 
   * 
   * To specify a $mod expression, use the following syntax:
   ```js
        QueryBuilder.$mod([ 200, 3 ])
        QueryBuilder.$mod([ 200 ])
        { field: { $mod: [ divisor, remainder ] } }
   ```

   The $mod operator errors when passed an array with fewer or more than two elements. 
   [See Not Enough Elements Error](https://docs.mongodb.com/manual/reference/operator/query/mod/#std-label-mod-not-enough-elements) 
   and [Too Many Elements](https://docs.mongodb.com/manual/reference/operator/query/mod/#std-label-mod-too-many-elements) Error for details.


   * @param value 
   * @returns 
   */
  static $mod(value: number[]) {
    return { $mod: value };
  }

  /**
   * The $jsonSchema operator matches documents that satisfy the specified JSON Schema.

    The $jsonSchema operator expression has the following syntax:
    ```js
        { $jsonSchema: <JSON Schema object> }
        db.collection.find( { $jsonSchema: <schema> } )
        db.collection.find( { QueryBuilder.$jsonSchema({ required: [ "name", "major", "gpa", "address" ] }) } )
    ```
   * @param value 
   * @returns 
   */
  static $jsonSchema(value: Record<string, any>) {
    return { $jsonSchema: value };
  }

  /**
   * MinKey and MaxKey are used in comparison operations and exist primarily for internal use.
   * For all possible BSON element values, MinKey will always be the smallest value while MaxKey will always be the greatest value.
   * @param value
   * @returns
   */
  static $maxKey(value: number) {
    return { $maxKey: value };
  }

  /**
   * MinKey and MaxKey are used in comparison operations and exist primarily for internal use.
   * For all possible BSON element values, MinKey will always be the smallest value while MaxKey will always be the greatest value.
   * @param value
   * @returns
   */
  static $minKey(value: number) {
    return { $minKey: value };
  }

  /**
   * Given a series of query operations it returns a object combining all
   * @param args
   * @returns {Object}
   */
  static toObject(...args: Record<string, any>[]): Record<string, any> {
    if (args.length > 0) {
      return args.reduce(
        (acc: Record<string, any>, current: Record<string, any>) => {
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
            return { ...acc, ...current };
          },
          {},
        ),
      };
    }
    return {};
  }
}

const queryBuilder = new QueryBuilder();
queryBuilder
  .$lt('car_insurance', 5000)
  .$lte('insurance_fee', 4000)
  .$gt('qty', 20)
  .$gt('cost', 300)
  .$eq('country', /Slo/)
  .$regex('db', /SQL/, 'im')
  .$in('occupations', ['banker', 'realtor', 'lawyer'])
  .$ne('gender', 'male')
  .$nin('debts', [45000, 30000]);

const query = QueryBuilder.$and([
  QueryBuilder.$or(
    new QueryBuilder()
      .fromObject({
        salary_range: QueryBuilder.toObject(
          QueryBuilder.$lt(10000),
          QueryBuilder.$gt(5000),
          QueryBuilder.$exists(true),
        ),
      })
      .$lt('car_insurance', 5000)
      .$lte('insurance_fee', 4000)
      .$gt('qty', 20)
      .$gt('cost', 300)
      .toArray(),
  ),
  QueryBuilder.$or(
    new QueryBuilder()
      .fromObject({
        salary_range: QueryBuilder.toObject(
          QueryBuilder.$lt(15000),
          QueryBuilder.$gt(10000),
          QueryBuilder.$exists(true),
        ),
      })
      .$lt('car_insurance', 5000)
      .$lte('insurance_fee', 4000)
      .$gt('qty', 20)
      .$gt('cost', 300)
      .toArray(),
  ),
  QueryBuilder.$nor(
    new QueryBuilder()
      .$eq('continent', 'Asia')
      .fromObject({ retirement_date: new Date() })
      .toArray(),
  ),
  QueryBuilder.$or(queryBuilder.toArray()),
]);

// log(
//   QueryBuilder.$expr(
//     QueryBuilder.toObject(QueryBuilder.$gt(['$spent', '$budget'])),
//   ),
// );

log(QueryBuilder.$text(QueryBuilder.$search('coffee')));

function log(query: any) {
  const util = require('util');
  console.log(util.inspect(query, false, null, true /* enable colors */));
  // console.log(util.inspect(query, {showHidden: false, depth: null}));
  //   const fs = require('fs');
  //   fs.writeFile('./query-log.json', JSON.stringify(query), () => null);
}
