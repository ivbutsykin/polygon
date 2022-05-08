import { Stack } from '@mui/material';
import { Board, Tools, Stats } from './components';

function App() {
  return (
    <>
      <Stack position="fixed" top="30%" left={12} zIndex={1}>
        <Tools />
      </Stack>
      <Stack position="fixed" left="42%" bottom={12} zIndex={1}>
        <Stats />
      </Stack>
      <Stack height="100vh" justifyContent="center" alignItems="center">
        <Board />
      </Stack>
    </>
  );
}

export default App;
