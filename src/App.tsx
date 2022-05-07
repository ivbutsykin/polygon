import { AppBar, Toolbar, Stack } from '@mui/material';
import { Board, Tools } from './components';

function App() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar />
      </AppBar>
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
