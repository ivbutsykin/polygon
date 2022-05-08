import { useEffect } from 'react';
import { ActionCreators } from 'redux-undo';
import { Box, ButtonGroup, IconButton, Divider, Tooltip } from '@mui/material';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import PanToolIcon from '@mui/icons-material/PanTool';
import PolylineIcon from '@mui/icons-material/Polyline';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setTool, resetNewShape, resetPolygons } from '../store';
import { TOOLS } from '../constants';
import { TTool } from '../types';

export default function Tools() {
  const dispatch = useAppDispatch();
  const { tool } = useAppSelector((state) => state.canvas);
  const { newShape } = useAppSelector((state) => state.newShape);
  const { past, future } = useAppSelector((state) => state.polygons);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const canUndo = past.length > 0 || newShape;
  const canRedo = future.length > 0;

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
        <Tooltip title="Select" placement="right">
          <IconButton onClick={handleChangeTool(TOOLS.SELECT)} size="large">
            <PanToolAltIcon color={getToolColor(TOOLS.SELECT)} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Drag" placement="right">
          <IconButton onClick={handleChangeTool(TOOLS.DRAG)} size="large">
            <PanToolIcon color={getToolColor(TOOLS.DRAG)} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Polygon" placement="right">
          <IconButton onClick={handleChangeTool(TOOLS.POLYGON)} size="large">
            <PolylineIcon color={getToolColor(TOOLS.POLYGON)} />
          </IconButton>
        </Tooltip>

        <Divider />

        <Tooltip title="Undo (Ctrl+Z)" placement="right">
          <span>
            <IconButton onClick={handleUndo} disabled={!canUndo} size="large">
              <UndoIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Redo (Ctrl+Y)" placement="right">
          <span>
            <IconButton onClick={handleRedo} disabled={!canRedo} size="large">
              <RedoIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Clear frame" placement="right">
          <IconButton onClick={handleClearFrame} size="large">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
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

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleUndo();
    }

    if (e.key === 'y' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleRedo();
    }
  }

  function handleUndo() {
    dispatch(resetNewShape());
    dispatch(ActionCreators.undo());
  }

  function handleRedo() {
    dispatch(resetNewShape());
    dispatch(ActionCreators.redo());
  }

  function handleClearFrame() {
    dispatch(resetNewShape());
    dispatch(resetPolygons());
  }
}
