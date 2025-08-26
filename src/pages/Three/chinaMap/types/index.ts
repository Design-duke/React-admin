export interface GeoJSONFeature {
  type: "Feature";
  properties: {
    acroutes: number[];
    adcode: number;
    center: number[];
    centroid: number[];
    childrenNum: number;
    level: string;
    name: string;
    parent: { adcode: number };
    subFeatureIndex: number;
    [key: string]: any;
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}

export interface GeoJSONData {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}
