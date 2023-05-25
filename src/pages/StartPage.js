import { Button, CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

const StartPage = () => {
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();  // Do not let the browser refresh on post
    navigate("/questions")
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <Box mt={3} width="100%">
        <Button fullWidth variant="contained" type="submit">
          Aan de slag
        </Button>
      </Box>
    </form>
  );
}

export default StartPage