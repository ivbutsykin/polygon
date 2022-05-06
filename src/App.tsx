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
import { Board } from './components';

function App() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar />
      </AppBar>
      <Stack position="fixed" top="45%" left={12}>
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
            <IconButton>
              <PanToolIcon />
            </IconButton>
            <IconButton>
              <PolylineIcon />
            </IconButton>
          </ButtonGroup>
        </Box>
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
