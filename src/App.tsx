import {
  AppBar,
  Toolbar,
  Stack,
  Box,
  IconButton,
  ButtonGroup,
} from '@mui/material';
import PanToolIcon from '@mui/icons-material/PanTool';
import PolylineIcon from '@mui/icons-material/Polyline';
import { Board, Tools } from './components';

function App() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar />
      </AppBar>
      <Stack position="fixed" top="45%" left={12}>
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
