export type TPosition = [number, number];
export type TTool = 'polygon' | 'drag';

export interface IPolygon {
  points: TPosition[];
  isClosed: boolean;
}

export interface ITools {
  [key: string]: TTool;
}
