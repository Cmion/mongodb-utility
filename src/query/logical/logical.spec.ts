import { ComparisonQuery } from '../comparison';
import { LogicalQuery } from './index';

describe('Logical Query', () => {
  it('$or', () => {
    expect(
      LogicalQuery.$or([
        new ComparisonQuery()
          .$eq('name', 'Fred')
          .$gt('age', 20)
          .$lte('age', 30)
          .toObject(),
        new ComparisonQuery()
          .$eq('name', 'Fred')
          .$gt('age', 30)
          .$lte('age', 50)
          .toObject(),
      ]),
    ).toEqual({
      $or: [
        { name: { $eq: 'Fred' }, age: { $gt: 20, $lte: 30 } },
        { name: { $eq: 'Fred' }, age: { $gt: 30, $lte: 50 } },
      ],
    });
  });

  it('$and', () => {
    expect(
      LogicalQuery.$and([
        LogicalQuery.$or([
          new ComparisonQuery()
            .$eq('name', 'Fred')
            .$gt('age', 20)
            .$lte('age', 30)
            .toObject(),
          new ComparisonQuery()
            .$eq('name', 'Fred')
            .$gt('age', 30)
            .$lte('age', 50)
            .toObject(),
        ]),
        LogicalQuery.$or([
          new ComparisonQuery()
            .$eq('name', 'Johnes')
            .$gt('age', 20)
            .$lte('age', 30)
            .toObject(),
          new ComparisonQuery()
            .$eq('name', 'Johnes')
            .$gt('age', 30)
            .$lte('age', 50)
            .toObject(),
        ]),
      ]),
    ).toEqual({
      $and: [
        {
          $or: [
            { name: { $eq: 'Fred' }, age: { $gt: 20, $lte: 30 } },
            { name: { $eq: 'Fred' }, age: { $gt: 30, $lte: 50 } },
          ],
        },
        {
          $or: [
            { name: { $eq: 'Johnes' }, age: { $gt: 20, $lte: 30 } },
            { name: { $eq: 'Johnes' }, age: { $gt: 30, $lte: 50 } },
          ],
        },
      ],
    });
  });

  it('$nor', () => {
    // LogicalQuery.toFieldObject(
    //     'price',
    //     ComparisonQuery.$lte(20000),
    //     ComparisonQuery.$gt(5000),
    //     ComparisonQuery.$ne(15000),
    //   );
    expect(
      LogicalQuery.$nor(
        new ComparisonQuery()
          .$lte('price', 20000)
          .$gt('price', 5000)
          .$ne('price', 15000)
          .$lt('qty', 20)
          .fromObject({ sale: true })
          .toArray(),
      ),
    ).toEqual({
      $nor: [
        { price: { $lte: 20000, $gt: 5000, $ne: 15000 } },
        { qty: { $lt: 20 } },
        { sale: true },
      ],
    });
  });

  it('$not', () => {
    expect(
      LogicalQuery.toFieldObject(
        'price',
        LogicalQuery.$not(
          LogicalQuery.toObject(
            ComparisonQuery.$gt(20),
            ComparisonQuery.$lte(5),
          ),
        ),
      ),
    ).toEqual({
      price: { $not: { $gt: 20, $lte: 5 } },
    });
  });
});
