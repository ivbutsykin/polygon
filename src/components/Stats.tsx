import { Box, Stack, Typography, Divider, Tooltip } from '@mui/material';
import GrainIcon from '@mui/icons-material/Grain';
import PentagonIcon from '@mui/icons-material/Pentagon';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useAppSelector } from '../hooks';

export default function Stats() {
  const {
    present: { polygons },
  } = useAppSelector((state) => state.polygons);
  const { pointerPosition } = useAppSelector((state) => state.canvas);

  const pointsCount = polygons.reduce(
    (acc, polygon) => acc + polygon.points.length,
    0
  );

  const shapesCount = polygons.length;

  const x = Math.trunc(pointerPosition ? pointerPosition[0] : 0);
  const y = Math.trunc(pointerPosition ? pointerPosition[1] : 0);

  return (
    <Box
      sx={{
        p: 1,
        backgroundColor: '#fafafa',
        borderRadius: 24,
        height: 24,
      }}
    >
      <Stack
        flexDirection="row"
        sx={{
          '& > *:not(:last-child)': {
            marginRight: 1,
          },
        }}
      >
        <Stack flexDirection="row" alignItems="center">
          <Tooltip title="Points" placement="top">
            <GrainIcon sx={{ mr: 1 }} />
          </Tooltip>
          <Typography fontWeight={600}>{pointsCount}</Typography>
        </Stack>

        <Stack>
          <Divider orientation="vertical" />
        </Stack>

        <Stack flexDirection="row" alignItems="center">
          <Tooltip title="Polygons" placement="top">
            <PentagonIcon sx={{ mr: 1 }} />
          </Tooltip>
          <Typography fontWeight={600}>{shapesCount}</Typography>
        </Stack>

        <Stack>
          <Divider orientation="vertical" />
        </Stack>

        <Stack flexDirection="row" alignItems="center">
          <Tooltip title="Position" placement="top">
            <MyLocationIcon sx={{ mr: 1 }} />
          </Tooltip>
          <Typography fontWeight={600}>{`(${x}, ${y})`}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
