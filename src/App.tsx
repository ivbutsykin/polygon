import { useEffect } from 'react';
import { ActionCreators } from 'redux-undo';
import { Stack } from '@mui/material';
import { Board, Tools, Stats } from './components';
import { useAppSelector, useAppDispatch } from './hooks';

function App() {
  const dispatch = useAppDispatch();
  const { windowSize } = useAppSelector((state) => state.canvas);

  useEffect(() => {
    dispatch(ActionCreators.clearHistory());
  }, []);

  return (
    <>
      <Stack
        position="fixed"
        top={windowSize.height / 2 - 152}
        left={12}
        zIndex={1}
      >
        <Tools />
      </Stack>
      <Stack
        position="fixed"
        left={windowSize.width / 2 - 120}
        bottom={12}
        zIndex={1}
      >
        <Stats />
      </Stack>
      <Stack height="100vh" justifyContent="center" alignItems="center">
        <Board />
      </Stack>
    </>
  );
}

export default App;
