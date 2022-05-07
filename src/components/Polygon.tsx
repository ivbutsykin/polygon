import { KonvaEventObject } from 'konva/lib/Node';
import { Group, Line, Circle } from 'react-konva';
import { useAppDispatch, useAppSelector } from '../hooks';
import { editPolygon, setIsMouseOverStartPoint } from '../store';
import { TOOLS } from '../constants';
import { IPolygon } from '../types';

interface IPolygonProps {
  polygon: IPolygon;
}

export default function Polygon(props: IPolygonProps) {
  const { polygon } = props;
  const { points, isClosed } = polygon;

  const dispatch = useAppDispatch();
  const { pointerPosition, tool } = useAppSelector((state) => state.canvas);

  const flattenPoints = points.flat();

  return (
    <Group>
      <Line points={flattenPoints} closed={isClosed} stroke="black" />
      {!isClosed && pointerPosition && (
        <Line
          points={[...points[points.length - 1], ...pointerPosition]}
          stroke="black"
        />
      )}
      {points.map((point, j) => {
        const pointProps =
          isClosed && tool === TOOLS.SELECT
            ? {
                onDragMove: handleDragMovePoint,
              }
            : null;

        const startPointProps =
          j === 0 && !isClosed && points.length > 2
            ? {
                onMouseOver: handleMouseOverStartPoint,
                onMouseOut: handleMouseOutStartPoint,
                onMouseDown: handleMouseDownStartPoint,
              }
            : null;

        return (
          <Circle
            key={j}
            x={point[0]}
            y={point[1]}
            radius={5}
            stroke="black"
            fill="white"
            draggable={isClosed && tool === TOOLS.SELECT}
            {...pointProps}
            {...startPointProps}
          />
        );
      })}
    </Group>
  );

  function handleDragMovePoint(e: KonvaEventObject<MouseEvent>) {
    const pointIndex = e.target.index - 1;
    const position = [e.target.attrs.x, e.target.attrs.y];
    const newPoints = [
      ...points.slice(0, pointIndex),
      position,
      ...points.slice(pointIndex + 1),
    ];

    dispatch(editPolygon({ ...polygon, points: newPoints }));
  }

  function handleMouseOverStartPoint(e: KonvaEventObject<MouseEvent>) {
    e.target.scale({ x: 2, y: 2 });

    dispatch(setIsMouseOverStartPoint(true));
  }

  function handleMouseOutStartPoint(e: KonvaEventObject<MouseEvent>) {
    e.target.scale({ x: 1, y: 1 });

    dispatch(setIsMouseOverStartPoint(false));
  }

  function handleMouseDownStartPoint(e: KonvaEventObject<MouseEvent>) {
    e.target.scale({ x: 1, y: 1 });

    dispatch(setIsMouseOverStartPoint(false));
  }
}
