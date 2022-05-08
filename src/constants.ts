import { ITools } from './types';

/* STAGE */
const STAGE_WIDTH_COEF = 1.2;
const STAGE_HEIGHT_COEF = 1.2;
const SCALE_BY = 1.05;

/* TOOLS */
const TOOLS: ITools = {
  SELECT: 'select',
  DRAG: 'drag',
  POLYGON: 'polygon',
};

export { STAGE_WIDTH_COEF, STAGE_HEIGHT_COEF, SCALE_BY, TOOLS };
