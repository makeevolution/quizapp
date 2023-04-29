import {BrowserRouter as Router, 
  Routes, Route} from "react-router-dom"
import Settings from './pages/Settings'
import Questions from "./pages/Questions"
import FinalScreen from "./pages/FinalScreen"

function App() {

  // Helper Functions

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Settings />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/finalscreen" element={<FinalScreen />} />
      </Routes>
    </Router>
  );
}

export default App;