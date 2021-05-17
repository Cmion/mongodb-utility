import { ComparisonQuery } from './index';

describe('Comparison Query Class Object', () => {
  it("$eq: should return {name: {$eq: 'John'}}", () => {
    expect(new ComparisonQuery().$eq('name', 'John').toObject()).toEqual({
      name: { $eq: 'John' },
    });
  });

  it('$gt: should return {qty: {$gt: 400}}', () => {
    expect(new ComparisonQuery().$gt('qty', 400).toObject()).toEqual({
      qty: { $gt: 400 },
    });
  });

  it('$gte: should return {qty: {$gte: 400}}', () => {
    expect(new ComparisonQuery().$gte('qty', 400).toObject()).toEqual({
      qty: { $gte: 400 },
    });
  });

  it('$lt: should return {qty: {$lt: 400}}', () => {
    expect(new ComparisonQuery().$lt('qty', 400).toObject()).toEqual({
      qty: { $lt: 400 },
    });
  });

  it('$lte: should return {qty: {$lte: 400}}', () => {
    expect(new ComparisonQuery().$lte('qty', 400).toObject()).toEqual({
      qty: { $lte: 400 },
    });
  });

  it('$ne: should return {qty: {$ne: 400}}', () => {
    expect(new ComparisonQuery().$ne('qty', 400).toObject()).toEqual({
      qty: { $ne: 400 },
    });
  });

  it('$nin: should return {qty: {$nin: [ 5, 15 ]}}', () => {
    expect(new ComparisonQuery().$nin('qty', [5, 15]).toObject()).toEqual({
      qty: { $nin: [5, 15] },
    });
  });
});

describe('Comparison Query Statics', () => {
  it("$eq: should return {$eq: 'John'}", () => {
    expect(ComparisonQuery.$eq('John')).toEqual({
      $eq: 'John',
    });
  });

  it('$gt: should return {$gt: 400}', () => {
    expect(ComparisonQuery.$gt(400)).toEqual({
      $gt: 400,
    });
  });

  it('$gte: should return {$gte: 400}', () => {
    expect(ComparisonQuery.$gte(400)).toEqual({
      $gte: 400,
    });
  });

  it('$lt: should return {$lt: 400}', () => {
    expect(ComparisonQuery.$lt(400)).toEqual({
      $lt: 400,
    });
  });

  it('$lte: should return {$lte: 400}', () => {
    expect(ComparisonQuery.$lte(400)).toEqual({
      $lte: 400,
    });
  });

  it('$ne: should return {qty: {$ne: 400}}', () => {
    expect(ComparisonQuery.$ne(400)).toEqual({
      $ne: 400,
    });
  });

  it('$nin: should return {$nin: [ 5, 15 ]}', () => {
    expect(ComparisonQuery.$nin([5, 15])).toEqual({
      $nin: [5, 15],
    });
  });
});
