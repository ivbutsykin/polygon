import { Box, ButtonGroup, IconButton } from '@mui/material';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import PanToolIcon from '@mui/icons-material/PanTool';
import PolylineIcon from '@mui/icons-material/Polyline';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setTool, resetNewShape } from '../store';
import { TOOLS } from '../constants';
import { TTool } from '../types';

export default function Tools() {
  const dispatch = useAppDispatch();
  const { tool } = useAppSelector((state) => state.canvas);

  return (
    <Box
      sx={{
        p: 0.5,
        backgroundColor: '#fafafa',
        borderRadius: 24,
      }}
    >
      <ButtonGroup
        orientation="vertical"
        sx={{
          '& > *:not(:last-child)': {
            marginBottom: 1,
          },
        }}
      >
        <IconButton onClick={handleChangeTool(TOOLS.SELECT)} size="large">
          <PanToolAltIcon color={getToolColor(TOOLS.SELECT)} />
        </IconButton>
        <IconButton onClick={handleChangeTool(TOOLS.DRAG)} size="large">
          <PanToolIcon color={getToolColor(TOOLS.DRAG)} />
        </IconButton>
        <IconButton onClick={handleChangeTool(TOOLS.POLYGON)} size="large">
          <PolylineIcon color={getToolColor(TOOLS.POLYGON)} />
        </IconButton>
      </ButtonGroup>
    </Box>
  );

  function handleChangeTool(t: TTool) {
    return () => {
      dispatch(resetNewShape());
      dispatch(setTool(t));
    };
  }

  function getToolColor(t: TTool) {
    if (tool === t) {
      return 'primary';
    }

    return undefined;
  }
}
