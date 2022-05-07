export type TPosition = [number, number];
export type TTool = 'select' | 'drag' | 'polygon';

export interface IPolygon {
  id: string;
  points: TPosition[];
  isClosed: boolean;
}

export interface ITools {
  [key: string]: TTool;
}
