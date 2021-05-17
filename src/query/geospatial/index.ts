import { BuilderStatics } from '../builder';
import { has, isPlainObject } from 'lodash';
import { decipherType } from '../../utils/decipher-type';

interface Geometry {
  type: string;
  coordinates: Array<Array<number[]>> | number[] | Array<number[]>;
  crs?: { type: string; properties: Record<string, any> };
}
export class GeoSpacialQuery extends BuilderStatics {
  /**
     * Selects documents whose geospatial data intersects with a specified GeoJSON object; 
     * i.e. where the intersection of the data and the specified object is non-empty.

       The $geoIntersects operator uses the $geometry operator to specify the GeoJSON object. 
       To specify a GeoJSON polygons or multipolygons using the default coordinate reference system (CRS), 
       use the following syntax:

       ```json
            {
            <location field>: {
                $geoIntersects: {
                    $geometry: {
                    type: "<GeoJSON object type>" ,
                    coordinates: [ <coordinates> ]
                    }
                }
            }
            }

       ```
     * @param value 
     */
  static $geoIntersects(value: Record<string, any>) {
    if (!isPlainObject(value)) {
      throw new Error(
        `type ${decipherType(value)} cannot be passed to $geoIntersects`,
      );
    }

    const key = Object.keys(value)[0];
    if (key !== '$geometry') {
      throw new Error(`${key} cannot be passed to $geoIntersects`);
    }
    return { $geoIntersects: value };
  }

  /**
   * Geometry type that can be passed to $geometry
   * @param value
   * @returns
   */
  static geometryType(value: string) {
    return { type: value };
  }

  /**
   * Returns an array of coordinates for readability
   * @param value Coordinate value
   * @returns
   */
  static coordinates<
    T extends Array<Array<number[]>> | number[] | Array<number[]>,
  >(value: T): { coordinates: T } {
    return { coordinates: value };
  }

  /**
   * The $geometry operator specifies a GeoJSON geometry for use with the following geospatial query operators: $geoWithin, $geoIntersects, $near, and $nearSphere. $geometry uses EPSG:4326 as the default coordinate reference system (CRS).

   * @param value 
   * @returns 
   */
  static $geometry(value: Geometry): {
    $geometry: Geometry;
  } {
    const keys = Object.keys(value);

    if (!has(value, 'type')) {
      throw new Error('$geometry requires the type key');
    }

    if (!has(value, 'coordinates')) {
      throw new Error('$geometry requires the coordinates key');
    }

    const acceptedFields = ['coordinates', 'type', 'crs'];

    if (!keys.every((key) => acceptedFields.includes(key))) {
      throw new Error('Invalid key passed to $geometry');
    }

    return {
      $geometry: value,
    };
  }

  /**
   * The $maxDistance operator constrains the results of a geospatial $near or $nearSphere query to the specified distance. 
   * The measuring units for the maximum distance are determined by the coordinate system in use. 
   * For GeoJSON point objects, specify the distance in meters, not radians. 
   * You must specify a non-negative number for $maxDistance.

    The 2dsphere and 2d geospatial indexes both support $maxDistance: .
   * @param value 
   */
  static $maxDistance(value: number) {
    return { $maxDistance: value };
  }

  /**
* Filters the results of a geospatial $near or $nearSphere query to those documents that are at least the specified distance from the center point.

* If $near or $nearSphere query specifies the center point as a GeoJSON point, specify the distance as a non-negative number in meters.

* If $nearSphere query specifies the center point as legacy coordinate pair, 
specify the distance as a non-negative number in radians. 
$near can only use the 2dsphere index if the query specifies the center point as a GeoJSON point.


   * @param value 
   */
  static $minDistance(value: number) {
    return { $minDistance: value };
  }

  /**
   * The $polygon operator calculates distances using flat (planar) geometry.

   * Applications can use $polygon without having a geospatial index. However, geospatial indexes support much faster queries than the unindexed equivalents.

   * Only the 2d geospatial index supports the $polygon operator.

  ```js
    GeoSpatialQuery.$polygon([ [ 0 , 0 ], [ 3 , 6 ], [ 6 , 0 ] ])

  ```

   * @param value 
   * @returns 
   */
  static $polygon(value: Array<number[]>) {
    return { $polygon: value };
  }

  /**
   * Specifies a rectangle for a geospatial $geoWithin query to return documents that are within the bounds of the rectangle, according to their point-based location data. When used with the $box operator, $geoWithin returns documents based on grid coordinates and does not query for GeoJSON shapes.

    To use the $box operator, you must specify the bottom left and top right corners of the rectangle in an array object:

    ***If you use longitude and latitude, specify longitude first***
  ```js
    GeoSpatialQuery.$box([ [ 0 , 0 ], [ 3 , 6 ], [ 6 , 0 ] ])

  ```

   * @param value 
   * @returns 
   */
  static $box(value: Array<number[]>) {
    return { $box: value };
  }

  /**
   * Defines a circle for a geospatial query that uses spherical geometry. 
   * The query returns documents that are within the bounds of the circle. 
   * You can use the $centerSphere operator on both GeoJSON objects and legacy coordinate pairs.

    To use $centerSphere, specify an array that contains:

    - The grid coordinates of the circle's center point, and
    - The circle's radius measured in radians. 
    - To calculate radians, see Calculate Distance Using Spherical Geometry.

    ```ts

        GeoSpatialQuery.$centerSphere([ [ -88, 30 ], 10/3963.2 ])
    ```
   * @param value 
   * @returns 
   */
  static $centerSphere(value: [number[], number]) {
    return { $centerSphere: value };
  }

  /**
   * The $center operator specifies a circle for a $geoWithin query. 
   * The query returns legacy coordinate pairs that are within the bounds of the circle. 
   * The operator does not return GeoJSON objects.

    To use the $center operator, specify an array that contains:

        - The grid coordinates of the circle's center point, and
        - The circle's radius, as measured in the units used by the coordinate system.

    ```ts

        GeoSpatialQuery.$center([ [ -88, 30 ], 10/3963.2 ])
    ```
   * @param value 
   * @returns 
   */
  static $center(value: [number[], number]) {
    return { $center: value };
  }

  /**
   * Specifies a point for which a geospatial query returns the documents from nearest to farthest. MongoDB calculates distances for $nearSphere using spherical geometry.

    $nearSphere requires a geospatial index:

    - 2dsphere index for location data defined as GeoJSON points
    - 2d index for location data defined as legacy coordinate pairs. To use a 2d index on GeoJSON points, create the index on the coordinates field of the GeoJSON object.

    The $nearSphere operator specifies a GeoJSON point

    ```ts
        GeoSpatialQuery.$nearSphere(
            GeoSpatialQuery.$geometry(
                { type : "Point", coordinates : [ -73.9667, 40.78 ]}
                ),
            GeoSpatialQuery.$maxDistance(5000),
            GeoSpatialQuery.$minDistance(1000),
        )

    ```
   * @param args 
   * @returns 
   */
  static $nearSphere(...args: Record<string, any>[]) {
    const queries = {};
    const acceptedFields = ['$geometry', '$minDistance', '$maxDistance'];
    if (args.length > 0) {
      args.forEach((arg) => {
        if (isPlainObject(arg)) {
          const field = Object.keys(arg)[0];
          if (acceptedFields.includes(field)) {
            queries[field] = arg[field];
            return;
          }
          throw new Error(`${field} cannot be passed to $nearSphere`);
        }
        throw new Error(
          `type ${decipherType(arg)} cannot be passed to $nearSphere`,
        );
      });
      return { $nearSphere: queries };
    }

    return {};
  }

  /**
   * Specifies a point for which a geospatial query returns the documents from nearest to farthest. The $near operator can specify either a GeoJSON point or legacy coordinate point.

    $near requires a geospatial index:

    - 2dsphere index if specifying a GeoJSON point,

    To specify a GeoJSON point, $near operator requires a 2dsphere index and has the following syntax:

    If specifying latitude and longitude coordinates, list the longitude first and then latitude:

    - Valid longitude values are between -180 and 180, both inclusive.
    - Valid latitude values are between -90 and 90, both inclusive.
    - When specifying a GeoJSON point, you can use the optional $minDistance and $maxDistance specifications to limit the $near results by distance in meters:

    $minDistance limits the results to those documents that are at least the specified distance from the center point.
    $maxDistance limits the results to those documents that are at most the specified distance from the center point.

    ```ts
        GeoSpatialQuery.$near(
            GeoSpatialQuery.$geometry(
                { type : "Point", coordinates : [ -73.9667, 40.78 ]}
                ),
            GeoSpatialQuery.$maxDistance(5000),
            GeoSpatialQuery.$minDistance(1000),
        )

    ```

   * @param args 
   * @returns 
   */
  static $near(...args: Record<string, any>[]) {
    const queries = {};
    const acceptedFields = ['$geometry', '$minDistance', '$maxDistance'];
    if (args.length > 0) {
      args.forEach((arg) => {
        if (isPlainObject(arg)) {
          const field = Object.keys(arg)[0];
          if (acceptedFields.includes(field)) {
            queries[field] = arg[field];
            return;
          }
          throw new Error(`${field} cannot be passed to $near`);
        }
        throw new Error(`type ${decipherType(arg)} cannot be passed to $near`);
      });
      return { $near: queries };
    }

    return {};
  }

  /**
   * Selects documents with geospatial data that exists entirely within a specified shape.

    The specified shape can be either a GeoJSON Polygon (either single-ringed or multi-ringed), a GeoJSON MultiPolygon, or a shape defined by legacy coordinate pairs. 
    The $geoWithin operator uses the $geometry operator to specify the GeoJSON object.
   * @param value 
   * @returns 
   */
  static $geoWithin(value: Record<string, any>) {
    if (!isPlainObject(value)) {
      throw new Error(
        `type ${decipherType(value)} cannot be passed to $geoWithin`,
      );
    }

    const acceptedFields = [
      '$box',
      '$polygon',
      '$center',
      '$centerSphere',
      '$geometry',
    ];
    const key = Object.keys(value)[0];
    if (!acceptedFields.includes(key)) {
      throw new Error(`${key} is not a valid shape operator for $geoWithin`);
    }

    return { $geoWithin: value };
  }
}
