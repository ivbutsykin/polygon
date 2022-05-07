import { ActionCreators } from 'redux-undo';
import { Stack } from '@mui/material';
import { Bar, Board, Tools } from './components';
import { useAppDispatch } from './hooks';
import { resetNewShape } from './store';

function App() {
  return (
    <>
      <Bar />
      <Stack position="fixed" top="40%" left={12}>
        <Tools />
      </Stack>
      <Stack
        mt={8}
        height="calc(100vh - 64px)"
        justifyContent="center"
        alignItems="center"
      >
        <Board />
      </Stack>
    </>
  );
}

export default App;
