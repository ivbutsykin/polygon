import { useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { Stage, Layer, Group, Line, Circle } from 'react-konva';

interface IPolygon {
  points: TPosition[];
  isClosed: boolean;
}

type TPosition = [number, number];

export default function Board() {
  const [polygons, setPolygons] = useState<IPolygon[]>([]);

  const [pointerPosition, setPointerPosition] = useState<TPosition | null>(
    null
  );
  const [isMouseOverStartPoint, setIsMouseOverStartPoint] = useState(false);

  return (
    <Stage
      width={window.innerWidth / 1.2}
      height={window.innerHeight / 1.2}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      style={{
        backgroundColor: '#fafafa',
        maxWidth: window.innerWidth / 1.2,
      }}
    >
      <Layer>
        {polygons.map((polygon, i) => {
          const flattenPoints = polygon.points.flat();

          return (
            <Group key={i}>
              <Line
                points={flattenPoints}
                closed={polygon.isClosed}
                stroke="black"
              />
              {!polygon.isClosed && pointerPosition && (
                <Line
                  points={[
                    ...polygon.points[polygon.points.length - 1],
                    ...pointerPosition,
                  ]}
                  stroke="black"
                />
              )}
              {polygon.points.map((point, j) => {
                const startPointProps =
                  j === 0 && !polygon.isClosed && polygon.points.length > 2
                    ? {
                        onMouseOver: handleMouseOverStartAnchor,
                        onMouseOut: handleMouseOutStartAnchor,
                        onMouseDown: handleMouseDownStartAnchor,
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
                    {...startPointProps}
                  />
                );
              })}
            </Group>
          );
        })}
      </Layer>
    </Stage>
  );

  function handleMouseDown(e: KonvaEventObject<MouseEvent>) {
    const polygonsCopy = [...polygons];
    const lastPolygonIndex = polygonsCopy.length - 1;
    const lastPolygon = polygonsCopy[lastPolygonIndex];
    const point = getPosition(e);

    if (!polygonsCopy.length || lastPolygon.isClosed) {
      setPolygons([...polygons, { points: [point], isClosed: false }]);
      return;
    }

    if (isMouseOverStartPoint) {
      polygonsCopy.splice(lastPolygonIndex, 1, {
        ...lastPolygon,
        isClosed: true,
      });

      setPolygons(polygonsCopy);
      return;
    }

    polygonsCopy.splice(lastPolygonIndex, 1, {
      ...lastPolygon,
      points: [...lastPolygon.points, point],
    });

    setPolygons(polygonsCopy);
  }

  function handleMouseOverStartAnchor(e: KonvaEventObject<MouseEvent>) {
    e.target.scale({ x: 2, y: 2 });

    setIsMouseOverStartPoint(true);
  }

  function handleMouseOutStartAnchor(e: KonvaEventObject<MouseEvent>) {
    e.target.scale({ x: 1, y: 1 });

    setIsMouseOverStartPoint(false);
  }

  function handleMouseDownStartAnchor(e: KonvaEventObject<MouseEvent>) {
    e.target.scale({ x: 1, y: 1 });

    setIsMouseOverStartPoint(false);
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

    const scaleBy = 0.95;
    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer!.x - mousePointTo.x * newScale,
      y: pointer!.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
  }

  function handleMouseMove(e: KonvaEventObject<MouseEvent>) {
    const position = getPosition(e);

    setPointerPosition(position);
  }

  function getPosition(e: KonvaEventObject<MouseEvent>): TPosition {
    return [
      e.target.getStage()!.getRelativePointerPosition()!.x,
      e.target.getStage()!.getRelativePointerPosition()!.y,
    ];
  }
}
