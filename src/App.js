import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"
import MainQuizPage from './pages/MainQuizPage'
import Questions from "./pages/Questions"
import EndPage from "./pages/EndPage"
import { Container, Typography } from "@mui/material"
import { Box } from "@mui/system"
import StartPage from "./pages/StartPage"

function App() {

  // mt is margin top (so like Bootstrap)
  return (
    <Router basename='/'>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Routes>
            <Route path="/" element={<>
              <Typography variant="h2" fontWeight="bold">
                Raad het ontbrekende woord
              </Typography>
              <StartPage /></>
            } />
            <Route path="/questions" element={<MainQuizPage />} />
            <Route path="/endpage" element={<EndPage />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;