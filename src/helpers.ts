import { KonvaEventObject } from 'konva/lib/Node';
import { TPosition } from './types';

function getPosition(e: KonvaEventObject<MouseEvent>): TPosition {
  return [
    e.target.getStage()!.getRelativePointerPosition()!.x,
    e.target.getStage()!.getRelativePointerPosition()!.y,
  ];
}

export { getPosition };
