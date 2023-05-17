import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"
import Settings from './pages/Settings'
import Questions from "./pages/Questions"
import FinalScreen from "./pages/FinalScreen"
import { Container, Typography } from "@mui/material"
import { Box } from "@mui/system"

function App() {

  // mt is margin top (so like Bootstrap)
  return (
    <Router basename='/'>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Routes>
            <Route path="/quizapp" element={<>
              <Typography variant="h2" fontWeight="bold">
                Quiz app
              </Typography>
              <Settings /></>
            } />
            <Route path="/questions" element={<Questions />} />
            <Route path="/finalscreen" element={<FinalScreen />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;