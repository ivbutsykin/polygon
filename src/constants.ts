import { ITools } from './types';

/* STAGE */
const STAGE_WIDTH = window.innerWidth / 1.2;
const STAGE_HEIGHT = window.innerHeight / 1.2;
const SCALE_BY = 1.05;

/* TOOLS */
const TOOLS: ITools = {
  DRAG: 'drag',
  POLYGON: 'polygon',
};

export { STAGE_WIDTH, STAGE_HEIGHT, SCALE_BY, TOOLS };
