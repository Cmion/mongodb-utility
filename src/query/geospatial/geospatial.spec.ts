import { GeoSpacialQuery } from './index';

describe('Geo-Spacial Query', () => {
  it('$box', () => {
    expect(
      GeoSpacialQuery.$box([
        [0, 0],
        [3, 6],
        [6, 0],
      ]),
    ).toEqual({
      $box: [
        [0, 0],
        [3, 6],
        [6, 0],
      ],
    });
  });

  it('$center', () => {
    expect(GeoSpacialQuery.$center([[120, -90], 30])).toEqual({
      $center: [[120, -90], 30],
    });
  });

  it('$centerSphere', () => {
    expect(GeoSpacialQuery.$centerSphere([[120, -90], 30])).toEqual({
      $centerSphere: [[120, -90], 30],
    });
  });

  it('$geometry 1', () => {
    expect(
      GeoSpacialQuery.$geometry({
        type: 'Polygon',
        coordinates: [
          [
            [-100, 60],
            [-100, 0],
            [-100, -60],
            [100, -60],
            [100, 60],
            [-100, 60],
          ],
        ],
        crs: {
          type: 'name',
          properties: { name: 'urn:x-mongodb:crs:strictwinding:EPSG:4326' },
        },
      }),
    ).toEqual({
      $geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-100, 60],
            [-100, 0],
            [-100, -60],
            [100, -60],
            [100, 60],
            [-100, 60],
          ],
        ],
        crs: {
          type: 'name',
          properties: { name: 'urn:x-mongodb:crs:strictwinding:EPSG:4326' },
        },
      },
    });
  });

  it('$geometry 2', () => {
    expect(
      GeoSpacialQuery.$geometry({
        type: 'Polygon',
        coordinates: [200, 220],
        crs: {
          type: 'name',
          properties: { name: 'urn:x-mongodb:crs:strictwinding:EPSG:4326' },
        },
      }),
    ).toEqual({
      $geometry: {
        type: 'Polygon',
        coordinates: [200, 220],
        crs: {
          type: 'name',
          properties: { name: 'urn:x-mongodb:crs:strictwinding:EPSG:4326' },
        },
      },
    });
  });

  it('$geometry coordinates error', () => {
    expect(() =>
      // @ts-ignore
      GeoSpacialQuery.$geometry({
        type: 'Polygon',
        crs: {
          type: 'name',
          properties: { name: 'urn:x-mongodb:crs:strictwinding:EPSG:4326' },
        },
      }),
    ).toThrow('$geometry requires the coordinates key');
  });

  it('$geometry type error', () => {
    expect(() =>
      // @ts-ignore
      GeoSpacialQuery.$geometry({
        coordinates: [
          [
            [34, 11],
            [45, 90],
            [99, 11],
          ],
        ],
        crs: {
          type: 'name',
          properties: { name: 'urn:x-mongodb:crs:strictwinding:EPSG:4326' },
        },
      }),
    ).toThrow('$geometry requires the type key');
  });

  it('$geometry invalid key error', () => {
    expect(() =>
      GeoSpacialQuery.$geometry({
        type: 'Polygon',
        coordinates: [
          [
            [-100, 60],
            [-100, 0],
            [-100, -60],
            [100, -60],
            [100, 60],
            [-100, 60],
          ],
        ],
        crs: {
          type: 'name',
          properties: { name: 'urn:x-mongodb:crs:strictwinding:EPSG:4326' },
        },
        // @ts-ignore
        age: 34,
      }),
    ).toThrow('Invalid key passed to $geometry');
  });

  it('$near', () => {
    expect(
      GeoSpacialQuery.$near(
        GeoSpacialQuery.$maxDistance(1.55),
        GeoSpacialQuery.$minDistance(0.25),
        GeoSpacialQuery.$geometry({
          type: 'Point',
          coordinates: [
            [
              [34, 11],
              [45, 90],
              [99, 11],
            ],
          ],
        }),
      ),
    ).toEqual({
      $near: {
        $maxDistance: 1.55,
        $minDistance: 0.25,
        $geometry: {
          type: 'Point',
          coordinates: [
            [
              [34, 11],
              [45, 90],
              [99, 11],
            ],
          ],
        },
      },
    });
  });

  it('$near invalid parameter error', () => {
    expect(() =>
      GeoSpacialQuery.$near(
        GeoSpacialQuery.$maxDistance(1.55),
        GeoSpacialQuery.$box([[344]]),
      ),
    ).toThrow('$box cannot be passed to $near');
  });

  it('$near invalid type error', () => {
    expect(() =>
      GeoSpacialQuery.$near(
        GeoSpacialQuery.$maxDistance(1.55),
        // @ts-ignore
        890,
      ),
    ).toThrow('type number cannot be passed to $near');
  });

  it('$nearSphere', () => {
    expect(
      GeoSpacialQuery.$nearSphere(
        GeoSpacialQuery.$maxDistance(1.55),
        GeoSpacialQuery.$minDistance(0.25),
        GeoSpacialQuery.$geometry({
          type: 'Point',
          coordinates: [
            [
              [34, 11],
              [45, 90],
              [99, 11],
            ],
          ],
        }),
      ),
    ).toEqual({
      $nearSphere: {
        $maxDistance: 1.55,
        $minDistance: 0.25,
        $geometry: {
          type: 'Point',
          coordinates: [
            [
              [34, 11],
              [45, 90],
              [99, 11],
            ],
          ],
        },
      },
    });
  });

  it('$nearSphere invalid parameter error', () => {
    expect(() =>
      GeoSpacialQuery.$nearSphere(
        GeoSpacialQuery.$maxDistance(1.55),
        GeoSpacialQuery.$box([[344]]),
      ),
    ).toThrow('$box cannot be passed to $nearSphere');
  });

  it('$nearSphere invalid type error', () => {
    expect(() =>
      GeoSpacialQuery.$nearSphere(
        GeoSpacialQuery.$maxDistance(1.55),
        // @ts-ignore
        890,
      ),
    ).toThrow('type number cannot be passed to $nearSphere');
  });

  it('$maxDistance', () => {
    expect(GeoSpacialQuery.$maxDistance(200)).toEqual({ $maxDistance: 200 });
  });

  it('$minDistance', () => {
    expect(GeoSpacialQuery.$minDistance(200)).toEqual({ $minDistance: 200 });
  });

  it('$polygon', () => {
    expect(
      GeoSpacialQuery.$polygon([
        [0, 0],
        [3, 6],
        [6, 0],
      ]),
    ).toEqual({
      $polygon: [
        [0, 0],
        [3, 6],
        [6, 0],
      ],
    });
  });

  it('$geoIntersects', () => {
    expect(
      GeoSpacialQuery.$geoIntersects(
        GeoSpacialQuery.$geometry({
          type: 'Polygon',
          coordinates: [
            [
              [0, 0],
              [3, 6],
              [6, 1],
              [0, 0],
            ],
          ],
        }),
      ),
    ).toEqual({
      $geoIntersects: {
        $geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [0, 0],
              [3, 6],
              [6, 1],
              [0, 0],
            ],
          ],
        },
      },
    });
  });

  it('$geoIntersects invalid parameter type error', () => {
    // @ts-ignore
    expect(() => GeoSpacialQuery.$geoIntersects(566)).toThrow(
      'type number cannot be passed to $geoIntersects',
    );
  });

  it('$geoIntersects invalid parameter type error', () => {
    expect(() =>
      GeoSpacialQuery.$geoIntersects(
        GeoSpacialQuery.$box([
          [0, 0],
          [4, 2],
        ]),
      ),
    ).toThrow('$box cannot be passed to $geoIntersects');
  });

  it('$geoWithin', () => {
    expect(
      GeoSpacialQuery.$geoWithin(
        GeoSpacialQuery.$geometry({
          type: 'Polygon',
          coordinates: [
            [
              [0, 0],
              [3, 6],
              [6, 1],
              [0, 0],
            ],
          ],
        }),
      ),
    ).toEqual({
      $geoWithin: {
        $geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [0, 0],
              [3, 6],
              [6, 1],
              [0, 0],
            ],
          ],
        },
      },
    });
  });

  it('$geoWithin invalid parameter type error', () => {
    // @ts-ignore
    expect(() => GeoSpacialQuery.$geoWithin(566)).toThrow(
      'type number cannot be passed to $geoWithin',
    );
  });

  it('$geoWithin invalid parameter type error', () => {
    expect(() =>
      GeoSpacialQuery.$geoWithin(GeoSpacialQuery.$maxDistance(67)),
    ).toThrow('$maxDistance is not a valid shape operator for $geoWithin');
  });

  it('$geoWithin parameter $box', () => {
    expect(
      GeoSpacialQuery.$geoWithin(
        GeoSpacialQuery.$box([
          [0, 0],
          [3, 6],
          [6, 1],
          [0, 0],
        ]),
      ),
    ).toEqual({
      $geoWithin: {
        $box: [
          [0, 0],
          [3, 6],
          [6, 1],
          [0, 0],
        ],
      },
    });
  });

  it('$geoWithin parameter $polygon', () => {
    expect(
      GeoSpacialQuery.$geoWithin(
        GeoSpacialQuery.$polygon([
          [0, 0],
          [3, 6],
          [6, 0],
        ]),
      ),
    ).toEqual({
      $geoWithin: {
        $polygon: [
          [0, 0],
          [3, 6],
          [6, 0],
        ],
      },
    });
  });

  it('$geoWithin parameter $center', () => {
    expect(
      GeoSpacialQuery.$geoWithin(GeoSpacialQuery.$center([[120, -90], 30])),
    ).toEqual({
      $geoWithin: {
        $center: [[120, -90], 30],
      },
    });
  });

  it('$geoWithin parameter $centerSphere', () => {
    expect(
      GeoSpacialQuery.$geoWithin(
        GeoSpacialQuery.$centerSphere([[120, -90], 30]),
      ),
    ).toEqual({
      $geoWithin: {
        $centerSphere: [[120, -90], 30],
      },
    });
  });
});
