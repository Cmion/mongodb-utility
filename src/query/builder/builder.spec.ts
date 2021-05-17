import { Builder, BuilderStatics } from './index';

describe('Builder Parent Class', () => {
  it('toArray: Should return a array of object in format: [ { $gt: 400 } ]', () => {
    expect(new Builder({ $gt: 400 }).toArray()).toEqual([{ $gt: 400 }]);
  });

  it('toObject: Should return an object in format: { $gt: 400 }', () => {
    expect(new Builder({ $gt: 400 }).toObject()).toEqual({ $gt: 400 });
  });

  it('toJSON: Should return a string in format: "{"$gt":400}"', () => {
    expect(new Builder({ $gt: 400 }).toJSON()).toEqual('{"$gt":400}');
  });

  it('fromObject: Should return a string in format: "{"$gt":400}"', () => {
    expect(new Builder({ $gt: 400 }).fromObject({ age: { $lte: 45 } })).toEqual(
      new Builder({ $gt: 400, age: { $lte: 45 } }),
    );
  });
});

describe('Builder Statics', () => {
  it('toObject: Should return a array of object in format: [ { $gt: 400 } ]', () => {
    expect(BuilderStatics.toObject({ $gt: 400 }, { $gte: 600 })).toEqual({
      $gt: 400,
      $gte: 600,
    });
  });

  it('toObject Error: Should throw an invalid type range', () => {
    expect(() =>
      // @ts-ignore
      BuilderStatics.toObject('qty', { $gt: 400 }),
    ).toThrow('type string cannot be passed to "toObject"');
  });

  it('toFieldObject: Should return a array of object in format: [ { $gt: 400 } ]', () => {
    expect(
      BuilderStatics.toFieldObject('price', { $gt: 400 }, { $gte: 600 }),
    ).toEqual({
      price: {
        $gt: 400,
        $gte: 600,
      },
    });
  });

  it('toFieldObject Error: Should throw an invalid type range', () => {
    expect(() =>
      BuilderStatics.toFieldObject('qty', { $gt: 400 }, [89, 99]),
    ).toThrow('type array cannot be passed to "toFieldObject"');
  });
});
