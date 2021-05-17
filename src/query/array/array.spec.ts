import { ArrayQuery } from './index';

describe('Array Query', () => {
  it("should return a object containing { $all: ['bagel', 'cheese', 'pie'] }", () => {
    expect(ArrayQuery.$all(['bagel', 'cheese', 'pie'])).toEqual({
      $all: ['bagel', 'cheese', 'pie'],
    });
  });

  it('should throw a range error for valid $all parameter', () => {
    //@ts-ignore
    expect(() => ArrayQuery.$all(90)).toThrow(
      'number cannot be passed to $all',
    );
  });

  it("should return a object containing { $size: 20 }", () => {
    expect(ArrayQuery.$size(20)).toEqual({
      $size: 20,
    });
  });

  it('should throw a range error for valid $size parameter', () => {
    //@ts-ignore
    expect(() => ArrayQuery.$size('Hello')).toThrow(
      'string cannot be passed to $size',
    );
  });

  it("should return a object containing { $elemMatch: { $gte: 80, $lt: 85 } }", () => {
    expect(ArrayQuery.$elemMatch({ $gte: 80, $lt: 85 })).toEqual({
      $elemMatch: { $gte: 80, $lt: 85 },
    });
  });

  it('should throw a range error for valid $elemMatch parameter', () => {
    //@ts-ignore
    expect(() => ArrayQuery.$elemMatch('Hello')).toThrow(
      'string cannot be passed to $elemMatch',
    );
  });
});
