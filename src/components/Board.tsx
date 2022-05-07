import { KonvaEventObject } from 'konva/lib/Node';
import { Provider, useStore } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import { v4 as uuid } from 'uuid';
import Polygon from './Polygon';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  setNewShape,
  addNewShapePoint,
  resetNewShape,
  setPointerPosition,
  addPolygon,
} from '../store';
import { getPosition } from '../helpers';
import { STAGE_WIDTH, STAGE_HEIGHT, SCALE_BY, TOOLS } from '../constants';

export default function Board() {
  const dispatch = useAppDispatch();
  const {
    present: { polygons },
  } = useAppSelector((state) => state.polygons);
  const { newShape, isMouseOverStartPoint } = useAppSelector(
    (state) => state.newShape
  );
  const { tool } = useAppSelector((state) => state.canvas);
  const store = useStore();

  return (
    <Stage
      width={STAGE_WIDTH}
      height={STAGE_HEIGHT}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      draggable={isDraggable()}
      style={{
        backgroundColor: '#fafafa',
        maxWidth: STAGE_WIDTH,
        cursor: getCursor(),
      }}
    >
      <Provider store={store}>
        <Layer>
          {polygons.map((p, i) => (
            <Polygon key={i} polygon={p} />
          ))}
          {newShape && <Polygon polygon={newShape} />}
        </Layer>
      </Provider>
    </Stage>
  );

  function handleMouseDownPolygon(e: KonvaEventObject<MouseEvent>) {
    const point = getPosition(e);

    if (!newShape) {
      dispatch(setNewShape({ id: uuid(), points: [point], isClosed: false }));
      return;
    }

    if (isMouseOverStartPoint) {
      dispatch(
        addPolygon({
          id: newShape.id,
          points: newShape.points,
          isClosed: true,
        })
      );
      dispatch(resetNewShape());
      return;
    }

    dispatch(addNewShapePoint(point));
  }

  function handleMouseDown(e: KonvaEventObject<MouseEvent>) {
    switch (tool) {
      case TOOLS.POLYGON:
        handleMouseDownPolygon(e);
        break;
      default:
        break;
    }
  }

  function handleWheel(e: KonvaEventObject<WheelEvent>) {
    e.evt.preventDefault();

    const stage = e.target.getStage();

    if (!stage) {
      return;
    }

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer!.x - stage.x()) / oldScale,
      y: (pointer!.y - stage.y()) / oldScale,
    };

    const newScale =
      e.evt.deltaY > 0 ? oldScale / SCALE_BY : oldScale * SCALE_BY;

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer!.x - mousePointTo.x * newScale,
      y: pointer!.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
  }

  function handleMouseMove(e: KonvaEventObject<MouseEvent>) {
    const position = getPosition(e);

    dispatch(setPointerPosition(position));
  }

  function isDraggable() {
    switch (tool) {
      case TOOLS.POLYGON:
        return false;
      case TOOLS.DRAG:
        return true;
      default:
        return false;
    }
  }

  function getCursor() {
    switch (tool) {
      case TOOLS.SELECT:
        return 'default';
      case TOOLS.POLYGON:
        return 'crosshair';
      case TOOLS.DRAG:
        return 'grab';
      default:
        return 'default';
    }
  }
}
