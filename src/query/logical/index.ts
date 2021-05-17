import { BuilderStatics } from '../builder';

export class LogicalQuery extends BuilderStatics {
  /**
   * $and performs a logical AND operation on an array of one or more expressions (e.g. <expression1>, <expression2>, etc.) and selects the documents that satisfy all the expressions in the array. The $and operator uses short-circuit evaluation. If the first expression (e.g. <expression1>) evaluates to false,
   * MongoDB will not evaluate the remaining expressions.
   *
   *  The $and has the following syntax:
   *
   * ```js
   * LogicalQuery.$and([{ quantity: ComparisonQuery.$lt(20) }, { price: new ComparisonQuery().$lt(5000).$gt(299).toObject() }])
   *
   * { $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }
   * ```
   * @param expressions
   * @returns
   */
  static $and(expressions: Record<string, any>[]) {
    const query = { $and: expressions };
    return query;
  }

  /**
   * The $or operator performs a logical OR operation on an array of two or more <expressions> and selects the documents that satisfy at least one of the <expressions>.
   *
   * The $or has the following syntax:
   *
   * ```js
   * LogicalQuery.$or([{ quantity: ComparisonQuery.$lt(20) }, { price: new ComparisonQuery().$lt(5000).$gt(299).toObject() }])
   *
   * { $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }
   * ```
   *
   * See [Documentation](https://docs.mongodb.com/manual/reference/operator/query/or/)
   * @param expressions
   * @returns
   */
  static $or(expressions: Record<string, any>[]) {
    const query = { $or: expressions };
    return query;
  }

  /**
   * $nor performs a logical NOR operation on an array of one or more query expression and selects the documents that fail all the query expressions in the array. 
   * 
   * The $nor has the following syntax:
   * 
   * ```js
   *  LogicalQuery.$nor([{ price:1.99 }, { qty: ComparisonQuery.$lt(20) }, { sale: true }]);
   *  db.inventory.find( { $nor: [ { price: 1.99 }, { qty: { $lt: 20 } }, { sale: true } ] } );
   * 
   * { $nor: [ { <expression1> }, { <expression2> }, ...  { <expressionN> } ] }
   * 
   * ```
   * 
   * This query will select all documents in the inventory collection where:

        - the price field value does not equal 1.99 and
        - the qty field value is not less than 20 and
        - the sale field value is not equal to true
        - including those documents that do not contain these field(s).

    The exception in returning documents that do not contain the field in the $nor expression is when the $nor operator is used with the $exists operator.

    See [Documentation](https://docs.mongodb.com/manual/reference/operator/query/nor/)


   * @param expressions 
   * @returns 
   */
  static $nor(expressions: Record<string, any>[]) {
    const query = { $nor: expressions };
    return query;
  }

  /**
   * $not performs a logical NOT operation on the specified <operator-expression> and selects the documents that do not match the <operator-expression>. 
   * This includes documents that do not contain the field.
   * 
   * Consider the following query:
   * ```js
   * db.inventory.find( { price: { $not: { $gt: 1.99 } } } )
   * LogicalQuery.fromFieldObject('price', LogicalQuery.$not(ComparisonBuilder.$gt(1.99)))
   * 
   * ```
   * 
   * This query will select all documents in the inventory collection where:

     - the price field value is less than or equal to 1.99 or
     - the price field does not exist

    { $not: { $gt: 1.99 } } is different from the $lte operator. 
    { $lte: 1.99 } returns only the documents where price field exists and its value is less than or equal to 1.99.

    Remember that the $not operator only affects other operators and cannot check fields and documents independently. 
    So, use the $not operator for logical disjunctions and the $ne operator to test the contents of fields directly.


   * @param value 
   * @returns 
   */
  static $not(value: Record<string, any> | RegExp | string | number) {
    return { $not: value };
  }
}
