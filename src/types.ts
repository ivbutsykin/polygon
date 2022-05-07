export type TPosition = [number, number];

export interface IPolygon {
  points: TPosition[];
  isClosed: boolean;
}
