import { ElementQuery } from './index';

describe('Element Query', () => {
  it("$type: should return {qty: { $type: 'Tonnes' }}", () => {
    expect(new ElementQuery().$type('qty', 'Tonnes').toObject()).toEqual({
      qty: { $type: 'Tonnes' },
    });
  });

  it('$exists: should return {qty: { $exists: false }}', () => {
    expect(new ElementQuery().$exists('qty', false).toObject()).toEqual({
      qty: { $exists: false },
    });
  });
});

describe('Element Query Statics', () => {
  it("$type: should return { $type: 'Tonnes' }", () => {
    expect(ElementQuery.$type('Tonnes')).toEqual({ $type: 'Tonnes' });
  });

  it('$exists: should return { $exists: false }', () => {
    expect(ElementQuery.$exists(false)).toEqual({ $exists: false });
  });
});
