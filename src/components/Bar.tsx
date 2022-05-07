import { useEffect } from 'react';
import { ActionCreators } from 'redux-undo';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { useAppDispatch, useAppSelector } from '../hooks';
import { resetNewShape } from '../store';

export default function Bar() {
  const dispatch = useAppDispatch();
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
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          onClick={handleUndo}
          disabled={!canUndo}
          size="large"
          sx={{ color: '#fafafa' }}
        >
          <UndoIcon />
        </IconButton>
        <IconButton
          onClick={handleRedo}
          disabled={!canRedo}
          size="large"
          sx={{ color: '#fafafa' }}
        >
          <RedoIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );

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
}
