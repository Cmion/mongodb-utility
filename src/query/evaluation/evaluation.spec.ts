import { EvaluationQuery } from './index';

describe('Evaluation Query', () => {
  it('$regex: return {name: {$regex: /Dan/}}', () => {
    expect(
      new EvaluationQuery().$regex('name', /Dan/.toString(), 'im').toObject(),
    ).toEqual({
      name: { $regex: /Dan/.toString(), $options: 'im' },
    });
  });

  it('$mod: return {population: {$mod: [200, 4]}}', () => {
    expect(
      new EvaluationQuery().$mod('population', [200, 4]).toObject(),
    ).toEqual({
      population: { $mod: [200, 4] },
    });
  });
});

describe('Evaluation Query Statics', () => {
  it('$regex: return {$regex: /Dan/}', () => {
    expect(EvaluationQuery.$regex(/Dan/.toString())).toEqual({
      $regex: /Dan/.toString(),
    });
  });

  it('$mod: return {$mod: [200, 4]}', () => {
    expect(EvaluationQuery.$mod([200, 4])).toEqual({ $mod: [200, 4] });
  });

  it('$expr: return {$expr: { $gt: [ "$spent" , "$budget" ] } }', () => {
    expect(EvaluationQuery.$expr({ $gt: ['$spent', '$budget'] })).toEqual({
      $expr: { $gt: ['$spent', '$budget'] },
    });
  });

  it('$jsonSchema: return {$jsonSchema: { required: [ "name", "major", "gpa", "address" ] } }', () => {
    expect(
      EvaluationQuery.$jsonSchema({
        required: ['name', 'major', 'gpa', 'address'],
      }),
    ).toEqual({
      $jsonSchema: { required: ['name', 'major', 'gpa', 'address'] },
    });
  });

  it('$minKey: return {$minKey: 1}', () => {
    expect(EvaluationQuery.$minKey(1)).toEqual({ $minKey: 1 });
  });

  it('$maxKey: return {$maxKey: 1}', () => {
    expect(EvaluationQuery.$maxKey(1)).toEqual({ $maxKey: 1 });
  });

  it('$diacriticSensitive: return {$diacriticSensitive: false}', () => {
    expect(EvaluationQuery.$diacriticSensitive(false)).toEqual({
      $diacriticSensitive: false,
    });
  });

  it('$caseSensitive: return {$caseSensitive: true}', () => {
    expect(EvaluationQuery.$caseSensitive(true)).toEqual({
      $caseSensitive: true,
    });
  });

  it("$language: return {$language: 'en'}", () => {
    expect(EvaluationQuery.$language('en')).toEqual({ $language: 'en' });
  });

  it("$search: return {$search: 'coffee'}", () => {
    expect(EvaluationQuery.$search('coffee')).toEqual({ $search: 'coffee' });
  });

  it('$text Error: throw a missing field error [No input passed]', () => {
    expect(() => EvaluationQuery.$text()).toThrow(
      'Missing field: $text requires $search',
    );
  });

  it('$text: throw a missing field error [$search not passed]', () => {
    expect(() =>
      EvaluationQuery.$text(
        EvaluationQuery.$language('en'),
        EvaluationQuery.$caseSensitive(true),
      ),
    ).toThrow('Missing field: $text requires $search');
  });

  it("$text: return {$text: {$search: 'coffee',$language: 'en',$caseSensitive: true,$diacriticSensitive: false}}", () => {
    expect(
      EvaluationQuery.$text(
        EvaluationQuery.$search('coffee'),
        EvaluationQuery.$language('en'),
        EvaluationQuery.$caseSensitive(true),
        EvaluationQuery.$diacriticSensitive(false),
      ),
    ).toEqual({
      $text: {
        $search: 'coffee',
        $language: 'en',
        $caseSensitive: true,
        $diacriticSensitive: false,
      },
    });
  });
});
