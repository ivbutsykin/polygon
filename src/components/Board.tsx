import { KonvaEventObject } from 'konva/lib/Node';
import { ReactReduxContext, Provider } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import Polygon from './Polygon';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  setPolygon,
  addPolygonPoint,
  resetPolygon,
  setPointerPosition,
  addPolygon,
} from '../store';
import { getPosition } from '../helpers';
import { STAGE_WIDTH, STAGE_HEIGHT, SCALE_BY, TOOLS } from '../constants';

export default function Board() {
  const dispatch = useAppDispatch();
  const { polygons } = useAppSelector((state) => state.polygons);
  const { polygon, isMouseOverStartPoint } = useAppSelector(
    (state) => state.polygon
  );
  const { tool } = useAppSelector((state) => state.user);

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
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
              {polygon && <Polygon polygon={polygon} />}
            </Layer>
          </Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  );

  function handleMouseDown(e: KonvaEventObject<MouseEvent>) {
    switch (tool) {
      case TOOLS.POLYGON:
        const point = getPosition(e);

        if (!polygon) {
          dispatch(setPolygon({ points: [point], isClosed: false }));
          break;
        }

        if (isMouseOverStartPoint) {
          dispatch(addPolygon({ points: polygon.points, isClosed: true }));
          dispatch(resetPolygon());
          break;
        }

        dispatch(addPolygonPoint(point));
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
      case TOOLS.POLYGON:
        return 'crosshair';
      case TOOLS.DRAG:
        return 'grab';
      default:
        return 'default';
    }
  }
}
