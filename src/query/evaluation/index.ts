import { Builder } from '../builder';

// TODO: Skipped the following [$where]. consider them later.
export class EvaluationQuery extends Builder {
  constructor() {
    super({});
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
    this.query[field] = Object.assign(
      {},
      this.query[field] ?? {},
      Object.assign(
        {},
        { $regex: value?.toString?.() },
        options ? { $options: options } : {},
      ),
    );
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
  public $mod(field: string, value: [number] | [number, number]) {
    this.query[field] = Object.assign({}, this.query[field] ?? {}, {
      $mod: value,
    });
    return this;
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
  static $text(...args: Required<Record<string, any>[]>) {
    const queries = {};
    const acceptedFields = [
      '$search',
      '$language',
      '$caseSensitive',
      '$diacriticSensitive',
    ];
    if (args.length > 0) {
      const keys = args.map(Object.keys).flat(4);
      if (!keys.includes('$search')) {
        throw new Error(`Missing field: $text requires $search`);
      }

      args.forEach((arg) => {
        const field = Object.keys(arg)[0];
        if (acceptedFields.includes(field)) {
          queries[field] = arg[field];
          return;
        }
        throw new Error(`${field} cannot be passed to $text`);
      });
      return { $text: queries };
    }

    throw new Error(`Missing field: $text requires $search`);
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
   * @throws {Error}
   */
  static $mod(value: [number] | [number, number]) {
    return { $mod: value };
  }
}
